import { NextRequest, NextResponse } from "next/server";
import { setAuthSession } from "@/lib/sessions/auth";
import { jwt, wp } from "@/lib/api/kyApi";
import { JwtResponse } from "@/types/auth";
import { getErrorMessageAsync } from "@/lib/utils/errors";

export async function POST(req: NextRequest) {
  const { username, email, password } = await req.json();

  // Signup
  try {
    await wp
      .post("users", {
        json: {
          username,
          email,
          password,
          roles: ["customer"],
        },
      })
      .json();
  } catch (err: any) {
    const message = await getErrorMessageAsync(err);
    return NextResponse.json(
      { error: message || "Failed to create user" },
      { status: 400 },
    );
  }

  // Login
  try {
    const res = await jwt
      .post("token", {
        json: { username: email, password },
      })
      .json<JwtResponse>();

    await setAuthSession(res.token);

    return NextResponse.json({ ok: true }, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Account created, but failed to log in." },
      { status: 201 },
    );
  }
}
