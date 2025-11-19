"use client"
import Link from "next/link";
import Image from "next/image";
import { navItems } from "./navItems";
import ballIcon from "@/assets/ball-colored.png";
import { ReactNode, useState, useEffect, useRef } from "react";

export default function NavbarClient({ children }: { children: ReactNode }) {
  const [toggleShopMenu, setToggleShopMenu] = useState(false);
  const shopMenuRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (shopMenuRef.current && !shopMenuRef.current.contains(event.target as Node)) {
        setToggleShopMenu(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    }
  }, []);

  return (
    <nav className="fixed w-full bg-white/80 backdrop-blur-md z-50 border-gray-200 border-1 px-6 py-4 flex items-center justify-between">
      <Link href={"/"} className="relative w-15 h-10 bg-gradient-to-br from-green-100 to-green-500 rounded-lg flex items-center justify-center hover:scale-105 duration-300 cursor-pointer">
        <div className="absolute left-1/2 h-full w-[1px] bg-white" />
          <Image src={ballIcon} alt={"ball"} height={100} width={100} className="mr-4 h-5 w-5 z-10 rotate-20" />
      </Link>
      <div className="flex items-center justify-center gap-8">
        <div ref={shopMenuRef} className="relative group">
          <button
            className={`
              h-10 px-1 py-0.5 lg:px-6 lg:py-2 text-center rounded-full duration-300 cursor-pointer
              text-gray-700 hover:text-emerald-600 hover:bg-green-100 hover:scale-105 hover:shadow-lg
              ${toggleShopMenu ? "text-emerald-600 bg-green-100 shadow-lg scale-105" : ""}
              group-hover:text-emerald-600 group-hover:bg-green-100 group-hover:shadow-lg group-hover:scale-105
            `}
            onClick={() => setToggleShopMenu(prev => !prev)}
          >
            Shop
          </button>

          <div className={`absolute ${toggleShopMenu ? "block" : "hidden"}`}>
            {children}
          </div>
        </div>
        
        {navItems.map(item => (
          <Link
            className="flex items-center h-10 px-1 py-0.5 lg:px-6 lg:py-2 text-center text-gray-700 hover:text-emerald-600 hover:bg-green-100 hover:scale-105 hover:shadow-lg rounded-full duration-300 cursor-pointer"
            key={item.key}
            href={item.href}  
          >
            <span className="text-black-100 text-shadow-2xl">{item.label}</span>
          </Link>
        ))}
        <button className="bg-gradient-to-r from-emerald-500 to-blue-600 text-white px-6 py-2 rounded-full hover:shadow-lg hover:scale-105 duration-300 font-medium cursor-pointer">
          Sign In
        </button>
      </div>
    </nav>
  )
}