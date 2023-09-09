import React, { Suspense } from "react";
import prismadb from "@/lib/prismadb";
import EditUserProfile from "./components/edit-user-form";
import { Users } from "@prisma/client";
interface ProfileEditPageProps {
  params: { userId: string };
}

export default async function ProfilePage({ params }: ProfileEditPageProps) {
  const user = await prismadb.users.findUnique({
    where: {
      id: params.userId,
    },
  });

  return (
    <div className=" h-full m-2 relative">
      <EditUserProfile user={user as Users} />
    </div>
  );
}
