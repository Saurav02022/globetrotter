import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getBaseUrl() {
  if (typeof window !== 'undefined') {
    return window.location.origin
  }
  
  // Reference: https://github.com/vercel/next.js/blob/canary/packages/next/src/server/web/spec-extension/adapters/headers.ts
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`
  }

  return `http://localhost:${process.env.PORT || 3000}`
}
