import { get } from "../fetcher";
import { WooCommerceProduct, Category } from "@/types/products";
import createUrlWithQuery from "@/api/utils/createUrlWithQuery";
import findCategoryBySlug from "./utils/findCategoryBySlug";

const BASE_URL = "http://test.local/wp-json/wc/store/products";

async function fetchAll(productsCap = 100) {
  return get<WooCommerceProduct[]>(createUrlWithQuery(BASE_URL, { "per_page": productsCap }));
}

async function fetchCategories() {
  return get<Category[]>(createUrlWithQuery(BASE_URL + "/categories"));
}

async function fetchProductsBySlug(slug: string, params?: Record<string, string | number>) {
  const categoryId = await findCategoryBySlug(slug);
  return get<WooCommerceProduct[]>(createUrlWithQuery(BASE_URL, { "category": categoryId, ...params }));
}

export { fetchAll, fetchCategories, fetchProductsBySlug }