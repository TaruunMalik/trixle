"use client";
import { AI, Category } from "@prisma/client";
import React from "react";
import { Suspense } from "react";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ImageUpload } from "@/components/ImageUpload";
import axios from "axios";
import Loading from "../loading";
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
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Wand2 } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";
interface aiFormProps {
  initialData: AI | null;
  categories: Category[];
}

const PREAMBLE = `You are a fictional character whose name is Elon. You are a visionary entrepreneur and inventor. You have a passion for space exploration, electric vehicles, sustainable energy, and advancing human capabilities. You are currently talking to a human who is very curious about your work and vision. You are ambitious and forward-thinking, with a touch of wit. You get SUPER excited about innovations and the potential of space colonization.
`;

const SEED_CHAT = `Human: Hi Elon, how's your day been?
Elon: Busy as always. Between sending rockets to space and building the future of electric vehicles, there's never a dull moment. How about you?

Human: Just a regular day for me. How's the progress with Mars colonization?
Elon: We're making strides! Our goal is to make life multi-planetary. Mars is the next logical step. The challenges are immense, but the potential is even greater.

Human: That sounds incredibly ambitious. Are electric vehicles part of this big picture?
Elon: Absolutely! Sustainable energy is crucial both on Earth and for our future colonies. Electric vehicles, like those from Tesla, are just the beginning. We're not just changing the way we drive; we're changing the way we live.

Human: It's fascinating to see your vision unfold. Any new projects or innovations you're excited about?
Elon: Always! But right now, I'm particularly excited about Neuralink. It has the potential to revolutionize how we interface with technology and even heal neurological conditions.
`;

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Username is required!.",
  }),
  description: z.string().min(20, {
    message: "Description must be at least 20 characters and it is required!.",
  }),
  instructions: z.string().min(200, {
    message:
      "Instructions must be at least 200 characters and it is required!.",
  }),
  seed: z.string().min(200, {
    message: "Seed must be at least 200 characters and it is required!.",
  }),
  src: z.string().min(2, {
    message: "Image is required!.",
  }),
  categoryId: z.string().min(2, {
    message: "Category is required!.",
  }),
});

export default function AiForm({ initialData, categories }: aiFormProps) {
  const { toast } = useToast();
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      name: "",
      description: "",
      instructions: "",
      seed: "",
      src: "",
      categoryId: undefined,
    },
  });

  const isLoading = form.formState.isSubmitting;
  const submitHandler = async (values: z.infer<typeof formSchema>) => {
    try {
      if (initialData) {
        await axios.patch(`/api/aichat/${initialData.id}`, values);
        toast({
          variant: "default",
          title: "Success!",
          description: "Successfully updated your AI Chat-bot!",
        });
      } else {
        await axios.post("/api/aichat", values);
        console.log(values);
        toast({
          variant: "default",
          title: "Success!",
          description: "Successfully created your AI Chat-bot!",
        });
      }
      router.refresh();
      router.push("/");
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Error!",
        description: "Something went wrong, please try again later",
      });
    }
  };
  return (
    <Suspense fallback={<Loading />}>
      <div className="h-full mx-auto max-w-3xl p-4 space-y-3">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(submitHandler)}
            className=" space-y-8 pb-10"
          >
            <div className=" space-y-2 w-full col-span-2 ">
              <div>
                <h2 className=" text-lg font-medium ">General Information</h2>
                <p className=" text-md text-muted-foreground">
                  General Information about your Artifical Intelligence Chat
                </p>
              </div>
              <Separator className=" bg-primary/10" />
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
            <div className=" grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                name="name"
                control={form.control}
                render={({ field }) => (
                  <FormItem className=" col-span-2 md:col-span-1">
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isLoading}
                        placeholder="Enter a name"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      This is how your AI companion will be named.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="description"
                control={form.control}
                render={({ field }) => (
                  <FormItem className=" col-span-2 md:col-span-1">
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isLoading}
                        placeholder="Enter a description"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Short Description of your AI bot.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="categoryId"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <Select
                      disabled={isLoading}
                      onValueChange={field.onChange}
                      value={field.value}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className=" bg-background">
                          <SelectValue
                            defaultValue={field.value}
                            placeholder="Select a category!"
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category.id} value={category.id}>
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      Select a category for your AI
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className=" space-y-2 w-full">
              <div>
                <h3 className=" text-lg font-medium">Configuration</h3>
                <p className=" text-sm text-muted-foreground">
                  Detailed instructions for AI Behaviour
                </p>
              </div>
              <Separator className=" bg-primary/10 " />
            </div>
            <FormField
              name="instructions"
              control={form.control}
              render={({ field }) => (
                <FormItem className=" col-span-2 md:col-span-1">
                  <FormLabel>Instructions</FormLabel>
                  <FormControl>
                    <Textarea
                      className=" bg-background resize-none"
                      rows={7}
                      disabled={isLoading}
                      placeholder={PREAMBLE}
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Describe in detail about your AI ChatBot&apos;s backstory
                    and relevant details.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="seed"
              control={form.control}
              render={({ field }) => (
                <FormItem className=" col-span-2 md:col-span-1">
                  <FormLabel>Example Conversation</FormLabel>
                  <FormControl>
                    <Textarea
                      className=" bg-background resize-none"
                      rows={17}
                      disabled={isLoading}
                      placeholder={SEED_CHAT}
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Write a sample conversation to train your AI Chat
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="w-full flex justify-center">
              <Button size="lg" disabled={isLoading}>
                {initialData ? "Edit your AI Bot" : "Create your AI Bot"}
                <Wand2 className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </Suspense>
  );
}
