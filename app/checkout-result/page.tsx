import React from "react";

type Props = {
  searchParams: Promise<{
    bookingCode: string | undefined;
    canceled: string | undefined;
  }>;
};

const CheckoutResultPage = async ({ searchParams }: Props) => {
  const { bookingCode, canceled } = await searchParams;
  return (
    <div className="min-h-screen flex items-center justify-center">
      {bookingCode && (
        <div className="px-40 py-20 bg-green-100 border-green-500 text-green-500 rounded-lg">
          <p>Successfully Booked</p>
          <p>Your Booking ID is {bookingCode}</p>
        </div>
      )}
      {canceled && (
        <div className="px-40 py-20 bg-red-100 border-red-500 text-red-500 rounded-lg">
          <p>Booking Has Been Canceled!</p>
          
        </div>
      )}
    </div>
  );
};

export default CheckoutResultPage;
