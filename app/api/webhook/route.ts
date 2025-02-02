import Stripe from "stripe";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

import { stripe } from "@/lib/stripe";
import prisma from "@/lib/prisma";
import { StripeMetaData } from "@/lib/Types";
import sendEmail from "@/SendGrid";
import { formatInTimeZone } from "date-fns-tz";
 

export async function POST(req: Request) {
  console.log("webhook");
  const body = await req.text();

  const headersData = await headers()
  const signature = headersData.get("Stripe-Signature") as string;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK!
    );
  } catch (error: any) {
    console.error(error);
    return new NextResponse(`Webhook Error: ${error.message}`, { status: 400 });
  }

  const session = event.data.object as Stripe.Checkout.Session;
  const metaData = session.metadata as StripeMetaData

  switch (event.type) {
    //checkout completed
    case "checkout.session.completed": {
      try {
        if (session.payment_status === "paid") {
          const order = await prisma.booking.update({
            where: {
              id: metaData.bookingId,
            },
            data: {
              status: "PAID",
            },
          
          });

          const emailRes = await sendEmail({
            to: "ammar.ali.haidar.1990@gmail.com",
            subject: "Booking Confirmation",
            text: "text paid",
            html: "html paid",
            template:true,
            dynamicData:{
              bookingDate:formatInTimeZone(
                new Date(order.createdAt),
                "UTC",
                "MMM, dd yyyy - HH:mm"
              ),
              bookingID:order.bookingID,
              carName:metaData.carTitle,
              email:order.email,
              endDate:formatInTimeZone(
                new Date(order.endDate),
                "UTC",
                "MMM, dd yyyy - HH:mm"
              ),
              fullName:`${order.firstName} ${order.middleName} ${order.lastName}`,
              paid:`$${order.payNow.toFixed(2)}`,
              paymentMethod:order.paymentMethod,
              startDate:formatInTimeZone(
                new Date(order.startDate),
                "UTC",
                "MMM, dd yyyy - HH:mm"
              ),
              totalAmount:`$${order.totalAmount.toFixed(2)}`
            }
          });
      
          if(!emailRes.success){
            console.error(emailRes.error)
          }
       
        }
      } catch (error) {
        console.error(error);
      }

      break;
    }
    //checkout expired
    case "checkout.session.expired": {
      try {
        const order = await prisma.booking.update({
          where: {
            id: metaData.bookingId,
          },
          data: {
            status: "CANCELLED",
          
          },
      
        });
        // const emailRes = await sendEmail({
        //   to: "ammar.ali.haidar.1990@gmail.com",
        //   subject: "test",
        //   text: "text expired",
        //   html: "html expired",
        // });
        // if(!emailRes.success){
        //   console.error(emailRes.error)
        // }
     
      } catch (error) {
        console.error(error);
      }

      break;
    }
 

    default:
  }

  return new NextResponse(null, { status: 200 });
}
