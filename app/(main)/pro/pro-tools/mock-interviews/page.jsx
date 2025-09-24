import { redirect } from "next/navigation";
import { requireProOrRedirect } from "@/lib/isPro";
import ComingSoon from "@/components/ComingSoon";

export default async function Page() {
  const gate = await requireProOrRedirect();
  if (gate.redirectTo) redirect(gate.redirectTo);

  return (
    <ComingSoon
      title="Interview Prep Lite (Voice & Video)"
      tagline="Practice real interviews — timed, structured, and recorded — to build confidence."
      whatItIs="A proper, role-based mock interview experience: 5 curated questions in a timed round with voice or video answers. Get a concise summary of strengths and improvements."
      whyItHelps={[
        "Simulates real conditions (timer, voice/video, structure)",
        "Builds fluency and reduces interview anxiety",
        "Reveals communication gaps you won’t see in text",
        "Creates a private library of attempts to review",
      ]}
      included={[
        "5 curated questions per role/level",
        "Voice & Video answers with local device support",
        "Quick summary: strengths, improvements, next steps",
        "Save attempt to history (private recordings)",
      ]}
      note="Live interviewer sessions and system design rounds are coming next — Pro users get first access."
    />
  );
}
