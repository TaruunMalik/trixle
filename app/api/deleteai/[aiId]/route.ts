import prismadb from "@/lib/prismadb";
import { auth, currentUser, redirectToSignIn } from "@clerk/nextjs";
import { NextResponse } from "next/server";
//import { currentUser } from "@clerk/nextjs";
export async function DELETE(
  req: Request,
  { params }: { params: { aiId: string } }
) {
  const body = req.json();
  const { userId } = auth();
  if (!params.aiId) {
    return new NextResponse("Not gonna work", {
      status: 400,
      statusText: "Bad request!",
    });
  }
  if (!userId) {
    return redirectToSignIn();
  } else {
    try {
      await prismadb.aI.delete({
        where: {
          userId: userId,
          id: params.aiId,
        },
      });
      return new NextResponse("It works!", {
        status: 200,
        statusText: "Your AI has been deleted successfully!",
      });
    } catch (err) {
      return new NextResponse("It does not work", {
        status: 500,
        statusText: "Internal server error, please try again later!",
      });
    }
  }
}
