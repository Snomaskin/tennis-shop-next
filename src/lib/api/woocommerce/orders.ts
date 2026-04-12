import { Order } from "@/types/orders";
import { wooV3 } from "../kyApi";
import getAdminToken from "../utils/getAdminToken";

export async function getOrders(customerId: number): Promise<Order[]> {
  const token = await getAdminToken();
  return wooV3
    .get("orders", {
      headers: { Authorization: `Bearer ${token}` },
      searchParams: { customer: customerId, per_page: "50" },
      next: { revalidate: 30 },
    })
    .json<Order[]>();
}
