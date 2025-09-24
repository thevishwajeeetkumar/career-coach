"use client";

import { useEffect, useState } from "react";
import ProCTA from "@/components/ProCTA";
import Link from "next/link";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Crown,
  Sparkles,
  Rocket,
  ShieldCheck,
  CheckCircle2,
  Star,
  ArrowRight,
  Lock,
} from "lucide-react";

const Bullets = ({ items }) => (
  <ul className="grid gap-2">
    {items.map((b) => (
      <li key={b} className="flex items-start gap-2 text-sm">
        <CheckCircle2 className="h-4 w-4 mt-0.5 text-emerald-600" />
        <span>{b}</span>
      </li>
    ))}
  </ul>
);

export default function ProMarketing() {
  const [isPro, setIsPro] = useState(false);

  useEffect(() => {
    fetch("/api/me/pro", { cache: "no-store" })
      .then((r) => r.json())
      .then((d) => setIsPro(!!d.pro))
      .catch(() => setIsPro(false));
  }, []);

  // Helper to choose route: when Pro vs when not Pro
  const linkFor = (whenPro, whenFree) => (isPro ? whenPro : whenFree);

  return (
    <div className="max-w-6xl mx-auto px-6 py-12 space-y-12">
      {/* Hero */}
      <section className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs mx-auto">
          <Crown className="h-3.5 w-3.5 text-amber-500" />
          Pro Plan
        </div>
        <h1 className="text-3xl md:text-4xl font-bold">
          Upgrade your placement prep with Pro
        </h1>
        <p className="text-muted-foreground max-w-3xl mx-auto">
          Tailor every application, pass ATS checks, and practice real voice/video
          mock interviews—everything in one place, built for campus & early-career hiring.
        </p>

        {/* Show CTAs only for non-Pro users */}
        {!isPro && (
          <div className="flex items-center justify-center gap-3 pt-1">
            <ProCTA href="/pro" tone="solid" size="lg">
              Get Pro
            </ProCTA>
            <ProCTA
              href="/"
              tone="outline"
              size="lg"
              icon={<Rocket className="h-4 w-4" />}
            >
              Continue Free
            </ProCTA>
          </div>
        )}
      </section>

      {/* Value props */}
      <section className="grid gap-4 md:grid-cols-3">
        <Card className="rounded-2xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5" /> Tailored Applications
            </CardTitle>
            <CardDescription>
              Stand out with JD-aligned resumes & letters.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            Match keywords, fix gaps, and ship targeted content faster.
          </CardContent>
        </Card>

        <Card className="rounded-2xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ShieldCheck className="h-5 w-5" /> ATS Confidence
            </CardTitle>
            <CardDescription>
              Fewer rejections due to formatting or keyword issues.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            Quick scoring + actionable fixes to clear automated screens.
          </CardContent>
        </Card>

        <Card className="rounded-2xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star className="h-5 w-5" /> Interview-ready
            </CardTitle>
            <CardDescription>
              Practice like the real thing—voice/video & timing.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            Build fluency, reduce anxiety, and review privately.
          </CardContent>
        </Card>
      </section>

      {/* Features (now) */}
      <section className="space-y-3">
        <div className="flex items-center gap-2">
          <Badge>Included now</Badge>
          <h2 className="text-xl font-semibold">Everything you unlock with Pro</h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card className="rounded-2xl">
            <CardHeader>
              <CardTitle>JD ↔ Resume Keyword Match</CardTitle>
              <CardDescription>
                See what aligns, what’s missing, and how to phrase it.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Bullets
                items={[
                  "Match % against JD keywords",
                  "Missing skills & suggested phrasing",
                  "Focus areas by section (skills, projects, summary)",
                  "Save to history & export as PDF",
                ]}
              />
              <div className="pt-2">
                <Link
                  href={isPro ? "/pro/pro-tools/jd-match" : "/pro-features"}
                  className="text-sm underline"
                >
                  Learn more about JD Match
                </Link>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-2xl">
            <CardHeader>
              <CardTitle>ATS Score & Feedback</CardTitle>
              <CardDescription>
                Pass automated screens with confidence.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Bullets
                items={[
                  "Overall score (0–100)",
                  "Formatting / Action verbs / Hard skills / Contact bars",
                  "Prioritized fix list (quick wins first)",
                  "One-click PDF export",
                ]}
              />
              <div className="pt-2">
                <Link
                  href={isPro ? "/pro/pro-tools/ats" : "/pro-features"}
                  className="text-sm underline"
                >
                  Learn more about ATS Score
                </Link>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-2xl">
            <CardHeader>
              <CardTitle>Tailored Cover Letters</CardTitle>
              <CardDescription>
                Turn your resume + JD into a crisp letter.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Bullets
                items={[
                  "Role-specific tone & structure",
                  "Company/role keyword infusion",
                  "Editable blocks you can tweak fast",
                  "Save versions per JD",
                ]}
              />
              <div className="pt-2">
                <Link
                  href={linkFor("/pro-tools/history", "/features/cover-letters")}
                  className="text-sm underline"
                >
                  Learn more about Cover Letters
                </Link>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-2xl">
            <CardHeader>
              <CardTitle>History & PDF Export</CardTitle>
              <CardDescription>
                Keep a private log and export when needed.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Bullets
                items={[
                  "Chronological list of checks",
                  "Filters by role, tool, date",
                  "CSV/PDF exports",
                  "Progress snapshot over time",
                ]}
              />
              <div className="pt-2">
                <Link
                  href={isPro ? "/pro/pro-tools/history" : "/pro-features"}
                  className="text-sm underline"
                >
                  Learn more about History
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Coming soon */}
      <section className="space-y-3">
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="gap-1">
            <Lock className="h-3.5 w-3.5" /> Coming soon — Pro gets early access
          </Badge>
          <h2 className="text-xl font-semibold">What’s launching next</h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card className="rounded-2xl">
            <CardHeader>
              <CardTitle>Interview Prep Lite (Voice & Video)</CardTitle>
              <CardDescription>Practice 5 role-based questions under time.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Bullets
                items={[
                  "Voice & video answers with device support",
                  "Quick strengths & improvement summary",
                  "Private history of attempts",
                  "Live sessions & system design later",
                ]}
              />
              <div className="pt-2">
                <Link
                  href={isPro ? "/pro/pro-tools/mock-interviews" : "/pro-features"}
                  className="text-sm underline"
                >
                  Learn more about Mock Interviews
                </Link>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-2xl">
            <CardHeader>
              <CardTitle>System Design & Live Sessions</CardTitle>
              <CardDescription>Higher-level rounds with human-like flow.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Bullets
                items={[
                  "Whiteboard/diagram support",
                  "Rubrics aligned to campus hiring",
                  "Option to book mentor sessions",
                  "Early access for Pro users",
                ]}
              />
              <div className="pt-2">
                <Link
                  href={isPro ? "/pro/pro-tools/system-design" : "/pro-features"}
                  className="text-sm underline"
                >
                  Learn more about System Design
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Final CTA — only for non-Pro */}
      {!isPro && (
        <section className="text-center space-y-3">
          <h3 className="text-xl font-semibold">Ready to unlock Pro?</h3>
          <p className="text-muted-foreground">
            One plan. Everything you need to personalize applications and practice like the real thing.
          </p>
          <ProCTA href="/pro" tone="solid" size="lg" className="gap-2">
            Get Pro <ArrowRight className="h-4 w-4" />
          </ProCTA>
          <div className="mt-2">
            <p className="text-xs text-muted-foreground">
              Secure UPI / Card payments via Razorpay.
            </p>
          </div>
        </section>
      )}
    </div>
  );
}
