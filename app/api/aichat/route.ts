import { currentUser } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";
import { checkSubscription } from "@/lib/subscription";
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const isPro = await checkSubscription();
    const user = await currentUser();
    const { name, description, instructions, seed, src, categoryId } = body;
    if (!user || !user.id || !user.firstName) {
      return new NextResponse("Unauthorized", {
        status: 401,
        statusText: "Not logged in and unauthorized!",
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

    if (!isPro) {
      return new NextResponse("Premium Subscription required!", {
        status: 400,
      });
    }

    const aiBot = await prismadb.aI.create({
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
