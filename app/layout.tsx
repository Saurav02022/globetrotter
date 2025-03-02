import './globals.css'
import type { Metadata } from 'next'
import * as React from 'react'
import { Inter } from 'next/font/google'
import { Toaster } from 'sonner'
import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Menu } from 'lucide-react'
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '@/components/ui/sheet'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Globetrotter - The Ultimate Travel Guessing Game',
  description: 'Test your knowledge of world destinations with cryptic clues and fun facts!',
}

async function Navigation() {
  const supabase = createClient()
  const { data: { session } } = await supabase.auth.getSession()

  type NavItem = {
    href: string
    label: string
    type?: 'button' | 'form'
    action?: string
  }

  const getNavItems = (isAuthenticated: boolean): NavItem[] => {
    if (isAuthenticated) {
      return [
        { href: '/leaderboard', label: 'Leaderboard' },
        { href: '/challenge', label: 'Challenges' },
        { href: '/profile', label: 'Profile' },
        { href: '/auth/sign-out', label: 'Sign Out', type: 'form', action: '/auth/sign-out' },
      ]
    }
    return [{ href: '/login', label: 'Sign In' }]
  }

  const NavLink = ({ 
    item, 
    isMobile = false 
  }: { 
    item: NavItem
    isMobile?: boolean 
  }) => {
    const buttonProps = {
      variant: isMobile || item.type === 'form' ? "ghost" : (item.label === 'Sign In' ? "default" : "ghost"),
      className: cn(isMobile && "w-full justify-start")
    } as const

    const content = (
      <Button {...buttonProps}>{item.label}</Button>
    )

    if (item.type === 'form') {
      return (
        <form action={item.action} method="POST">
          {content}
        </form>
      )
    }

    return (
      <Link href={item.href}>
        {content}
      </Link>
    )
  }

  const NavItems = ({ isMobile = false }: { isMobile?: boolean }) => {
    const items = getNavItems(!!session)

    if (isMobile) {
      return (
        <>
          {items.map((item) => (
            <SheetClose key={item.href} asChild>
              <NavLink item={item} isMobile />
            </SheetClose>
          ))}
        </>
      )
    }

    return (
      <>
        {items.map((item) => (
          <NavLink key={item.href} item={item} />
        ))}
      </>
    )
  }

  return (
    <header className="sticky top-0 z-50 border-b backdrop-blur-sm">
      <div className="container mx-auto px-4 h-14 flex items-center justify-between">
        <Link href="/" className="font-bold text-xl">
          Globetrotter
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-4">
          <NavItems />
        </nav>

        {/* Mobile Navigation */}
        <Sheet>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[80vw] sm:w-[385px]">
            <nav className="flex flex-col gap-4 mt-8">
              <NavItems isMobile />
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body className={cn(
        "min-h-screen bg-background font-sans antialiased",
        inter.className
      )}>
        <Navigation />
        <main className="flex-1">
          {children}
        </main>
        <Toaster />
      </body>
    </html>
  )
}
