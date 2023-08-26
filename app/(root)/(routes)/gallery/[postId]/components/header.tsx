"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { LucideChevronLeft } from "lucide-react";
export default function PostHeader() {
  const router = useRouter();
  return (
    <div>
      <Button variant="default" onClick={() => router.back()}>
        <LucideChevronLeft />
      </Button>
    </div>
  );
}
