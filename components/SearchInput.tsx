"use client";
import React, { ChangeEventHandler, useEffect, useState } from "react";
import { Search } from "lucide-react";
import { Input } from "./ui/input";
import { useRouter, useSearchParams } from "next/navigation";
import { useDebounce } from "@/hooks/use-debounce";
import qs from "query-string";
export default function SearchInput() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const categoryId = searchParams.get("categoryId");
  const name = searchParams.get("name");

  const [value, setValue] = useState(name || "");
  const debouncedVal = useDebounce<string>(value, 1000);

  const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setValue(e.target.value);
  };

  useEffect(() => {
    const query = {
      name: debouncedVal,
      categoryId: categoryId,
    };
    const url = qs.stringifyUrl(
      {
        url: window.location.href,
        query,
      },
      { skipEmptyString: true, skipNull: true }
    );
    router.push(url);
  }, [debouncedVal, router, categoryId]);

  return (
    <div className=" relative flex justify-center items-center">
      <Search className=" absolute h-4 w-4 left-2 top-3 text-muted-foreground " />
      <Input
        type="text"
        placeholder="Search..."
        className=" bg-background pl-8 border-2 outline-none focus:ring active:ring"
        onChange={onChange}
        value={value}
      />
    </div>
  );
}
