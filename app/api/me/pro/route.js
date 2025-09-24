import { NextResponse } from "next/server";
import { checkUser } from "@/lib/checkUser";
import { db } from "@/lib/prisma";

export async function GET() {
  try {
    // 1. Check authentication
    const user = await checkUser();
    if (!user?.id) {
      return NextResponse.json({ pro: false }, { status: 200 });
    }

    // 2. Look up the user's pro flag from the DB
    const me = await db.user.findUnique({
      where: { id: user.id },
      select: { pro: true },
    });

    return NextResponse.json({ pro: !!me?.pro }, { status: 200 });
  } catch (err) {
    console.error("Error in /api/me/pro:", err);
    return NextResponse.json({ pro: false, error: "Internal server error" }, { status: 500 });
  }
}
