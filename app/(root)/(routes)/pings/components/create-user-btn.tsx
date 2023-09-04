"use client";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import prismadb from "@/lib/prismadb";
import { useUser } from "@clerk/nextjs";
import axios from "axios";
import { useRouter } from "next/navigation";
export default async function CreateUserBtn() {
  // const router = useRouter();
  const { user } = useUser();
  const initiateProfileHandler = async () => {
    try {
      const response = await axios.post("/api/pingcreateuser/" + `${user?.id}`);
      console.log(response);
      // router.refresh();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <Button onClick={initiateProfileHandler} className=" font-bold">
        Initiate Profile for {user?.firstName}
      </Button>
    </div>
  );
}
