import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export const dynamic = 'force-dynamic'

export async function POST() {
  const cookieStore = cookies()
  const supabase = createClient()
  
  await supabase.auth.signOut()
  
  // Clear all cookies
  for (const cookie of cookieStore.getAll()) {
    cookieStore.delete(cookie.name)
  }
  
  return NextResponse.redirect(new URL('/', process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'), {
    status: 302
  })
} 