import { getOrSetCartCookie } from "@/lib/cartSession";
import formatCheckout from "@/lib/api/woocommerce/utils/formatCheckout";
import ky from "ky";
import config from "@/lib/api/config";
import { NextResponse } from "next/server";
import { withErrorHandling } from "@/lib/api/utils/withErrorHandling";

const BASE_URL = `${config.woo}/checkout`;

export async function POST(req: Request) {
  return withErrorHandling(async () => {
    const session = await getOrSetCartCookie();
    const formattedDetails = formatCheckout(await req.json());
    const data = await ky
      .post(BASE_URL, {
        headers: {
          Cookie: session.cookieHeader,
          "Cart-Token": session.cartToken,
        },
        json: formattedDetails,
      })
      .json();
    return NextResponse.json({ data });
  });
}
