import { HTTPError } from "ky";

export async function withErrorHandling(
  handler: () => Promise<Response>,
): Promise<Response> {
  try {
    return await handler();
  } catch (err) {
    if (err instanceof HTTPError) {
      const error = await err.response.json();
      return Response.json({ error }, { status: err.response.status });
    }
    return Response.json(
      { error: { message: "Internal server error" } },
      { status: 500 },
    );
  }
}
