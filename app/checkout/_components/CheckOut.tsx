"use client";

import Container from "@/app/_components/Container";
import ImageComponent from "@/components/ImageComponent";
import { CarsWithBookings } from "@/lib/Types";
import { format } from "date-fns";
import { useCheckout } from "../hooks/useCheckout";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";
import Summary from "./Summary";

type Props = {
  car: CarsWithBookings[number];
  startDate: Date;
  endDate: Date;
  totalPrice: number;
};

const CheckOut = ({ car, endDate, startDate, totalPrice }: Props) => {
  const formattedStartDate = format(startDate, "EEE dd MMM, hh:mm a");
  const formattedEndDate = format(endDate, "EEE dd MMM, hh:mm a");

  const { totalAmount } = useCheckout({ car, totalPrice });
  return (
    <Container>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-[29px]">
        <div></div>

        {/* Right Summary */}
        <Summary
          deposit={car.deposit}
          formattedEndDate={formattedEndDate}
          formattedStartDate={formattedStartDate}
          image={car.image}
          subTitle={car.subTitle}
          totalAmount={totalAmount}
          totalPrice={totalPrice}
        />
      </div>
    </Container>
  );
};

export default CheckOut;
