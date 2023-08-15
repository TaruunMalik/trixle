"use client";

import { AI, Message } from "@prisma/client";
import React, { FormEvent } from "react";
import Image from "next/image";
import ChatHeader from "./chat-header";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useCompletion } from "ai/react";
import ChatForm from "./chat-form";
import ChatMessages from "./chat-messages";
import { ChatMessageProps } from "./chat-message";
interface ChatClientProps {
  ai: AI & {
    messages: Message[];
  };
}

export default function ChatClient({ ai }: ChatClientProps) {
  const router = useRouter();
  const [messages, setMessages] = useState<ChatMessageProps[]>(ai.messages);
  const { input, isLoading, handleInputChange, handleSubmit, setInput } =
    useCompletion({
      api: `/api/chat/${ai.id}`,
      onFinish(prompt, completion) {
        const systemMessage: ChatMessageProps = {
          role: "system",
          content: completion,
        };
        setMessages((cur) => [...cur, systemMessage]);
        setInput("");
        router.refresh();
      },
    });

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    const userMessage: ChatMessageProps = {
      role: "user",
      content: input,
    };
    setMessages((cur) => [...cur, userMessage]);
    handleSubmit(e);
  };
  return (
    <div className=" flex flex-col p-4 h-full space-y-2">
      <ChatHeader ai={ai} />
      <ChatMessages messages={messages} isLoading={isLoading} ai={ai} />
      <ChatForm
        input={input}
        handleInputChange={handleInputChange}
        onSubmit={onSubmit}
        isLoading={isLoading}
      />
    </div>
  );
}
