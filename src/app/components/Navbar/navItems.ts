import question from "@/assets/question.png";
import { LogIn } from "lucide-react";

const navItems = [
  { key: "about", label: "About us", href: "/about", imgUrl: question },
  { key: "login", label: "Sign in", href: "/login", imgComponent: LogIn },
];

export { navItems };
