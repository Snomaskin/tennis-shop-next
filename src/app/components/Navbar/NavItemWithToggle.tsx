"use client";
import { ReactNode, useState, useRef, useEffect } from "react";
import NavItem from "./NavItem";
import useOutsideClick from "@/lib/utils/useOutsideClick";
import { StaticImageData } from "next/image";
import positionElementToScreen from "@/lib/utils/positionElementToScreen";

export interface NavItemWithToggleProps {
  label: string;
  children: ReactNode;
  imgUrl?: string | StaticImageData;
  badge?: string | number;
  onClick?: () => void;
  href?: string;
  isOpen?: boolean;
  onOpen?: () => void;
  onClose?: () => void;
}

export default function NavItemWithToggle({
  label,
  children,
  imgUrl,
  badge,
  onClick,
  href,
  isOpen,
  onOpen,
  onClose,
}: NavItemWithToggleProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const controlled = isOpen !== undefined;
  const open = controlled ? isOpen : internalOpen;

  const menuRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useOutsideClick(menuRef, () => {
    controlled ? onClose?.() : setInternalOpen(false);
    setIsSticky(false);
  });

  useEffect(() => {
    if (!open) {
      setIsSticky(false);
      return;
    }

    const timer = setTimeout(() => {
      setIsSticky(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    return positionElementToScreen(dropdownRef);
  }, [open]);

  const handleClick = () => {
    onClick?.();
    setIsSticky((prev) => !prev);
  };

  return (
    <>
      <div
        ref={menuRef}
        className="shrink-0"
        onMouseEnter={() => (controlled ? onOpen?.() : setInternalOpen(true))}
        onMouseLeave={() =>
          !isSticky && (controlled ? onClose?.() : setInternalOpen(false))
        }
        onClick={handleClick}
      >
        <NavItem
          label={label}
          imgUrl={imgUrl}
          badge={badge}
          isActive={open}
          href={href}
        />

        <div
          ref={dropdownRef}
          className={`fixed pt-0.5 ${open ? "block" : "hidden"}`}
        >
          {children}
        </div>
      </div>
    </>
  );
}
