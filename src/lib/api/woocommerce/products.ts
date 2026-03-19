import { Category, Product } from "@/types/products";
import { woo } from "../kyApi";
import getCategoryId from "./utils/getCategoryId";
import { createProducts } from "./utils/products";

async function getAllProducts(productsCap = 100): Promise<Product[]> {
  const data = await woo
    .get("products", {
      searchParams: { per_page: productsCap },
    })
    .json<any[]>();

  return createProducts(data);
}

async function getProductsByCategory(
  categorySlug: string,
  params?: Record<string, string | number>,
): Promise<Product[]> {
  const categoryId = await getCategoryId(categorySlug);

  const data = await woo
    .get("products", {
      searchParams: {
        category: categoryId,
        ...params,
      },
    })
    .json<any[]>();

  return createProducts(data);
}

async function getProductCategories(): Promise<Category[]> {
  return woo.get("products/categories").json<Category[]>();
}

export { getAllProducts, getProductCategories, getProductsByCategory };
