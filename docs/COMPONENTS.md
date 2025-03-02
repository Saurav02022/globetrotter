# 🧩 Globetrotter Component Documentation

This document provides detailed information about the React components used in the Globetrotter application.

## Table of Contents
- [Game Components](#game-components)
- [Challenge Components](#challenge-components)
- [Auth Components](#auth-components)
- [Profile Components](#profile-components)
- [UI Components](#ui-components)

## Game Components

### Game
`components/game/Game.tsx`

Main game component that handles the core game logic.

**Props:**
```typescript
interface GameProps {
  session: Session;
  challengeId?: string;
}
```

**State:**
- `currentDestination`: Current destination being guessed
- `options`: Array of city options
- `loading`: Loading state
- `score`: User's current score
- `gamesPlayed`: Number of games played
- `selectedClue`: Currently displayed clue

**Key Functions:**
- `loadNewDestination()`: Fetches a new random destination
- `handleAnswer(selectedCity: string)`: Processes user's answer
- `loadUserStats()`: Loads user's game statistics
- `createChallenge()`: Creates a new challenge

**Example:**
```typescript
import Game from '@/components/game/Game'

export default function PlayPage({ session }) {
  return <Game session={session} />
}
```

## Challenge Components

### ShareCard
`components/challenge/ShareCard.tsx`

Component for generating shareable challenge cards.

**Props:**
```typescript
interface ShareCardProps {
  username: string;
  score: number;
  onImageGenerated?: (imageUrl: string) => void;
}
```

**Features:**
- Generates social share image
- Displays user score and username
- Handles image generation callback

### SharePageContent
`components/challenge/SharePageContent.tsx`

Component for the challenge sharing page.

**Props:**
```typescript
interface SharePageContentProps {
  shareUrl: string;
  creatorUsername: string;
  creatorScore: number;
}
```

**Features:**
- WhatsApp sharing integration
- Copy to clipboard functionality
- Social preview metadata

## Auth Components

### LoginButton
`components/auth/LoginButton.tsx`

Google OAuth login button component.

**Props:**
```typescript
interface LoginButtonProps {
  className?: string;
  children?: React.ReactNode;
}
```

### UsernameForm
`components/auth/UsernameForm.tsx`

Form for setting/updating username.

**Props:**
```typescript
interface UsernameFormProps {
  userId: string;
  currentUsername?: string;
  onSuccess?: () => void;
}
```

## Profile Components

### ProfileCard
`components/profile/ProfileCard.tsx`

Displays user profile information.

**Props:**
```typescript
interface ProfileCardProps {
  profile: {
    username: string;
    score: number;
    games_played: number;
    challenges_created: number;
    challenges_completed: number;
  };
}
```

### StatsGrid
`components/profile/StatsGrid.tsx`

Grid display of user statistics.

**Props:**
```typescript
interface StatsGridProps {
  stats: {
    totalGames: number;
    correctAnswers: number;
    averageScore: number;
    bestStreak: number;
  };
}
```

## UI Components

### Button
`components/ui/button.tsx`

Reusable button component with variants.

**Props:**
```typescript
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
}
```

### Card
`components/ui/card.tsx`

Card container component.

**Props:**
```typescript
interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'bordered';
}
```

### Toast
`components/ui/toast.tsx`

Toast notification component.

**Usage:**
```typescript
import { toast } from '@/components/ui/toast'

toast.success('Correct answer!')
toast.error('Wrong answer!')
```

## Component Best Practices

1. **State Management:**
   - Use local state for component-specific data
   - Use Supabase for persistent data
   - Implement proper loading states

2. **Error Handling:**
   - Implement error boundaries
   - Show user-friendly error messages
   - Log errors for debugging

3. **Performance:**
   - Use React.memo for expensive renders
   - Implement proper cleanup in useEffect
   - Optimize re-renders

4. **Accessibility:**
   - Include proper ARIA labels
   - Ensure keyboard navigation
   - Maintain proper contrast ratios

5. **Styling:**
   - Use Tailwind CSS classes
   - Follow dark mode guidelines
   - Maintain responsive design

## Component Directory Structure

```
components/
├── auth/
│   ├── LoginButton.tsx
│   └── UsernameForm.tsx
├── challenge/
│   ├── ShareCard.tsx
│   └── SharePageContent.tsx
├── game/
│   └── Game.tsx
├── profile/
│   ├── ProfileCard.tsx
│   └── StatsGrid.tsx
└── ui/
    ├── button.tsx
    ├── card.tsx
    └── toast.tsx
``` 