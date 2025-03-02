import { config } from 'dotenv'
import path from 'path'

// Load .env.local file
config({ path: path.resolve(process.cwd(), '.env.local') })

import OpenAI from 'openai'
import { createClient } from '@supabase/supabase-js'

// Import the types
import type { Database } from '@/types/database'

// Validate environment variables
if (!process.env.OPENAI_API_KEY) {
  throw new Error('OPENAI_API_KEY is required')
}
if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
  throw new Error('Supabase environment variables are required')
}

// Initialize OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
})

// Initialize Supabase with service role key for admin access
const supabase = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

// Use the Destination type from the database
type DestinationInsert = Database['public']['Tables']['destinations']['Insert']

interface Destination {
  city: string
  country: string
  clues: string[]
  fun_facts: string[]
  trivia: string[]
  created_at?: string
}

const CITIES_PROMPT = `Generate a list of 10 interesting cities from around the world. Include a mix of well-known and lesser-known destinations. Make sure the cities are diverse and from different continents.

Return the response in this exact JSON format:
{
  "cities": [
    {
      "city": "CityName",
      "country": "CountryName"
    }
  ]
}

Make sure to include exactly 10 cities, each with a city and country property.`

const DETAILS_PROMPT = `Generate engaging content for the following city:
City: {city}
Country: {country}

Please provide:
1. Two cryptic clues that hint at the city without directly naming it
2. Two interesting fun facts about the city that most people don't know
3. Two pieces of trivia about the city's culture, history, or landmarks

Return the response in this JSON format:
{
  "clues": ["clue1", "clue2"],
  "fun_facts": ["fact1", "fact2"],
  "trivia": ["trivia1", "trivia2"]
}

Make the clues clever and engaging, the fun facts surprising, and the trivia interesting.`

// Helper function to safely parse JSON
function safeJSONParse(text: string) {
  try {
    // Remove any potential control characters
    const sanitized = text.replace(/[\x00-\x1F\x7F-\x9F]/g, '')
    return JSON.parse(sanitized)
  } catch (error) {
    console.error('Failed to parse JSON:', text)
    throw error
  }
}

async function generateCities(): Promise<Array<{ city: string; country: string }>> {
  const completion = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [
      {
        role: "system",
        content: "You are a helpful assistant that returns data in JSON format. Always return valid JSON that can be parsed. Do not include any control characters or special formatting."
      },
      {
        role: "user",
        content: CITIES_PROMPT
      }
    ]
  })

  const response = safeJSONParse(completion.choices[0].message.content!)
  return response.cities
}

async function generateCityDetails(city: string, country: string): Promise<Omit<Destination, 'city' | 'country'>> {
  const prompt = DETAILS_PROMPT.replace('{city}', city).replace('{country}', country)
  
  const completion = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [
      {
        role: "system",
        content: "You are a helpful assistant that returns data in JSON format. Always return valid JSON that can be parsed. Do not include any control characters or special formatting."
      },
      {
        role: "user",
        content: prompt
      }
    ]
  })

  return safeJSONParse(completion.choices[0].message.content!)
}

async function main() {
  try {
    let totalCities = 0
    const processedCities = new Set<string>() // Track cities we've already processed
    
    // Generate cities in batches of 10 until we have 100+
    while (totalCities < 100) {
      const batchNumber = Math.floor(totalCities / 10) + 1
      console.log(`\nGenerating batch ${batchNumber}...`)
      const cities = await generateCities()
      
      for (const { city, country } of cities) {
        // Skip if we've already processed this city
        const cityKey = `${city}-${country}`
        if (processedCities.has(cityKey)) {
          console.log(`Skipping duplicate: ${city}, ${country}`)
          continue
        }
        
        console.log(`Generating details for ${city}, ${country}...`)
        const details = await generateCityDetails(city, country)
        
        const destination: DestinationInsert = {
          city,
          country,
          clues: details.clues,
          fun_facts: details.fun_facts,
          trivia: details.trivia
        }
        
        // Insert into Supabase
        const { error } = await supabase
          .from('destinations')
          .insert(destination)
        
        if (error) {
          console.error('Error inserting into Supabase:', error)
        } else {
          console.log(`Saved ${city}, ${country} to Supabase`)
          processedCities.add(cityKey)
          totalCities++
        }
        
        // Add a small delay to avoid rate limits
        await new Promise(resolve => setTimeout(resolve, 1000))
      }
      
      console.log(`\nProgress: ${totalCities}/100 cities processed`)
    }

    console.log('\nGeneration complete!')
    console.log(`Generated ${totalCities} unique destinations`)
    console.log(`All data saved to Supabase`)

  } catch (error) {
    console.error('Error:', error)
    process.exit(1)
  }
}

main() 