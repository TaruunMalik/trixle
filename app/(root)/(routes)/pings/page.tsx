import { Button } from "@/components/ui/button";
import CreateUserBtn from "./components/create-user-btn";
import prismadb from "@/lib/prismadb";
import { currentUser } from "@clerk/nextjs";
import PingForm from "./components/ping-form";
import { Suspense } from "react";
import Loading from "../loading";
import Link from "next/link";
import PingPosts from "@/components/PingPosts";
export default async function Pings() {
  const user = await currentUser();
  let isUser = null;
  try {
    isUser = await prismadb.users.findUnique({
      where: {
        id: user?.id,
      },
    });
  } catch (error) {
    console.log(error);
  }

  return (
    <Suspense fallback={<Loading />}>
      <div className=" m-7">
        <div className=" w-full flex justify-between items-center">
          <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-5">
            See what&apos;s trending
          </h1>
          {isUser ? (
            <Link href={`/pings/${isUser.id}`}>
              <Button className=" font-normal"> Your Profile</Button>
            </Link>
          ) : (
            <CreateUserBtn />
          )}
        </div>
        {isUser ? (
          <div className=" w-full flex flex-col items-center justify-center max-h-screen overflow-y-auto">
            <PingForm isUser={isUser} />
          </div>
        ) : (
          <div className=" w-full bg-red-500">heeyewfewf</div>
        )}
        <PingPosts />
      </div>
    </Suspense>
  );
}
