"use client";
import React, { useState } from "react";
import { Edit2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SmallImageUpload } from "@/components/small-Image-Upload";
import axios from "axios";
import { useToast } from "@/components/ui/use-toast";
interface EditUserProps {
  userId: string;
}
export default function EditUser({ userId }: EditUserProps) {
  const { toast } = useToast();
  const [updates, setUpdates] = useState({
    username: "",
    userProfile: "",
    userBackground: "",
  });
  const updateUserHandler = async () => {
    try {
      await axios.patch(`/api/editUser/${userId}`, updates);
      toast({
        variant: "default",
        title: "Error!",
        description: "Successfully updated the user!",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error!",
        description: `${error}`,
      });
    }
  };

  return (
    <div className=" absolute right-2 top-2">
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">
            <Edit2 />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you&apos;re
              done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-2">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="username" className="text-right">
                Username
              </Label>
              <Input
                id="username"
                value={updates.username}
                name="username"
                className="col-span-3"
                onChange={(e) =>
                  setUpdates({ ...updates, [e.target.name]: e.target.value })
                }
              />
            </div>
          </div>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Profile Image
              </Label>
              <SmallImageUpload
                disabled={false}
                value=""
                onChange={() => console.log("Hey")}
              />
              <Label htmlFor="username" className="text-right">
                Background
              </Label>
              <SmallImageUpload
                disabled={false}
                value=""
                onChange={() => console.log("Hey")}
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
