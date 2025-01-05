import ImageComponent from "@/components/ImageComponent";
import { cn, formatToDollar } from "@/lib/utils";
import React, { ReactNode } from "react";

type Props = {
  image: string;
  subTitle: string;
  formattedStartDate: string;
  formattedEndDate: string;
  totalPrice: number;
  deposit: number;
  totalAmount: number;
};

const Summary = ({
  image,
  subTitle,
  formattedEndDate,
  formattedStartDate,
  totalPrice,
  deposit,
  totalAmount,
}: Props) => {
  return (
    <div className="rounded-[16px] p-[50px] border bg-white">
      <SummaryBlockWrapper>
        <h3 className="font-[700] text-[24px] ">Booking Summary</h3>
      </SummaryBlockWrapper>

      <SummaryBlockWrapper>
        <div className=" flex gap-[23px] items-center ">
          <ImageComponent
            src={image}
            alt="car-image"
            aspect="square"
            className="w-[120px] h-[101px] rounded-[12px] overflow-hidden"
          />
          <div className="">
            <h3 className="fint-[500] text-[16px]">{subTitle}</h3>
            <p className="text-[14px] text-muted-foreground">
              Pickup Date: {formattedStartDate}
            </p>
            <p className="text-[14px] text-muted-foreground">
              Return Date: {formattedEndDate}
            </p>
          </div>
        </div>
      </SummaryBlockWrapper>

      <SummaryBlockWrapper>
        <SummaryElement label="Rental Price" value={formatToDollar(totalPrice)} />
        <SummaryElement label="Deposite" value={formatToDollar(deposit)} />
        <p className="text-[10px] text-[#ACACAC]">
          Non-Refundable if you dont show up in the show room
        </p>
      </SummaryBlockWrapper>

      <SummaryBlockWrapper>
        <SummaryElement label="Total Amount" value={formatToDollar(totalAmount)} />
      </SummaryBlockWrapper>

      <SummaryBlockWrapper>
        <SummaryElement label="Pay Now" value={formatToDollar(deposit)} isBold />
        <p className="text-[10px] text-[#ACACAC]">
          Overall price that you will pay now via checkout
        </p>
        <SummaryElement label="Pay Later" value={formatToDollar(totalPrice)} isBold />
        <p className="text-[10px] text-[#ACACAC]">
          Overall price that you will pay at the rental company
        </p>
      </SummaryBlockWrapper>
    </div>
  );
};

export default Summary;

const SummaryElement = ({
  label,
  value,
  isBold,
}: {
  label: string;
  value: string;
  isBold?: boolean;
}) => {
  return (
    <div className="flex items-center justify-between">
      <p className={cn("text-[#ACACAC]", isBold && "text-black font-[500]")}>
        {label}
      </p>
      <p className={cn("font-[500]", isBold && "font-[700] text-[24px]")}>
        {value}
      </p>
    </div>
  );
};

const SummaryBlockWrapper = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={cn("mt-[24px] pb-[20px] border-b border-[#ACACAC]", className)}
    >
      {children}
    </div>
  );
};
