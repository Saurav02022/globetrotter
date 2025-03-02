export const dynamic = 'force-dynamic'

import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  console.log('=== Auth Callback Started ===')
  try {
    console.log('Request URL:', request.url)
    const requestUrl = new URL(request.url)
    const code = requestUrl.searchParams.get('code')
    console.log('Auth code exists:', !!code)
    console.log('Full URL params:', Object.fromEntries(requestUrl.searchParams))

    if (code) {
      console.log('Creating Supabase client...')
      const supabase = createClient()
      
      console.log('Exchanging code for session...')
      const { data, error } = await supabase.auth.exchangeCodeForSession(code)
      console.log('Session exchange result:', {
        hasSession: !!data?.session,
        hasUser: !!data?.session?.user,
        error: error || 'none'
      })
      
      if (error) {
        console.error('Session exchange error:', error)
        throw error
      }
      
      if (!data?.session?.user) {
        console.error('No user in session')
        throw new Error('No session user')
      }
      
      const userId = data.session.user.id
      console.log('User details:', {
        id: userId,
        email: data.session.user.email,
        lastSignIn: data.session.user.last_sign_in_at
      })
      
      // Wait a short moment for Supabase trigger to create the profile
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      console.log('Fetching user profile...')
      const { data: profile, error: profileError } = await supabase.from('profiles')
        .select('username_set')
        .eq('id', userId)
        .single()

      if(profileError){
        console.error('Profile fetch error:', profileError)

        if(profileError?.code === 'PGRST116'){
          console.log("code is PGRST116:-" + profileError.code)
          // Redirect to setup immediately if profile doesn't exist
          const response = NextResponse.redirect(new URL('/profile/setup', requestUrl.origin))
          
          // Copy over the Supabase auth cookies to maintain the session
          const cookieStore = await supabase.auth.getSession()
          Object.entries(cookieStore.data.session?.user || {}).forEach(([key, value]) => {
            response.cookies.set(key, value)
          })
          
          return response
        } else {
          console.error('Unexpected profile error:', profileError)
          throw profileError
        }
      }

      console.log('Profile state:', profile)

      // Check if username needs to be set
      if (!profile?.username_set) {
        const response = NextResponse.redirect(new URL('/profile/setup', requestUrl.origin))
        return response
      }
      
      console.log('Profile complete, proceeding to home')
      return NextResponse.redirect(new URL('/', requestUrl.origin))
    }

    console.log('No auth code, redirecting to login')
    return NextResponse.redirect(new URL('/login', requestUrl.origin))
  } catch (error) {
    console.error('=== Callback Error ===')
    console.error('Error details:', error)
    console.error('Error stack:', error instanceof Error ? error.stack : 'No stack trace')
    return NextResponse.redirect(new URL('/login', request.url))
  } finally {
    console.log('=== Auth Callback Completed ===')
  }
}