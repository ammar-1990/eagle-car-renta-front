'use server'

import { sendContactEmail } from "../SendGrid";


export const sendBookingMessage = async ({
    subject = "New Reservation",
    title,
    bookingID
  }: {
    subject: string;
    title: string;
    bookingID:string
  }) => {
  //eaglebookingreserve@gmail.com
  
    try {
      await sendContactEmail({
        subject: subject,
        to: "eaglebookingreserve@gmail.com",
        text: "New Reservation",
        html: `
        <strong>${title}</strong>
      <a href="https://superadmin.eaglerentalcar.com/bookings/${bookingID}">Please Check Bookings Table For More Details</a>
         <br/>  
          
         `,
      });
  
      return {success:true}
    } catch (error) {
      return {success:false}
    }
  
  };
  