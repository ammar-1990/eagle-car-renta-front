import CarCard from "@/app/_components/cards/CarCard";
import NoResult from "@/app/_components/NoResult";
import prisma from "@/lib/prisma";
import { CarsWithBookings, SearchCarsParams } from "@/lib/Types";
import { combineDateAndTimeToUTC } from "@/lib/utils";
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
      ...(refinedSeats && { seats: { in: refinedSeats.map(seat=>+seat) } }),
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
  return (
    <div className="col-span-3 ">
      {cars.length ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3   gap-4 ">
          {cars.map((car) => {
            const { bookings, ...restCar } = car;
            return <CarCard key={restCar.id} car={restCar} />;
          })}
        </div>
      ) : (
        <NoResult className="" title="No Cars Found" />
      )}
    </div>
  );
};

export default Cars;
