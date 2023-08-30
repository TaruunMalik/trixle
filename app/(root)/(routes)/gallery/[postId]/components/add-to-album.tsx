"use client";
import React from "react";
import { Photo } from "@prisma/client";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import axios from "axios";
import { useRouter } from "next/navigation";
// import curUser from "@/lib/curUser";
interface AddToAlbumProps {
  post: Photo;
}
interface UserProps {
  userId: string;
}

interface CombinedProps extends AddToAlbumProps, UserProps {}

export default async function AddToAlbum({ post, userId }: CombinedProps) {
  const router = useRouter();
  const { toast } = useToast();
  // const user = await curUser();
  const addToLikedHandler = async (values: Photo) => {
    try {
      await axios.patch(`/api/likedStatus/${values.id}`, values);
      toast({
        variant: "default",
        title: "Success!",
      });
      router.refresh();
      if (!post.isLiked && post.likedByUserId === userId) {
        router.push("/liked");
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error!",
        description: "Some error occured, please try again!",
      });
    }
  };
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <Button
            variant="default"
            className=" bg-background text-foreground hover:bg-slate-400"
            onClick={() => addToLikedHandler(post)}
          >
            {" "}
            {post.isLiked && post.likedByUserId === userId ? (
              <Heart fill="white" />
            ) : (
              <Heart />
            )}
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          {post.isLiked && post.likedByUserId === userId ? (
            <p>Remove from Liked Posts</p>
          ) : (
            <p>Add to Liked Posts</p>
          )}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
