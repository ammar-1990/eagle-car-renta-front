import { Car } from "@prisma/client";
import { z } from "zod";

export const LOCATIONS = ["LOS_ANGELES", "LAS_VEGAS", "ORLANDO"];
export const LOCATIONS_CONST = ["LOS_ANGELES", "LAS_VEGAS", "ORLANDO"] as const;
export const LOCATIONS_MAP: Record<(typeof LOCATIONS_CONST)[number], string> = {
  LAS_VEGAS: "las vegas",
  LOS_ANGELES: "los angeles",
  ORLANDO: "orlando",
};

export type PricingType = {
  hour: string;
  days: string[];
  week: string;
  month: string;
};

// Default values
export const DEFAULT_LOCATION = "LAS_VEGAS";
export const DEFAULT_TIME = "12:00";

// Calculate default dates
export const tomorrow = new Date();
tomorrow.setDate(tomorrow.getDate() + 1);
export const afterTomorrow = new Date();
afterTomorrow.setDate(afterTomorrow.getDate() + 2);



export const searchCarsSchema = z.object({
  pickUpLocation: z.enum(LOCATIONS_CONST, { message: "Invalid pick-up location" }),
  dropOffLocation: z
    .enum(LOCATIONS_CONST)
    .optional() // Allow undefined or missing dropOffLocation
    .or(z.literal("")), // Also allow an empty string if applicable
  deliveryDate: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: "Invalid delivery date format",
  }),
  deliveryTime: z.string().regex(/^([0-1]\d|2[0-3]):([0-5]\d)$/, {
    message: "Invalid delivery time format (HH:mm)",
  }),
  returnDate: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: "Invalid return date format",
  }),
  returnTime: z.string().regex(/^([0-1]\d|2[0-3]):([0-5]\d)$/, {
    message: "Invalid return time format (HH:mm)",
  }),
}) .refine((data) => {
  const deliveryDateTime = new Date(
    `${data.deliveryDate}T${data.deliveryTime}`
  );
  const returnDateTime = new Date(
    `${data.returnDate}T${data.returnTime}`
  );
  return returnDateTime > deliveryDateTime;
}, { message: "Return date and time must be after delivery date and time" })

;

// Export Type
export type SearchCarsParams = z.infer<typeof searchCarsSchema>;
export type CarsWithBookings = (Car & {bookings:{startDate:Date,endDate:Date}[],carType:{title:string}})[]
