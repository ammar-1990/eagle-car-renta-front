"use client";
import SuperButton from "@/components/SuperButton";
import { LOCATIONS, LOCATIONS_CONST, LOCATIONS_MAP } from "@/lib/Types";
import React from "react";
import Container from "./Container";
import { useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";

type Props = {};

const OurCars = (props: Props) => {
  const searchParams = useSearchParams();
  const chosenLocation = searchParams.get("location") ?? LOCATIONS_CONST[0];
  return (
    <Container>
      <div>
        <h3 className="text-site-primary text-[48px] font-[700] w-full text-center">
          Our Cars
        </h3>
        <div className="mt-[52px] flex items-center justify-center gap-[16px]">
          {LOCATIONS_CONST.map((location,index) => (
            <SuperButton
            key={`location-button-${index}`}
              buttonType="pushButton"
              href={`/?location=${location}`}
              title={LOCATIONS_MAP[location]}
              variant="site"
              className={cn(
                "rounded-full capitalize bg-transparent text-black hover:bg-site-primary hover:text-white",
                chosenLocation === location && "bg-site-primary text-white"
              )}
            />
          ))}
        </div>
      </div>
    </Container>
  );
};

export default OurCars;
