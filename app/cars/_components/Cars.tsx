import CarCard from "@/app/_components/cards/CarCard";
import NoResult from "@/app/_components/NoResult";
import prisma from "@/lib/prisma";
import { CarsWithBookings, PricingType, SearchCarsParams } from "@/lib/Types";
import {
  calculateDuration,
  calculateTotalPrice,
  combineDateAndTimeToUTC,
  formatDuration,
} from "@/lib/utils";
import React from "react";

type Props = { validParamsData: SearchCarsParams };

const Cars = async ({ validParamsData }: Props) => {
  const startDate = combineDateAndTimeToUTC(
    validParamsData.deliveryDate,
    validParamsData.deliveryTime
  );
  const endDate = combineDateAndTimeToUTC(
    validParamsData.returnDate,
    validParamsData.returnTime
  );
  const seats = validParamsData.seats;
  const refinedSeats = Array.isArray(seats) ? seats : seats?.split(",");
  const fuel = validParamsData.fuel;

  console.log("seats", seats);

  const cars = await prisma.car.findMany({
    where: {
      location: validParamsData.pickUpLocation,
      disabled: false,
      ...(refinedSeats && { seats: { in: refinedSeats.map((seat) => +seat) } }),
      ...(fuel &&
        (Array.isArray(fuel) ? { fuel: { in: fuel } } : { fuel: fuel })),
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
    },
  });

  const duration = calculateDuration(startDate, endDate);

  const refactoredCars = cars.map((car,i) => {
    const pricing = car.pricing as unknown as PricingType;
    console.log("#".repeat(8))
    console.log("!!!CAR:",i+1)
    const totalPrice = calculateTotalPrice(duration, pricing);
 
    const durationDescription = formatDuration(duration);

    return { ...car, totalPrice, durationDescription };
  });

  return (
    <div className="col-span-3 group-has-[[data-load='true']]:animate-pulse 0">
      {refactoredCars.length ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3   gap-4 ">
          {refactoredCars.map((car) => {
            const { bookings, totalPrice, durationDescription, ...restCar } =
              car;
            return (
              <CarCard
                key={restCar.id}
                car={restCar}
                durationDescription={durationDescription}
                totalPrice={String(totalPrice)}
              />
            );
          })}
        </div>
      ) : (
        <NoResult className="" title="No Cars Found" />
      )}
    </div>
  );
};

export default Cars;
