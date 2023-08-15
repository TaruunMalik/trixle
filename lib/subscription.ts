import { auth } from "@clerk/nextjs";
import prismadb from "./prismadb";

const DAY_MILLI = 86_400_00;

export const checkSubscription = async () => {
  const { userId } = auth();

  if (!userId) {
    return false;
  }
  const userSubscription = await prismadb.userSubscription.findUnique({
    where: {
      userId: userId,
    },
    select: {
      stripeCurrentPeriodEnd: true,
      stripeCustomerId: true,
      stripePriceId: true,
      stripeSubscriptionId: true,
    },
  });
  if (!userSubscription) {
    return false;
  }

  const isValid =
    userSubscription.stripePriceId &&
    userSubscription.stripeCurrentPeriodEnd?.getTime()! + DAY_MILLI >
      Date.now();
  return !!isValid;
};
