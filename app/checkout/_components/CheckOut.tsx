"use client";

import Container from "@/app/_components/Container";
import { CarsWithBookings } from "@/lib/Types";
import { format } from "date-fns";
import { useCheckout } from "../hooks/useCheckout";
import Summary from "./Summary";
import BookingForm from "./BookingForm";


type Props = {
  car: CarsWithBookings[number] & {
    extraOptions: { id: string; title: string; price: number }[];
  };
  startDate: Date;
  endDate: Date;
  rentalPrice: number;
};

const CheckOut = ({ car, endDate, startDate, rentalPrice }: Props) => {
  const formattedStartDate = format(startDate, "EEE dd MMM, hh:mm a");
  const formattedEndDate = format(endDate, "EEE dd MMM, hh:mm a");

  const { totalAmount, form, onSubmit, pending, setIsBusinessFn,payLater, payNow } = useCheckout(
    { car, rentalPrice }
  );
  return (
    <Container>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-[29px]">
        {/* Booking Form */}
        <BookingForm
          extraOptions={car.extraOptions}
          form={form}
          onSubmit={onSubmit}
          setIsBusinessFn={setIsBusinessFn}
        />
        {/* Right Summary */}
        <Summary
        payNow={payNow}
        payLater={payLater}
          extraOptions={form
            .watch("extraOptions")
            .map((item) => ({ ...item, id: item.id as string }))}
          deposit={car.deposit}
          formattedEndDate={formattedEndDate}
          formattedStartDate={formattedStartDate}
          image={car.image}
          subTitle={car.subTitle}
          totalAmount={totalAmount}
          rentalPrice={rentalPrice}
        />
      </div>
    </Container>
  );
};

export default CheckOut;
