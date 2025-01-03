import ImageComponent from "@/components/ImageComponent";
import SuperButton from "@/components/SuperButton";
import { PricingType } from "@/lib/Types";
import { Car } from "@prisma/client";
import { Fuel, UserRound } from "lucide-react";
import React from "react";

type Props = { car: Car & { carType: { title: string } } ,isMainPage?:boolean };

const CarCard = ({ car,isMainPage = false }: Props) => {
  const dayPrice = (car.pricing as PricingType).days[0];
  const url = isMainPage 
  ? `/cars?location=${car.location}`
  :`/checkout`
  return (
    <article className="border rounded-[24px] overflow-hidden">
      <ImageComponent
        alt="car"
        src={car.image}
        aspect="video"
        className=" w-full"
        imgClassName="object-cover"
      />
      <div className="p-[24px] bg-white">
        {/* first block */}
        <div className="flex justify-between h-[80px] items-center">
            {/* car name and price */}
          <div className="flex flex-col justify-center gap-[15px]">
            <p className="flex items-end  capitalize gap-1 leading-[15.5px]">
              <span className="text-[20px] font-[600]">
                {car.carType.title}
              </span>
              <span className="text-[10px] ">{`(${car.subTitle})`}</span>
            </p>
            <p className="flex capitalize  gap-1 leading-[19.2px]">
              <span className="text-[32px] font-[800]">{dayPrice}</span>
              <span className="text-black/50 text-[16px] ">USD/day</span>
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
        <SuperButton buttonType="linkButton" href={url} className="mt-[18px] w-full rounded-full" title="Book Now" />
      </div>
    </article>
  );
};

export default CarCard;
