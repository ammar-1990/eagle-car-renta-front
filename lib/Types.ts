import { Booking, Car, Fuel } from "@prisma/client";
import { z } from "zod";

export const SEATS = [2, 5, 7, 8];
export const SEATS_CONST = [2, 5, 7, 8] as const;
export const SEATS_MAP: Record<(typeof SEATS_CONST)[number], string> = {
  "2": "2 Seats",
  "5": "5 Seats",
  "7": "7 Seats",
  "8": "8 Seats",
};

export const LOCATIONS = ["LOS_ANGELES", "LAS_VEGAS", "ORLANDO"];
export const LOCATIONS_CONST = ["LOS_ANGELES", "LAS_VEGAS", "ORLANDO"] as const;
export const LOCATIONS_MAP: Record<(typeof LOCATIONS_CONST)[number], string> = {
  LAS_VEGAS: "las vegas",
  LOS_ANGELES: "los angeles",
  ORLANDO: "orlando",
};
export type LocationType  = typeof LOCATIONS_CONST[number] 
export const FUEL = ["GASOLINE", "DIESEL", "ELECTRIC", "HYBRID"];
export const FUEL_CONST = ["GASOLINE", "DIESEL", "ELECTRIC", "HYBRID"] as const;
export const FUEL_MAP: Record<(typeof FUEL_CONST)[number], string> = {
  GASOLINE: "gasoline",
  DIESEL: "diesel",
  ELECTRIC: "electric",
  HYBRID: "hybrid",
};
export const PAYMENT_METHOD_CONST = ['CARD'] as const

export const PAYMENT_METHOD_MAP:Record<typeof PAYMENT_METHOD_CONST[number],string> = {
CARD:"Credit/Depit Card"
}

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

export const searchCarsSchema = z
  .object({
    pickUpLocation: z.enum(LOCATIONS_CONST, {
      message: "Invalid pick-up location",
    }),
    dropOffLocation: z
      .enum(LOCATIONS_CONST)
      .optional()  
      .or(z.literal("")), 
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
    seats: z
      .union([
        z.array(z.string()), // Array of strings (multiple seats)
        z.string(), // Single seat passed as string
      ])
      .optional(),
    fuel: z
      .union([
        z.array(
          z.nativeEnum(Fuel, { invalid_type_error: "Enter Valid Fuel Type" })
        ),
        z.nativeEnum(Fuel, { invalid_type_error: "Enter Valid Fuel Type" }),
      ])
      .optional(),
    carType: z.string().optional(),
    pageNumber: z.string(),
  })
  .refine(
    (data) => {
      const deliveryDateTime = new Date(
        `${data.deliveryDate}T${data.deliveryTime}`
      );
      const returnDateTime = new Date(`${data.returnDate}T${data.returnTime}`);
      return returnDateTime > deliveryDateTime;
    },
    { message: "Return date and time must be after delivery date and time",path:['deliveryDate'] }
  );

export const checkoutParamsSchema = z
  .object({
    slug: z.string().min(1, "Required"),
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
    pickupLocation:z.enum(LOCATIONS_CONST,{message:"Invalid Location"}),

    dropoffLocation:z.enum(LOCATIONS_CONST,{message:"Invalid Location"})
    .optional()  
    .or(z.literal(""))
  })
  .refine(
    (data) => {
      const deliveryDateTime = new Date(
        `${data.deliveryDate}T${data.deliveryTime}`
      );
      const returnDateTime = new Date(`${data.returnDate}T${data.returnTime}`);
      return returnDateTime > deliveryDateTime;
    },
    { message: "Return date and time must be after delivery date and time",path:['deliveryDate'] }
  );

// Export Type
export type SearchCarsParams = z.infer<typeof searchCarsSchema>;
export type CarsWithBookings = (Car & {
  bookings: { startDate: Date; endDate: Date }[];
  carType: { title: string };
})[];
export type CheckoutParams = z.infer<typeof checkoutParamsSchema>


//to pass to card card
export type CarCheckoutParams = {
  deliveryDate: string;
  deliveryTime: string;
  returnDate: string;
  returnTime: string;
  pickupLocation:LocationType
  dropoffLocation?:LocationType | undefined | ''
};

const numberSchema = z
  .string()
  .min(1, "Required")
  .refine((data) => /^[0-9.]*$/.test(data), { message: "Only Numbers" });
export const pricingSchema = z.object({
  hour: numberSchema,
  days: z.array(numberSchema).length(6, "Enter 6 Days"),
  week: numberSchema,
  month: numberSchema,
});

export const TAKE_CARS = 12;

export type StripeMetaData = {
  bookingId: string;
  bookingID:string,
  customerEmail: string;
  startDate: string;
  endDate: string;
  carTitle: string;
  payNow: number;
  payLater: number;
  totalAmount: number;
  durationDescription: string;
  [key: string]: any
}


export type BookingWithCarName = Booking & {car:{subTitle:string,carType:{title:string}}}