import { currentUser } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";
import { checkSubscription } from "@/lib/subscription";

export async function PATCH(
  req: Request,
  { params }: { params: { photoId: string } }
) {
  try {
    const body = await req.json();
    const user = await currentUser();
    // const isPro = await checkSubscription();
    const { description, caption, src } = body;
    if (!description || !caption || !src) {
      return new NextResponse("Any field cannot be empty", { status: 400 });
    }
    if (!user || !user.id || !user.firstName) {
      return new NextResponse("Unauthorized", {
        status: 401,
        statusText: "Not logged in and unauthorized!",
      });
    }
    if (!params.photoId) {
      return new NextResponse("Photo ID is required", {
        status: 400,
        statusText: "Cannot do this!",
      });
    }
    // if (!isPro) {
    //   return new NextResponse("Premium subscription required", { status: 400 });
    // }

    const updatedPost = await prismadb.photo.update({
      where: {
        id: params.photoId,
        userId: user.id,
      },
      data: {
        src: src,
        description: description,
        caption: caption,
        userId: user.id,
        userName: user.firstName,
      },
    });
    return NextResponse.json(updatedPost);
  } catch (err) {
    return new NextResponse("Some error occured", {
      status: 400,
      statusText: "Some error idk?",
    });
  }
}
