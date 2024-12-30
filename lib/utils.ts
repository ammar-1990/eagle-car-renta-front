import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import CustomError from "./CustomError";
import { toast } from "sonner";
import { cache } from "react";
import prisma from "./prisma";

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