export interface Destination {
  id: string
  city: string
  country: string
  clues: string[]
  fun_facts: string[]
  trivia: string[]
  created_at: string
}

export interface Challenge {
  id: string
  creator_id: string
  share_code: string
  created_at: string
  expires_at: string
}

export interface Profile {
  id: string
  username: string
  score: number
  games_played: number
  username_set: boolean
  created_at: string
  updated_at: string
}

export interface Database {
  public: {
    Tables: {
      destinations: {
        Row: {
          id: string
          city: string
          country: string
          clues: string[]
          fun_facts: string[]
          trivia: string[]
          created_at: string
        }
        Insert: {
          id?: string
          city: string
          country: string
          clues: string[]
          fun_facts: string[]
          trivia: string[]
          created_at?: string
        }
        Update: {
          id?: string
          city?: string
          country?: string
          clues?: string[]
          fun_facts?: string[]
          trivia?: string[]
          created_at?: string
        }
      }
      profiles: {
        Row: {
          id: string
          username: string | null
          score: number
          games_played: number
          username_set: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          username?: string | null
          score?: number
          games_played?: number
          username_set?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          username?: string | null
          score?: number
          games_played?: number
          username_set?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      challenges: {
        Row: {
          id: string
          creator_id: string
          share_code: string
          created_at: string
          expires_at: string
        }
        Insert: {
          id?: string
          creator_id: string
          share_code: string
          created_at?: string
          expires_at?: string
        }
        Update: {
          id?: string
          creator_id?: string
          share_code?: string
          created_at?: string
          expires_at?: string
        }
      }
    }
  }
}

export type Destination = Database['public']['Tables']['destinations']['Row']
export type Profile = Database['public']['Tables']['profiles']['Row']
export type Challenge = Database['public']['Tables']['challenges']['Row'] 