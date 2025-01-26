'use client'


import { useEffect } from "react";
import { Crisp } from "crisp-sdk-web";

const CrispChat = () => {
  useEffect(() => {
    Crisp.configure("1a711dba-5b32-4547-8f31-1aada7e11897");
  });

  return null;
}

export default CrispChat;