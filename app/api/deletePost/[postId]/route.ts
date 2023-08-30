import { NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs";
import prismadb from "@/lib/prismadb";
export async function DELETE(
  req: Request,
  { params }: { params: { postId: string } }
) {
  const body = req.json();
  const user = await currentUser();
  if (!user?.id) {
    return new NextResponse("Not a valid user", { status: 400 });
  }
  if (!params.postId) {
    return new NextResponse("Not a valid post id", { status: 400 });
  }
  try {
    await prismadb.photo.delete({
      where: {
        id: params.postId,
        userId: user.id,
      },
    });
    return new NextResponse("It works", { status: 200 });
  } catch (err) {
    return new NextResponse("Not a valid request", { status: 400 });
  }
}
