import ky from "ky";
import config from "./config";
import { getBasicAuthHeader } from "./utils/getBasicAuthHeader";

const client = ky.create({
  prefixUrl: "/api",
  credentials: "include",
});

const wp = ky.create({
  prefixUrl: `${config.baseApi}/wp-json/wp/v2`,
  headers: {
    Authorization: `${getBasicAuthHeader(config.wpAdminUser, config.wpAdminPw)}`,
  },
});

const woo = ky.create({
  prefixUrl: `${config.baseApi}/wp-json/wc/store`,
  headers: {
    Authorization: `${getBasicAuthHeader(config.wooKey, config.wooSecret)}`,
  },
});

const wooV3 = ky.create({
  prefixUrl: `${config.baseApi}/wp-json/wc/v3`,
});

const jwt = ky.create({
  prefixUrl: `${config.baseApi}/wp-json/jwt-auth/v1`,
});

export { client, wp, woo, jwt, wooV3 };
