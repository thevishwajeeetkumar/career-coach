"use client";

import { useCallback } from "react";
import { Check, Crown, Lock, Sparkles, BadgeInfo, Star } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import ProCTA from "@/components/ProCTA";

export default function PlanCard({
  plan,
  label,
  priceInINR,
  period,
  features,
  comingSoon = [],
  isPro = false,
}) {
  const startCheckout = useCallback(async () => {
    try {
      const res = await fetch("/api/razorpay/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan }),
      });
      const data = await res.json();
      if (!res.ok) {
        alert(data?.error || "Unable to create order");
        return;
      }
      const { orderId, amount, currency, key, prefill } = data;

      const rzp = new window.Razorpay({
        key,
        amount,
        currency,
        name: "Sens-AI Career Coach",
        description: `Upgrade: ${label}`,
        order_id: orderId,
        prefill: { name: prefill?.name || "", email: prefill?.email || "" },
        handler: async (response) => {
          const verify = await fetch("/api/razorpay/verify", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(response),
          });
          const ok = await verify.json();
          if (ok?.success) window.location.href = "/dashboard?upgraded=1";
          else alert("Verification failed. Contact support.");
        },
        theme: { color: "#111827" },
      });
      rzp.open();
    } catch (e) {
      console.error(e);
      alert("Something went wrong. Try again.");
    }
  }, [plan, label]);

  return (
    <Card className="rounded-2xl relative overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-amber-400 via-emerald-500 to-indigo-500" />
      <CardHeader className="pb-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Crown className="h-5 w-5 text-amber-500" />
            <CardTitle>{label}</CardTitle>
          </div>
          <div className="text-right">
            <div className="text-3xl font-semibold">₹{priceInINR}</div>
            <CardDescription>{period}</CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-6 space-y-6">
        {/* Core benefits (only if provided) */}
        {features?.length > 0 && (
          <section className="space-y-2">
            <div className="text-sm font-medium flex items-center gap-2">
              <Sparkles className="h-4 w-4" />
              Everything included in Pro
            </div>
            <ul className="grid gap-2">
              {features.map((f) => (
                <li key={f} className="text-sm flex items-start gap-2">
                  <Check className="h-4 w-4 mt-0.5 text-emerald-600" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Coming soon (early access) */}
        {comingSoon.length > 0 && (
          <section className="space-y-2">
            <div className="text-sm font-medium flex items-center gap-2">
              <BadgeInfo className="h-4 w-4" />
              {/* CHANGED LABEL */}
              Coming soon (get early access with Pro)
            </div>
            <ul className="grid gap-2">
              {comingSoon.map((f) => (
                <li key={f} className="text-sm flex items-start gap-2">
                  <Star className="h-4 w-4 mt-0.5 text-amber-500" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* CTA */}
        <div className="pt-2">
          {isPro ? (
            <ProCTA
              href="/dashboard"
              tone="outline"
              full
              size="default"
              icon={<Sparkles className="h-4 w-4" />}
            >
              You’re on Pro
            </ProCTA>
          ) : (
            <ProCTA
              href="#"
              onClick={(e) => {
                e.preventDefault();
                startCheckout();
              }}
              full
              size="default"
            >
              Upgrade to Pro
            </ProCTA>
          )}
          {!isPro && (
            <p className="text-xs text-muted-foreground mt-2 flex items-center gap-1">
              <Lock className="h-3 w-3" />
              Secure UPI / Card via Razorpay
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
