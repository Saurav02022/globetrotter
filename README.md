# 🌍 Globetrotter - The Ultimate Travel Guessing Game

Test your knowledge of world destinations through cryptic clues and fun facts! Challenge your friends and discover interesting trivia about places around the globe.

## 📋 Table of Contents
- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#️-tech-stack)
- [Getting Started](#-getting-started)
- [Architecture](#-architecture)
  - [Project Structure](#project-structure)
  - [Technical Decisions](#technical-decisions)
  - [Database Schema](#database-schema)
- [Development](#-development)
  - [Environment Setup](#environment-setup)
  - [API Documentation](#api-documentation)
  - [Component Documentation](#component-documentation)
- [Deployment](#-deployment)
  - [Vercel Setup](#vercel-setup)
  - [Production Optimization](#production-optimization)
- [User Guide](#-user-guide)
  - [Game Flow](#game-flow)
  - [Navigation](#navigation)
  - [Error Handling](#error-handling)
- [Contributing](#-contributing)
- [License](#-license)
- [Credits](#-credits)

## 📖 Overview

Globetrotter is an interactive travel guessing game that combines education with entertainment. Players test their knowledge of world destinations through cryptic clues and fun facts, while competing with friends through a challenge system.

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

### Core Technologies
- **Framework**: Next.js 14 (App Router)
  - Server Components for improved performance
  - API Routes for backend functionality
  - Server Actions for form handling
  - Edge Runtime support

- **Language**: TypeScript
  - Strong typing for better development experience
  - Type safety across the application
  - ESLint configuration

- **Backend Services**
  - **Auth**: Supabase Auth
    - Google OAuth integration
    - Secure session management
    - Protected routes
  - **Database**: Supabase PostgreSQL
    - Structured data storage
    - Real-time capabilities
    - Database triggers
    - Row Level Security

### Frontend Technologies
- **Styling**: Tailwind CSS
  - Responsive design
  - Dark mode support
  - Custom animations
  - PostCSS plugins

- **UI Components**
  - shadcn/ui components
  - Radix UI primitives
  - Lucide Icons
  - Custom reusable components

### Development Tools
- ESLint for code quality
- PostCSS for CSS processing
- TypeScript compiler
- ts-node for scripts

### Additional Libraries
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
   git clone https://github.com/Saurav02022/globetrotter.git
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

4. Configure environment variables:
   Create a `.env.local` file with:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   NEXT_PUBLIC_BASE_URL=http://localhost:3000
   OPENAI_API_KEY=your_openai_api_key
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
   ```

5. Run the development server:
   ```bash
   npm run dev
   ```

## 🏗 Architecture

### Project Structure
```
globetrotter/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   ├── auth/              # Authentication pages
│   ├── challenge/         # Challenge pages
│   ├── leaderboard/      # Leaderboard page
│   └── profile/          # User profile page
├── components/            # React components
├── lib/                   # Utility functions
├── public/               # Static assets
└── types/                # TypeScript types
```

### Technical Decisions

#### Authentication Flow
- **Why Supabase Auth?**
  - Built-in security features
  - Seamless OAuth integration
  - Robust session management
  - Perfect fit for serverless architecture

#### State Management Strategy
- Server Components for initial state
- React Hooks for client-side state
- Supabase Real-time for live updates

#### Performance Optimizations
- Code splitting and dynamic imports
- Static generation where possible
- Edge runtime deployment
- CDN optimization

### Database Schema

#### destinations
- `id`: uuid (PK)
- `city`: text
- `country`: text
- `clues`: jsonb[]
- `fun_facts`: jsonb[]
- `trivia`: jsonb[]
- `created_at`: timestamptz

#### profiles
- `id`: uuid (PK, FK to auth.users)
- `username`: text
- `score`: int4
- `games_played`: int4
- `username_set`: bool
- `created_at`: timestamptz
- `updated_at`: timestamptz

#### challenges
- `id`: uuid (PK)
- `creator_id`: uuid (FK to profiles)
- `share_code`: text
- `created_at`: timestamptz
- `expires_at`: timestamptz

## 🚀 Deployment

### Vercel Setup
1. Fork this repository
2. Create a new project on Vercel
3. Connect your forked repository
4. Configure environment variables
5. Deploy!

### Production Optimization
- Console logs removed in production:
  ```js
  // next.config.js
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production'
  }
  ```
- Error and warning logs preserved
- Performance optimizations enabled
- CDN caching configured

### Destination Generation
- OpenAI API integration
- Automated data population
- Quality control system
- Rich content generation

## 👥 User Guide

### Game Flow
1. Authentication & Profile Setup
2. Gameplay Mechanics
3. Challenge System
4. Profile Management
5. Leaderboard Features

### Navigation
- Logged-in user features
- Non-logged-in user access
- Profile management
- Challenge system

### Error Handling
- Authentication errors
- Challenge errors
- Profile errors
- Game errors

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
