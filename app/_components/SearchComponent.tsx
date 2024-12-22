"use client";
import React from "react";
import Container from "./Container";
import { cn } from "@/lib/utils";
import { useSearchComponent } from "../hooks/useSearchComponent";
import ComboBoxField from "./ComboBoxField";
import SuperButton from "@/components/SuperButton";
import PopOverField from "./PopOverField";
import { Search } from "lucide-react";
import DateField from "./DateField";

type Props = {
  className?: string;
};

const SearchComponent = ({ className }: Props) => {
  const {
    deliveryDate,
    deliveryTime,
    dropOffLocation,
    pickupLocation,
    returnDate,
    returnTime,
    setDeliveryDate,
    setDeliveryTime,
    setDropOffLocation,
    setPickupLocation,
    setReturnDate,
    setReturnTime,
    isDropOff,
    setIsDropOff,
    locations,
    hours,
  } = useSearchComponent();
  return (
    <div className={cn("px-4", className)}>
      <Container>
        <div className="w-full   flex  gap-[16px] flex-col lg:flex-row  px-[24px] py-[32px] rounded-[16px] bg-[#FCFDFD] shadow-lg relative  items-end ">
          <div
            className={cn(
              " grid grid-cols-1 lg:grid-cols-6 gap-[16px]  items-center w-full",
              !true && "lg:grid-cols-5"
            )}
          >
            <ComboBoxField
              items={locations}
              param="pickUpLocation"
              push={false}
              setValue={(val: string | null) => setPickupLocation(val)}
              value={pickupLocation}
              stateLabel="Pick Up Location"
            />
            <ComboBoxField
              items={locations}
              param="dropOffLocation"
              push={false}
              setValue={(val: string | null) => setDropOffLocation(val)}
              value={dropOffLocation}
              stateLabel="Drop Off Location"
            />

            <DateField
              value={deliveryDate}
              setValue={(val: string) => setDeliveryDate(val)}
              placeholder="Delivery Date"
              stateLabel="Delivery Date"
            />
            <PopOverField
              items={hours}
              setValue={(val: string) => setDeliveryTime(val)}
              value={deliveryTime}
              placeholder="Delivery Time"
              stateLabel="Delivery Time"
            />
              <DateField
              value={returnDate}
              setValue={(val: string) => setReturnDate(val)}
              placeholder="Return Date"
              stateLabel="Return Date"
            />
            <PopOverField
              items={hours}
              setValue={(val: string) => setReturnTime(val)}
              value={returnTime}
              placeholder="Return Time"
              stateLabel="Return Time"
            />
          </div>
          <SuperButton
            className="w-full lg:w-auto"
            buttonType="loadingButton"
            loading={false}
            Icon={<Search className="icon" />}
          />
        </div>
      </Container>
    </div>
  );
};

export default SearchComponent;
