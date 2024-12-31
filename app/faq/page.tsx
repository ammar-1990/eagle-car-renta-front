import React from "react";
import Banner from "../_components/Banner";
import Container from "../_components/Container";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import BrandsSlider from "../_components/BrandsSlider";

type Props = {};

const FAQs = [
  {
    Q: "How do I book a car rental?",
    A: "You can book a car by browsing our selection, selecting your preferred vehicle, and completing the reservation process online.",
  },
  {
    Q: "What documents do I need to rent a car?",
    A: "You typically need a valid driver’s license, passport or ID, and a credit card for payment and security deposit.",
  },
  {
    Q: "Can I modify or cancel my reservation?",
    A: "Yes, you can modify or cancel your booking through your account dashboard. Cancellation policies may vary based on the rental plan you choose.",
  },
  {
    Q: "What payment methods do you accept?",
    A: "We accept major credit cards, debit cards, and digital wallets. Payments are securely processed through our platform.",
  },
  {
    Q: "Is there a mileage limit on rentals?",
    A: "Mileage limits depend on the vehicle and rental plan selected. You can check the terms during the booking process.",
  },
  {
    Q: "Do you offer insurance coverage?",
    A: "Yes, we offer different levels of insurance coverage to protect you during your rental period. You can select your preferred option while booking.",
  },
  {
    Q: "Can I rent a car without a credit card?",
    A: "A credit card is required for most rentals as a security deposit. However, some locations may accept debit cards—please check our policies.",
  },
  {
    Q: "Is fuel included in the rental price?",
    A: "No, fuel is not included. Vehicles must be returned with the same fuel level as when rented, or refueling charges may apply.",
  },
  {
    Q: "Are there additional charges for extra drivers?",
    A: "Additional drivers may incur a small fee. All drivers must be registered and provide valid documentation.",
  },
  {
    Q: "What should I do in case of an accident or breakdown?",
    A: "Contact our 24/7 roadside assistance immediately. Details are provided in the rental agreement and in the vehicle documentation.",
  },
];

const FAQPage = (props: Props) => {
  return (
    <div>
      <Banner label="FAQ" />
      <div className="mt-[52px]">
        <Container>
          <Accordion type="multiple">
            {FAQs.map((FAQ, index) => {
              return (
                <AccordionItem
                  key={`FAQ-${index}`}
                  value={`item-${index + 1}`}
                  className="border-b-0 border rounded-[16px] px-[16px] mb-[16px]"
                >
                  <AccordionTrigger>{FAQ.Q}</AccordionTrigger>
                  <AccordionContent className="text-[#727272] text-[14px] font-[400] max-w-[770px] ">
                    {FAQ.A}
                  </AccordionContent>
                </AccordionItem>
              );
            })}
          </Accordion>
          {/* Brands Slider */}
          <div className="mt-[52px]">
            <BrandsSlider />
          </div>
        </Container>
      </div>
    </div>
  );
};

export default FAQPage;
