import CartMenu from "./CartMenu";
import NavItem from "./NavItem";
import { getNavItems } from "./navItems";
import {
  getProductCategories,
  getProductsByCategory,
} from "@/lib/api/woocommerce/products";
import NavbarClient from "./NavbarClient";
import { getAuthSession } from "@/lib/sessions/auth";

export default async function Navbar() {
  const shopCategories = await getProductCategories();
  const menus = [<CartMenu key={"cart"} />];
  const session = await getAuthSession();
  const shopMenus = await Promise.all(
    shopCategories.map(async (cat) => ({
      key: cat.id,
      category: cat,
      products: await getProductsByCategory(cat.slug),
    })),
  );
  const navItems = getNavItems(!!session);
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
