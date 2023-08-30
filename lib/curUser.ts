"use server";
import { currentUser } from "@clerk/nextjs";
import React from "react";

export default async function curUser() {
  const user = await currentUser();
  return user?.id as string;
}
