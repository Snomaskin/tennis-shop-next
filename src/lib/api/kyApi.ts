import ky from "ky";

const client = ky.create({
  prefixUrl: "/api",
  credentials: "include",
});

const wp = ky.create({
  prefixUrl: process.env.WP_PAGES_API_URL,
});

const woo = ky.create({
  prefixUrl: process.env.WOO_API_URL,
});

export { client, wp, woo };
