"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
export default function BackBtn() {
  const router = useRouter();
  return (
    <div className=" flex gap-3 m-3 items-center">
      <Button onClick={() => router.back()}>
        <ArrowLeft />
      </Button>
      <p className=" font-semib2old">Ping</p>
    </div>
  );
}
