import prisma from "@/app/lib/next-auth/prisma";
import { NextResponse } from "next/server"
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function  POST(request: Request) {

  const { sessionId } = await request.json();

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    // const existingPurchase = await prisma.purchase.findFirst({
    //   where: {
    //     userId: session.client_reference_id!,
    //     bookId: session.metadata?.bookId,
    //   },
    // });

    if (session.metadata?.bookId) {
      const purchase = await prisma.purchase.create({
        data: {
          userId: session.client_reference_id!,
          bookId: session.metadata.bookId,
        },
      });
      return NextResponse.json({ purchase });
    } else {
      return NextResponse.json({ error: "購入情報が不完全です。" }, { status: 400 });
    }

  } catch(err) {
    return NextResponse.json(err);
  }
}