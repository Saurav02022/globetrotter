import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export default async function ProfileSetupPage() {
  const supabase = createClient()
  const { data: { session } } = await supabase.auth.getSession()

  if (!session) {
    redirect('/login')
  }

  async function updateUsername(formData: FormData) {
    'use server'
    
    const username = formData.get('username') as string
    if (!username) return

    const supabase = createClient()
    const { data: { session } } = await supabase.auth.getSession()
    
    if (!session) {
      redirect('/login')
    }

    await supabase
      .from('profiles')
      .update({
        username,
        username_set: true
      })
      .eq('id', session.user.id)

    redirect('/')
  }

  return (
    <div className="container flex items-center justify-center min-h-[calc(100vh-4rem)]">
      <Card className="w-[400px]">
        <CardHeader>
          <CardTitle>Set Your Username</CardTitle>
          <CardDescription>
            Choose a username that will be displayed on the leaderboard.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={updateUsername}>
            <div className="space-y-4">
              <input
                type="text"
                name="username"
                placeholder="Enter your username"
                required
                className="w-full px-3 py-2 border rounded-md"
              />
              <Button type="submit" className="w-full">
                Start Playing
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
} 