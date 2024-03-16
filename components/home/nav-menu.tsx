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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Drawer, DrawerContent, DrawerTrigger } from '@/components//ui/drawer'
import CreatePost from './create-post'

export default function NavMenu() {
  const isMobile = useMediaQuery('(max-width: 767px)')
  const pathname = usePathname()

  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <Link href="/home" legacyBehavior passHref>
            <NavigationMenuLink
              className={clsx(
                navigationMenuTriggerStyle(),
                pathname === '/home' && 'bg-accent text-accent-foreground'
              )}
            >
              Home
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem className={clsx(navigationMenuTriggerStyle())}>
          {isMobile ? (
            <Drawer>
              <DrawerTrigger asChild>Post</DrawerTrigger>
              <DrawerContent>Test</DrawerContent>
            </Drawer>
          ) : (
            <Dialog>
              <DialogTrigger>Post</DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Post a Tweet</DialogTitle>
                  <DialogDescription>
                    Write down whatever youre feeling. Only once per 24 hours.
                  </DialogDescription>
                  <CreatePost />
                </DialogHeader>
              </DialogContent>
            </Dialog>
          )}
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/settings" legacyBehavior passHref>
            <NavigationMenuLink
              className={clsx(
                navigationMenuTriggerStyle(),
                pathname === '/settings' && 'bg-accent text-accent-foreground'
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
