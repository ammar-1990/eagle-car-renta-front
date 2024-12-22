"use client";
import { LOCATIONS_CONST, LOCATIONS_MAP } from "@/lib/Types";
import { generateTimeSlots } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState, useTransition } from "react";

export const useSearchComponent = () => {
  // Hooks
  const searchParams = useSearchParams();
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  // Utility function to fetch query params
  const getQueryParam = (key: string) => searchParams.get(key) ?? "";

  // States initialized from query params
  const [pickUpLocation, setPickUpLocation] = useState(getQueryParam("pickUpLocation"));
  const [dropOffLocation, setDropOffLocation] = useState(getQueryParam("dropOffLocation"));
  const [deliveryDate, setDeliveryDate] = useState(getQueryParam("deliveryDate"));
  const [deliveryTime, setDeliveryTime] = useState(getQueryParam("deliveryTime"));
  const [returnDate, setReturnDate] = useState(getQueryParam("returnDate"));
  const [returnTime, setReturnTime] = useState(getQueryParam("returnTime"));
  const [isDropOff, setIsDropOff] = useState(getQueryParam("isDropOff") === "true");

  // Memoized values
  const locations = useMemo(() =>
    LOCATIONS_CONST.map((location) => ({
      value: location,
      label: LOCATIONS_MAP[location],
    })), []
  );

  const hours = useMemo(() => generateTimeSlots(30), []);

  // Sync state with URL when query params change
  useEffect(() => {
    setPickUpLocation(getQueryParam("pickUpLocation"));
    setDropOffLocation(getQueryParam("dropOffLocation"));
    setDeliveryDate(getQueryParam("deliveryDate"));
    setDeliveryTime(getQueryParam("deliveryTime"));
    setReturnDate(getQueryParam("returnDate"));
    setReturnTime(getQueryParam("returnTime"));
    setIsDropOff(getQueryParam("isDropOff") === "true");
  }, [searchParams]);

  // Push query params to URL only if changes are detected
  const handlePush = () => {
    const params = new URLSearchParams(searchParams); // Get current params

    // Create queryParams object based on state
    const queryParams = {
      pickUpLocation,
      dropOffLocation,
      deliveryDate,
      deliveryTime,
      returnDate,
      returnTime,
      isDropOff: isDropOff ? "true" : null, // Convert boolean to string
    };

    // Check if any changes have been made
    let hasChanges = false;
    Object.entries(queryParams).forEach(([key, value]) => {
      const currentValue = params.get(key); // Current value in URL
      if ((value && value !== currentValue) || (!value && currentValue)) {
        hasChanges = true; // Change detected
      }
    });

    if (!hasChanges) {
      console.log('No Change')
      return
    }; // Exit early if no changes

    // Update query params
    Object.entries(queryParams).forEach(([key, value]) => {
      if (value) {
        params.set(key, value.toString()); // Set new value
      } else {
        params.delete(key); // Remove param if null
      }
    });
    startTransition(() => {
      // Push updated URL
      router.push(`/cars?${params.toString()}`, { scroll: false });
    });
  };

  // Reset Filters
  const resetFilters = () => {
    setPickUpLocation("");
    setDropOffLocation("");
    setDeliveryDate("");
    setDeliveryTime("");
    setReturnDate("");
    setReturnTime("");
    setIsDropOff(false);
    router.push("/cars", { scroll: false }); // Clear all query params
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
    resetFilters,
    pending,
  };
};
