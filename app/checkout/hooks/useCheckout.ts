'use client'
import { CarsWithBookings, LOCATIONS_CONST } from "@/lib/Types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { bookingSchema } from "../schema";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { errorToast, getTotalNowLaterPrices } from "@/lib/utils";
import { bookCar } from "../actions/bookCar";
import { toast } from "sonner";

export const useCheckout = ({
  car,
  rentalPrice,
  startDate,
  endDate,
  pickupLocation
}: {
  car: CarsWithBookings[number];
  rentalPrice: number;
  startDate:Date,
  endDate:Date,
  pickupLocation:typeof LOCATIONS_CONST[number],
}) => {
 
  const [pending, startTransition] = useTransition();
  const router = useRouter()

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
      pickupLocation: pickupLocation,
      dropoffLocation: "",
  
      paymentMethod: undefined,
      extraOptions: [],
      status: "PENDING",
      terms: false,
      
      startDate:startDate.toISOString(),
      endDate:endDate.toISOString(),
    },
  });


  const setIsBusinessFn = ()=>{
    const isBusiness = form.watch('business') ?? false
  form.setValue('business',!isBusiness)
  }

  async function onSubmit(values: z.infer<typeof bookingSchema>){
    startTransition(async () => {
  
      try {
        const res = await bookCar(values,car.slug)
     
        if(!res.success){
          toast.error(res.message)
        }else {
        res.url &&   router.push(res.url)
        }
      } catch (error) {
 
        errorToast()
      }
    });
  }

  const extraOptionsPrice = form.watch('extraOptions').reduce((acc,val)=>acc + Number(val.price),0)

  const {payLater, payNow, totalAmount} = getTotalNowLaterPrices({deposite:car.deposit,extraOptionsPrice,rentalPrice})

 

 


  return { totalAmount, form, onSubmit, pending ,setIsBusinessFn,payLater,payNow};
};
