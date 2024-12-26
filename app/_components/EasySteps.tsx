import { cn } from "@/lib/utils";
import {
  CalendarCheck,
  CarFront,
  CreditCard,
  Icon,
  KeyRound,
} from "lucide-react";
import React from "react";
import Container from "./Container";
import ImageComponent from "@/components/ImageComponent";

type Props = {};
const EASY_STEPS = [
  {
    title: "Choose your car.",
    description: "Choose the car you want, according to your request.",
    Icon: <CarFront className="text-[#494949] w-[41px] h-[45px] " />,
  },
  {
    title: "Set the delivery date.",
    description: "Choose your desired date from the calendar and book",
    Icon: <CalendarCheck className="text-[#494949] w-[41px] h-[45px] " />,
  },
  {
    title: "Payment",
    description:
      "You can pay the rent through the online wallet or Shatab network member cards.",
    Icon: <CreditCard className="text-[#494949] w-[41px] h-[45px] " />,
  },
  {
    title: "Get the car.",
    description: "Get your car at the appointed time and place.",
    Icon: <KeyRound className="text-[#494949] w-[41px] h-[45px] " />,
  },
];

const EasySteps = (props: Props) => {
  return (
    <section className="px-8">
      <p className="w-fit mx-auto   text-[24px] font-[400]  text-[#5E5E5E] text-center">
        In 4 easy steps this is{" "}
      </p>
      <p className="mt-[8px] text-site-primary font-[700] text-[32px] w-fit mx-auto text-center">
        How to rent a car with Eagle Car Rental
      </p>
      <Container className="mt-[130px]">
        <div className="  grid grid-cols-1 lg:grid-cols-2 h-[800px] relative">
          <ImageComponent
            src="/easy-steps.png"
            alt="easy-steps"
            className="absolute left-1/2 top-1/2 translate-x-[-50%] translate-y-[-50%] w-full h-full hidden xl:block"
            aspect="square"
            imgClassName="object-contain"
          />
          {EASY_STEPS.map((easyStep, index) => {
            return (
              <EasyStepCard
                index={index}
                key={`easy-step-${index}`}
                easyStep={easyStep}
              />
            );
          })}
        </div>
      </Container>
    </section>
  );
};

export default EasySteps;

const EasyStepCard = ({
  easyStep,

  index,
}: {
  easyStep: { title: string; description: string; Icon: React.ReactNode };

  index: number;
}) => {
  const { Icon } = easyStep;
  return (
    <article
      className={cn(
        "flex items-center gap-[16px] h-fit relative",
        !(index % 2 === 0) && "flex-row-reverse"
      )}
    >
      <span
        className={`absolute -z-[1] -top-[100px] ${
          index % 2 !== 0 ? "-right-[24px]" : "-left-[25px]"
        } text-[120px] text-stroke font-[700] text-white`}
      >
        {index + 1}
      </span>
      <div className="flex items-center justify-center w-[80px] h-[80px] border rounded-[16px] bg-white shrink-0">
        {" "}
        {Icon}
      </div>

      <div className="max-w-[300px] ">
        <p className="text-[24px] font-[700] text-site capitalize text-site-primary line-clamp-1">
          {easyStep.title}
        </p>
        <p className="text-[#5E5E5E] text-[16px] font-[500]">
          {easyStep.description}
        </p>
      </div>
    </article>
  );
};
