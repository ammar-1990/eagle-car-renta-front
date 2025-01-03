"use client";

import { useSearchCars } from "../hooks/useSearchCars";
import FilterItem from "./FilterItem";

type Props = {};

const Filter = (props: Props) => {
  const { seats, fuel } = useSearchCars();
  return (
    <div className="bg-white border rounded-[14px] p-[24px] has-[[data-load='true']]:animate-pulse">
      <h3 className="font-[600] text-[20px]">Filters</h3>
      <div className="mt-[22px]">
        <FilterItem
          title="2 Seats"
          value="2"
          isChecked={seats.includes(`${2}`)}
          param="seats"
         
        />
      </div>
    </div>
  );
};

export default Filter;
