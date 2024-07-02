"use client";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import Link from "next/link";

import React from "react";

export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <>
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <Link href="/dashboard" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Dashboard
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href="/customers" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Customers
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href="/history" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                History
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href="/settings" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Settings
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
      {/* // <nav
    //   className={cn("flex items-center space-x-4 lg:space-x-6", className)}
    //   {...props}
    // >
    //   <Link
    //     href="/dashboard"
    //     className="text-sm font-medium transition-colors hover:text-primary"
    //   >
    //     Dashboard
    //   </Link>
    //   <Link
    //     href="/new"
    //     className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
    //   >
    //     New Training
    //   </Link>
    //   <Link
    //     href="/history"
    //     className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
    //   >
    //     History
    //   </Link>
    //   <Link
    //     href="/settings"
    //     className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
    //   >
    //     Settings
    //   </Link>
    // </nav> */}
    </>
  );
}
