import { Button } from "@/components/ui/button";
import React from "react";

import {
  Accordion,
} from "@/components/ui/accordion";
import LoginAccordionElement from "./LoginAccordionElement";

type Props = {
  setIsLogin: () => void;
};

const LoginResult = ({ setIsLogin }: Props) => {
  return (
    <div className="flex w-full h-full items-center justify-center flex-col gap-4">
      <div className="w-[95%] max-w-[500px]">
        <Accordion type="multiple">
          {/* CAR DETAILS */}
          <LoginAccordionElement item="item-1" title="Car Details">
            <div>Car Details</div>
          </LoginAccordionElement>
          {/* Driver Details */}
          <LoginAccordionElement item="item-2" title=" Driver Details">
            <div> Driver Details</div>
          </LoginAccordionElement>
          {/* Billing Details */}
          <LoginAccordionElement item="item-3" title=" Billing Details">
            <div> Billing Details</div>
          </LoginAccordionElement>
          {/* Payment Details */}
          <LoginAccordionElement item="item-4" title=" Payment Details">
            <div> Payment Details</div>
          </LoginAccordionElement>
        </Accordion>
      </div>
      <Button onClick={() => setIsLogin()} variant={"link"}>
        Go Back
      </Button>
    </div>
  );
};

export default LoginResult;
