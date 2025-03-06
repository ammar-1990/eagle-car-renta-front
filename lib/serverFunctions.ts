"use server";

import { DynamicData, sendContactEmail } from "../SendGrid";
import { formatDateUtc } from "./date";

export const sendBookingMessage = async ({
  subject = "New Reservation",
  title,
  dynamicData,
}: {
  subject: string;
  title: string;
  dynamicData: Partial<DynamicData>;
}) => {
  //eaglebookingreserve@gmail.com

  try {
    await sendContactEmail({
      subject: subject,
      to: "eaglebookingreserve@gmail.com",
      text: "New Reservation",
      html: `
        <strong>${title}</strong>
          <br/> 
            <br/> 
        BookingID:  <strong>${dynamicData.bookingID}</strong>
          <br/> 
        Client Name:  <strong>${dynamicData.fullName}</strong>
          <br/> 
        Client Email:  <strong>${dynamicData.email}</strong>
          <br/> 
        Car Name:<strong>${dynamicData.carName}</strong>
          <br/> 
        Start Date:  <strong>${formatDateUtc(
          new Date(dynamicData.startDate!)
        )}</strong>
          <br/> 
        End Date:  <strong>${formatDateUtc(
          new Date(dynamicData.endDate!)
        )}</strong>
          <br/> 
        Payment Method:  <strong>${dynamicData.paymentMethod}</strong>
          <br/> 
        Paid:  <strong>${dynamicData.paid}</strong>
          <br/> 
        Total Amount:  <strong>${dynamicData.totalAmount!}</strong>
          <br/> 
            <br/> 
      <a href="https://superadmin.eaglerentalcar.com/bookings/${
        dynamicData.bookingID
      }">Please Check Bookings Table For More Details</a>
         <br/>  
          
         `,
    });

    return { success: true };
  } catch (error) {
    return { success: false };
  }
};
