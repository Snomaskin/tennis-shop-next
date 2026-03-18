import { getOrSetCartCookie } from "@/lib/cartSession";
import formatCheckout from "@/lib/api/woocommerce/utils/formatCheckout";
import ky, { HTTPError } from "ky";
import config from "@/lib/api/config";
import { NextResponse } from "next/server";

const BASE_URL = `${config.woo}/checkout`;

export async function POST(req: Request) {
  const session = await getOrSetCartCookie();
  const formattedDetails = formatCheckout(await req.json());

  try {
    const data = await ky
      .post(BASE_URL, {
        headers: {
          Cookie: session.cookieHeader,
          "Cart-Token": session.cartToken,
        },
        json: formattedDetails,
      })
      .json();

    return NextResponse.json({ ok: true, data });
  } catch (err) {
    if (err instanceof HTTPError) {
      const error = await err.response.json();
      return NextResponse.json(
        { ok: false, error },
        { status: err.response.status },
      );
    }
    return NextResponse.json(
      { ok: false, error: { message: "Internal server error" } },
      { status: 500 },
    );
  }
}
