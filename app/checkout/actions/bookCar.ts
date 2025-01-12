'use server'

import { bookingSchema, BookingType } from "../schema";
import CustomError from "@/lib/CustomError";
import {
 
  calculateRentalPrice,
  generateBookingCode,
  getTotalNowLaterPrices,
  stripePaymentMethodMap,
  throwCustomError,
} from "@/lib/utils";
import prisma from "@/lib/prisma";
import { PricingType, StripeMetaData } from "@/lib/Types";
import { startStripeSession } from "@/lib/stripe";
import { endOfDay, formatDuration } from "date-fns";
import { calculateDuration } from "@/lib/date";

export const bookCar = async (data: BookingType, slug: string) :Promise<{success:false, message:string, url:undefined}|{success:true,message:string,url:string | null}> => {
  let booking;
  try {
    if (!slug) return throwCustomError("Slug Required");

    const validData = bookingSchema.safeParse(data);
    if (!validData.success) return throwCustomError("Invalid Inputs");

    //check car exist and not disabled

    //fetch car
    const car = await prisma.car.findUnique({
      where: {
        slug,
        disabled: false,
        location: validData.data.pickupLocation,
      },
      include: {
        bookings: {
          where: {
            status: {
              in: ["PAID", "PENDING"],
            },
            startDate: { lte: validData.data.endDate },
            endDate: { gte: validData.data.startDate },
          },
          select: {
            startDate: true,
            endDate: true,
          },
        },
        carType: {
          select: {
            title: true,
          },
        },

        extraOptions: {
          select: {
            id: true,
            price: true,
            title: true,
          },
        },
      },
    });

    if (!car) return throwCustomError("Car Does Not Exist");

    //check if it has bookings for coming dates - then it is booked already
    const bookings = car.bookings.length;
    if (bookings)
      return throwCustomError("Sorry..., Car Has Been Booked Already");
    //check extraOptions
    const validExtraOptions = car.extraOptions;
    const isValid = validData.data.extraOptions.every((clientOption) =>
      validExtraOptions.some((dbOption) => dbOption.id === clientOption.id)
    );

    if (!isValid)
      return throwCustomError(
        "Extra Options Added Not Found, Please Contact Customer Service"
      );

    //calculate price
    const duration = calculateDuration(
      new Date(validData.data.startDate),
      new Date(validData.data.endDate)
    );
    const durationDescription = formatDuration(duration);
    const pricing = car.pricing as unknown as PricingType;

    const rentalPrice = calculateRentalPrice(duration, pricing);
    const extraOptionsPrice = car.extraOptions.reduce(
      (acc, val) => acc + Number(val.price),
      0
    );

    const {payLater, payNow, totalAmount } = getTotalNowLaterPrices({
      deposite: car.deposit,
      extraOptionsPrice,
      rentalPrice,
    });

    // generate booking ID
    const bookingID = await generateBookingCode();

    //create booking
    booking = await prisma.booking.create({
      data: {
        ...validData.data,
        carId: car.id,
        email: validData.data.email.toLocaleLowerCase(),
        price: rentalPrice,
        totalAmount,
        bookingID,
        status: "PENDING",
      },
    });

    //prepare  data for stripe
    const carCompleteTitle = `${car.carType.title} (${car.subTitle})`;
    const paymentMethod = stripePaymentMethodMap[booking.paymentMethod];

    //meta data
    const metaData:StripeMetaData = {
      bookingId: booking.id,
      bookingID:booking.bookingID,
      customerEmail: booking.email,
      startDate: validData.data.startDate,
      endDate: validData.data.endDate,
      carTitle: carCompleteTitle,
      payNow:payNow,
      payLater:payLater,
      totalAmount:totalAmount,
      durationDescription:durationDescription
    };
    //create session
    const session = await startStripeSession({
        metaData,
        image:car.image,
        myPayment:paymentMethod
    });


    return {
        success:true,
        url:session.url,
        message:"Session Successfull created"
    }

  } catch (error) {

    await prisma.booking.delete({
        where:{
          id:booking?.id 
        }
      })
  
    console.error(error);
    if (error instanceof CustomError) {
      return {
        success: false,
        message: error.message,
        url:undefined
      };
    }
    return { success: false, message: "Internal Server Error", url:undefined };
  }
};