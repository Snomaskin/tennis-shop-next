import { getErrorMessageAsync } from "@/lib/utils/errors";
import { HTTPError } from "ky";
import { NextResponse } from "next/server";

export async function withErrorHandling(
  handler: () => Promise<Response>,
): Promise<Response> {
  try {
    return await handler();
  } catch (err) {
    const message = getErrorMessageAsync(err);
    if (err instanceof HTTPError) {
      return NextResponse.json(
        { error: message },
        { status: err.response.status },
      );
    }
    return NextResponse.json(
      { error: { message: "Internal server error" } },
      { status: 500 },
    );
  }
}
