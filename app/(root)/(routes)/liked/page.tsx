import React from "react";
import { Heart } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import PhotoPosts from "@/components/PhotoPosts";
import prismadb from "@/lib/prismadb";
import { currentUser } from "@clerk/nextjs";
export default async function LikedPosts() {
  const user = await currentUser();
  const data = await prismadb.photo.findMany({
    orderBy: {
      createdAt: "desc",
    },
    where: {
      isLiked: true,
      likedByUserId: user?.id,
    },
  });
  return (
    <div className="">
      <h1 className="scroll-m-20 m-7 text-4xl font-extrabold tracking-tight lg:text-5xl mb-5 flex gap-3 items-center">
        <Heart /> Liked Posts <Heart />
      </h1>
      <PhotoPosts header="" data={data} />
    </div>
  );
}
