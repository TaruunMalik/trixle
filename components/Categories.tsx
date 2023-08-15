"use client";
import React from "react";
import { Category } from "@prisma/client";
import { cn } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
import useWindowDimensions from "@/hooks/use-windowdimensions";
import { Button } from "./ui/button";
import qs from "query-string";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
interface CategoriesProps {
  data: Category[];
}

export default function Categories({ data }: CategoriesProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const categoryId = searchParams.get("categoryId");
  const { width, height } = useWindowDimensions();
  const handleUrl = (id: string | undefined) => {
    const query = { categoryId: id };
    const url = qs.stringifyUrl(
      {
        url: window.location.href,
        query,
      },
      { skipNull: true }
    );
    router.push(url);
  };
  return (
    <>
      {width && width > 1000 ? (
        <div className=" w-full overflow-x-auto space-x-2 flex p-1 gap-3 justify-center">
          <button
            onClick={() => handleUrl(undefined)}
            className={cn(
              "flex items-center text-center text-xs md:text-sm px-2 md:px-4 py-2 md:py-3 rounded-md bg-primary/10 hover:opacity-75 transition"
            )}
          >
            All
          </button>
          {data.map((item) => (
            <button
              onClick={() => handleUrl(item.id)}
              key={item.id}
              className={cn(
                "flex items-center text-center text-xs md:text-sm px-2 md:px-4 py-2 md:py-3 rounded-md bg-primary/10 hover:opacity-75 transition",
                categoryId === item.id ? "bg-primary/20" : " bg-primary/10"
              )}
            >
              {item.name}
            </button>
          ))}
        </div>
      ) : (
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Button>Categories</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem
              onClick={() => handleUrl(undefined)}
              className={cn(
                " text-center text-xs md:text-sm px-2 md:px-4 py-2 md:py-3 hover:opacity-75 transition"
              )}
            >
              All
            </DropdownMenuItem>
            {data.map((item) => (
              <DropdownMenuItem
                onClick={() => handleUrl(item.id)}
                key={item.id}
                className={cn(
                  " text-center text-xs md:text-sm px-2 md:px-4",
                  categoryId === item.id ? "bg-primary/20" : ""
                )}
              >
                {item.name}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </>
  );
}
