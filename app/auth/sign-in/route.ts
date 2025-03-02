import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'
import { getBaseUrl } from '@/lib/utils'

export async function POST() {
  const supabase = createClient()

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${getBaseUrl()}/auth/callback`
    }
  })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ url: data.url })
} 