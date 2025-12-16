import { NextResponse } from "next/server";
import { getOrCreateCartSession } from "@/lib/session";

export async function GET() {
  const sessionId = getOrCreateCartSession();

  return NextResponse.json({ sessionId });
}