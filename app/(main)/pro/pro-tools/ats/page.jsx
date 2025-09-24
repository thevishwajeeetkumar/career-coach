import { redirect } from "next/navigation";
import { requireProOrRedirect } from "@/lib/isPro";
import ComingSoon from "@/components/ComingSoon";

export default async function Page() {
  const gate = await requireProOrRedirect();
  if (gate.redirectTo) redirect(gate.redirectTo);

  return (
    <ComingSoon
      title="ATS Score & Feedback"
      tagline="A quick readiness check for Applicant Tracking Systems."
      whatItIs="Run your resume through checks recruiters care about: formatting, action verbs, hard-skill keywords, and contact basics. Get a score and concrete fixes."
      whyItHelps={[
        "Spots issues that cause ATS misreads",
        "Turns vague advice into actionable edits",
        "Benchmarks progress as you iterate",
        "Pairs well with JD matching for targeting",
      ]}
      included={[
        "Overall score (0–100)",
        "Per-dimension bars (formatting, verbs, keywords, contact)",
        "Prioritized fix list (quick wins first)",
        "One-click export as PDF (shareable)",
      ]}
      note="We’ll keep the scoring strict but fair — tuned for campus hiring and entry-level screening."
    />
  );
}
