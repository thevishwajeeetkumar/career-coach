import { db } from "@/lib/prisma";
import { checkUser } from "@/lib/checkUser";

/**
 * Gate a page for Pro users. Non-Pro users get redirected to the marketing page.
 * @param {string} nonProRedirect - where to send non-Pro users (default: /pro-features)
 */
export async function requireProOrRedirect(nonProRedirect = "/pro-features") {
  const user = await checkUser();
  if (!user?.id) return { redirectTo: "/login" };

  const me = await db.user.findUnique({
    where: { id: user.id },
    select: { pro: true },
  });

  if (!me?.pro) return { redirectTo: nonProRedirect };   // <-- key change
  return { user };
}
