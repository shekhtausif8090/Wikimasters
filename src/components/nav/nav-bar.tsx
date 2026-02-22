import { BookOpen } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { UserButton } from "@/components/user-button";
import { getUser } from "@/lib/auth-server";
import NavActions from "./NavActions";
import { Suspense } from "react";
import Spinner from "../ui/spinner";

export default async function NavBar() {
  return (
    <nav className="w-full border-b bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="max-w-5xl mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-linear-to-br from-primary to-primary/70 text-primary-foreground shadow-md shadow-primary/20 group-hover:shadow-lg group-hover:shadow-primary/30 transition-all duration-300">
            <BookOpen className="w-5 h-5" />
          </div>
          <span className="font-bold text-xl tracking-tight text-foreground group-hover:text-primary transition-colors duration-300">
            Wikimasters
          </span>
        </Link>
        <Suspense fallback={<Spinner />}>
          <NavActions />
        </Suspense>
      </div>
    </nav>
  );
}
