"use client";
import { LOCATIONS, LOCATIONS_CONST, LOCATIONS_MAP } from "@/lib/Types";
import { generateTimeSlots, wait } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState, useTransition } from "react";

export const useSearchComponent = () => {
  const searchParams = useSearchParams();
  const [pickUpLocation, setPickUpLocation] = useState<string | null>(
    searchParams.get("pickUpLocation") ?? ""
  );
  const [dropOffLocation, setDropOffLocation] = useState<string | null>(
    searchParams.get("dropOffLocation") ?? ""
  );

  const [deliveryDate, setDeliveryDate] = useState(
    searchParams.get("deliveryDate") ?? ""
  );
  const [deliveryTime, setDeliveryTime] = useState(
    searchParams.get("deliveryTime") ?? ""
  );

  const [returnDate, setReturnDate] = useState(
    searchParams.get("returnDate") ?? ""
  );
  const [returnTime, setReturnTime] = useState(
    searchParams.get("returnTime") ?? ""
  );

  const [isDropOff, setIsDropOff] = useState<boolean>(!!(searchParams.get("isDropOff") && searchParams.get("isDropOff")==='true'));

  const [pending, startTransition] = useTransition();
  const router = useRouter();

  const locations = useMemo(
    () =>
      LOCATIONS_CONST.map((location) => ({
        value: location,
        label: LOCATIONS_MAP[location],
      })),
    []
  );

  const hours = useMemo(() => generateTimeSlots(30), []);

  useEffect(() => {
    setPickUpLocation(searchParams.get("pickUpLocation") ?? "");
    setDropOffLocation(searchParams.get("dropOffLocation") ?? "");
    setDeliveryDate(searchParams.get("deliveryDate") ?? "");
    setDeliveryTime(searchParams.get("deliveryTime") ?? "");
    setReturnDate(searchParams.get("returnDate") ?? "");
    setReturnTime(searchParams.get("returnTime") ?? "");
    setIsDropOff(!!(searchParams.get("isDropOff") && searchParams.get("isDropOff")==='true'));
    console.log('IS_DROP_OFF',isDropOff)
  }, [searchParams]);

  const handlePush = () => {
    startTransition(async() => {
      const params = new URLSearchParams(); // Create query string

      // Add params only if they exist
      if (pickUpLocation) params.set("pickUpLocation", pickUpLocation);
      if (dropOffLocation) params.set("dropOffLocation", dropOffLocation);
      if (deliveryDate) params.set("deliveryDate", deliveryDate);
      if (deliveryTime) params.set("deliveryTime", deliveryTime);
      if (returnDate) params.set("returnDate", returnDate);
      if (returnTime) params.set("returnTime", returnTime);
      if (isDropOff) params.set("isDropOff", "true");

      // Push updated URL
      const url = `/cars?${params.toString()}`;
      router.push(url, { scroll: false }); // No page reload
    });
  };

  return {
    deliveryDate,
    deliveryTime,
    dropOffLocation,
    pickUpLocation,
    returnDate,
    returnTime,
    setPickUpLocation,
    setDropOffLocation,
    setDeliveryDate,
    setDeliveryTime,
    setReturnDate,
    setReturnTime,
    isDropOff,
    setIsDropOff,
    locations,
    hours,
    handlePush,
    pending,
  };
};
