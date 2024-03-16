'use client'

import clsx from 'clsx'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { useMediaQuery } from '@/lib/utils'
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu'

// Navigation Menu
// Inside NavgiationMenuContent is where we'll have the isMobile conditional

// Menu will consist of: Home (just a link), Settings (a Link to Settings page...), a Create Post (make this a modal or post depending on screen)
// Lets add what we are currently active on, so have CSS ready for that

// This is same as :hover from '@components/ui/navigation-menu'

export default function NavMenu() {
  const isMobile = useMediaQuery('(max-width: 767px)')
  const pathname = usePathname()

  function activeLinkStyling(name: string): string | null {
    return pathname === name ? 'bg-accent text-accent-foreground' : null
  }

  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <Link href="/home" legacyBehavior passHref>
            <NavigationMenuLink
              className={clsx(
                navigationMenuTriggerStyle(),
                activeLinkStyling('/home')
              )}
            >
              Home
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem
          className={clsx(navigationMenuTriggerStyle())}
        >
          Post
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/settings" legacyBehavior passHref>
            <NavigationMenuLink
              className={clsx(
                navigationMenuTriggerStyle(),
                activeLinkStyling('/settings')
              )}
            >
              Settings
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}
