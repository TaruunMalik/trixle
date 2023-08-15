"use client";
import { AI } from "@prisma/client";
import React, { ElementRef, useEffect, useRef, useState } from "react";
import ChatMessage from "./chat-message";
import { ChatMessageProps } from "./chat-message";
import { currentUser, useUser } from "@clerk/nextjs";
interface ChatMessageProp {
  isLoading: boolean;
  ai: AI;
  messages: ChatMessageProps[];
}

export default function ChatMessages({
  isLoading,
  ai,
  messages = [],
}: ChatMessageProp) {
  const { user } = useUser();
  const scrollRef = useRef<ElementRef<"div">>(null);
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages.length]);
  return (
    <div className=" flex-1 overflow-y-hidden pr-4">
      <ChatMessage
        role="system"
        src={ai.src}
        name={ai.name}
        isLoading={isLoading}
        content={`Hello, I am ${ai.name}, glad to meet you!`}
      />
      <ChatMessage
        role="user"
        isLoading={isLoading}
        content={`Hello, I am ${user?.firstName} , glad to meet you!`}
      />
      {messages.map((message) => (
        <ChatMessage
          role={message.role}
          src={message.src}
          content={message.content}
          key={ai.src}
        />
      ))}
      {isLoading && (
        <ChatMessage isLoading={isLoading} role="system" src={ai.src} />
      )}
      <div ref={scrollRef} />
    </div>
  );
}
