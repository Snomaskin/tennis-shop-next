"use client";
import { useState, ReactNode } from "react";
import NavbarLayout from "./NavbarLayout";
import { Category, Product } from "@/types/products";
import NavItemWithToggle from "./NavItemWithToggle";
import EmblaCarousel from "@/components/EmblaCarousel/EmblaCarousel";

interface Props {
  shopMenus: { key: number; category: Category; products: Product[] }[];
  otherItems: ReactNode[];
}

export default function NavbarClient({ shopMenus, otherItems }: Props) {
  const [openKey, setOpenKey] = useState<number | null>(null);

  const shopNodes = shopMenus.map((menu) => (
    <NavItemWithToggle
      key={menu.key}
      label={menu.category.name}
      imgUrl={menu.category.image.src}
      href={`/shop/${menu.category.slug}`}
      isOpen={openKey === menu.key}
      onOpen={() => setOpenKey(menu.key)}
      onClose={() => setOpenKey((k) => (k === menu.category.id ? null : k))}
    >
      <div className="relative top-2 left-1/2 z-50 mx-auto flex h-30 w-70 max-w-7xl -translate-x-1/2 items-center justify-center rounded-2xl bg-white/40 shadow-md backdrop-blur-lg">
        <EmblaCarousel
          products={menu.products}
          onClick={() => setOpenKey((k) => (k === menu.category.id ? null : k))}
        />
      </div>
    </NavItemWithToggle>
  ));

  return <NavbarLayout navItems={[...shopNodes, ...otherItems]} />;
}
