import React from "react";
import Navbar from "@/components/Navbar";
import { checkSubscription } from "@/lib/subscription";

interface NavbarProps {
  isPro: boolean;
}

export default async function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isPro = await checkSubscription();
  return (
    <div className=" flex flex-col">
      <Navbar isPro={isPro} />
      <div className=" mx-auto max-w-4xl w-full h-full mt-14 ">
        <main>{children}</main>
      </div>
    </div>
  );
}
