import { CarsWithBookings } from "@/lib/Types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { bookingSchema } from "../schema";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

export const useCheckout = ({
  car,
  totalPrice,
}: {
  car: CarsWithBookings[number];
  totalPrice: number;
}) => {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
 
  const form = useForm<z.infer<typeof bookingSchema>>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      email: "",
      firstName: "",
      middleName: "",
      lastName: "",
      contactNumber: "",
      billingFirstName: "",
      billingMiddleName: "",
      billingLastName: "",
      billingContactNumber: "",
      address: "",
      City: "",
      State: "",
      Zipcode: "",
      license: "",
      companyName: "",
      companyVat: "",
      pickupLocation: "",
      dropoffLocation: "",
      price: "",
      totalAmount: "",
      paymentMethod: undefined,
      extraOptions: [],
      status: "PENDING",
      terms: false,
    },
  });


  const setIsBusinessFn = ()=>{
    const isBusiness = form.watch('business') ?? false
  form.setValue('business',!isBusiness)
  }

  async function onSubmit(values: z.infer<typeof bookingSchema>) {
    startTransition(async () => {
      alert(JSON.stringify(values));
    });
  }

  const totalAmount = totalPrice + car.deposit;

  return { totalAmount, form, onSubmit, pending ,setIsBusinessFn};
};
