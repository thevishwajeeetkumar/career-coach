import { NextResponse } from "next/server";
import crypto from "crypto";
import { db } from "@/lib/prisma";
import { checkUser } from "@/lib/checkUser";; // <-- use your helper

export const runtime = "nodejs";

export async function POST(req) {
  const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = await req.json();

  const user = await checkUser();                         // <-- full user
  if (!user) return NextResponse.json({ success: false, reason: "unauthorized" }, { status: 401 });

  const expected = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(`${razorpay_order_id}|${razorpay_payment_id}`)
    .digest("hex");

  if (expected !== razorpay_signature) {
    return NextResponse.json({ success: false, reason: "bad-signature" }, { status: 400 });
  }

  await db.$transaction(async (tx) => {
    const pay = await tx.payment.findUnique({ where: { orderId: razorpay_order_id } });
    if (!pay) throw new Error("order not found");

    // ensure the order belongs to the logged-in user
    if (pay.userId !== user.id) throw new Error("ownership mismatch");

    if (pay.status !== "paid") {
      await tx.payment.update({
        where: { orderId: razorpay_order_id },
        data: { status: "paid", paymentId: razorpay_payment_id },
      });
      await tx.user.update({
        where: { id: user.id },
        data: { pro: true, proSince: new Date() },
      });
    }
  });

  return NextResponse.json({ success: true });
}
