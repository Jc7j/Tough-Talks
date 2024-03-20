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
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { Drawer, DrawerContent, DrawerTrigger } from '@/components/ui/drawer'
import CreatePost from './home/create-post'
import { Button } from './ui/button'
import { useDialogOpen } from '@/lib/store/useDialogOpen'

export default function NavMenu() {
  const isMobile = useMediaQuery('(max-width: 767px)')
  const pathname = usePathname()
  const { open, setOpen } = useDialogOpen()

  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <Link href="/home" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              <Button
                variant="outline"
                className={clsx(
                  pathname === '/home' && 'bg-accent text-accent-foreground'
                )}
              >
                Home
              </Button>
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem className={clsx(navigationMenuTriggerStyle())}>
          {isMobile ? (
            <Drawer open={open} onOpenChange={setOpen}>
              <DrawerTrigger asChild>
                <Button variant="outline">Post</Button>
              </DrawerTrigger>
              <DrawerContent>
                <div className="px-5 pb-5">
                  <CreatePost />
                </div>
              </DrawerContent>
            </Drawer>
          ) : (
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger>
                <Button variant="outline">Post</Button>
              </DialogTrigger>
              <DialogContent>
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
              <Button
                variant="outline"
                className={clsx(
                  pathname === '/settings' && 'bg-accent text-accent-foreground'
                )}
              >
                Settings
              </Button>
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}
