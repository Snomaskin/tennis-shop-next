import { getAuthSession, getUserId } from "@/lib/sessions/auth";
import AccountLanding from "./components/AccountLanding";
import { getOrders } from "@/lib/api/woocommerce/orders";

export default async function Account() {
  const userId = await getUserId();
  const token = await getAuthSession();
  if (!userId || !token) return null;
  const orders = await getOrders(userId);
  return <AccountLanding orders={orders} />;
}
