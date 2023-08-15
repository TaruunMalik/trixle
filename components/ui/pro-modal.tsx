"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./dialog";
import { useModal } from "@/hooks/user-modal-subs";
import { Separator } from "./separator";
import { Button } from "./button";
import { useToast } from "./use-toast";
import { useEffect, useState } from "react";
import axios from "axios";
export const ProModal = () => {
  const proModal = useModal();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);
  const onSubscribe = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/stripe");
      window.location.href = response.data.url;
    } catch (error) {
      toast({
        variant: "destructive",
        description: "Something is wrong, please try again!",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={proModal.isOpen} onOpenChange={proModal.onClose}>
      <DialogContent>
        <DialogHeader className=" space-y-3">
          <DialogTitle className=" text-center ">Upgrade to Pro</DialogTitle>
        </DialogHeader>
        <Separator />
        <DialogDescription>
          You need to{" "}
          <span className=" text-sky-500 cursor-pointer" onClick={onSubscribe}>
            upgrade to premium
          </span>{" "}
          subscription to create your own AI Bot!
        </DialogDescription>
        <Separator />
        <div className=" flex justify-between items-center w-full">
          <p className=" text-primary">
            <span className=" font-bold text-2xl ">₹50</span>
            .00/day
          </p>
          <Button disabled={loading} variant="premium" onClick={onSubscribe}>
            Subscribe
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
