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
import { CopyToClipboard } from "react-copy-to-clipboard";
export default function CopyBtn() {
  const [copied, setCopied] = useState(false);

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
            <CopyToClipboard text={window.location.href} onCopy={handleCopy}>
              <Button
                variant="default"
                className="bg-background text-foreground hover:bg-slate-400"
              >
                <Copy />
              </Button>
            </CopyToClipboard>
          </TooltipTrigger>
          <TooltipContent>
            {!copied ? <p>Copy Link</p> : <p>Copied!</p>}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}
