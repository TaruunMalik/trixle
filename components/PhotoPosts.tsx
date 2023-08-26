import React from "react";
import { Photo } from "@prisma/client";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { EditIcon } from "lucide-react";
import Link from "next/link";
import "../app/assets/PhotoPosts.css";
import { currentUser } from "@clerk/nextjs";
import { ArrowUpRightFromCircle } from "lucide-react";
import { Button } from "./ui/button";
import SearchInput from "./SearchInput";
interface PhotoPostsProps {
  data: Photo[];
}
interface GalleryProps {
  header: string;
}
interface CombinedProps extends PhotoPostsProps, GalleryProps {}
// const downloadImage = async (id, photo) => {};

export default async function PhotoPosts({ data, header }: CombinedProps) {
  const user = await currentUser();
  return (
    <>
      <div className=" m-7">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-5">
          {header}
        </h1>
        <SearchInput />
        <div className=" posts-container">
          {data.map((item) => (
            <div
              key={item.id}
              className=" group relative shadow-card  post-box"
            >
              <Link href={`/gallery/${item.id}`}>
                <ArrowUpRightFromCircle className=" absolute right-1 top-1 rounded-sm hidden group-hover:flex z-[3] cursor-pointer" />
              </Link>
              <Button className=" p-2 w-1/5 text-foreground hover:text-background bg-red-600 rounded-xl absolute left-1 top-1 group-hover:flex cursor-pointer hidden z-[2] ">
                Save
              </Button>
              <img
                // fill
                alt={item.caption}
                className=" rounded-lg object-cover post-img group-hover:opacity-50"
                src={item.src}
              />
              <div className="group-hover:flex overflow-y-auto flex-col max-h-[94.5%] hidden absolute bottom-0 left-0 right-0 bg-[#10131f] rounded-md m-2 p-4 text-white">
                {item.caption}
                <div className="mt-5 flex justify-between items-center gap-2 ">
                  <div className=" flex items-center gap-2 justify-center">
                    <Avatar>
                      <AvatarImage src={item.userProfile} />
                      <AvatarFallback>
                        {item.userName ? item.userName : "User"}
                      </AvatarFallback>
                    </Avatar>
                    <p className="text-white text-sm">
                      {item.userName ? item.userName : "User"}
                    </p>
                  </div>
                  <p className=" text-sm">
                    on - {item.createdAt.toLocaleDateString()}
                  </p>
                  {user?.id === item.userId ? (
                    <Link href={`/post/${item.id}`}>
                      <EditIcon />
                    </Link>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
