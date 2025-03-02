import { cookies } from 'next/headers'
import { ResponseCookie } from 'next/dist/compiled/@edge-runtime/cookies'

export type CookieStore = {
  get(name: string): { value: string | undefined }
  set(options: ResponseCookie): void
}

export async function createCookieStore(): Promise<CookieStore> {
  const cookieStore = await cookies()
  return {
    get(name: string) {
      const cookie = cookieStore.get(name)
      return { value: cookie?.value }
    },
    set(options: ResponseCookie) {
      cookieStore.set(options)
    }
  }
} 