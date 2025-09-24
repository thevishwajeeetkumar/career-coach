import { redirect } from "next/navigation";
import { requireProOrRedirect } from "@/lib/isPro";
import ComingSoon from "@/components/ComingSoon";

export default async function Page() {
  const gate = await requireProOrRedirect();
  if (gate.redirectTo) redirect(gate.redirectTo);

  return (
    <ComingSoon
      title="JD ↔ Resume Keyword Match"
      tagline="See exactly where your resume aligns — and what’s missing — for any job posting."
      whatItIs="Paste a job description and your resume text. We’ll analyze keyword coverage, missing skills, and role-specific terms so your resume speaks the recruiter’s language."
      whyItHelps={[
        "Improves ATS pass-through by aligning terminology",
        "Highlights missing skills to add or emphasize",
        "Saves time tailoring resumes per application",
        "Gives a clear, objective match percentage",
      ]}
      included={[
        "Keyword coverage vs JD (match %)",
        "Top missing terms & suggested phrasing",
        "Focus areas by section (skills, projects, summary)",
        "Save result to history (with PDF export)",
      ]}
      note="We’ll keep all checks private to your account; exportable when needed."
    />
  );
}
