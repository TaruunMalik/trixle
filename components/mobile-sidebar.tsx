import React from "react";
import { Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Sidebar from "./Sidebar";
import { Lora } from "next/font/google";
const font = Lora({
  weight: "600",
  subsets: ["latin"],
});

interface MobileSidebarProps {
  isPro: boolean;
}

export default function MobileSidebar({ isPro }: MobileSidebarProps) {
  return (
    <Sheet>
      <SheetTrigger className=" md:hidden pr-4">
        <Menu />
      </SheetTrigger>
      <SheetContent
        side="left"
        className=" p-0 text-center bg-secondary pt-10 w-32"
      >
        <span className={font.className}>Trixle</span>
        <Sidebar isPro={isPro} />
      </SheetContent>
    </Sheet>
  );
}
