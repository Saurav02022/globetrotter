'use client'

import { Trophy } from 'lucide-react'
import ShareCard from '@/components/challenge/ShareCard'
import { useState } from 'react'
import { toast } from 'sonner'

interface SharePageContentProps {
  shareUrl: string
  creatorUsername: string
  creatorScore: number
}

export default function SharePageContent({ shareUrl, creatorUsername, creatorScore }: SharePageContentProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl)
      setCopied(true)
      toast.success('Link copied to clipboard!')
      setTimeout(() => setCopied(false), 2000)
    } catch {
      toast.error('Failed to copy link')
    }
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 text-center">
      <div className="mb-8">
        <div className="inline-block bg-blue-500 rounded-full p-4 mb-4">
          <Trophy className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-3xl font-bold mb-2">Challenge Created!</h1>
        <p className="text-gray-600 dark:text-gray-300">
          Share this challenge with your friends and see if they can beat your score!
        </p>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Share via WhatsApp</h2>
        <a
          href={`https://wa.me/?text=${encodeURIComponent(
            `Can you beat ${creatorUsername}'s score in Globetrotter? Play here: ${shareUrl}`
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-colors"
        >
          Share on WhatsApp
        </a>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Or copy this link</h2>
        <div className="flex gap-2">
          <input
            type="text"
            value={shareUrl}
            readOnly
            className="flex-1 px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-700"
          />
          <button
            onClick={handleCopy}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            {copied ? 'Copied!' : 'Copy'}
          </button>
        </div>
      </div>

      <div className="hidden">
        <ShareCard
          username={creatorUsername}
          score={creatorScore}
          onImageGenerated={(imageUrl) => {
            const metaImage = document.createElement('meta')
            metaImage.setAttribute('property', 'og:image')
            metaImage.setAttribute('content', imageUrl)
            document.head.appendChild(metaImage)

            const twitterImage = document.createElement('meta')
            twitterImage.setAttribute('name', 'twitter:image')
            twitterImage.setAttribute('content', imageUrl)
            document.head.appendChild(twitterImage)
          }}
        />
      </div>
    </div>
  )
} 