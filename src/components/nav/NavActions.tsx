import React from "react";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { getUser } from "@/lib/auth-server";
import { UserButton } from "../user-button";
import Link from "next/link";

const NavActions = async () => {
  const user = await getUser();

  return (
    <NavigationMenu>
      <NavigationMenuList className="flex items-center gap-2">
        {user ? (
          <NavigationMenuItem>
            <UserButton />
          </NavigationMenuItem>
        ) : (
          <>
            <NavigationMenuItem>
              <Button
                asChild
                variant="ghost"
                className="text-muted-foreground hover:text-foreground"
              >
                <Link href="/auth/sign-in">Sign In</Link>
              </Button>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Button asChild className="shadow-md shadow-primary/20">
                <Link href="/auth/sign-up">Get Started</Link>
              </Button>
            </NavigationMenuItem>
          </>
        )}
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default NavActions;
