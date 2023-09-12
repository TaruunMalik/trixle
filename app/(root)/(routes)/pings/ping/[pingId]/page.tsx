import prismadb from "@/lib/prismadb";
import React from "react";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formateDate } from "@/lib/dateCheck";
import BackBtn from "./components/back-btn";
interface PingPageProps {
  params: { pingId: string };
}
export default async function PingPage({ params }: PingPageProps) {
  const post = await prismadb.post.findUnique({
    where: {
      id: params.pingId,
    },
  });
  return (
    <>
      {post ? (
        <>
          <BackBtn />
          <div className=" w-full flex justify-center items-center flex-col  ">
            <div className=" sm:w-1/2 w-full bg-foreground text-background rounded-t-lg ">
              <div className=" flex justify-between items-center p-2">
                <div className=" flex items-center gap-2">
                  <Avatar>
                    <AvatarImage src={post.userProfileImg} />
                    <AvatarFallback>{[post.username.at(0)]}</AvatarFallback>
                  </Avatar>
                  <p>{post.username}</p>
                </div>
                <p className="">{formateDate(post.createdAt.toISOString())}</p>
              </div>
            </div>
            <div className=" sm:w-1/2 w-full flex flex-col justify-center rounded-b-lg text-background bg-foreground items-center p-2 gap-3">
              <p className=" text-left self-stretch m-2">{post.content}</p>
              {post.image && (
                <Image
                  height={500}
                  width={700}
                  className="object-cover rounded-md"
                  alt="Image"
                  src={post.image as string}
                />
              )}
            </div>
            <div className=" sm:w-1/2 w-full bg-foreground mb-2 text-background mt-2 rounded-lg ">
              Commentss
            </div>
          </div>
        </>
      ) : (
        <div className=" w-full h-full flex justify-center items-center">
          <Image src="/404notFound.png" alt="Empty" width={400} height={400} />
        </div>
      )}
    </>
  );
}
