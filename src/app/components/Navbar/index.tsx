import CartMenu from "./CartMenu";
import NavItem from "./NavItem";
import { navItems } from "./navItems";
import {
  getProductCategories,
  getProductsByCategory,
} from "@/lib/api/woocommerce/products";
import NavbarClient from "./NavbarClient";

export default async function Navbar() {
  const shopCategories = await getProductCategories();
  const menus = [<CartMenu key={"cart"} />];

  const shopMenus = await Promise.all(
    shopCategories.map(async (cat) => ({
      key: cat.id,
      category: cat,
      products: await getProductsByCategory(cat.slug),
    })),
  );

  const staticItems = navItems.map((item) => (
    <NavItem
      key={item.key}
      label={item.label}
      href={item.href}
      imgUrl={item.imgUrl}
      icon={item.imgComponent}
    />
  ));

  return (
    <NavbarClient
      shopMenus={shopMenus}
      otherItems={[...menus, ...staticItems]}
    />
  );
}
