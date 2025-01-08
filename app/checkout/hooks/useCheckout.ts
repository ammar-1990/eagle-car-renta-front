import { CarsWithBookings } from "@/lib/Types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { bookingSchema } from "../schema";
import { useRouter } from "next/navigation";
import { useEffect, useState, useTransition } from "react";

export const useCheckout = ({
  car,
  rentalPrice,
}: {
  car: CarsWithBookings[number];
  rentalPrice: number;
}) => {
 
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

  const extraOptionsPrice = form.watch('extraOptions').reduce((acc,val)=>acc + Number(val.price),0)

  const payNow = car.deposit
  const baseAmount = rentalPrice  + extraOptionsPrice
  const totalAmount = Math.max(baseAmount, payNow); // incase deposite is greater than total
  const payLater = Math.max(totalAmount - payNow, 0) // incase deposite is greater than rental price

  useEffect(()=>{
    
    form.setValue('price', String(rentalPrice))
    form.setValue('totalAmount',String(totalAmount))

  },[extraOptionsPrice])


  return { totalAmount, form, onSubmit, pending ,setIsBusinessFn,payLater,payNow};
};
