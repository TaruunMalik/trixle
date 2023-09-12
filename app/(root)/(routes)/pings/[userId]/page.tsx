import React from "react";
import prismadb from "@/lib/prismadb";
import { Suspense } from "react";
import Loading from "../../loading";
import Image from "next/image";
import EditUser from "./components/edit-user";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { MessageCircle } from "lucide-react";
import { Heart, Share } from "lucide-react";
import { currentUser } from "@clerk/nextjs";
import { formateDate } from "@/lib/dateCheck";
interface UserPageProps {
  params: { userId: string };
}
export default async function UserPage({ params }: UserPageProps) {
  const user = await currentUser();
  const userData = await prismadb.users.findUnique({
    where: {
      id: params.userId,
    },
  });
  const userPings = await prismadb.post.findMany({
    where: {
      userId: params.userId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  const dynamicBackgroundStyle = {
    backgroundImage: `url('${userData?.userBackground}')`,
  };

  const defaultBackgroundStyle = {
    backgroundImage: `url('https://images.unsplash.com/photo-1693576669421-dc2293cd106a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8&auto=format&fit=crop&w=500&q=60')`,
  };

  const backgroundStyle = userData?.userBackground
    ? dynamicBackgroundStyle
    : defaultBackgroundStyle;

  return (
    <Suspense fallback={<Loading />}>
      <div className="m-7">
        <div className=" w-full bg-background rounded-lg flex justify-center">
          <div
            className={cn(`lg:w-3/5  w-full bg-cover bg-no-repeat `)}
            style={backgroundStyle}
          >
            <div className=" bg-background/50 h-44 relative">
              <div className="absolute -bottom-16 left-7 sm:left-4">
                <Image
                  src={userData?.userProfile as string}
                  height={140}
                  width={140}
                  alt={userData?.name as string}
                  className=" rounded-full aspect-square object-cover z-10"
                />
              </div>
              <p className=" absolute xs:right-10 xs:top-10 sm:right-4 sm:bottom-4">
                @{userData?.username}
              </p>
              {user?.id === userData?.id && (
                <EditUser userId={userData?.id as string} />
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="w-full mt-32 flex-col flex justify-center items-center">
        <h1 className="scroll-m-20  text-left w-1/2 text-xl font-extrabold tracking-tight lg:text-3xl mb-5">
          Pings by {userData?.name}
        </h1>
        {userPings.map((data) => (
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
                <p className="font-semibold">@{data.username.toLowerCase()}</p>

                <div className="flex">
                  <span className="mr-4 text-sm">
                    {formateDate(data.createdAt.toISOString())}
                  </span>
                </div>
              </div>
            </div>
            <Link href={`/pings/ping/${data.id}`}>
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
    </Suspense>
  );
}
