import React from "react";
import Image from "next/image";
import { Suspense } from "react";
import Loading from "../../loading";
import PostForm from "./components/postForm";
import prismadb from "@/lib/prismadb";
interface PostPageProps {
  params: {
    postId: string;
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const photo = await prismadb.photo.findUnique({
    where: {
      id: params.postId,
    },
  });

  return (
    <Suspense fallback={<Loading />}>
      <PostForm initialData={photo} />
    </Suspense>
  );
}
