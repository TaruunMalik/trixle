import React from "react";
import { useToast } from "@/components/ui/use-toast";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import { BeatLoader } from "react-spinners";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { auth, useUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";

export interface ChatMessageProps {
  role: "system" | "user";
  content?: string;
  isLoading?: boolean;
  src?: string;
  name?: string;
}

export default function ChatMessage({
  role,
  content,
  isLoading,
  src,
  name,
}: ChatMessageProps) {
  const { toast } = useToast();
  const { theme } = useTheme();
  const { user } = useUser();
  const handleCopy = () => {
    if (!content) {
      return;
    } else {
      toast({
        variant: "default",
        title: "Copied Successfully!",
        description: "Message copied to clipboard!",
      });
      navigator.clipboard.writeText(content);
    }
  };

  return (
    <div
      className={cn(
        "group flex items-start gap-x-3 py-4 w-full",
        role === "user" && "justify-end"
      )}
    >
      {role !== "user" && src && (
        <Avatar className=" h-[40px] w-[40px] z-[-1]">
          <AvatarImage src={src} className=" object-contain" />
          <AvatarFallback>Bot</AvatarFallback>
        </Avatar>
      )}

      <div className=" rounded-md px-4 py-2 max-w-sm text-sm bg-primary/10">
        {isLoading && role === "system" ? (
          <BeatLoader size={5} color={theme === "light" ? "black" : "white"} />
        ) : (
          content
        )}
      </div>
      {role === "user" && (
        <Avatar className=" h-[40px] w-[40px] z-[-1]">
          <AvatarImage src={user?.imageUrl} className=" object-contain" />
          <AvatarFallback>User</AvatarFallback>
        </Avatar>
      )}
      {role !== "user" && !isLoading && (
        <Button
          onClick={handleCopy}
          className=" opacity-0 group-hover:opacity-100 transition"
          size="default"
          variant="default"
        >
          <Copy className="" />
        </Button>
      )}
    </div>
  );
}
