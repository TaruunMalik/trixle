"use client";
import React from "react";
import { Menu, Sparkles } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { UserButton } from "@clerk/nextjs";
import { Button } from "./ui/button";
import { ModeToggle } from "./ui/mode-toggle";
import MobileSidebar from "./mobile-sidebar";
import { Lora } from "next/font/google";
import { useModal } from "@/hooks/user-modal-subs";
const font = Lora({
  weight: "600",
  subsets: ["latin"],
});

interface NavbarProps {
  isPro?: boolean;
}

export default function Navbar({ isPro }: NavbarProps) {
  const proModal = useModal();

  return (
    <div className="fixed h-16 w-full z-100 flex justify-between items-center py-2 px-4 border-b border-primary/10 bg-background">
      <div className=" flex items-center">
        <MobileSidebar />
        <Link href="/">
          <h1
            className={cn(
              " hidden md:block text-xl md:text-3xl font-bold text-primary ",
              font.className
            )}
          >
            Trixle
          </h1>
        </Link>
      </div>
      <div className=" flex items-center gap-10">
        {!isPro ? (
          <Button variant="premium" onClick={proModal.onOpen}>
            Upgrade
            <Sparkles className=" h-6 w-6 fill-white text-white ml-1" />
          </Button>
        ) : (
          <Button
            className=" text-primary-foreground"
            variant="default"
            disabled={true}
          >
            On Premium
          </Button>
        )}
        <ModeToggle />
        <UserButton afterSignOutUrl="/" />
      </div>
    </div>
  );
}
