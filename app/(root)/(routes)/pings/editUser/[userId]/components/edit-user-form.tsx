"use client";
import React, { useState } from "react";
import { ImageUpload } from "@/components/ImageUpload";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Users } from "@prisma/client";

interface EditUserProfileProps {
  user: Users;
}

const formSchema = z.object({
  username: z.string().min(0),
  userProfile: z.string().min(0),
  userBackground: z.string().min(0),
});

export default function EditUserProfile({ user }: EditUserProfileProps) {
  const { toast } = useToast();
  const router = useRouter();
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
          variant: "destructive",
          title: "Error!",
          description: "Cannot update the user!",
        });
      } else {
        await axios.patch(`/api/editUser/${user.id}`, values);
        toast({
          variant: "default",
          title: "Success!",
          description: "Successfully updated the user!",
        });
        router.refresh();
        router.back();
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
    <div className=" h-fit mx-auto max-w-4xl p-4 space-y-3 bg-primary/10 shadow-lg text-foreground">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-5">
        Edit Your Profile, {user.name}
      </h1>
      <Separator className=" bg-primary/20" />
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
                  <FormLabel className="scroll-m-20 text-2xl font-extrabold tracking-tight lg:text-3xl mb-5">
                    New Username
                  </FormLabel>

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
            <Separator className=" bg-primary/20" />

            <FormField
              name="userProfile"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-4 ">
                  <FormLabel className="scroll-m-20 text-2xl font-extrabold tracking-tight lg:text-3xl mb-5">
                    New Profile Image
                  </FormLabel>
                  <FormControl>
                    <ImageUpload
                      disabled={isLoading}
                      onChange={field.onChange}
                      value={field.value}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <Separator className=" bg-primary/20" />

            <FormField
              name="userBackground"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-4">
                  <FormLabel className="scroll-m-20 text-2xl font-extrabold tracking-tight lg:text-3xl mb-5">
                    New Background Image
                  </FormLabel>
                  <FormControl>
                    <ImageUpload
                      disabled={isLoading}
                      onChange={field.onChange}
                      value={field.value}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <Separator className=" bg-primary/20" />

            <div className=" w-full flex justify-center p-2">
              <Button variant="default" size="lg" disabled={isLoading}>
                Save Changes
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}
