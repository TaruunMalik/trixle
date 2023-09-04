"use client";
import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";

interface DownloadBtnProps {
  url: string;
}
export default function DownloadBtn({ url }: DownloadBtnProps) {
  const downloadFileAtUrl = (fileUrl: string) => {
    const fileName = fileUrl.split("/").pop();
    const aTag = document.createElement("a");
    aTag.href = fileUrl;
    aTag.setAttribute("download", fileName as string);
    document.body.appendChild(aTag);
    aTag.click();
    aTag.remove();
  };
  return (
    <div>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <Button
              variant="default"
              className=" bg-background text-foreground hover:bg-slate-400"
              onClick={() => downloadFileAtUrl(url)}
            >
              <Download />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Download</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}
