import { useEffect } from "react";

export default function useOutsideClick<T extends HTMLElement>(ref: React.RefObject<T | null>, handler: () => void) {
    useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!ref?.current) return;
      if (!ref.current.contains(event.target as Node)) {
        handler();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    
    return () => {
        document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [ref, handler]);
}