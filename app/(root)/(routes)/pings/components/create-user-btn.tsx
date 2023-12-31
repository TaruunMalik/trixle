"use client";
import { Button } from "@/components/ui/button";
import React from "react";
import prismadb from "@/lib/prismadb";
import { currentUser, useUser } from "@clerk/nextjs";
import axios from "axios";
import { useRouter } from "next/navigation";
export default function CreateUserBtn() {
  const router = useRouter();
  const { user } = useUser();
  const initiateProfileHandler = async () => {
    try {
      const response = await axios.post("/api/pingcreateuser/" + `${user?.id}`);
      console.log(response);
      router.refresh();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <Button onClick={initiateProfileHandler} className=" font-bold">
        Initiate for {user?.firstName}
      </Button>
    </div>
  );
}
