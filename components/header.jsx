import React from "react";
import { Button } from "./ui/button";
import {
  PenBox, LayoutDashboard, FileText, GraduationCap,
  ChevronDown, Sparkles, Lock, Crown,
} from "lucide-react";
import Link from "next/link";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import { checkUser } from "@/lib/checkUser";
import { db } from "@/lib/prisma";
import ProCTA from "@/components/ProCTA";

/* --- mini helpers for dropdown rows/pills --- */
function ProPill({ kind }) {
  const base = "inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-medium";
  const cls = kind === "soon"
    ? "bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-200"
    : "bg-amber-100 text-amber-900 dark:bg-amber-900/40 dark:text-amber-200";
  return <span className={`${base} ${cls}`}>{kind === "soon" ? "Coming soon" : "Get Pro"}</span>;
}
function MenuRow({ href, title, subtitle, icon, trailing }) {
  return (
    <DropdownMenuItem asChild className="p-0">
      <Link href={href} className="group w-full px-2 py-2 rounded-md flex items-center gap-3 hover:bg-muted/70 transition">
        <div className="grid place-items-center h-8 w-8 rounded-lg bg-gradient-to-br from-muted to-muted/60 border">{icon}</div>
        <div className="flex-1 min-w-0">
          <div className="text-sm font-medium leading-none truncate">{title}</div>
          {subtitle ? <p className="text-xs text-muted-foreground leading-snug truncate">{subtitle}</p> : null}
        </div>
        {trailing ? <div className="ml-2">{trailing}</div> : null}
      </Link>
    </DropdownMenuItem>
  );
}
/* ------------------------------------------- */

export default async function Header() {
  const user = await checkUser();
  let isPro = false;
  if (user?.id) {
    const me = await db.user.findUnique({ where: { id: user.id }, select: { pro: true } });
    isPro = !!me?.pro;
  }

  return (
    <header className="fixed top-0 w-full border-b bg-background/80 backdrop-blur-md z-50 supports-[backdrop-filter]:bg-background/60">
      <nav className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" aria-label="Home">
          <Image src="/logo.png" alt="sensai Logo" width={200} height={60} className="h-12 py-1 w-auto object-contain" priority />
        </Link>

        <div className="flex items-center space-x-2 md:space-x-4">
          <SignedIn>
            {!isPro && (
              <div className="hidden md:block">
                <ProCTA href="/pro" tone="solid" size="default">Get Pro</ProCTA>
              </div>
            )}

            <Link href="/dashboard">
              <Button variant="outline" className="hidden md:inline-flex items-center gap-2">
                <LayoutDashboard className="h-4 w-4" />
                Industry Insights
              </Button>
              <Button variant="ghost" className="md:hidden w-10 h-10 p-0" aria-label="Dashboard">
                <LayoutDashboard className="h-4 w-4" />
              </Button>
            </Link>

            {/* Growth Tools */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4" />
                  <span className="hidden md:block">Growth Tools</span>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end" className="w-80 p-2">
                <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground">Free tools</div>
                <MenuRow href="/resume" title="Build Resume" subtitle="Create a clear, ATS-friendly resume" icon={<FileText className="h-4 w-4" />} />
                <MenuRow href="/ai-cover-letter" title="Cover Letter" subtitle="Turn resume + JD into a letter" icon={<PenBox className="h-4 w-4" />} />
                <MenuRow href="/interview" title="Interview Quizzes" subtitle="Question bank & tips" icon={<GraduationCap className="h-4 w-4" />} />

                <div className="my-2 border-t" />
                <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground">Pro features</div>

                <MenuRow
                  href={isPro ? "/pro/pro-tools/jd-match" : "/pro-features"}
                  title="JD ↔ Resume Match"
                  subtitle={isPro ? "Analyze alignment vs JD" : "See what’s missing for the JD"}
                  icon={<Sparkles className="h-4 w-4" />}
                  trailing={<ProPill kind={isPro ? "soon" : "pro"} />}
                />
                <MenuRow
                  href={isPro ? "/pro/pro-tools/ats" : "/pro-features"}
                  title="ATS Score"
                  subtitle={isPro ? "Formatting • verbs • keywords" : "Fix issues that block ATS"}
                  icon={<Sparkles className="h-4 w-4" />}
                  trailing={<ProPill kind={isPro ? "soon" : "pro"} />}
                />
                <MenuRow
                  href={isPro ? "/pro/pro-tools/history" : "/pro-features"}
                  title="Pro History"
                  subtitle={isPro ? "Keep a private log • export" : "Save results & export PDFs"}
                  icon={<Sparkles className="h-4 w-4" />}
                  trailing={<ProPill kind={isPro ? "soon" : "pro"} />}
                />
                <MenuRow
                  href={isPro ? "/pro/mock-interviews" : "/pro-features"}
                  title="Interview Prep Lite"
                  subtitle={isPro ? "Voice & video practice" : "Practice 5 role-based Qs"}
                  icon={isPro ? <Sparkles className="h-4 w-4" /> : <Lock className="h-4 w-4" />}
                  trailing={<ProPill kind={isPro ? "soon" : "pro"} />}
                />
              </DropdownMenuContent>
            </DropdownMenu>
          </SignedIn>

          <SignedOut>
            <SignInButton>
              <Button variant="outline">Sign In</Button>
            </SignInButton>
          </SignedOut>

          <SignedIn>
            <div className="relative">
              <UserButton
                appearance={{
                  elements: {
                    avatarBox: "w-10 h-10",
                    userButtonPopoverCard: "shadow-xl",
                    userPreviewMainIdentifier: "font-semibold",
                  },
                }}
                afterSignOutUrl="/"
              />
              {isPro && (
                <span className="absolute -top-1 -right-1 grid place-items-center rounded-full bg-amber-500 p-1 shadow-md" title="Pro" aria-label="Pro account">
                  <Crown className="h-3 w-3 text-white" />
                </span>
              )}
            </div>
          </SignedIn>
        </div>
      </nav>
    </header>
  );
}
