"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Users } from "@prisma/client";
import { Image } from "lucide-react";
import { Send } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { SmallImageUpload } from "@/components/small-Image-Upload";
interface PingFormProps {
  isUser: Users;
}

export default function PingForm({ isUser }: PingFormProps) {
  const [progress, setProgress] = useState(0);
  const [src, setSrc] = useState("");
  const [text, setText] = useState("");
  return (
    <div className=" md:w-1/2 w-full border-4 rounded-lg bg-background/10 p-2 ">
      <div className="flex flex-row gap-4 p-2">
        <div>
          <Avatar>
            <AvatarFallback>{isUser.name}</AvatarFallback>
            <AvatarImage src={isUser.userProfile as string} />
          </Avatar>
        </div>
        <div className="w-full">
          <Textarea
            className=" bg-background resize-none"
            rows={7}
            disabled={false}
            placeholder="What is happening?!"
            onChange={(e) => setText(e.target.value)}
            maxLength={500}
          />

          <div className="mt-4 flex flex-row justify-between items-center">
            <SmallImageUpload
              disabled={false}
              value={src}
              onChange={() => console.log("Hey")}
            />
            <Progress
              value={(text.length / 500) * 100}
              className="w-[60%] hidden sm:block"
            />
            <Button className=" flex justify-center items-center gap-3 text-[15px] font-bold">
              Ping <Send height={20} width={20} />{" "}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
