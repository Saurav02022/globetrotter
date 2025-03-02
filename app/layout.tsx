import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Toaster } from 'sonner'
import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Globetrotter - The Ultimate Travel Guessing Game',
  description: 'Test your knowledge of world destinations with cryptic clues and fun facts!',
}

async function Navigation() {
  const supabase = createClient()
  const { data: { session } } = await supabase.auth.getSession()

  return (
    <header className="border-b">
      <div className="container mx-auto px-4 h-14 flex items-center justify-between">
        <Link href="/" className="font-bold text-xl">
          Globetrotter
        </Link>

        <nav className="flex items-center gap-4">
          {session ? (
            <>
              <Link href="/leaderboard">
                <Button variant="ghost">Leaderboard</Button>
              </Link>
              <form action="/auth/sign-out" method="post">
                <Button variant="ghost">Sign Out</Button>
              </form>
            </>
          ) : (
            <Link href="/login">
              <Button>Sign In</Button>
            </Link>
          )}
        </nav>
      </div>
    </header>
  )
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navigation />
        {children}
        <Toaster />
      </body>
    </html>
  )
}
