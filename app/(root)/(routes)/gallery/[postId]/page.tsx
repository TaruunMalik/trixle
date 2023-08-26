import React from "react";
import prismadb from "@/lib/prismadb";
import Image from "next/image";
import PostHeader from "./components/header";
import PhotoPosts from "@/components/PhotoPosts";
import { Suspense } from "react";
import Loading from "../../loading";
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
  return (
    <Suspense fallback={<Loading />}>
      {post ? (
        <>
          <div className="m-7 h-full">
            <div className=" flex gap-10 ">
              <PostHeader />
              <h3 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-5 mt-[-5px]">
                {post.caption}
              </h3>
            </div>
            <div className=" w-full h-5/6 bg-foreground/10 flex justify-center text-foreground rounded-xl">
              <div className=" w-4/5 h-[60%]">
                <div className=" w-1/3 h-full ">
                  <img
                    src={post.src}
                    alt={post.caption}
                    className=" object-cover w-full h-full rounded-lg"
                  />
                </div>
              </div>
            </div>
          </div>
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
