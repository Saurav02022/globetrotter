import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Game from '@/components/game/Game'
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'

interface ChallengePageProps {
  params: {
    code: string
  }
}

export default async function ChallengePage({ params }: ChallengePageProps) {
  const supabase = createClient()
  
  // Check if user is authenticated
  const { data: { session } } = await supabase.auth.getSession()
  
  if (!session) {
    redirect('/login')
  }

  // Get challenge details
  const { data: challenge } = await supabase
    .from('challenges')
    .select(`
      *,
      creator:profiles(username, score)
    `)
    .eq('share_code', params.code)
    .single()

  if (!challenge) {
    redirect('/')
  }

  return (
    <div className="container mx-auto p-4">
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Challenge from {challenge.creator.username}</CardTitle>
          <CardDescription>
            Can you beat their score of {challenge.creator.score}?
          </CardDescription>
        </CardHeader>
      </Card>

      <Game session={session} challengeId={challenge.id} />
    </div>
  )
} 