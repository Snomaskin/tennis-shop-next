"use client";
import { ReactNode, useState, useRef, useEffect } from "react";
import NavItem from "./NavItem";
import useOutsideClick from "@/lib/utils/useOutsideClick";
import { StaticImageData } from "next/image";

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
  const [translateX, setTranslateX] = useState<string | null>(null);

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

  // Posistioning to stop overflow on screen resize:
  useEffect(() => {
    if (!open) return;

    const handleResize = () => {
      if (!dropdownRef.current) return;
      const rect = dropdownRef.current.getBoundingClientRect();

      if (rect.right > window.innerWidth) {
        const overflow = rect.right - window.innerWidth;
        setTranslateX(`-${overflow + 15}px`);
      } else {
        setTranslateX("0px");
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [open]);

  const handleClick = () => {
    onClick?.();
    setIsSticky((prev) => !prev);
  };

  return (
    <div
      ref={menuRef}
      className="relative shrink-0"
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
        style={{
          transform: translateX ? `translateX(${translateX})` : undefined,
        }}
        className={`absolute top-full left-0 max-w-96 pt-3 transition-transform ${
          open ? "block" : "hidden"
        }`}
      >
        {children}
      </div>
    </div>
  );
}
