import type { ReactNode } from "react";
import {
  Code,
  Home,
  Sparkles,
} from "lucide-react"

export interface INavItem {
  title: string;
  href: string;
  icon: ReactNode;
  mIcon: ReactNode;
}

export const navItems: INavItem[] = [
  {
    title: "Dashboard",
    href: "/",
    icon: <Home className="h-6 w-6 ml-3" />, // Web Icon
    mIcon: <Home className="h-4 w-4" /> // Mobile Icon
  },
  {
    title: "CRUD",
    href: "/crud",
    icon: <Code className="h-6 w-6 ml-3" />, // Web Icon
    mIcon: <Code className="h-4 w-4" /> // Mobile Icon
  },
  {
    title: "Starter",
    href: "/starter",
    icon: <Sparkles className="h-6 w-6 ml-3" />, // Web Icon
    mIcon: <Sparkles className="h-4 w-4" /> // Mobile Icon
  }
]
