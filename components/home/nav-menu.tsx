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
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components//ui/drawer'
import CreatePost from './create-post'
import { Button } from '../ui/button'

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
              <Button variant="outline">Home</Button>
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem className={clsx(navigationMenuTriggerStyle())}>
          {isMobile ? (
            <Drawer>
              <DrawerTrigger asChild>
                <Button variant="outline">Post</Button>
              </DrawerTrigger>
              <DrawerContent>
                <DrawerHeader>
                  <DrawerTitle>Post a Tweet</DrawerTitle>
                  <DrawerDescription>
                    Write down whatever youre feeling. Only once per 24 hours.
                  </DrawerDescription>
                </DrawerHeader>
                <CreatePost />
              </DrawerContent>
            </Drawer>
          ) : (
            <Dialog>
              <DialogTrigger>
                <Button variant="outline">Post</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Post a Tweet</DialogTitle>
                  <DialogDescription>
                    Write down whatever youre feeling. Only once per 24 hours.
                  </DialogDescription>
                </DialogHeader>
                <CreatePost />
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
              <Button variant="outline">Settings</Button>
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}
