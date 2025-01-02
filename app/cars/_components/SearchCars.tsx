"use client";
import Container from "@/app/_components/Container";
import SearchComponent from "@/app/_components/SearchComponent";
import React from "react";
import { useSearchCars } from "../hooks/useSearchCars";
import { Car } from "@prisma/client";
import { CarsWithBookings } from "@/lib/Types";
import CarCard from "@/app/_components/cards/CarCard";
import NoResult from "@/app/_components/NoResult";

type Props = {
  cars: CarsWithBookings;
};

const SearchCars = ({ cars }: Props) => {
  const {} = useSearchCars();
  return (
    <div>
      <SearchComponent isSearchCars />
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-4 mt-[62px]">
          <div className="col-span-1">left</div>
          {cars.length ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3   gap-4 col-span-3">
              {cars.map((car) => {
                const { bookings, ...restCar } = car;
                return <CarCard key={restCar.id} car={restCar} />;
              })}
            </div>
          ) : (
            <NoResult className="col-span-3" title="No Cars Found" />
          )}
        </div>
      </Container>
    </div>
  );
};

export default SearchCars;
