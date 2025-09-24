import { NextResponse } from "next/server";
import Razorpay from "razorpay";
import { db } from "@/lib/prisma";
import { checkUser } from "@/lib/checkUser"; 
export const runtime = "nodejs";

const PLAN_PRICES = {
  "pro-monthly": 299 * 100, // paise
  "pro-yearly":  2499 * 100,
};

export async function POST(req) {
  const { plan } = await req.json();
  const amount = PLAN_PRICES[plan];
  if (!amount) return NextResponse.json({ error: "Invalid plan" }, { status: 400 });

  const user = await checkUser();               // <-- get full user
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
  });

  const order = await razorpay.orders.create({
    amount,
    currency: "INR",
    notes: {
      plan,
      userId: user.id,                           // <-- record owner
      email: user.email || "",
      name: user.name || "",
    },
  });

  // persist pending payment
  await db.payment.create({
    data: {
      orderId: order.id,
      amount,
      currency: "INR",
      status: "created",
      plan,
      userId: user.id,                           // <-- from checkUser()
    },
  });

  return NextResponse.json({
    orderId: order.id,
    amount,
    currency: "INR",
    key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
    // (optional) pass prefill hints to client
    prefill: { name: user.name || "", email: user.email || "" },
  });
}
