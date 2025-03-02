import { createClient } from '@/lib/supabase/server'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'

export default async function LeaderboardPage() {
  const supabase = createClient()

  const { data: topPlayers } = await supabase
    .from('profiles')
    .select('username, score, games_played')
    .order('score', { ascending: false })
    .limit(10)

  return (
    <div className="container mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle>Top Globetrotters</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {topPlayers?.map((player, index) => (
              <div
                key={player.username}
                className="flex items-center justify-between p-4 bg-muted rounded-lg"
              >
                <div className="flex items-center gap-4">
                  <span className="text-2xl font-bold">#{index + 1}</span>
                  <div>
                    <p className="font-semibold">{player.username}</p>
                    <p className="text-sm text-muted-foreground">
                      {player.games_played} games played
                    </p>
                  </div>
                </div>
                <div className="text-2xl font-bold">{player.score}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 