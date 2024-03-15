'use client'

import clsx from 'clsx'

import { useMediaQuery } from '@/lib/utils'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu'
import Link from 'next/link'

// Navigation Menu
// Inside NavgiationMenuContent is where we'll have the isMobile conditional

// Menu will consist of: Home (just a link), Settings (a Link to Settings page...), a Create Post (make this a modal or post depending on screen)
// Lets add what we are currently active on, so have CSS ready for that

export default function NavMenu() {
  const isMobile = useMediaQuery('(max-width: 767px)')
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <Link href="/home" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Home
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem className={clsx(navigationMenuTriggerStyle(), "px-2")}>
          Post
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href='/settings' legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Settings
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}
