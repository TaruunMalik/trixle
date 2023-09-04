import React from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Users } from "@prisma/client";
interface PingFormProps {
  isUser: Users;
}
export default function PingForm({ isUser }: PingFormProps) {
  return (
    <div className=" sm:w-1/2 w-full  border-4 rounded-lg bg-background/10">
      <div className="flex flex-row gap-4 p-2">
        <div>
          <Avatar>
            <AvatarFallback>{isUser.name}</AvatarFallback>
            <AvatarImage src={isUser.userProfile as string} />
          </Avatar>
        </div>
        <div className="w-full">
          <Textarea
            disabled={false}
            // onChange={(event) => setBody(event.target.value)}
            // value={body}
            className="
            disabled:opacity-80
            peer
            resize-none 
            mt-3 
            w-full 
            bg-background 
            ring-0 
            outline-none 
            text-[20px] 
            placeholder-neutral-500 
            text-white
  "
            placeholder="Type something..."
          ></Textarea>

          <div className="mt-4 flex flex-row justify-end">
            <Button>Ping</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
