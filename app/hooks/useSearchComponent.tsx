import { LOCATIONS, LOCATIONS_CONST, LOCATIONS_MAP } from "@/lib/Types";
import { generateTimeSlots } from "@/lib/utils";
import { useState } from "react";

export const useSearchComponent = () => {
  const [pickupLocation, setPickupLocation] = useState<string | null>("");
  const [dropOffLocation, setDropOffLocation] = useState<string | null>("");

  const [deliveryDate, setDeliveryDate] = useState("");
  const [deliveryTime, setDeliveryTime] = useState("");

  const [returnDate, setReturnDate] = useState("");
  const [returnTime, setReturnTime] = useState("");

  const [isDropOff, setIsDropOff] = useState(false)


  const locations = LOCATIONS_CONST.map(location=>({
    value:location,
    label:LOCATIONS_MAP[location]
  }))


  const hours = generateTimeSlots(30)

  return {
    deliveryDate,
    deliveryTime,
    dropOffLocation,
    pickupLocation,
    returnDate,
    returnTime,
    setPickupLocation,
    setDropOffLocation,
    setDeliveryDate,
    setDeliveryTime,
    setReturnDate,
    setReturnTime,
    isDropOff,
    setIsDropOff,
    locations,
    hours
  };
};
