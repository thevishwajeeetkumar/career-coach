"use client";

import { useEffect, useState } from "react";
import Script from "next/script";
import PlanCard from "./PlanCard";
import { Card, CardContent } from "@/components/ui/card";
import { Crown } from "lucide-react";

const CORE_FEATURES = []; // ← now empty (everything is “coming soon”)

const COMING_SOON = [
  // previously “now”
  "JD ↔ Resume Keyword Match",
  "ATS Score & Feedback",
  "Tailored Cover Letters",
  "History & PDF Export",
  "Interview Prep Lite (Voice & Video, 5 Qs)",
  // already-coming
  "Voice interviews with real-time tips (enhanced)",
  "System design rounds with whiteboard",
  "Live interviewer sessions",
];

const PLANS = [
  { plan: "pro-monthly", label: "Pro Monthly", priceInINR: 299, period: "/month" },
  { plan: "pro-yearly",  label: "Pro Yearly",  priceInINR: 2499, period: "/year"  },
];

export default function ProPage() {
  const [isPro, setIsPro] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    fetch("/api/me/pro", { cache: "no-store" })
      .then((r) => r.json())
      .then((d) => {
        setIsPro(!!d.pro);
        setReady(true);
      })
      .catch(() => setReady(true));
  }, []);

  return (
    <>
      {/* Razorpay checkout */}
      <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="afterInteractive" />

      <div className="max-w-6xl mx-auto px-6 py-12 space-y-10">
        {/* Header */}
        <header className="flex flex-col gap-2">
          <div className="inline-flex items-center gap-2 rounded-full border px-3 py-1 w-fit text-xs">
            <Crown className="h-3.5 w-3.5 text-amber-500" />
            Pro Plan
          </div>
          <h1 className="text-3xl md:text-4xl font-bold">Upgrade your placement prep</h1>
          <p className="text-muted-foreground max-w-2xl">
            Get early access to every upcoming feature — from JD match and ATS feedback to voice/video mock interviews
            and system design rounds — delivered first to Pro users.
          </p>
        </header>

        {/* Plans */}
        <section className="grid gap-6 md:grid-cols-2">
          {PLANS.map((p) => (
            <PlanCard
              key={p.plan}
              plan={p.plan}
              label={p.label}
              priceInINR={p.priceInINR}
              period={p.period}
              features={CORE_FEATURES}   // ← empty, so “included” section hides
              comingSoon={COMING_SOON}   // ← everything shows here
              isPro={isPro}
            />
          ))}
        </section>

        {/* Optional overview card — you can keep this unchanged or tweak wording */}
        <section>
          <Card className="rounded-2xl">
            <CardContent className="p-6 md:p-8">
              <h2 className="text-xl font-semibold mb-2">What’s coming for Pro (early access)</h2>
              <div className="grid md:grid-cols-2 gap-6 mt-4">
                <div>
                  <h3 className="font-medium">JD ↔ Resume Match</h3>
                  <p className="text-sm text-muted-foreground">
                    Paste a job description and your resume to get a match %, missing keywords, and suggested phrasing.
                  </p>
                </div>
                <div>
                  <h3 className="font-medium">ATS Score & Feedback</h3>
                  <p className="text-sm text-muted-foreground">
                    Check formatting, action verbs, hard skills, and contact basics — with a prioritized fix list.
                  </p>
                </div>
                <div>
                  <h3 className="font-medium">Tailored Cover Letters</h3>
                  <p className="text-sm text-muted-foreground">
                    Turn your resume + JD into a clean, targeted cover letter ready to paste into applications.
                  </p>
                </div>
                <div>
                  <h3 className="font-medium">History & PDF Export</h3>
                  <p className="text-sm text-muted-foreground">
                    Keep a private log of checks and export clean PDFs when needed.
                  </p>
                </div>
                <div className="md:col-span-2">
                  <h3 className="font-medium">Interview Prep Lite (Voice & Video)</h3>
                  <p className="text-sm text-muted-foreground">
                    Practice 5 role-based questions with timed voice/video answers. Get a concise summary of strengths
                    and improvements. Live sessions & system design coming soon.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* If already Pro, small hint */}
        {ready && isPro && (
          <p className="text-sm text-emerald-700">
            You’re already on Pro — Growth Tools will show new features as they roll out.
          </p>
        )}
      </div>
    </>
  );
}
