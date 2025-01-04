"use client";

import { FUEL_MAP, SEATS_MAP } from "@/lib/Types";
import { useSearchCars } from "../hooks/useSearchCars";
import FilterItem from "./FilterItem";
import { Button } from "@/components/ui/button";

type Props = {};

const Filter = (props: Props) => {
  const { seats, fuel, handleReset, pending } = useSearchCars();
  return (
    <div
   
      data-load={pending ? "true" : undefined}
      className="bg-white border rounded-[14px] p-[24px] "
    >
      <div className="flex items-center justify-between ">
        <h3 className="font-[600] text-[20px]">Filters</h3>
        <Button onClick={handleReset} className="text-xs" variant={"link"}>
          Reset Filters
        </Button>
      </div>

      <div className="mt-[22px] pt-[22px] border-t">
        {/* SEATS */}
        <h3 className="text-[#606060]">Seats</h3>
        <div className="pt-[8px] " />
        {Object.entries(SEATS_MAP).map(([key, value], index) => {
          return (
            <FilterItem
              className="mt-1"
              key={`filter-seats-${index}`}
              title={value}
              value={key}
              isChecked={seats.includes(`${key}`)}
              param="seats"
            />
          );
        })}
      </div>
      {/* FUEL */}
      <h3 className="text-[#606060] mt-[22px]">Fuel</h3>
      <div className="pt-[8px] " />
      {Object.entries(FUEL_MAP).map(([key, value], index) => {
        return (
          <FilterItem
            className="mt-1"
            key={`filter-seats-${index}`}
            title={value}
            value={key}
            isChecked={fuel.includes(`${key}`)}
            param="fuel"
          />
        );
      })}
    </div>
  );
};

export default Filter;
