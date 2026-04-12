import { NextRequest, NextResponse } from "next/server";
import { setAuthSession } from "@/lib/sessions/auth";
import { jwt } from "@/lib/api/kyApi";
import { JwtResponse } from "@/types/auth";
import { getErrorMessageAsync } from "@/lib/utils/errors";

export async function POST(req: NextRequest) {
  const { username, password } = await req.json();
  try {
    const res = await jwt
      .post("token", {
        json: { username, password },
      })
      .json<JwtResponse>();

    await setAuthSession(res.token);

    return NextResponse.json({ ok: true });
  } catch (err: any) {
    const message = await getErrorMessageAsync(err);

    return NextResponse.json(
      { error: message || "Failed to log in" },
      { status: 401 },
    );
  }
}
