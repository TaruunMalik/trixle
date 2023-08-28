import React from "react";
import { Heart } from "lucide-react";
import { Separator } from "@/components/ui/separator";
export default function LikedPosts() {
  return (
    <div className=" m-7">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-5 flex gap-3 items-center">
        <Heart /> Liked Posts <Heart />
      </h1>
      <Separator />
      <p>Coming Soon!</p>
    </div>
  );
}
