import { getOrSetCartCookie } from "@/lib/sessions/cart";
import formatCheckout from "@/lib/api/woocommerce/utils/formatCheckout";
import { woo } from "@/lib/api/kyApi";
import { NextResponse } from "next/server";
import { withErrorHandling } from "@/lib/api/utils/withErrorHandling";
import { getAuthSession } from "@/lib/sessions/auth";

export async function POST(req: Request) {
  return withErrorHandling(async () => {
    const session = await getOrSetCartCookie();
    const token = await getAuthSession();
    const formattedDetails = formatCheckout(await req.json());

    const headers: Record<string, string> = {
      Cookie: session.cookieHeader,
      "Cart-Token": session.cartToken,
    };

    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    const data = await woo
      .post("checkout", {
        headers,
        json: formattedDetails,
      })
      .json();
    return NextResponse.json({ data });
  });
}
