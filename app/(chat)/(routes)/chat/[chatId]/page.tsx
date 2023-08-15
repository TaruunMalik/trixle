import React, { Suspense } from "react";
import Loading from "../loading";
import { auth, redirectToSignIn } from "@clerk/nextjs";
import prismadb from "@/lib/prismadb";
import Image from "next/image";
import { redirect } from "next/navigation";
import ChatClient from "./components/client";
interface ChatPageProps {
  params: {
    chatId: string;
  };
}

export default async function ChatPage({ params }: ChatPageProps) {
  const { userId } = auth();
  if (!userId) redirectToSignIn();

  const aiChatId = params.chatId;
  const ai = await prismadb.aI.findUnique({
    where: {
      id: aiChatId,
    },
    include: {
      messages: {
        orderBy: {
          createdAt: "asc",
        },
        where: {
          userId: userId as string,
        },
      },
    },
  });

  if (!ai) {
    redirect("/");
  }

  return (
    <Suspense fallback={<Loading />}>
      <ChatClient ai={ai} />
    </Suspense>
  );
}
