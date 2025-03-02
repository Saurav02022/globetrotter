import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Game from '@/components/game/Game'

interface ChallengePageProps {
  params: {
    code: string
  }
}

export default async function ChallengePage({ params }: ChallengePageProps) {
  const supabase = createClient()
  const { data: { session } } = await supabase.auth.getSession()

  if (!session) {
    redirect('/login')
  }

  // Fetch challenge details
  const { data: challenge } = await supabase
    .from('challenges')
    .select('*, creator:profiles(username, score)')
    .eq('share_code', params.code)
    .single()

  if (!challenge) {
    redirect('/challenge?error=not_found')
  }

  if (new Date(challenge.expires_at) < new Date()) {
    redirect('/challenge?error=expired')
  }

  return (
    <main className="min-h-screen flex flex-col">
      <div className="container mx-auto px-4 py-6">
        <div className="bg-muted rounded-lg p-4 mb-6">
          <h1 className="text-xl font-bold mb-2">Challenge by {challenge.creator.username}</h1>
          <p className="text-muted-foreground">
            Score to beat: {challenge.creator.score} points
          </p>
        </div>
      </div>
      <Game session={session} challengeId={challenge.id} />
    </main>
  )
} 