
import Container from "@/app/_components/Container";
import SearchComponent from "@/app/_components/SearchComponent";
import React, { Suspense } from "react";


import {  SearchCarsParams } from "@/lib/Types";
 
import Cars from "./Cars";
import { Skeleton } from "@/components/ui/skeleton";
import Filter from "./Filter";

type Props = {
 validParamsData:SearchCarsParams
};

const SearchCars = ({ validParamsData }: Props) => {

  return (
    <div className="group" >
      <SearchComponent isSearchCars />
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-5 mt-[62px] lg:gap-4 " >
          <div className="col-span-1 mb-4 lg:mb-0">
            <Filter/>
          </div>
          <Suspense key={JSON.stringify(validParamsData)} fallback={<Skeleton className="col-span-4 bg-muted-foreground min-h-[600px] w-full rounded-md" />}>
          <Cars validParamsData={validParamsData}/>
          </Suspense>
        </div>
      </Container>
    </div>
  );
};

export default SearchCars;
