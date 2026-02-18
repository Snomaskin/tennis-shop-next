import NavItemWithToggle from "../NavItemWithToggle";
import MenuItem from "./MenuItem";
import { Category } from "@/types/products";

export default function ShopMenu({ menuItems }: { menuItems: Category[] }) {
  return (
    <NavItemWithToggle label="Shop">
      <div className="relative top-2  left-1/2 -translate-x-1/2 w-70 h-20 rounded-2xl bg-white/90 z-50 max-w-7xl mx-auto px-6 py-4 flex items-center justify-center gap-4 shadow-md ">
        {menuItems.map((item) => (
          <MenuItem key={item.id} item={item} />
        ))}
      </div>
    </NavItemWithToggle>
  );
}
