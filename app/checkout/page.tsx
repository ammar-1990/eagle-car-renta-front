import React from "react";
import CheckOut from "./_components/CheckOut";
import { CheckoutParams, checkoutParamsSchema, LocationType, PricingType } from "@/lib/Types";
import Container from "../_components/Container";
import {
  calculateDuration,
 
  calculateRentalPrice,
 
  combineDateAndTimeToUTC,
} from "@/lib/utils";
import prisma from "@/lib/prisma";
import NoResult from "../_components/NoResult";
import SuperButton from "@/components/SuperButton";

type Props = { searchParams: Promise<CheckoutParams> };

const CheckoutPage = async ({ searchParams }: Props) => {
  const params = await searchParams;
  const validParams = checkoutParamsSchema.safeParse(params);

  if (!validParams.success)
    return (
      <div className="pt-[100px] pb-12 bg-[#F3F3F3]">
        <Container className="flex flex-col mt-8 gap-4 bg-red-300 text-red-600 border p-8 border-red-500 rounded-md">
          {validParams.error.errors.map((error, index) => {
            return (
              <span key={index}>
                {error.message} - {error.path}
              </span>
            );
          })}
        </Container>
      </div>
    );

  const startDate = combineDateAndTimeToUTC(
    validParams.data.deliveryDate,
    validParams.data.deliveryTime
  );
  const endDate = combineDateAndTimeToUTC(
    validParams.data.returnDate,
    validParams.data.returnTime
  );

  const car = await prisma.car.findUnique({
    where: {
      slug: validParams.data.slug,
      disabled: false,
    },

    include: {
      bookings: {
        where: {
          status: {
            in: ["PAID", "PENDING"],
          },
          startDate: { lte: endDate },
          endDate: { gte: startDate },
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
      extraOptions:true
    },
  });

  if (!car) {
    return (
      <div className="pt-[100px] pb-12 bg-[#F3F3F3]">
        <Container className="">
          <NoResult title="Car Does Not Exist" />
        </Container>
      </div>
    );
  }

  if (!!car.bookings.length) {
    return (
      <div className="pt-[100px] pb-12 bg-[#F3F3F3]">
        <Container className="min-h-screen flex flex-col">
          <NoResult
            className="min-h-[200px]"
            title="This Car Is Already Booked!"
          />
          <SuperButton
            className="mx-auto w-fit"
            title="Back To Home Page"
            buttonType="linkButton"
            href="/"
          />
        </Container>
      </div>
    );
  }

  const duration = calculateDuration(startDate, endDate);
  const pricing = car.pricing as unknown as PricingType;
  const rentalPrice = calculateRentalPrice(duration, pricing);
  console.log('PAGE-STARTDATE',startDate)
  console.log('PAGE-ENDDATE',endDate)
  console.log(" ")
  console.log(endDate.toISOString(), startDate.toISOString())
  console.log(" ")
  console.log(" ")
  return (
    <div className="pt-[125px] bg-[#F3F3F3] min-h-screen pb-12">
      <CheckOut
        car={car}
        startDate={startDate}
        endDate={endDate}
        rentalPrice={rentalPrice}
        pickupLocation={validParams.data.pickupLocation as LocationType}
      />
    </div>
  );
};

export default CheckoutPage;
