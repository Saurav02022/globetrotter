'use client'

import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { createClient } from '@/lib/supabase/client'

export default function AuthForm() {
  const supabase = createClient()

  return (
    <div className="w-full max-w-[400px] mx-auto p-4">
      <Auth
        supabaseClient={supabase}
        appearance={{ theme: ThemeSupa }}
        providers={['google']}
        view="sign_in"
        showLinks={false}
        onlyThirdPartyProviders={true}
        redirectTo={`${process.env.NEXT_PUBLIC_BASE_URL}/auth/callback`}
        queryParams={{
          access_type: 'offline',
          prompt: 'consent',
        }}
      />
    </div>
  )
} 