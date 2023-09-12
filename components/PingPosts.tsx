import React from "react";
import Env from "@/lib/env";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import Link from "next/link";
import { MessageCircle } from "lucide-react";
import { Heart, Share } from "lucide-react";
import { formateDate } from "@/lib/dateCheck";
import prismadb from "@/lib/prismadb";
import Image from "next/image";

export default async function PostCard() {
  const realdata = await prismadb.post.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
  return (
    <div className="w-full mt-2 flex-col flex justify-center items-center">
      {realdata.map((data) => (
        <div
          className=" flex flex-col p-2 w-full mb-2 md:w-1/2 bg-foreground/10 rounded-lg "
          key={data.id}
        >
          <div className="flex items-center">
            <div>
              <Avatar>
                <AvatarImage
                  src={data.userProfileImg}
                  className=" object-cover"
                />
                <AvatarFallback>{data.username}</AvatarFallback>
              </Avatar>
            </div>
            <div className="flex ml-2 justify-between items-start w-full">
              <Link href={`/pings/${data.userId}`}>
                <p className="font-semibold">@{data.username.toLowerCase()}</p>
              </Link>

              <div className="flex">
                <span className="mr-4 text-sm">
                  {formateDate(data.createdAt.toISOString())}
                </span>
              </div>
            </div>
          </div>
          <Link href={`pings/ping/${data.id}`}>
            <div className=" flex overflow-auto p-2 text-left bg-background rounded-md m-2">
              <p>{data.content}</p>
            </div>
          </Link>
          {data.image && (
            <div className=" flex overflow-auto justify-center">
              <Image src={data.image} width={400} height={200} alt="noo" />
            </div>
          )}
          <div className=" mb-2">
            <div className="mt-5 flex items-center gap-5 bg-background p-2 justify-center">
              <Share className="cursor-pointer" />
              <MessageCircle className="cursor-pointer" />
              <Heart className="cursor-pointer" />
            </div>
            <div className="mt-2 flex justify-center gap-5">
              <span className="font-light">2 Replies</span>
              <span className="font-light flex gap-2">
                <Heart /> 10 Likes
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
