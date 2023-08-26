import prismadb from "./prismadb";
import { NextResponse } from "next/server";

export const findPostPage = async (postId: string) => {
  try {
    const response = await prismadb.photo.findUnique({
      where: {
        id: postId,
      },
    });
    if (!response) {
      return new NextResponse("No such posts exists!", {
        status: 400,
        statusText: "No post exists!",
      });
    }
    return NextResponse.json(response);
  } catch (error) {
    return new NextResponse("Some error occured idk?", { status: 400 });
  }
};
