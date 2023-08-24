import { currentUser } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";
import { checkSubscription } from "@/lib/subscription";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const isSubscribed = await checkSubscription();
    const user = await currentUser();
    const { description, caption, src } = body;
    if (!isSubscribed) {
      return new NextResponse("Premium Subscription is Required!", {
        status: 400,
        statusText: "Unauthorized",
      });
    }
    if (!user) {
      return new NextResponse("No user found!", { status: 402 });
    }
    if (!description || !caption || !src) {
      return new NextResponse("Any field cannot be empty!", { status: 400 });
    }
    const newPhoto = await prismadb.photo.create({
      data: {
        userId: user.id,
        userProfile: user.imageUrl,
        src: src,
        description: description,
        caption: caption,
        userName: user.firstName as string,
      },
    });

    return NextResponse.json(newPhoto);
  } catch (err) {
    return new NextResponse("Some error occured", {
      status: 500,
      statusText: "Seems like it is a server error!",
    });
  }
}
