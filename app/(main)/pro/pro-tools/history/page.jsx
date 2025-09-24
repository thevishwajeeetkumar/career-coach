import { redirect } from "next/navigation";
import { requireProOrRedirect } from "@/lib/isPro";
import ComingSoon from "@/components/ComingSoon";

export default async function Page() {
  const gate = await requireProOrRedirect();
  if (gate.redirectTo) redirect(gate.redirectTo);

  return (
    <ComingSoon
      title="Pro History & PDF Export"
      tagline="Track improvements, revisit past reports, and export whenever you need."
      whatItIs="A lightweight dashboard of your ATS checks, JD matches, and interview attempts. See progress over time and export any report for applications."
      whyItHelps={[
        "Keeps a single source of truth for your edits",
        "Makes it easy to resume work across sessions",
        "Exports clean PDFs for offline review",
        "Useful for mentor reviews and portfolio prep",
      ]}
      included={[
        "Chronological list of analyses",
        "Filters by role/level and tool",
        "CSV/PDF export on demand",
        "Trend snapshot for quick progress",
      ]}
      note="History is private to you; you control what you export or share."
    />
  );
}
