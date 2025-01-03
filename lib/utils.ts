import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import CustomError from "./CustomError";
import { toast } from "sonner";
import { cache } from "react";
import prisma from "./prisma";
import { afterTomorrow, DEFAULT_LOCATION, DEFAULT_TIME, SearchCarsParams, tomorrow } from "./Types";
import { convertDateToISOString } from "./date";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export const wait = async (time: number = 1500) =>
  new Promise((r) => setTimeout(r, time));





export const throwCustomError = (message: string): never => {
  throw new CustomError(message);
};

export const errorToast = (message:string = "Something went wrong")=>toast.error(message)

export function generateTimeSlots(interval: number = 30): string[] {
  const times: string[] = [];
  for (let hour = 0; hour < 24; hour++) {
    for (let minute = 0; minute < 60; minute += interval) {
      const time = `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`;
      times.push(time);
    }
  }
  return times;
}


export const getBlog = cache(async(slug:string)=>{
  const blog = await prisma.blog.findUnique({
    where:{
        slug:slug
    },
    include:{
        category:{
            select:{
                title:true
            }
        }
    }
})

return blog
})


 export const prepareCarsSearchParams = (params:SearchCarsParams)=>{
  const pickUpLocation = params.pickUpLocation ?? DEFAULT_LOCATION
  const deliveryDate = params.deliveryDate ?? convertDateToISOString(tomorrow) 
  const deliveryTime = params.deliveryTime ?? DEFAULT_TIME
  const returnDate = params.returnDate ?? convertDateToISOString(afterTomorrow)
  const returnTime = params.returnTime ?? DEFAULT_TIME


  return {
    ...params,pickUpLocation,deliveryDate,deliveryTime,returnDate,returnTime
  }
 }


 export function combineDateAndTimeToUTC(
  dateString: string,
  timeString: string
) {
  // Combine the date and time strings
  const combinedDateTimeString = `${dateString}T${timeString}:00.000Z`;

  // Create a Date object from the combined string
  const utcDate = new Date(combinedDateTimeString);

  return utcDate;
}