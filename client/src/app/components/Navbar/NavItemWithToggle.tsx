"use client"
import { ReactNode, useState, useRef, useEffect } from "react";
import NavItem from "./NavItem";
import useOutsideClick from "@/lib/utils/useOutsideClick";
import { StaticImageData } from "next/image";

interface Props {
  label: string;
  children: ReactNode;
  imgUrl?: string | StaticImageData;
  badge?: string | number;

}

export default function NavItemWithToggle({ label, children, imgUrl, badge }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  useOutsideClick(menuRef, () => setIsOpen(false));
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!dropdownRef.current) return;
    
    const dropdown = dropdownRef.current;
    const rect = dropdown.getBoundingClientRect();
    
    if (rect.right > window.innerWidth) {
      const overflow = rect.right - window.innerWidth;
      dropdown.style.transform = `translateX(-${overflow + 15}px)`;
    } else {
      dropdown.style.transform = 'translateX(0)';
    }
  }, [isOpen]);

  return (
    <div ref={menuRef} className="relative">
      <NavItem 
        label={label} 
        imgUrl={imgUrl}
        badge={badge}
        onClick={() => setIsOpen(prev => !prev)}
        isActive={isOpen}
      />
      <div 
        ref={dropdownRef}
        className={`absolute mt-1 left-0 top-full max-w-96 transition-transform ${isOpen ? "block" : "hidden"}`}
      >
        {children}
      </div>
    </div>
  );
}