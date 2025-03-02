import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'

export default async function LoginPage() {
  const supabase = createClient()

  const { data: { session } } = await supabase.auth.getSession()

  if (session) {
    redirect('/')
  }

  return (
    <div className="container flex items-center justify-center min-h-[calc(100vh-4rem)]">
      <Card className="w-[400px]">
        <CardHeader>
          <CardTitle>Welcome to Globetrotter!</CardTitle>
          <CardDescription>
            Sign in to start your journey around the world.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action="/auth/sign-in" method="post">
            <Button className="w-full" size="lg">
              Continue with Google
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
} 