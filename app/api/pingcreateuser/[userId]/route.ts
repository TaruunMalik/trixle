import { currentUser } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";

export async function POST() {
  try {
    const user = await currentUser();

    if (!user) {
      return new NextResponse("No user found!", { status: 402 });
    }

    const newUser = await prismadb.users.create({
      data: {
        id: user.id,
        username: user?.username,
        name: user.firstName,
        userProfile: user.imageUrl,
      },
    });
    return NextResponse.json(newUser);
  } catch (err) {
    return new NextResponse("Some error occured", {
      status: 500,
      statusText: "Seems like it is a server error!",
    });
  }
}
