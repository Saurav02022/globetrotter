# 🌍 Globetrotter - The Ultimate Travel Guessing Game

Test your knowledge of world destinations through cryptic clues and fun facts! Challenge your friends and discover interesting trivia about places around the globe.

## 📋 Table of Contents
- [Features](#-features)
- [Tech Stack](#️-tech-stack)
- [Getting Started](#-getting-started)
- [Project Structure](#-project-structure)
- [Navigation](#-navigation)
- [API Documentation](#-api-documentation)
- [Component Documentation](#-component-documentation)
- [Database Schema](#-database-schema)
- [Deployment](#-deployment)
- [Game Flow](#-game-flow)
- [Error Handling](#-error-handling)
- [Contributing](#-contributing)
- [License](#-license)
- [Credits](#-credits)

## 🚀 Features

- 🎮 Interactive gameplay with cryptic clues
- 🎯 Multiple choice answers with smart options
- 🎉 Fun animations and feedback
- 📊 Score tracking and leaderboard system
- 🤝 Challenge friends via WhatsApp
- 🌙 Dark mode support
- 🔐 Secure authentication with Google OAuth
- 📱 Fully responsive design
- 🎲 Random destination selection
- 📚 Rich destination database with clues, facts, and trivia
- 👤 Profile management with stats
- 🏆 Challenge creation and sharing
- 📈 Global leaderboard system

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
  - Server Components for improved performance
  - API Routes for backend functionality
  - Server Actions for form handling
  - Edge Runtime support
- **Language**: TypeScript
  - Strong typing for better development experience
  - Type safety across the application
  - ESLint configuration
- **Auth**: Supabase Auth
  - Google OAuth integration
  - Secure session management
  - Protected routes
- **Database**: Supabase PostgreSQL
  - Structured data storage
  - Real-time capabilities
  - Database triggers
  - Row Level Security
- **Styling**: Tailwind CSS
  - Responsive design
  - Dark mode support
  - Custom animations
  - PostCSS plugins
- **UI Components**:
  - shadcn/ui components
  - Radix UI primitives
  - Lucide Icons
  - Custom reusable components
- **Form Handling**:
  - React Hook Form
  - Zod validation
  - Server-side validation
- **State Management**:
  - React hooks
  - Server state
  - Form state
- **Development Tools**:
  - ESLint
  - PostCSS
  - TypeScript compiler
  - ts-node for scripts
- **Deployment**: Vercel
  - Automatic deployments
  - Environment variable management
  - Edge Functions
  - Analytics
- **Additional Libraries**:
  - Canvas Confetti for celebrations
  - html-to-image for share cards
  - Sonner for toast notifications
  - Framer Motion for animations

## 📦 Getting Started

### Prerequisites
- Node.js 18.x or later
- npm or yarn
- A Supabase account
- A Google Cloud account (for OAuth)

### Installation Steps

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/globetrotter.git
   cd globetrotter
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up Supabase:
   - Create a new Supabase project
   - Run the database migrations (found in `supabase/migrations`)
   - Set up Google OAuth in Supabase dashboard

4. Create a `.env.local` file:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   NEXT_PUBLIC_BASE_URL=http://localhost:3000
   ```

5. Run the development server:
   ```bash
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📁 Project Structure

```
globetrotter/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   ├── auth/              # Authentication pages
│   ├── challenge/         # Challenge pages
│   ├── leaderboard/      # Leaderboard page
│   ├── play/             # Game play page
│   └── profile/          # User profile page
├── components/            # React components
│   ├── auth/             # Authentication components
│   ├── challenge/        # Challenge components
│   ├── game/             # Game components
│   ├── landing/          # Landing page components
│   ├── profile/          # Profile components
│   └── ui/               # Shared UI components
├── lib/                   # Utility functions
│   ├── supabase/         # Supabase client
│   └── utils/            # Helper functions
├── public/               # Static assets
└── types/                # TypeScript types
```

## 📡 API Documentation

### Destinations API

#### GET /api/destinations/random
Get a random destination with multiple choice options.

**Response:**
```typescript
{
  destination: {
    id: string;
    city: string;
    country: string;
    clues: string[];
    fun_facts: string[];
    trivia: string[];
  };
  options: string[]; // Array of 4 city names including correct answer
}
```

### Challenge API

#### POST /api/challenge/create
Create a new challenge.

**Request Body:**
```typescript
{
  creatorId: string;
}
```

**Response:**
```typescript
{
  shareCode: string;
  expiresAt: string;
}
```

## 🧩 Component Documentation

### Game Component
`components/game/Game.tsx`
- Main game component handling game logic
- Props:
  - `session: Session` - User session
  - `challengeId?: string` - Optional challenge ID

### Challenge Components
`components/challenge/ShareCard.tsx`
- Generates shareable challenge card
- Props:
  - `username: string`
  - `score: number`

## 🗄️ Database Schema

### destinations
- `id`: uuid (PK)
- `city`: text
- `country`: text
- `clues`: jsonb[]
- `fun_facts`: jsonb[]
- `trivia`: jsonb[]
- `created_at`: timestamptz

### profiles
- `id`: uuid (PK, FK to auth.users)
- `username`: text
- `score`: int4
- `games_played`: int4
- `username_set`: bool
- `created_at`: timestamptz
- `updated_at`: timestamptz

### challenges
- `id`: uuid (PK)
- `creator_id`: uuid (FK to profiles)
- `share_code`: text
- `created_at`: timestamptz
- `expires_at`: timestamptz

## 🚀 Deployment

### Vercel Deployment

1. Fork this repository
2. Create a new project on Vercel
3. Connect your forked repository
4. Add environment variables in Vercel:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `NEXT_PUBLIC_BASE_URL`
5. Deploy!

### Environment Variables

- `NEXT_PUBLIC_SUPABASE_URL`: Your Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Your Supabase anonymous key
- `NEXT_PUBLIC_BASE_URL`: Your deployment URL

## 🎮 Game Flow

1. **Authentication**:
   - Users sign in with Google OAuth
   - First-time users set a unique username
   - Profile is automatically created

2. **Profile Setup**:
   - Username selection
   - Profile customization
   - Stats tracking initialization

3. **Gameplay**:
   - Random destination selection
   - Cryptic clues presentation
   - Multiple choice options
   - Answer submission and feedback
   - Score updates and animations
   - Fun facts reveal

4. **Challenge System**:
   - Challenge creation from game
   - 24-hour validity period
   - WhatsApp sharing integration
   - Score tracking and comparison
   - Challenge completion celebration

5. **Profile Management**:
   - View total score
   - Track games played
   - Update username
   - View challenge history

6. **Leaderboard Features**:
   - Global player rankings
   - Score comparisons
   - Recent achievements

## 🧭 Navigation

The application provides a comprehensive navigation system:

### For Logged-in Users
- **Home**: Quick access to the game via logo
- **Play**: Start a new game session
- **Leaderboard**: View global rankings
- **Challenges**: Manage and participate in challenges
- **Profile**: View stats and update settings
- **Sign Out**: End the session

### For Non-logged-in Users
- **Home**: Welcome page with game information
- **Sign In**: Google OAuth authentication

## ❌ Error Handling

The application includes comprehensive error handling:

### Authentication Errors
- Invalid credentials
- Session expiration
- Missing permissions

### Challenge Errors
- Challenge not found
- Challenge expired
- Invalid share code

### Profile Errors
- Username already taken
- Profile not found
- Update failures

### Game Errors
- Destination loading failures
- Score update issues
- Network connectivity problems

All errors are presented with user-friendly messages and appropriate recovery options.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📝 License

MIT License - feel free to use this code for your own projects!

## 🙏 Credits

- Dataset generated with assistance from AI
- Icons from [Lucide Icons](https://lucide.dev)
- Confetti effects from [Canvas Confetti](https://www.kirilv.com/canvas-confetti/)
- UI Components from [shadcn/ui](https://ui.shadcn.com/)
