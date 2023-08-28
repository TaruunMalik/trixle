import React, { Suspense } from "react";
import PhotoPosts from "@/components/PhotoPosts";
import prismadb from "@/lib/prismadb";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import Loading from "../../loading";
interface ProfilePageProps {
  params: { profileId: string };
}

export default async function ProfilePage({ params }: ProfilePageProps) {
  const selectedUserPosts = await prismadb.photo.findMany({
    where: {
      userId: params.profileId,
    },
  });
  const user = selectedUserPosts[0];
  return (
    <Suspense fallback={<Loading />}>
      <div className=" h-full m-2">
        <div className="relative w-full flex items-center flex-col h-3/5 gap-5 mb-[-3rem] ">
          <div className="relative w-full flex justify-center items-center flex-col mb-5 ">
            <img
              src={user.userBackground}
              className=" absolute w-full md:w-3/4 lg:w-1/3 sm:w-3/4 top-0 rounded-b-xl h-[300px] object-cover"
              alt="Background Image"
            />
          </div>
          <Image
            src={user.userProfile}
            height={200}
            width={200}
            alt="Profile Image"
            className=" rounded-[50%] z-[5] mt-20"
          />
          <h2 className="scroll-m-20 text-xl font-bold tracking-tight lg:text-2xl mt-[-5px] text-center ">
            {user.userName}
          </h2>
        </div>
        <Separator className=" mt-3" />
        <PhotoPosts
          data={selectedUserPosts}
          header={`All of ${user.userName}'s posts`}
        />
      </div>
    </Suspense>
  );
}
