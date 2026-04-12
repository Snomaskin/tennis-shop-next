import config from "../config";
import { jwt } from "../kyApi";

export default async function getAdminToken(): Promise<string> {
  const res = await jwt
    .post("token", {
      json: {
        username: config.wpAdminUser,
        password: config.wpAdminPw,
      },
    })
    .json<{ token: string }>();
  return res.token;
}
