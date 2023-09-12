"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Users } from "@prisma/client";
import { Send } from "lucide-react";
import axios from "axios";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import * as z from "zod";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Progress } from "@/components/ui/progress";
import { SmallImageUpload } from "@/components/small-Image-Upload";
interface PingFormProps {
  isUser: Users;
}

const formSchema = z.object({
  content: z.string().min(0),
  image: z.string().min(0),
});

export default function PingForm({ isUser }: PingFormProps) {
  const [progress, setProgress] = useState(0);
  const [src, setSrc] = useState("");
  const [text, setText] = useState("");
  const { toast } = useToast();
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: "",
      image: "",
    },
  });
  const isLoading = form.formState.isSubmitting;
  const submitHandler = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.post("/api/create-ping", values);
      toast({
        variant: "default",
        title: "Success!",
        description: "Successfully created a new Ping!",
      });
      form.reset({ content: "", image: "" });
      setText("");
      router.refresh();
      console.log(values);
    } catch (err) {
      console.log(err);

      toast({
        variant: "destructive",
        title: "Could not do it!",
        description: `${err}`,
      });

      console.log(err);
    }
  };
  return (
    <div className=" md:w-1/2 w-full border-4 rounded-lg bg-background/10 p-2 ">
      <div className="flex flex-row gap-4 p-2">
        <div>
          <Avatar>
            <AvatarFallback>{isUser.name}</AvatarFallback>
            <AvatarImage
              src={isUser.userProfile as string}
              className=" object-cover aspect-square"
            />
          </Avatar>
        </div>
        <div className="w-full">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(submitHandler)}>
              <FormField
                name="content"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea
                        className=" bg-background resize-none"
                        rows={7}
                        disabled={false}
                        value={field.value}
                        placeholder="What is happening?!"
                        onChange={(e) => {
                          setText(e.target.value);
                          field.onChange(e.target.value);
                        }}
                        maxLength={500}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <div className="mt-4 flex flex-row justify-between items-center">
                <FormField
                  name="image"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <SmallImageUpload
                          disabled={false}
                          {...field}
                          onChange={field.onChange}
                          value={field.value}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <Progress
                  value={(text.length / 500) * 100}
                  className="w-[60%] hidden sm:block"
                />
                <Button
                  disabled={isLoading}
                  className=" flex justify-center items-center gap-3 text-[15px] font-bold"
                >
                  Ping <Send height={20} width={20} />{" "}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
