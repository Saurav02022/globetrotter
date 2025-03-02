import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const supabase = createClient()

    // Fetch a random destination
    const { data: destination, error: destError } = await supabase
      .from('destinations')
      .select('*')
      .order('random()')
      .limit(1)
      .single()

    if (destError) throw destError

    // Fetch 3 random cities for wrong options
    const { data: wrongOptions, error: optError } = await supabase
      .from('destinations')
      .select('city')
      .neq('id', destination.id)
      .order('random()')
      .limit(3)

    if (optError) throw optError

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