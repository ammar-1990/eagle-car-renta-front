import React, { Suspense } from "react";
import Banner from "../_components/Banner";
import SearchComponent from "../_components/SearchComponent";
import SearchCars from "./_components/SearchCars";

import prisma from "@/lib/prisma";
import {
  afterTomorrow,
  DEFAULT_LOCATION,
  DEFAULT_TIME,
  SearchCarsParams,
  searchCarsSchema,
  tomorrow,
} from "@/lib/Types";
import { combineDateAndTimeToUTC, prepareCarsSearchParams } from "@/lib/utils";
import Container from "../_components/Container";

type Props = {
  searchParams: Promise<SearchCarsParams>;
};

const CarsPage = async ({ searchParams }: Props) => {
  const params = await searchParams;
  const preparedParams = prepareCarsSearchParams(params);
  const validParams = searchCarsSchema.safeParse(preparedParams);

  // Invalid Params Component
  if (!validParams.success)
    return (
      <div className="py-12 bg-[#F3F3F3]">
        <Banner label="Cars" />
        <Container  className="flex flex-col mt-8 gap-4 bg-red-300 text-red-600 border p-8 border-red-500 rounded-md">
          {validParams.error.errors.map((error, index) => {
            return <span key={index}>{error.message}</span>;
          })}
        </Container>
      </div>
    );


    // Valid Params
  const validParamsData = validParams.data;
  const startDate = combineDateAndTimeToUTC(validParamsData.deliveryDate, validParamsData.deliveryTime)
  const endDate = combineDateAndTimeToUTC(validParamsData.returnDate, validParamsData.returnTime)

  const cars = await prisma.car.findMany({
    where: {
      location: validParamsData.pickUpLocation,
      disabled:false
      
    },
    include:{
      bookings: {
        where: {
          status:{
            in:["PAID", "PENDING"]
          },
          startDate: { lte: endDate },  
          endDate: { gte: startDate },  
        },
        select:{
          startDate:true,
          endDate:true
        }
      },
      carType:{
        select:{
          title:true
        }
      }
    }
  });
  return (
    <div className="bg-[#F3F3F3]">
      <Banner label="Cars" />
      <div className="-mt-[72.5px]">
        <Suspense>
          <SearchCars cars={cars} />
        </Suspense>
      </div>
    </div>
  );
};

export default CarsPage;
