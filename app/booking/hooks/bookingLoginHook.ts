"use client";
import { z } from "zod";
import { useState, useTransition } from "react";
import { wait } from "@/lib/utils";

export const useBookingLogin = () => {
  const loginSchema = z.object({
    bookingCode: z
      .string({ invalid_type_error: "Required" })
      .min(8, { message: "At least 8 characters" }),
    email: z.string().email({ message: "Enter Valid E-mail Address" }),
  });

  const [pending, startTransition] = useTransition();

  const [bookingCode, setBookingCode] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState<
    | {
        [key: string]: string;
      }
    | undefined
  >(undefined);

  const [loggedIn, setLoggedIn] = useState(false);

  const setBookingCodeFn = (value: string) => {
    setError(undefined);
    setBookingCode(value);
  };
  const setEmailFn = (value: string) => {
    setError(undefined);
    setEmail(value);
  };

  const handleLogin = async (values: unknown) => {
    const validData = loginSchema.safeParse(values);
    if (!validData.success) {
      const formattedErrors: { [key: string]: string } = {};
      validData.error.issues.forEach((issue) => {
        const field = issue.path[0];
        formattedErrors[field] = issue.message;
      });

      // Update error state
      setError(formattedErrors);
      return;
    }
    startTransition(async () => {
      try {
        await wait();
        setLoggedIn(true);
      } catch (error) {}
    });
  };


  const setLoggedInFn = ()=>{
    setEmail('')
    setBookingCode('')
    setLoggedIn(false)
}

  return {
    bookingCode,
    email,
    setBookingCodeFn,
    setEmailFn,
    error,
    pending,
    handleLogin,
    loggedIn,
    setLoggedInFn
  };
};
