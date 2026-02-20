import { get } from "../fetcher";
import { Category, Product } from "@/types/products";
import createUrlWithQuery from "../utils/createUrlWithQuery";
import getCategoryId from "./utils/getCategoryId";
import { createProducts } from "./utils/products";

const BASE_URL = "http://test.local/wp-json/wc/store/products";

async function getAllProducts(productsCap = 100): Promise<Product[]> {
  const res = await get(
    createUrlWithQuery(BASE_URL, [{ per_page: productsCap }]),
  );
  const products = createProducts(await res.json());
  return products;
}

async function getProductsByCategory(
  categorySlug: string,
  params?: Record<string, string | number>,
): Promise<Product[]> {
  const categoryId = await getCategoryId(categorySlug);
  const res = await get(
    createUrlWithQuery(BASE_URL, [{ category: categoryId }, { ...params }]),
  );
  const products = createProducts(await res.json());
  return products;
}

async function getProductCategories(): Promise<Category[]> {
  const res = await get(createUrlWithQuery(BASE_URL + "/categories"));
  return res.json();
}

export { getAllProducts, getProductCategories, getProductsByCategory };
