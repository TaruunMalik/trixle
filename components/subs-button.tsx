"use client";
import axios from "axios";
import React, { useState } from "react";
import { useToast } from "./ui/use-toast";
import { Button } from "./ui/button";

interface SubscriptionButtonProps {
  isPro?: boolean;
}

export default function SubscriptionButton({ isPro }: SubscriptionButtonProps) {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const handleSubscription = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/api/stripe");

      window.location.href = res.data.url;
    } catch (error) {
      toast({
        variant: "destructive",
        description: "something does not work!",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      disabled={loading}
      onClick={handleSubscription}
      variant={isPro ? "default" : "premium"}
    >
      {isPro ? "Manage Premium Account" : "Upgrade to Premium"}
    </Button>
  );
}
