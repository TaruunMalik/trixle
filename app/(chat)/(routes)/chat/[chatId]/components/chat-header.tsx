import { AI, Message } from "@prisma/client";
import React from "react";
import { Suspense } from "react";
import Loading from "../../loading";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import {
  ChevronLeft,
  Edit,
  MessageSquare,
  MoreVertical,
  Trash,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useUser } from "@clerk/nextjs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
import Link from "next/link";
import axios from "axios";
interface ChatHeaderProps {
  ai: AI & {
    messages: Message[];
  };
}

export default function ChatHeader({ ai }: ChatHeaderProps) {
  const router = useRouter();
  const { user } = useUser();
  const { toast } = useToast();

  const handleDelete = async () => {
    try {
      await axios.delete(`/api/deleteai/${ai.id}`);
      toast({
        variant: "default",
        title: "Deleted Successfully!",
        description: "Successfully deleted your AI Chat-bot!",
      });
      router.refresh();
      router.push("/");
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Unsuccessful in deletion!",
        description: "Couldn't delete your AI Chat-bot!",
      });
    }
  };

  return (
    <Suspense fallback={<Loading />}>
      <div className=" flex w-full flex-col sm:flex-row sm:justify-between sm:items-center  border-b-4 border-border pb-4">
        <div className=" flex gap-x-2 items-center">
          <Button size="default" variant="ghost" onClick={() => router.back()}>
            <ChevronLeft /> Back
          </Button>
          <Avatar className=" h-1/5 w-1/5 z-[-1]">
            <AvatarImage src={ai.src} className=" object-cover" />
            <AvatarFallback>{ai.name}</AvatarFallback>
          </Avatar>
          <div className=" flex flex-col gap-y-2">
            <div className=" flex items-center gap-x-2">
              <p className=" text-foreground tracking-wider underline">
                {ai.name}
              </p>
              <div className=" flex items-center text-xs text-foreground">
                <MessageSquare />
              </div>
            </div>
            <p className=" text-muted-foreground">Created By @{ai.userName}</p>
          </div>
        </div>
        <div className=" w-full  flex items-center justify-center gap-10 mt-3">
          {ai.userId === user?.id ? (
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Button>
                  <MoreVertical />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <Link href={`/ai/${ai.id}`}>
                  <DropdownMenuItem className=" flex justify-evenly items-center cursor-pointer">
                    <Edit className=" w-4 h-4 " /> <span>Edit</span>
                  </DropdownMenuItem>
                </Link>
                {/* <DropdownMenuItem
                // onClick={handleDelete}
                className=" flex justify-evenly items-center"
              >
                
              </DropdownMenuItem> */}
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            ""
          )}
          <AlertDialog>
            <AlertDialogTrigger>
              {ai.userId === user?.id ? (
                <Button>
                  <Trash className=" w-4 h-4" /> <span>Delete</span>
                </Button>
              ) : (
                ""
              )}
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will delete {`${ai.name}`}{" "}
                  -Bot from the database!
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
      </div>
    </Suspense>
  );
}
