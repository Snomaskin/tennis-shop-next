import { create } from "zustand";
import type { Category, Product, WooCommerceProduct } from "@/types/products";
import { FetchStatus } from "@/types/general";
import { fetchAll, fetchProductsBySlug } from "@/api/woocommerce/products";
import { createProducts } from "@/api/woocommerce/utils/products";
import { getErrorMessage } from "@/utils/errors";

interface ProductsState {
  products: Product[] | null;
  categories: Category[] | null;
  fetchStatus: FetchStatus;
  errorMessage: string | null;
  loadProducts: () => Promise<void>;
  loadProductsOfCategory: (category: string, params?: Record<string, string | number>) => Promise<void>;
  loadCategories: () => Promise<void>;
}

const useProducts = create<ProductsState>(set => {
    const runAction = async (stateKey: "products" | "categories", action: () => Promise<WooCommerceProduct[] | Category[]>) => {
      set({ fetchStatus: "loading", errorMessage: null });
        try {
          const res = await action();
          const data = stateKey === "products" ? createProducts(res as WooCommerceProduct[]) : res;
          set({ [stateKey]: data, fetchStatus: "success" });
        } catch (e) {
          const errorMessage = getErrorMessage(e);
          set({ errorMessage, fetchStatus: "error" });
        }
    }

  return {
    products: null,
    categories: null,
    fetchStatus: "idle",
    errorMessage: null,

    loadProducts: () => runAction("products", () => fetchAll()),
    loadProductsOfCategory: (category, params) => runAction("products", () => fetchProductsBySlug(category, params)),
    loadCategories: () => runAction("categories", async () => {
      const res = await fetch("/api/products/categories")
      return res.json();
    }),
  }
});

const useProductsState = () => 
  useProducts(state => ({
    products: state.products,
    categories: state.categories,
    fetchStatus: state.fetchStatus,
    errorMessage: state.errorMessage,
  }));

const useProductsActions = () => 
  useProducts(state => ({
    loadProducts: state.loadProducts,
    loadProductsOfCategory: state.loadProductsOfCategory,
    loadCategories: state.loadCategories,
  }));

export { useProducts, useProductsState, useProductsActions }