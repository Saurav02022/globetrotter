'use client'

import { useState, useEffect } from 'react'
import { Session } from '@supabase/supabase-js'
import { createClient } from '@/lib/supabase/client'
import { Destination } from '@/types/database'
import confetti from 'canvas-confetti'
import { toast } from 'sonner'
import { Share2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { getBaseUrl } from '@/lib/utils'

interface GameProps {
  session: Session
  challengeId?: string
}

export default function Game({ session }: GameProps) {
  const supabase = createClient()
  const [currentDestination, setCurrentDestination] = useState<Destination | null>(null)
  const [options, setOptions] = useState<string[]>([])
  const [loading, setLoading] = useState(true)
  const [score, setScore] = useState(0)
  const [gamesPlayed, setGamesPlayed] = useState(0)
  const [selectedClue, setSelectedClue] = useState<string>('')

  useEffect(() => {
    loadNewDestination()
    loadUserStats()
  }, [session.user.id])

  const loadUserStats = async () => {
    const { data: profile } = await supabase
      .from('profiles')
      .select('score, games_played')
      .eq('id', session.user.id)
      .single()

    if (profile) {
      setScore(profile.score)
      setGamesPlayed(profile.games_played)
    }
  }

  const loadNewDestination = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/destinations/random')
      const data = await response.json()
      
      if (data.error) throw new Error(data.error)
      
      setCurrentDestination(data.destination)
      setOptions(data.options)
      setSelectedClue(data.destination.clues[Math.floor(Math.random() * data.destination.clues.length)])
      setLoading(false)
    } catch (error) {
      console.error('Error loading destination:', error)
      toast.error('Failed to load destination')
      setLoading(false)
    }
  }

  const handleAnswer = async (selectedCity: string) => {
    if (!currentDestination) return

    const isCorrect = selectedCity === currentDestination.city
    
    // Update user stats
    const { error: updateError } = await supabase
      .from('profiles')
      .update({
        score: score + (isCorrect ? 1 : 0),
        games_played: gamesPlayed + 1
      })
      .eq('id', session.user.id)

    if (updateError) {
      console.error('Error updating profile:', updateError)
      toast.error('Failed to update score')
      return
    }

    if (isCorrect) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      })
      toast.success('Correct! 🎉')
      setScore(score + 1)
    } else {
      toast.error(`Wrong! The correct answer was ${currentDestination.city}`)
    }

    setGamesPlayed(gamesPlayed + 1)
    
    // Load next destination after a short delay
    setTimeout(loadNewDestination, 2000)
  }

  const createChallenge = async () => {
    try {
      const shareCode = Math.random().toString(36).substring(2, 8)
      
      const { error } = await supabase
        .from('challenges')
        .insert({
          creator_id: session.user.id,
          share_code: shareCode,
          expires_at: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString() // 24 hours from now
        })

      if (error) throw error

      const shareUrl = `${getBaseUrl()}/challenge/${shareCode}`
      const shareText = `Can you beat my score of ${score} in Globetrotter? Try it here: ${shareUrl}`
      
      // Open WhatsApp share
      window.open(`https://wa.me/?text=${encodeURIComponent(shareText)}`, '_blank')
      
      toast.success('Challenge created! Share link copied to clipboard')
    } catch (error) {
      console.error('Error creating challenge:', error)
      toast.error('Failed to create challenge')
    }
  }

  if (loading) {
    return <div className="flex items-center justify-center min-h-[400px]">Loading...</div>
  }

  return (
    <div className="max-w-2xl mx-auto p-4 space-y-6">
      <div className="flex justify-between items-center">
        <div className="text-lg font-semibold">Score: {score}</div>
        <Button onClick={createChallenge} variant="outline">
          <Share2 className="w-4 h-4 mr-2" />
          Challenge Friends
        </Button>
      </div>

      <Card className="p-6">
        <h2 className="text-xl font-bold mb-4">Where am I?</h2>
        <p className="text-lg mb-6 italic">{selectedClue}</p>
        
        <div className="grid grid-cols-2 gap-4">
          {options.map((city) => (
            <Button
              key={city}
              onClick={() => handleAnswer(city)}
              variant="outline"
              className="h-12 text-lg"
            >
              {city}
            </Button>
          ))}
        </div>
      </Card>

      {currentDestination && (
        <Card className="p-6 bg-muted">
          <h3 className="font-semibold mb-2">Fun Facts</h3>
          <ul className="list-disc list-inside space-y-2">
            {currentDestination.fun_facts.map((fact, index) => (
              <li key={index}>{fact}</li>
            ))}
          </ul>
        </Card>
      )}
    </div>
  )
} 