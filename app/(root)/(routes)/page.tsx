import React from "react";
import { UserButton, currentUser } from "@clerk/nextjs";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import SearchInput from "@/components/SearchInput";
import prismadb from "@/lib/prismadb";
import Categories from "@/components/Categories";
import AIBots from "@/components/AIBots";
import Loading from "./loading";
import { Suspense } from "react";
interface RootPageProps {
  searchParams: {
    categoryId: string;
    name: string;
  };
}

export default async function RootPage({ searchParams }: RootPageProps) {
  const categories = await prismadb.category.findMany();
  const user = await currentUser();
  const data = await prismadb.aI.findMany({
    where: {
      categoryId: searchParams.categoryId,
      name: {
        search: searchParams.name,
      },
    },
    orderBy: {
      createdAt: "desc",
    },
    // include: {
    //   _count: {
    //     select: {
    //       messages: true,
    //     },
    //   },
    // },
  });
  return (
    <Suspense fallback={<Loading />}>
      <div className=" h-full p-4 space-y-3">
        <p className=" text-lg">
          Hi, <Link href="/user-profile">{user?.firstName}</Link>, you can
          access your profile by clicking{" "}
          <Link href="/user-profile" className=" underline">
            here
          </Link>
          .
        </p>
        <SearchInput />
        <Categories data={categories} />
        <Suspense fallback={<Loading />}>
          <AIBots data={data} />
        </Suspense>
      </div>
    </Suspense>
  );
}
