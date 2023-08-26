import React from "react";
import Image from "next/image";
import PhotoPosts from "@/components/PhotoPosts";
import { Photo } from "@prisma/client";
import prismadb from "@/lib/prismadb";

export default async function GalleryPage() {
  const data = await prismadb.photo.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return <PhotoPosts data={data} header="Gallery" />;
}
