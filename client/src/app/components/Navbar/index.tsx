import NavbarClient from "./NavbarClient";
import ShopMenu from "./ShopMenu";
import { getProductCategories } from "@/lib/api/woocommerce/products";

export default async function Navbar() {
  const categories = await getProductCategories();

  return (
    <NavbarClient>
      <ShopMenu menuItems={categories} />
    </NavbarClient>
  )
}