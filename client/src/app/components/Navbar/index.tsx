import CartMenu from "./CartMenu";
import NavbarLayout from "./NavbarLayout";
import NavItem from "./NavItem";
import { navItems } from "./navItems";
import ShopMenu from "./ShopMenu";
import { getProductCategories } from "@/lib/api/woocommerce/products";

export default async function Navbar() {
  const shopCategories = await getProductCategories();
  const menus = [
    <ShopMenu key={"shop"} menuItems={shopCategories} />,
    <CartMenu key={"cart"} />
  ];

  const staticItems = navItems.map(item => (
    <NavItem key={item.key} label={item.label} href={item.href} />));

  return (
    <NavbarLayout navItems={[...menus, ...staticItems]}/>
  );
}