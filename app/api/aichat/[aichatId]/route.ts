import { currentUser } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";
import { checkSubscription } from "@/lib/subscription";
export async function PATCH(
  req: Request,
  { params }: { params: { aichatId: string } }
) {
  try {
    const body = await req.json();
    const user = await currentUser();
    // const isPro = await checkSubscription();
    const { name, description, instructions, seed, src, categoryId } = body;
    if (!user || !user.id || !user.firstName) {
      return new NextResponse("Unauthorized", {
        status: 401,
        statusText: "Not logged in and unauthorized!",
      });
    }
    if (!params.aichatId) {
      return new NextResponse("Chat Id is required", {
        status: 400,
        statusText: "Bad Request!",
      });
    }
    if (
      !name ||
      !description ||
      !instructions ||
      !seed ||
      !src ||
      !categoryId
    ) {
      return new NextResponse("Error", {
        status: 401,
        statusText: "Bad request!",
      });
    }
    // if (!isPro) {
    //   return new NextResponse("Premium subscription required", { status: 400 });
    // }

    const aiBot = await prismadb.aI.update({
      where: {
        id: params.aichatId,
        userId: user.id,
      },
      data: {
        categoryId,
        userId: user.id,
        userName: user.firstName,
        src,
        name,
        description,
        instructions,
        seed,
      },
    });
    return NextResponse.json(aiBot);
  } catch (error) {
    console.log(error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
