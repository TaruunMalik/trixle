"use client";
import React from "react";
import { useUser } from "@clerk/nextjs";
import { Trash2 } from "lucide-react";
import axios from "axios";
import { Photo } from "@prisma/client";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
interface DeleteBtnProps {
  post: Photo;
}
export default function DeleteBtn({ post }: DeleteBtnProps) {
  const { user } = useUser();
  const router = useRouter();
  const { toast } = useToast();
  const handleDelete = async () => {
    try {
      await axios.delete(`/api/deletePost/${post.id}`);
      toast({
        variant: "default",
        title: "Deleted Successfully!",
        description: "Successfully deleted your post!",
      });
      router.refresh();
      router.back();
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Unsuccessful in deletion!",
        description: "Couldn't delete your post!",
      });
    }
  };

  return (
    <div>
      <AlertDialog>
        <AlertDialogTrigger>
          {post.userId === user?.id ? (
            <Button
              variant="default"
              className=" bg-background text-foreground hover:bg-slate-400"
            >
              <Trash2 />
            </Button>
          ) : (
            ""
          )}
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="  bg-destructive hover:bg-red-800 text-foreground"
            >
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
