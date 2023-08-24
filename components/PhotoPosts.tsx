import React from "react";
import { Photo } from "@prisma/client";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
interface PhotoPostsProps {
  data: Photo[];
}

export default async function PhotoPosts({ data }: PhotoPostsProps) {
  return (
    <div className=" m-7">
      <div className=" grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {data.map((item) => (
          <div className=" group relative shadow-card rounded-lg w-80 h-64 ">
            <Image
              fill
              alt={item.caption}
              className=" rounded-lg object-cover"
              src={item.src}
            />
            <div className="group-hover:flex overflow-y-auto flex-col max-h-[94.5%] hidden absolute bottom-0 left-0 right-0 bg-[#10131f] rounded-md m-2 p-4 text-white">
              <h3>What is this about?</h3>
              {item.caption}
              <div className="mt-5 flex justify-between items-center gap-2 ">
                {/* <div className="flex items-center gap-2 "> */}
                <div className=" flex items-center gap-2 justify-center">
                  <Avatar>
                    <AvatarImage src={item.userProfile} />
                    <AvatarFallback>{item.userName}</AvatarFallback>
                  </Avatar>
                  <p className="text-white text-sm">{item.userName}</p>
                </div>
                <p className=" text-sm">
                  on - {item.createdAt.toLocaleDateString()}
                </p>
                {/* </div> */}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
