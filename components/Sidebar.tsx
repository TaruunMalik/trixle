"use client";
import React from "react";
import { Home, Plus, Settings } from "lucide-react";
import { Image } from "lucide-react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useModal } from "@/hooks/user-modal-subs";
interface SidebarProps {
  isPro: boolean;
}

export default function Sidebar({ isPro }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const proModal = useModal();

  const routes = [
    {
      id: 1,
      icon: Home,
      href: "/",
      isprotected: false,
      label: "Home",
    },
    {
      id: 2,
      icon: Image,
      href: "/gallery",
      isprotected: true,
      label: "Gallery",
    },
    {
      id: 3,
      icon: Plus,
      href: "/ai/new",
      isprotected: true,
      label: "Create New Bot",
    },
    {
      id: 4,
      icon: Plus,
      href: "/post/new",
      isprotected: true,
      label: "Create New Post",
    },
    {
      id: 5,
      icon: Settings,
      href: "/settings",
      isprotected: false,
      label: "Settings",
    },
  ];

  const onNavigate = (url: string, isprotected: boolean) => {
    if (isprotected && !isPro) {
      return proModal.onOpen();
    }
    return router.push(url);
  };

  return (
    <div className=" space-y-4 flex flex-col h-full text-primary bg-background border-r-2 border-r-border ">
      <div className=" p-3 flex-1 flex justify-center">
        <div className=" space-y-2">
          {routes.map((route) => (
            <div
              key={route.id}
              onClick={() => onNavigate(route.href, route.isprotected)}
              className={cn(
                "text-muted-foreground text-xs group flex p-3 w-full justify-start items-center  font-medium cursor-pointer hover:text-primary hover:bg-primary/10 rounded-lg transition",
                pathname === route.href && "bg-primary/10 text-primary"
              )}
            >
              <div className=" flex flex-col gap-y-2 items-center text-center flex-1">
                <route.icon className=" h-5 w-5" />
                {route.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
