import NavbarClient from "./NavbarClient";
import ShopMenu from "./ShopMenu";
import { fetchCategories } from "@/api/woocommerce/products";

export default async function Navbar() {
  const categories = await fetchCategories();

  return (
    <NavbarClient>
      <ShopMenu menuItems={categories} />
    </NavbarClient>
  )
}