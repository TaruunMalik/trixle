import React from "react";
import prismadb from "@/lib/prismadb";
import { Suspense } from "react";
import Loading from "../../loading";
import Image from "next/image";
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
        <div className=" w-full bg-slate-200 rounded-lg flex justify-center">
          <div className=" w-3/5  bg-slate-800">
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
            </div>
          </div>
        </div>
      </div>
    </Suspense>
  );
}
