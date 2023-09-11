import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";
import { currentUser } from "@clerk/nextjs";
import { Users } from "@prisma/client";

export async function POST(req: Request) {
  //     content   String
  //   createdAt DateTime @default(now())
  //   updatedAt DateTime @updatedAt
  //   image     String?
  //   userId    String
  //   user      Users    @relation(fields: [userId], references: [id], onDelete: Cascade)
  //   likes     Like[]
  const body = await req.json();
  const user = await currentUser();

  const { content, image } = body;
  if (user) {
    const pingUser = await prismadb.users.findUnique({
      where: {
        id: user.id,
      },
    });
    const userId = pingUser?.id;
    if (userId) {
      const newPing = await prismadb.post.create({
        data: {
          content: content,
          image: image ? image : "",
          userId: userId,
          userProfileImg: pingUser.userProfile as string,
          username: pingUser.name as string,
        },
      });
      return NextResponse.json(newPing);
    } else {
      return new NextResponse("error", { status: 400 });
    }
  } else {
    return new NextResponse("error,no user present", { status: 400 });
  }
}
