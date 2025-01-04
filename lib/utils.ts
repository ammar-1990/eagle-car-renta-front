import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import CustomError from "./CustomError";
import { toast } from "sonner";
import { cache } from "react";
import prisma from "./prisma";
import { afterTomorrow, DEFAULT_LOCATION, DEFAULT_TIME, PricingType, SearchCarsParams, tomorrow } from "./Types";
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


export function calculateDuration(startDate: Date, endDate: Date) {
  const msInHour = 1000 * 60 * 60;
  const msInDay = msInHour * 24;
  const msInWeek = msInDay * 7;

  let diff = endDate.getTime() - startDate.getTime();

  const months = Math.floor(diff / (30 * msInDay));
  diff -= months * (30 * msInDay);  // Subtract months

  const weeks = Math.floor(diff / msInWeek);
  diff -= weeks * msInWeek;  // Subtract weeks

  const days = Math.floor(diff / msInDay);
  diff -= days * msInDay;  // Subtract days

  const hours = Math.floor(diff / msInHour);

  return {
    months,
    weeks,
    days,
    hours,
  };
}


export function calculateTotalPrice(duration: ReturnType<typeof calculateDuration>, pricing: PricingType) {
  const { months, weeks, days, hours } = duration;

  // Convert pricing strings to numbers
  const hourRate = parseFloat(pricing.hour);
  const weekRate = parseFloat(pricing.week);
  const monthRate = parseFloat(pricing.month);
  const dayRates = pricing.days.map((d) => parseFloat(d));

  let total = 0;

  // Calculate price for months
  total += months * monthRate;

  // Calculate price for weeks
  total += weeks * weekRate;

  // Calculate price for days
  for (let i = 0; i < days; i++) {
    total += i < dayRates.length ? dayRates[i] : dayRates[dayRates.length - 1];
  }

  // Calculate price for hours 
  total += hours * hourRate;
  return total;
}


export function formatDuration(duration: ReturnType<typeof calculateDuration>): string {
  const { months, weeks, days, hours } = duration;

  const parts = [];

  if (months > 0) parts.push(`${months} month${months > 1 ? 's' : ''}`);
  if (weeks > 0) parts.push(`${weeks} week${weeks > 1 ? 's' : ''}`);
  if (days > 0) parts.push(`${days} day${days > 1 ? 's' : ''}`);
  if (hours > 0) parts.push(`${hours} hour${hours > 1 ? 's' : ''}`);

  return parts.length > 0 ? parts.join(", ") : "Less than an hour";
}