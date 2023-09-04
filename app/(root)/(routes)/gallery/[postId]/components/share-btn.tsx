"use client";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { PinterestShareButton, PinterestIcon } from "next-share";
import { Share } from "lucide-react";
import {
  FacebookShareButton,
  FacebookIcon,
  WhatsappIcon,
  WhatsappShareButton,
  LineShareButton,
  LinkedinIcon,
  EmailShareButton,
  EmailIcon,
} from "next-share";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";

export default function ShareBtn({ url }: { url: string }) {
  const { toast } = useToast();
  const copyUrl = async () => {
    navigator.clipboard.writeText(url);
    toast({
      title: "Copied!",
      description: "Url Copied successfully!",
      className: "bg-green-500",
    });
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="default"
          className="bg-background text-foreground hover:bg-slate-400"
        >
          <Share />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Share Post</DialogTitle>
          <DialogDescription>
            <div className="flex rounded-md border justify-between p-5 mt-5">
              <strong> {url}</strong>
              <Share onClick={copyUrl} className="cursor-pointer" />
            </div>
            <div className="flex items-center space-x-5 mt-5">
              <FacebookShareButton
                url={url}
                quote={"Threads Post."}
                hashtag={"#thraeds"}
              >
                <FacebookIcon size={32} round />
              </FacebookShareButton>
              <WhatsappShareButton url={url}>
                <WhatsappIcon size={32} round />
              </WhatsappShareButton>
              <PinterestShareButton url={url} media={"Share this post."}>
                <PinterestIcon size={32} round />
              </PinterestShareButton>
              <EmailShareButton url={url}>
                <EmailIcon size={32} round />
              </EmailShareButton>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
