import { NextResponse } from "next/server";
import { clearAuthSession } from "@/lib/sessions/auth";

export async function POST() {
  try {
    await clearAuthSession();

    return new NextResponse();
  } catch (err: any) {
    return NextResponse.json({ error: "Failed to log out" }, { status: 500 });
  }
}
