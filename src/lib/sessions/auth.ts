import { cookies } from "next/headers";
import { cookieSettings } from "./cookieSettings";

async function getAuthSession(): Promise<string | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth_session")?.value;
  if (!token) return null;
  return token;
}

async function setAuthSession(token: string) {
  const cookieStore = await cookies();

  cookieStore.set("auth_session", token, cookieSettings);
}

async function clearAuthSession() {
  const cookieStore = await cookies();
  cookieStore.delete("auth_session");
}

async function getUserId(): Promise<number | null> {
  const token = await getAuthSession();
  if (!token) return null;
  const payload = JSON.parse(atob(token.split(".")[1]));
  return payload?.data?.user?.id || null;
}

export { getAuthSession, setAuthSession, clearAuthSession, getUserId };
