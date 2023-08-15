import { auth, currentUser } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";
import { stripe } from "@/lib/stripe";

import { absoluteUrl } from "@/lib/utils";

const settings = absoluteUrl("/settings");

export const GET = async () => {
  try {
    const { userId } = auth();
    const user = await currentUser();
    if (!user || !userId) {
      return new NextResponse("Unauthorized", { status: 400 });
    }
    const userSubsciption = await prismadb.userSubscription.findUnique({
      where: {
        userId: userId,
      },
    });
    if (userSubsciption && userSubsciption.stripeCustomerId) {
      const stripeSession = await stripe.billingPortal.sessions.create({
        customer: userSubsciption.stripeCustomerId,
        return_url: settings,
      });
      return new NextResponse(JSON.stringify({ url: stripeSession.url }));
    }

    const stripeSession = await stripe.checkout.sessions.create({
      success_url: settings,
      cancel_url: settings,
      payment_method_types: ["card"],
      mode: "subscription",
      billing_address_collection: "auto",
      customer_email: user.emailAddresses[0].emailAddress,
      line_items: [
        {
          price_data: {
            currency: "INR",
            product_data: {
              name: "Pro Services",
              description: "Create Custom AI Bot!",
            },
            unit_amount: 5000,
            recurring: {
              interval: "day",
            },
          },
          quantity: 1,
        },
      ],
      metadata: {
        userId,
      },
    });

    return new NextResponse(JSON.stringify({ url: stripeSession.url }));
  } catch (err) {
    console.log("[STRIPE ERROR]", err);
    return new NextResponse("Internal error", { status: 500 });
  }
};
