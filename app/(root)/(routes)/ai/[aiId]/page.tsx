import React from "react";
import AiForm from "./components/aiForm";
import prismadb from "@/lib/prismadb";
interface aiIdPageProps {
  params: {
    aiId: string;
  };
}

// ctrl + shift + P

export default async function aiIdPage({ params }: aiIdPageProps) {
  // to check subscription

  const aiChat = await prismadb.aI.findUnique({
    where: {
      id: params.aiId,
    },
  });

  const categories = await prismadb.category.findMany();

  return (
    <div>
      <AiForm initialData={aiChat} categories={categories} />
    </div>
  );
}
