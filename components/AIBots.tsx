import React from "react";
import { AI } from "@prisma/client";
import Image from "next/image";
import { currentUser } from "@clerk/nextjs";
import { Edit2Icon, Edit3Icon } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Link from "next/link";
import { Separator } from "./ui/separator";
interface AIBotsProps {
  data: AI[];
}

export default async function AIBots({ data }: AIBotsProps) {
  const user = await currentUser();
  if (data.length === 0) {
    return (
      <div className="  pt-10 flex flex-col items-center justify-center space-y-3">
        <div className=" relative ">
          <Image src="/404notFound.png" alt="Empty" width={400} height={400} />
        </div>
      </div>
    );
  }
  return (
    <div className=" grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
      {data.map((item) => (
        <Card
          key={item.id}
          className=" bg-card text-card-foreground border-2 border-border rounded-xl cursor-pointer hover:opacity-75 transition"
        >
          <Link href={`/chat/${item.id}`}>
            <CardHeader className=" flex items-center justify-center flex-col">
              <div className=" relative w-32 h-32">
                <Image
                  src={item.src}
                  fill
                  alt={item.name}
                  className=" rounded-xl object-cover "
                />
              </div>
              <span className=" font-bold tracking-wide  ">{item.name}</span>
              <Separator />
            </CardHeader>
            <CardDescription className=" text-center text-card-foreground mb-5 px-2">
              {item.description}
            </CardDescription>
          </Link>
          <CardFooter className=" flex items-center justify-between text-sm ">
            <p> by- {item.userName}</p>
            {item.userId === user?.id ? (
              <Link href={`/ai/${item.id}`}>
                <Edit3Icon size={20} />
              </Link>
            ) : (
              ""
            )}
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
