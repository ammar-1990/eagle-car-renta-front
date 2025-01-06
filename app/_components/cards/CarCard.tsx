import ImageComponent from "@/components/ImageComponent";
import SuperButton from "@/components/SuperButton";
import { CarCheckoutParams, PricingType } from "@/lib/Types";
import { cn } from "@/lib/utils";
import { Car } from "@prisma/client";
import { Fuel, UserRound } from "lucide-react";
import React from "react";

type Props = {
  car: Car & { carType: { title: string } };
  totalPrice?: string;
  durationDescription?: string;
} & (
  | {
      isMainPage: true;
    }
  | { isMainPage?: false; carsCheckoutParams: CarCheckoutParams }
);

const CarCard = ({
  car,
  totalPrice,
  durationDescription,
  isMainPage = false,
  ...rest
}: Props) => {
  const dayPrice = (car.pricing as PricingType).days[0];
  const price = totalPrice ? totalPrice : dayPrice;
  const duration = durationDescription ? `${durationDescription}` : "USD/day";
  const url = isMainPage
    ? `/cars?pickUpLocation=${car.location}`
    : rest && "carsCheckoutParams" in rest
    ? `/checkout?slug=${car.slug}&${new URLSearchParams(rest.carsCheckoutParams).toString()}`
    : "/checkout";
  return (
    <article className="border rounded-[24px] overflow-hidden flex flex-col">
      <ImageComponent
        alt="car"
        src={car.image}
        aspect="video"
        className=" w-full"
        imgClassName="object-cover"
      />
      <div className="p-[24px] bg-white flex-1 flex flex-col ">
        {/* first block */}
        {/* car name and price */}
        <p className="flex items-start  capitalize gap-1 leading-[15.5px] mb-[5px]">
          <span className="text-[20px] font-[600]">{car.carType.title}</span>
          <span className="text-[10px] ">{`(${car.subTitle})`}</span>
        </p>
        <div className="flex justify-between items-center mt-auto">
          <div className="flex flex-col justify-center gap-[15px] items-center">
            <p
              className={cn(
                "flex capitalize  gap-1 leading-[19.2px]",
                durationDescription && "flex-col items-start"
              )}
            >
              <span className="text-[32px] font-[800]">
                {price}{" "}
                {durationDescription && (
                  <span className="text-black/50 text-[16px] font-normal">
                    USD
                  </span>
                )}
              </span>
              <span
                className={cn(
                  "text-black/50 text-[16px]",
                  durationDescription && "text-xs"
                )}
              >
                {duration}
              </span>
            </p>
          </div>
          {/* Review */}
          <div className="flex items-center flex-col">
            <span className="font-[500] text-[14px]">Reviews</span>
            <span className="bg-site-primary text-white flex items-center justify-center w-[56px] h-[52px] rounded-[5.4px]">
              5.0
            </span>
          </div>
        </div>
        {/* second block */}
        <div className="bg-[#F6F6F6] py-[8px] px-[16px] flex justify-center gap-[21px] mt-[18px] rounded-[16px]">
          <span className="flex flex-col items-center gap-[8.5px] text-[#545454] text-[14px] font-[500]">
            <Fuel className="w-[20px] h-[20px]" />
            {car.fuel}
          </span>

          <span className="flex flex-col items-center gap-[8.5px] text-[#545454] text-[14px] font-[500]">
            <UserRound className="w-[20px] h-[20px]" />
            {car.seats}
          </span>
        </div>
        <SuperButton
          buttonType="linkButton"
          scroll={true}
          href={url}
          className="mt-[12px] w-full rounded-full"
          title="Book Now"
        />
      </div>
    </article>
  );
};

export default CarCard;
