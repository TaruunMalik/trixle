import { currentUser } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";

export async function PATCH(
  req: Request,
  { params }: { params: { isLikedId: string } }
) {
  try {
    const body = await req.json();
    const user = await currentUser();
    const { description, src, caption, isLiked, likedByUserId } = body;
    if (!user || !user.id || !user.firstName) {
      return new NextResponse("Unauthorized", {
        status: 401,
        statusText: "Not logged in and unauthorized!",
      });
    }
    if (!params.isLikedId) {
      return new NextResponse("Photo ID is required", {
        status: 400,
        statusText: "Cannot do this!",
      });
    }
    if (isLiked) {
      const updatedPost = await prismadb.photo.update({
        where: {
          id: params.isLikedId,
        },
        data: {
          likedByUserId: user.id,
          isLiked: false,
        },
      });
      return NextResponse.json(updatedPost);
    } else if (!isLiked) {
      const updatedPost = await prismadb.photo.update({
        where: {
          id: params.isLikedId,
        },
        data: {
          likedByUserId: user.id,
          isLiked: true,
        },
      });
      return NextResponse.json(updatedPost);
    }
  } catch (error) {
    return new NextResponse("Some error occured", {
      status: 400,
      statusText: `${error}`,
    });
  }
}
