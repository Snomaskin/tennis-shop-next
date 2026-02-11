import Link from "next/link";
import Image from "next/image";
import ballIcon from "@/assets/ball-colored.png";
import { ReactNode } from "react";

export default function NavbarLayout({ navItems }: { navItems: ReactNode[] }) {

  return (
    <nav className="fixed w-full bg-white/80 backdrop-blur-md z-50 border-gray-200 border-1 px-3 py-2 flex items-center justify-between">
      <Link href={"/"} className="relative w-15 h-10 bg-gradient-to-br from-green-100 to-green-500 rounded-lg flex items-center justify-center hover:scale-105 duration-300 cursor-pointer">
        <div className="absolute left-1/2 h-full w-[1px] bg-white" />
          <Image src={ballIcon} alt={"ball"} height={100} width={100} className="mr-4 h-5 w-5 z-10 rotate-20" />
      </Link>
      <div className="flex items-center gap-2 lg:gap-8">

        {navItems}

        <button className="bg-emerald-500 whitespace-nowrap text-white px-6 py-2 rounded-full hover:shadow-lg hover:scale-105 duration-300 font-medium cursor-pointer">
          Sign In
        </button>
      </div>
    </nav>
  )
}