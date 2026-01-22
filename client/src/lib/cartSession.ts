import { cookies } from "next/headers";

export type CartSession = {
  cookieHeader: string;
  cartToken: string;
};

export async function getOrSetCartCookie(): Promise<CartSession> {
  const cookieStore = await cookies();
  let token = cookieStore.get("cart_token")?.value;

  if (!token) {
    const res = await fetch("http://test.local/wp-json/wc/store/cart");
    const newToken = res.headers.get("Cart-Token");

    if (!newToken) {
      throw new Error("'Cart-Token' header missing");
    }

    token = newToken;
    cookieStore.set("cart_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 30,
    });
  }

  return {
    cookieHeader: `cart_token=${token}`,
    cartToken: token,
  };
}