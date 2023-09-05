"use client";
import { useEffect, useState } from "react";
import { CldUploadButton } from "next-cloudinary";
import { Button } from "./ui/button";
import { Image } from "lucide-react";
interface SmallImageUploadProps {
  value: string;
  onChange: (src: string) => void;
  disabled?: boolean;
}

export const SmallImageUpload = ({
  value,
  onChange,
  disabled,
}: SmallImageUploadProps) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <div className="flex flex-col justify-center items-center">
      <CldUploadButton
        options={{
          maxFiles: 1,
        }}
        uploadPreset="y6ikedgf"
        onUpload={(result: any) => onChange(result.info.secure_url)}
      >
        <div
          className=" 
            hover:opacity-75 
            transition 
            flex 
            flex-col 
            items-center 
            justify-center"
        >
          <Button>
            <Image />
          </Button>
        </div>
      </CldUploadButton>
    </div>
  );
};
