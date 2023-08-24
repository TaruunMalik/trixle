"use client";
import React, { Suspense } from "react";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ImageUpload } from "@/components/ImageUpload";
import Loading from "../../../loading";
import axios from "axios";
import { useToast } from "@/components/ui/use-toast";
import { Photo } from "@prisma/client";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Wand } from "lucide-react";
import { useRouter } from "next/navigation";

interface PostFormProps {
  initialData: Photo | null;
}

const formSchema = z.object({
  src: z.string().min(2, {
    message: "Image is required!",
  }),
  caption: z.string().min(2, {
    message: "A caption is needed!",
  }),
  description: z.string().min(3, {
    message:
      "Although a picture speaks a thousand words, description about the image is required!",
  }),
});

export default function PostForm({ initialData }: PostFormProps) {
  const router = useRouter();
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      src: "",
      caption: "",
      description: "",
    },
  });
  const isLoading = form.formState.isSubmitting;
  const submitHandler = async (values: z.infer<typeof formSchema>) => {
    if (initialData) {
      console.log(initialData);
    } else {
      try {
        await axios.post("/api/photo", values);
        console.log(values);
        toast({
          variant: "default",
          title: "Success!",
          description: "Successfully posted!",
        });
        router.refresh();
        router.push("/gallery");
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Error!",
          description: "Some error occured, please try again!",
        });
        console.log(error, "Some error occured!");
      }
    }
  };
  return (
    <Suspense fallback={<Loading />}>
      <div className=" h-fit mx-auto max-w-4xl p-4 space-y-3 bg-primary/10 shadow-lg text-foreground">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(submitHandler)}
            className=" space-y-8 pb-4"
          >
            <div className=" space-y-2 w-full col-span-2 ">
              <div>
                <h2 className=" text-lg font-medium ">General Information</h2>
                <p className=" text-md text-muted-foreground">
                  Write up something about your post and insert an Image!
                </p>
              </div>
              <Separator className=" bg-primary/20" />
            </div>
            <FormField
              name="src"
              render={({ field }) => (
                <FormItem className="z-10 flex flex-col items-center justify-center space-y-4 ">
                  <FormControl>
                    <ImageUpload
                      disabled={isLoading}
                      onChange={field.onChange}
                      value={field.value}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Separator className=" bg-primary/20" />
            <div className=" flex flex-col gap-4">
              <FormField
                name="caption"
                control={form.control}
                render={({ field }) => (
                  <FormItem className=" col-span-2 md:col-span-1">
                    <FormLabel>Caption</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isLoading}
                        placeholder="Enter a caption..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Separator className=" bg-primary/20" />
              <FormField
                name="description"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        className=" bg-background resize-none"
                        rows={7}
                        disabled={isLoading}
                        placeholder="Enter a nice description..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Separator className=" bg-primary/20" />
              <div className=" w-full flex justify-center p-2">
                <Button variant="default" size="lg" disabled={isLoading}>
                  {initialData ? `Edit your Post ` : `Create Post`}
                  <Wand size={20} className=" ml-2" />
                </Button>
              </div>
            </div>
          </form>
        </Form>
      </div>
    </Suspense>
  );
}
