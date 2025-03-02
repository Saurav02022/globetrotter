import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default async function ChallengePage() {
  const supabase = createClient()
  const { data: { session } } = await supabase.auth.getSession()

  if (!session) {
    redirect('/login')
  }

  // Fetch user's challenges
  const { data: challenges } = await supabase
    .from('challenges')
    .select(`
      *,
      creator:profiles(username, score)
    `)
    .or(`creator_id.eq.${session.user.id}`)
    .order('created_at', { ascending: false })

  return (
    <div className="container mx-auto p-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Challenges</h1>
          <Link href="/play">
            <Button>Create New Challenge</Button>
          </Link>
        </div>

        <div className="space-y-6">
          {challenges?.length === 0 ? (
            <Card>
              <CardContent className="py-8 text-center">
                <p className="text-muted-foreground">No challenges yet. Create one to start competing with friends!</p>
              </CardContent>
            </Card>
          ) : (
            challenges?.map((challenge) => (
              <Card key={challenge.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>Challenge by {challenge.creator.username}</CardTitle>
                      <CardDescription>
                        Created {new Date(challenge.created_at).toLocaleDateString()}
                      </CardDescription>
                    </div>
                    <div className="flex gap-2">
                      <Link href={`/challenge/${challenge.share_code}`}>
                        <Button variant="outline">Play</Button>
                      </Link>
                      <Link href={`/challenge/share/${challenge.share_code}`}>
                        <Button>Share</Button>
                      </Link>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm text-muted-foreground">Creator's Score</p>
                      <p className="text-2xl font-bold">{challenge.creator.score}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Expires</p>
                      <p className="text-sm">
                        {new Date(challenge.expires_at).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  )
} 