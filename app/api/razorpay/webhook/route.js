import { NextResponse } from "next/server";
import crypto from "crypto";
import { db } from "@/lib/prisma";

export const runtime = "nodejs";

export async function POST(req) {
  const signature = req.headers.get("x-razorpay-signature") || "";
  const eventId   = req.headers.get("x-razorpay-event-id") || null;

  const raw = await req.text();
  const expected = crypto
    .createHmac("sha256", process.env.RAZORPAY_WEBHOOK_SECRET)
    .update(raw)
    .digest("hex");

  if (signature !== expected) return NextResponse.json({ ok: false }, { status: 400 });

  const payload = JSON.parse(raw);

  if (eventId) {
    const dup = await db.payment.findFirst({ where: { eventId } });
    if (dup) return NextResponse.json({ ok: true }); // duplicate
  }

  if (payload?.event === "payment.captured") {
    const orderId   = payload?.payload?.payment?.entity?.order_id;
    const paymentId = payload?.payload?.payment?.entity?.id;

    if (orderId && paymentId) {
      await db.$transaction(async (tx) => {
        const pay = await tx.payment.findUnique({ where: { orderId } });
        if (!pay) return;

        if (pay.status !== "paid") {
          await tx.payment.update({ where: { orderId }, data: { status: "paid", paymentId, eventId: eventId ?? undefined } });
          await tx.user.update({ where: { id: pay.userId }, data: { pro: true, proSince: new Date() } });
        } else if (eventId) {
          await tx.payment.update({ where: { orderId }, data: { eventId } });
        }
      });
    }
  }

  return NextResponse.json({ ok: true });
}
