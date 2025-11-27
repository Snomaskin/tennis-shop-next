"use client"
import { ReactNode, useState, useRef, useEffect } from "react";
import NavItem from "./NavItem";

export default function ShopNav({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={menuRef} className="relative">
      <NavItem 
        label="Shop" 
        onClick={() => setIsOpen(prev => !prev)}
        isActive={isOpen}
      />
      <div className={`absolute ${isOpen ? "block" : "hidden"}`}>
        {children}
      </div>
    </div>
  );
}