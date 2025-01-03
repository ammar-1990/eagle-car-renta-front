
import Container from "@/app/_components/Container";
import SearchComponent from "@/app/_components/SearchComponent";
import React, { Suspense } from "react";
import { useSearchCars } from "../hooks/useSearchCars";
import { Car } from "@prisma/client";
import { CarsWithBookings, SearchCarsParams } from "@/lib/Types";
import CarCard from "@/app/_components/cards/CarCard";
import NoResult from "@/app/_components/NoResult";
import Cars from "./Cars";
import { Skeleton } from "@/components/ui/skeleton";
import Filter from "./Filter";

type Props = {
 validParamsData:SearchCarsParams
};

const SearchCars = ({ validParamsData }: Props) => {

  return (
    <div className="">
      <SearchComponent isSearchCars />
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-4 mt-[62px] gap-4">
          <div className="col-span-1">
            <Filter/>
          </div>
          <Suspense key={JSON.stringify(validParamsData)} fallback={<Skeleton className="col-span-3 bg-muted-foreground min-h-[600px] w-full rounded-md" />}>
          <Cars validParamsData={validParamsData}/>
          </Suspense>
        </div>
      </Container>
    </div>
  );
};

export default SearchCars;
