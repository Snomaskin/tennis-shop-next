import { ReactNode } from "react";
import NavbarLogo from "./NavbarLogo";

export default function NavbarLayout({ navItems }: { navItems: ReactNode[] }) {
  return (
    <nav className="fixed z-50 flex h-20 w-full items-center justify-between border border-neutral-200/60 bg-white/80 px-3 py-2">
      <NavbarLogo />
      <div className="flex items-center gap-2 lg:gap-8">{navItems}</div>
    </nav>
  );
}
