import React from "react";
import Loading from "../loading";
import { Suspense } from "react";
import { Separator } from "@/components/ui/separator";
import { checkSubscription } from "@/lib/subscription";
import SubscriptionButton from "@/components/subs-button";
export default async function Settings() {
  const isPro = await checkSubscription();
  return (
    <Suspense fallback={<Loading />}>
      <div className="p-3 space-y-3">
        <p className=" text-3xl font-bold">Settings</p>
        <Separator />
        {isPro ? (
          <p>You are on premium plan.</p>
        ) : (
          <p>You need to upgrade to premium plan.</p>
        )}
        <SubscriptionButton isPro={isPro} />
      </div>
    </Suspense>
  );
}
