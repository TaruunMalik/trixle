import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";

export async function PATCH(
  req: Request,
  { params }: { params: { userId: string } }
) {
  try {
    const body = await req.json();
    const user = await prismadb.users.findUnique({
      where: {
        id: params.userId,
      },
    });
    const { username, userProfile, userBackground } = body;
    if (!username && !userProfile && !userBackground) {
      return new NextResponse("All fields cannot be empty", { status: 400 });
    }
    if (!user) {
      return new NextResponse("No such user exists!", {
        status: 401,
        statusText: "Not logged in and unauthorized!",
      });
    }
    if (!params.userId) {
      return new NextResponse("User ID is required", {
        status: 400,
        statusText: "Cannot do this!",
      });
    }

    const updatedUser = await prismadb.users.update({
      where: {
        id: params.userId,
      },
      data: {
        username: username === "" ? user.username : username,
        userProfile: userProfile === "" ? user.userProfile : userProfile,
        userBackground:
          userBackground === "" ? user.userBackground : userBackground,
      },
    });
    return NextResponse.json(updatedUser);
  } catch (err) {
    return new NextResponse("Some error occured", {
      status: 400,
      statusText: "Some error idk?",
    });
  }
}
