import NavbarClient from "./NavbarClient";
import ShopMenubar from "./ShopMenubar";
import { fetchCategories } from "@/api/woocommerce/products";

export default async function Navbar() {
  const categories = await fetchCategories();
  return (
    <NavbarClient>
      <ShopMenubar menuItems={categories} />
    </NavbarClient>
  )
}