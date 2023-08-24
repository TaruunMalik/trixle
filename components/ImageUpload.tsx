"use client";
import { useEffect, useState } from "react";
import { CldUploadButton } from "next-cloudinary";
import Image from "next/image";
import { useRouter } from "next/navigation";
interface ImageUploadProps {
  value: string;
  onChange: (src: string) => void;
  disabled?: boolean;
}

export const ImageUpload = ({
  value,
  onChange,
  disabled,
}: ImageUploadProps) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <div className=" w-full space-y-4 flex flex-col justify-center items-center">
      <CldUploadButton
        options={{
          maxFiles: 1,
        }}
        uploadPreset="y6ikedgf"
        onUpload={(result: any) => onChange(result.info.secure_url)}
      >
        <div
          className=" p-4 
            border-4 
            border-dashed
            border-primary/10 
            rounded-lg 
            hover:opacity-75 
            transition 
            flex 
            flex-col 
            space-y-2 
            items-center 
            justify-center z-[-1]"
        >
          <div className=" relative h-56 w-56">
            <Image
              fill
              alt="Uploaded Image"
              src={value || "/placeholder.svg"}
              className=" rounded-lg object-cover z-[-1]"
            />
          </div>
        </div>
      </CldUploadButton>
    </div>
  );
};
