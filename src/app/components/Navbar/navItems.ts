import question from "@/assets/question.png";
import { LogIn, LucideIcon, User } from "lucide-react";
import { StaticImageData } from "next/image";

type NavItemType = {
  key: string;
  label: string;
  href: string;
  imgUrl?: StaticImageData;
  imgComponent?: LucideIcon;
};
const getNavItems = (session: boolean): NavItemType[] => {
  return [
    { key: "about", label: "About", href: "/about", imgUrl: question },
    session
      ? {
          key: "account",
          label: "My account",
          href: "/account",
          imgComponent: User,
        }
      : { key: "login", label: "Sign in", href: "/login", imgComponent: LogIn },
  ];
};

export { getNavItems };
