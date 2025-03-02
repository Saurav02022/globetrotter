import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import SharePageContent from '@/components/challenge/SharePageContent'
import { getBaseUrl } from '@/lib/utils'

interface SharePageProps {
  params: {
    code: string
  }
}

export default async function SharePage({ params }: SharePageProps) {
  const cookieStore = await cookies()
  const baseUrl = getBaseUrl()

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
        set(name: string, value: string, options: { expires?: Date }) {
          cookieStore.set({ name, value, ...options })
        },
        remove(name: string, options: { expires?: Date }) {
          cookieStore.set({ name, value: '', ...options })
        },
      },
    }
  )

  const { data: challenge } = await supabase
    .from('challenges')
    .select('*, creator:profiles(username, score)')
    .eq('share_code', params.code)
    .single()

  if (!challenge) {
    redirect('/play')
  }

  const shareUrl = `${baseUrl}/challenge/${params.code}`

  return (
    <main className="min-h-screen py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <SharePageContent
          shareUrl={shareUrl}
          creatorUsername={challenge.creator.username}
          creatorScore={challenge.creator.score}
        />
      </div>
    </main>
  )
} 