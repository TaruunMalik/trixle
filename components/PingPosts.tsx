"use client";

import React, { useState } from "react";
import Env from "@/lib/env";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import Link from "next/link";
import { MessageCircle } from "lucide-react";
import { Heart, Share } from "lucide-react";
import { formateDate } from "@/lib/dateCheck";
import Image from "next/image";

export const dummyData = [
  {
    id: 1,
    img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGVyc29ufGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60",
    name: "Taruun",
    imgPost:
      "https://images.unsplash.com/photo-1693825383079-32a0b83a442b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw3fHx8ZW58MHx8fHx8&auto=format&fit=crop&w=500&q=60",
    createdAt: "2023-03-25",
  },
  {
    id: 2,
    img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGVyc29ufGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60",
    name: "Rishu",
    imgPost:
      "https://images.unsplash.com/photo-1693825383079-32a0b83a442b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw3fHx8ZW58MHx8fHx8&auto=format&fit=crop&w=500&q=60",

    createdAt: "2023-03-25",
  },
  {
    id: 3,
    img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGVyc29ufGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60",
    name: "Arpit Bala",
    imgPost:
      "https://images.unsplash.com/photo-1693825383079-32a0b83a442b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw3fHx8ZW58MHx8fHx8&auto=format&fit=crop&w=500&q=60",

    createdAt: "2023-03-25",
  },
  {
    id: 4,
    img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGVyc29ufGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60",
    name: "Dank",
    imgPost:
      "https://images.unsplash.com/photo-1693825383079-32a0b83a442b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw3fHx8ZW58MHx8fHx8&auto=format&fit=crop&w=500&q=60",

    createdAt: "2023-03-25",
  },
  {
    id: 5,
    img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGVyc29ufGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60",
    name: "Triggered",
    imgPost:
      "https://images.unsplash.com/photo-1693825383079-32a0b83a442b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw3fHx8ZW58MHx8fHx8&auto=format&fit=crop&w=500&q=60",

    createdAt: "2023-03-25",
  },
];

export default function PostCard() {
  const [isLiked, setIsLiked] = useState<string>("");
  const date = new Date();
  return (
    <div className="w-full mt-2 flex-col flex justify-center items-center">
      {dummyData.map((data) => (
        <div
          className=" flex flex-col p-2 w-full mb-2 md:w-1/2 bg-foreground/10 rounded-lg "
          key={data.id}
        >
          <div className="flex items-center">
            <div>
              <Avatar>
                <AvatarImage src={data.img} className=" object-cover" />
                <AvatarFallback>{data.name}</AvatarFallback>
              </Avatar>
            </div>
            <div className="flex ml-2 justify-between items-start w-full">
              <p className="font-semibold">{data.name}</p>

              <div className="flex">
                <span className="mr-4 text-sm">
                  {formateDate("2023-08-30")}
                </span>
              </div>
            </div>
          </div>
          <div className=" flex overflow-auto justify-center">
            <Image src={data.imgPost} width={400} height={200} alt="noo" />
          </div>
          <div className=" mb-2">
            <div className="mt-5 flex items-center gap-5 bg-background p-2 justify-center">
              {/* <svg
                width="20"
                height="20"
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-red-500 cursor-pointer"
              >
                <path
                  d="M1.35248 4.90532C1.35248 2.94498 2.936 1.35248 4.89346 1.35248C6.25769 1.35248 6.86058 1.92336 7.50002 2.93545C8.13946 1.92336 8.74235 1.35248 10.1066 1.35248C12.064 1.35248 13.6476 2.94498 13.6476 4.90532C13.6476 6.74041 12.6013 8.50508 11.4008 9.96927C10.2636 11.3562 8.92194 12.5508 8.00601 13.3664C7.94645 13.4194 7.88869 13.4709 7.83291 13.5206C7.64324 13.6899 7.3568 13.6899 7.16713 13.5206C7.11135 13.4709 7.05359 13.4194 6.99403 13.3664C6.0781 12.5508 4.73641 11.3562 3.59926 9.96927C2.39872 8.50508 1.35248 6.74041 1.35248 4.90532Z"
                  fill="currentColor"
                  fillRule="evenodd"
                  clipRule="evenodd"
                ></path>
              </svg> */}
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
