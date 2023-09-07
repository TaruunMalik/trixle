import React from "react";
import prismadb from "@/lib/prismadb";
import { Suspense } from "react";
import Loading from "../../loading";
import Image from "next/image";
import EditUser from "./components/edit-user";
import { cn } from "@/lib/utils";
interface UserPageProps {
  params: { userId: string };
}
export default async function UserPage({ params }: UserPageProps) {
  const userData = await prismadb.users.findUnique({
    where: {
      id: params.userId,
    },
  });
  return (
    <Suspense fallback={<Loading />}>
      <div className="m-7">
        <div className=" w-full bg-background rounded-lg flex justify-center">
          <div
            className={cn(
              " w-3/5 bg-no-repeat bg-cover",
              userData?.userBackground
                ? userData.userBackground
                : " bg-[url('https://images.unsplash.com/photo-1693576669421-dc2293cd106a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8&auto=format&fit=crop&w=500&q=60')]"
            )}
          >
            <div className=" bg-background/50 h-44 relative">
              <div className="absolute -bottom-16 left-7 sm:left-4">
                <Image
                  src={userData?.userProfile as string}
                  height={140}
                  width={140}
                  alt={userData?.name as string}
                  className=" rounded-full"
                />
              </div>
              <p className=" absolute xs:right-10 xs:top-10 sm:right-4 sm:bottom-4">
                @{userData?.username}
              </p>
              <EditUser userId={userData?.id as string} />
            </div>
            {/* <img className=" w-full h-full absolute top-0 " /> */}
          </div>
        </div>
      </div>
    </Suspense>
  );
}