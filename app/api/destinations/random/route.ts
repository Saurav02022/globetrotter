import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const supabase = createClient()

    // Get total count first
    const { count } = await supabase
      .from('destinations')
      .select('*', { count: 'exact', head: true })

    if (!count) {
      throw new Error('No destinations found')
    }

    // Get a random offset
    const randomOffset = Math.floor(Math.random() * count)

    // Fetch a random destination using offset
    const { data: destination, error: destError } = await supabase
      .from('destinations')
      .select('*')
      .range(randomOffset, randomOffset)
      .single()

    if (destError) throw destError

    // Get another count excluding the selected destination
    const { count: remainingCount } = await supabase
      .from('destinations')
      .select('*', { count: 'exact', head: true })
      .neq('id', destination.id)

    if (!remainingCount) {
      throw new Error('Not enough destinations for options')
    }

    // Get three random offsets for wrong options
    const offsets = Array.from({ length: 3 }, () => Math.floor(Math.random() * remainingCount))

    // Fetch wrong options using the random offsets
    const wrongOptionsPromises = offsets.map(offset => 
      supabase
        .from('destinations')
        .select('city')
        .neq('id', destination.id)
        .range(offset, offset)
        .single()
    )

    const wrongOptionsResults = await Promise.all(wrongOptionsPromises)
    const wrongOptions = wrongOptionsResults
      .filter(result => !result.error)
      .map(result => result.data)

    // Combine correct answer with wrong options and shuffle
    const options = [destination.city, ...wrongOptions.map(o => o.city)]
    const shuffledOptions = options.sort(() => Math.random() - 0.5)

    return NextResponse.json({
      destination,
      options: shuffledOptions
    })
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json({ error: 'Failed to fetch destination' }, { status: 500 })
  }
} 