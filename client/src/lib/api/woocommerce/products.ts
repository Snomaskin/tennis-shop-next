import { get } from "../fetcher";
import { WooCommerceProduct, Category } from "@/types/products";
import createUrlWithQuery from "../utils/createUrlWithQuery";
import getCategoryId from "./utils/getCategoryId";

const BASE_URL = "http://test.local/wp-json/wc/store/products";

async function getAllProducts(productsCap = 100): Promise<WooCommerceProduct[]> {
  const res = await get(createUrlWithQuery(BASE_URL, { "per_page": productsCap }));
  return res.json();
}

async function getProductsByCategory(categorySlug: string, params?: Record<string, string | number>): Promise<WooCommerceProduct[]> {
  const categoryId = await getCategoryId(categorySlug);
  const res = await get(createUrlWithQuery(BASE_URL, { "category": categoryId, ...params }))
  return res.json();
}

async function getProductCategories(): Promise<Category[]> {
  const res = await get(createUrlWithQuery(BASE_URL + "/categories"));
  return res.json();
}

export { getAllProducts, getProductCategories, getProductsByCategory }