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
import { ImageUpload } from "@/components/ImageUpload";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SmallImageUpload } from "@/components/small-Image-Upload";
import axios from "axios";
import { useToast } from "@/components/ui/use-toast";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet";
import Link from "next/link";

interface EditUserProps {
  userId: string;
}

const formSchema = z.object({
  username: z.string().min(0),
  userProfile: z.string().min(0),
  userBackground: z.string().min(0),
});

export default function EditUser({ userId }: EditUserProps) {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      userProfile: "",
      userBackground: "",
    },
  });
  const isLoading = form.formState.isSubmitting;

  const updateUserHandler = async (values: z.infer<typeof formSchema>) => {
    try {
      if (!values.username && !values.userProfile && !values.userBackground) {
        toast({
          variant: "default",
          title: "Error!",
          description: "Cannot update the user!",
        });
      } else {
        // await axios.patch(`/api/editUser/${userId}`, values);
        // toast({
        //   variant: "default",
        //   title: "Success!",
        //   description: "Successfully updated the user!",
        // });
        console.log(values);
      }
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
      <Link href={`/pings/editUser/${userId}`}>
        <Button variant="outline">
          <Edit2 />
        </Button>
      </Link>
      {/* <Sheet>
        <SheetTrigger asChild>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Edit profile</SheetTitle>
            <SheetDescription>
              Make changes to your profile here. Click save when you're done.
            </SheetDescription>
          </SheetHeader>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(updateUserHandler)}
              className=" space-y-8 pb-4"
            >
              <div className=" flex flex-col text-left gap-4">
                <FormField
                  name="username"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem className=" col-span-2 md:col-span-1">
                      <FormLabel>New Username</FormLabel>
                      <FormControl>
                        <Input
                          disabled={isLoading}
                          placeholder="What's your new username?"
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  name="userProfile"
                  render={({ field }) => (
                    <FormItem className=" flex justify-between items-center ">
                      <FormLabel>New Profile Image</FormLabel>

                      <FormControl>
                        <SmallImageUpload
                          disabled={isLoading}
                          onChange={field.onChange}
                          value={field.value}
                        />
                        
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  name="userBackground"
                  render={({ field }) => (
                    <FormItem className="flex items-center justify-between ">
                      <FormLabel>New Background Image</FormLabel>

                      <FormControl>
                        <SmallImageUpload
                          disabled={isLoading}
                          onChange={field.onChange}
                          value={field.value}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            </form>
          </Form>
          <SheetFooter>
            <SheetClose asChild>
              <Button type="submit">Save changes</Button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet> */}
      {/* <Dialog>
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
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(updateUserHandler)}
              className=" space-y-8 pb-4"
            >
              <div className=" flex flex-col text-left gap-4">
                <FormField
                  name="username"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem className=" col-span-2 md:col-span-1">
                      <FormLabel>New Username</FormLabel>
                      <FormControl>
                        <Input
                          disabled={isLoading}
                          placeholder="What's your new username?"
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  name="userProfile"
                  render={({ field }) => (
                    <FormItem className=" flex justify-between items-center ">
                      <FormLabel>New Profile Image</FormLabel>

                      <FormControl>
                        <SmallImageUpload
                          disabled={isLoading}
                          onChange={field.onChange}
                          value={field.value}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  name="userBackground"
                  render={({ field }) => (
                    <FormItem className="flex items-center justify-between ">
                      <FormLabel>New Background Image</FormLabel>

                      <FormControl>
                        <SmallImageUpload
                          disabled={isLoading}
                          onChange={field.onChange}
                          value={field.value}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            </form>
          </Form>
          <DialogFooter>
            <Button disabled={isLoading} type="submit">
              Save changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog> */}
    </div>
  );
}
