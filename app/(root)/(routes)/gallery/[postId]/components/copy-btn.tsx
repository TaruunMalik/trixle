"use client";
import React, { useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";
import { CheckCircle2Icon } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { CopyToClipboard } from "react-copy-to-clipboard";
export default function CopyBtn({ url }: { url: string }) {
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();
  const copyUrl = async () => {
    navigator.clipboard.writeText(url);
    toast({
      title: "Copied!",
      description: "Url Copied successfully!",
      className: "bg-green-500",
    });
  };
  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000); // Reset to "Copy" after 2 seconds (adjust the timeout as needed)
  };
  return (
    <div>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            {/* <CopyToClipboard text={window.location.href} onCopy={handleCopy}> */}
            <Button
              variant="default"
              className="bg-background text-foreground hover:bg-slate-400"
              onClick={copyUrl}
            >
              {/* {!copied ? <Copy /> : <CheckCircle2Icon />} */}
              <Copy />
            </Button>
            {/* </CopyToClipboard> */}
          </TooltipTrigger>
          <TooltipContent>
            {!copied ? <p>Copy Link</p> : <p>Copied!</p>}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}
