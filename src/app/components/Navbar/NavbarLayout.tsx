import { ReactNode } from "react";
import NavbarLogo from "./NavbarLogo";

export default function NavbarLayout({ navItems }: { navItems: ReactNode[] }) {
  return (
    <nav className="fixed z-50 flex h-20 w-full items-center justify-between border border-gray-200 bg-white/80 px-3 py-2 backdrop-blur-md">
      <NavbarLogo />
      <div className="flex items-center gap-2 lg:gap-8">
        {navItems}
        <button className="cursor-pointer rounded-full bg-emerald-500 px-6 py-2 font-medium whitespace-nowrap text-white duration-300 hover:scale-105 hover:shadow-lg">
          Sign In
        </button>
      </div>
    </nav>
  );
}
