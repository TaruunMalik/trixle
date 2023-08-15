import React from "react";
import Navbar from "@/components/Navbar";
export default function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className=" flex flex-col">
      <Navbar />
      <div className=" mx-auto max-w-4xl w-full h-full mt-14 ">
        <main>{children}</main>
      </div>
    </div>
  );
}
