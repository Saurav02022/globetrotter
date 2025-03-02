import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Game from '@/components/game/Game'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default async function HomePage() {
  const supabase = createClient()
  const { data: { session } } = await supabase.auth.getSession()

  if (!session) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-4xl font-bold mb-6">
          Welcome to Globetrotter
        </h1>
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          Test your knowledge of world destinations with cryptic clues and fun facts.
          Sign in to start your journey around the world!
        </p>
        <Link href="/login">
          <Button size="lg">Start Playing</Button>
        </Link>
      </div>
    )
  }

  // Check if username is set
  const { data: profile } = await supabase
    .from('profiles')
    .select('username_set')
    .eq('id', session.user.id)
    .single()

  if (!profile?.username_set) {
    redirect('/profile/setup')
  }

  return <Game session={session} />
}
