'use client'

import { useEffect, useRef } from 'react'
import { toPng } from 'html-to-image'
import { Trophy, Share2 } from 'lucide-react'

interface ShareCardProps {
  username: string
  score: number
  onImageGenerated: (imageUrl: string) => void
}

export default function ShareCard({ username, score, onImageGenerated }: ShareCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (cardRef.current) {
      toPng(cardRef.current, {
        quality: 0.95,
        backgroundColor: '#1F2937' // dark:bg-gray-800
      })
      .then((dataUrl: string) => {
        onImageGenerated(dataUrl)
      })
      .catch((error: Error) => {
        console.error('Error generating share image:', error)
      })
    }
  }, [username, score, onImageGenerated])

  return (
    <div 
      ref={cardRef}
      className="w-[1200px] h-[630px] bg-gray-800 text-white p-16 flex flex-col items-center justify-center"
      style={{ fontFamily: 'Inter, sans-serif' }}
    >
      <div className="bg-blue-500 rounded-full p-6 mb-8">
        <Trophy className="w-16 h-16" />
      </div>
      
      <h1 className="text-5xl font-bold mb-8 text-center">
        Globetrotter Challenge
      </h1>
      
      <p className="text-3xl mb-12 text-gray-300 text-center">
        {username} has scored {score} points!
      </p>
      
      <p className="text-2xl text-blue-400 text-center">
        Think you can beat their score? Click to play!
      </p>

      <div className="absolute bottom-8 left-8 right-8 flex items-center justify-between text-gray-400 text-xl">
        <span>globetrotter.app</span>
        <Share2 className="w-8 h-8" />
      </div>
    </div>
  )
} 