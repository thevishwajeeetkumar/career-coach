"use client";
import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Crown, Sparkles, CheckCircle2, ArrowRight, Info,
} from "lucide-react";

export default function FeatureComingSoon({
  title,
  tagline,              // one-line elevator pitch
  whatItIs,             // short paragraph
  whyItHelps = [],      // bullet points (benefits)
  included = [],        // bullet points (what you'll get)
  note,                 // optional small hint/footnote
}) {
  const [isPro, setIsPro] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    fetch("/api/me/pro", { cache: "no-store" })
      .then(r => r.json())
      .then(d => { setIsPro(!!d.pro); setReady(true); })
      .catch(() => setReady(true));
  }, []);

  if (!ready) return null;

  return (
    <div className="container mx-auto px-4 py-10 max-w-4xl">
      <Card className="rounded-2xl">
        <CardHeader>
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <Sparkles className="h-5 w-5" />
              <div>
                <CardTitle>{title}</CardTitle>
                {tagline ? (
                  <CardDescription className="mt-1">{tagline}</CardDescription>
                ) : null}
              </div>
            </div>
            {!isPro ? (
                <ProCTA href="/pro" tone="solid" size="default">Get Pro (Early Access)</ProCTA>
                ) : (
                <span className="rounded-full bg-emerald-100 text-emerald-800 text-xs px-2 py-1">
                    You’re on Pro
                </span>
                )
            }
          </div>
        </CardHeader>

        <CardContent className="space-y-8">
          {/* What it is */}
          <section className="rounded-xl border p-5">
            <h3 className="font-medium mb-1">What it is</h3>
            <p className="text-sm text-muted-foreground">{whatItIs}</p>
          </section>

          {/* Why it helps */}
          {whyItHelps?.length ? (
            <section className="rounded-xl border p-5">
              <h3 className="font-medium mb-3">Why it helps</h3>
              <ul className="grid gap-2 md:grid-cols-2">
                {whyItHelps.map((b) => (
                  <li key={b} className="flex items-start gap-2 text-sm">
                    <CheckCircle2 className="h-4 w-4 mt-0.5 text-emerald-600" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}

          {/* What's included */}
          {included?.length ? (
            <section className="rounded-xl border p-5">
              <h3 className="font-medium mb-3">Included at launch</h3>
              <ul className="grid gap-2 md:grid-cols-2">
                {included.map((b) => (
                  <li key={b} className="flex items-start gap-2 text-sm">
                    <ArrowRight className="h-4 w-4 mt-0.5" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}

          {/* Note */}
          {note ? (
            <div className="flex items-start gap-2 text-xs text-muted-foreground">
              <Info className="h-4 w-4 mt-0.5" />
              <span>{note}</span>
            </div>
          ) : null}

          {/* CTA bottom duplicate for convenience */}
          {!isPro ? (
            <ProCTA href="/pro" tone="solid" size="default">
                Get Pro (Early Access)
            </ProCTA>
          ) : null}
        </CardContent>
      </Card>
    </div>
  );
}
