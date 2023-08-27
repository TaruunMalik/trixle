import React from "react";
import prismadb from "@/lib/prismadb";
import Image from "next/image";
import PostHeader from "./components/header";
import PhotoPosts from "@/components/PhotoPosts";
import { Suspense } from "react";
import Loading from "../../loading";
import "../../../../assets/PhotoPosts.css";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { BadgeCheck, Copy, Download, Share } from "lucide-react";
import { Button } from "@/components/ui/button";
import { checkSubscription } from "@/lib/subscription";
interface SinglePageProps {
  params: { postId: string };
}
export default async function PostPage({ params }: SinglePageProps) {
  const post = await prismadb.photo.findUnique({
    where: {
      id: params.postId,
    },
  });
  const data = await prismadb.photo.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
  const relatedUserPostsData = await prismadb.photo.findMany({
    where: {
      userId: post?.userId,
    },
  });

  const isVerified = await checkSubscription();

  return (
    <Suspense fallback={<Loading />}>
      {post ? (
        <>
          <div className=" flex gap-10 m-7 ">
            <PostHeader />
            <h3 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-5 mt-[-5px]">
              {post.caption}
            </h3>
          </div>
          <div className="m-7 h-full flex justify-center">
            <div
              className="grid grid-cols-1 lg:grid-cols-2 md:gap-10 shadow-lg
                  rounded-2xl max-w-6xl singlePost-container overflow-y-auto overflow-x-hidden w-5xl p-4 bg-foreground text-background mb-5 "
            >
              <div className=" flex flex-col items-center justify-center">
                <img
                  src={post.src}
                  alt={post.caption}
                  className="rounded-2xl object-cover max-h-[100%] w-full"
                />
              </div>
              <div className="  max-h-1/2 p-3">
                <div className=" gap-10 flex flex-col pt-2 pb-2 h-3/4 sticky top-0 z-[1]">
                  <div className=" flex justify-around bg-muted/10 rounded-lg p-3">
                    <Button
                      variant="default"
                      className=" bg-background text-foreground hover:bg-slate-400"
                    >
                      <Copy />
                    </Button>
                    <Button
                      variant="default"
                      className=" bg-background text-foreground hover:bg-slate-400"
                    >
                      <Share />
                    </Button>
                    <Button
                      variant="default"
                      className=" bg-background text-foreground hover:bg-slate-400"
                    >
                      <Download />
                    </Button>
                  </div>
                  <div className=" flex justify-between p-2 items-center">
                    <div className=" flex gap-2 items-center m-3">
                      <Avatar>
                        <AvatarImage src={post.userProfile} />
                        <AvatarFallback>
                          {post.userName.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <p className="text-[20px] font-semibold flex gap-2 items-center">
                        {post.userName}
                        {isVerified && (
                          <BadgeCheck
                            size={16}
                            className=" text-blue-400 font-bold"
                          />
                        )}
                      </p>
                    </div>
                    <Button className=" bg-background text-foreground hover:bg-slate-600">
                      View Profile
                    </Button>
                  </div>
                  <p className=" italic font-bold text-lg text-center">{`"${post.caption}"`}</p>
                  <div className=" flex bg-muted/10 flex-col p-3 text-center rounded-lg mb-2">
                    <h3 className="scroll-m-20 text-xl font-extrabold tracking-tight lg:text-2xl mb-2">
                      Although a picture speaks a thousand words, here is a
                      description of this picture:
                    </h3>
                    <h2 className="mt-2  text-xl lg:text-2xl">
                      {post.description}
                    </h2>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <PhotoPosts
            data={relatedUserPostsData}
            header={`More from ${post.userName}`}
          />
          <PhotoPosts data={data} header="Related Posts" />
        </>
      ) : (
        <div className=" w-full h-full flex justify-center items-center">
          <Image src="/404notFound.png" alt="Empty" width={400} height={400} />
        </div>
      )}
    </Suspense>
  );
}
