# 🚀 Globetrotter Setup Guide

This guide provides detailed instructions for setting up the Globetrotter project for development and deployment.

## Table of Contents
- [Prerequisites](#prerequisites)
- [Local Development Setup](#local-development-setup)
- [Database Setup](#database-setup)
- [Authentication Setup](#authentication-setup)
- [Environment Configuration](#environment-configuration)
- [Deployment](#deployment)
- [Troubleshooting](#troubleshooting)

## Prerequisites

Before starting, ensure you have the following installed:

- Node.js (v18.x or later)
  ```bash
  node --version
  ```
- npm (v8.x or later) or yarn
  ```bash
  npm --version
  ```
- Git
  ```bash
  git --version
  ```
- A code editor (VS Code recommended)
- A Supabase account
- A Google Cloud account (for OAuth)

## Local Development Setup

1. **Clone the Repository**
   ```bash
   git clone https://github.com/yourusername/globetrotter.git
   cd globetrotter
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Install Development Tools**
   ```bash
   npm install -D @types/node @types/react typescript
   ```

4. **Run Development Server**
   ```bash
   npm run dev
   ```
   The app will be available at [http://localhost:3000](http://localhost:3000)

## Database Setup

1. **Create Supabase Project**
   - Go to [Supabase Dashboard](https://app.supabase.io)
   - Click "New Project"
   - Fill in project details
   - Note down the project URL and anon key

2. **Run Database Migrations**
   ```bash
   # Install Supabase CLI
   npm install -g supabase-cli

   # Login to Supabase
   supabase login

   # Initialize Supabase
   supabase init

   # Link to your project
   supabase link --project-ref your-project-ref

   # Run migrations
   supabase db push
   ```

3. **Database Schema**
   The following tables will be created:
   - destinations
   - profiles
   - challenges

4. **Seed Initial Data**
   ```bash
   # Run seed script
   npm run seed
   ```

## Authentication Setup

1. **Configure Google OAuth**
   - Go to [Google Cloud Console](https://console.cloud.google.com)
   - Create a new project
   - Enable Google OAuth API
   - Create credentials (OAuth client ID)
   - Add authorized redirect URIs:
     - `http://localhost:3000/auth/callback` (development)
     - `https://your-domain.com/auth/callback` (production)

2. **Configure Supabase Auth**
   - Go to Supabase Dashboard > Authentication
   - Enable Google provider
   - Add Google client ID and secret
   - Configure redirect URLs

## Environment Configuration

1. **Create Environment Files**

   Create `.env.local` for development:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   NEXT_PUBLIC_BASE_URL=http://localhost:3000
   ```

   Create `.env.production` for production:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   NEXT_PUBLIC_BASE_URL=https://your-domain.com
   ```

2. **Type Generation**
   ```bash
   # Generate TypeScript types from database
   npm run types:generate
   ```

## Deployment

### Vercel Deployment

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Deploy on Vercel**
   - Connect your GitHub repository
   - Configure environment variables
   - Deploy!

### Manual Deployment

1. **Build the Application**
   ```bash
   npm run build
   ```

2. **Start Production Server**
   ```bash
   npm start
   ```

## Troubleshooting

### Common Issues

1. **Database Connection Issues**
   - Check Supabase URL and anon key
   - Verify network connectivity
   - Check Supabase dashboard for service status

2. **Authentication Problems**
   - Verify Google OAuth credentials
   - Check redirect URIs
   - Clear browser cookies and try again

3. **Build Errors**
   - Clear `.next` directory
   ```bash
   rm -rf .next
   npm run build
   ```
   - Check TypeScript errors
   ```bash
   npm run type-check
   ```

4. **API Errors**
   - Check API route implementations
   - Verify environment variables
   - Check browser console for errors

### Development Tips

1. **Hot Reload Not Working**
   ```bash
   # Kill the development server and restart
   npm run dev
   ```

2. **Database Type Generation**
   ```bash
   # Regenerate types after schema changes
   npm run types:generate
   ```

3. **Clearing Supabase Cache**
   ```bash
   # Clear Supabase local cache
   supabase db reset
   ```

## Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Supabase Documentation](https://supabase.io/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

## Support

If you encounter any issues:
1. Check the [GitHub Issues](https://github.com/yourusername/globetrotter/issues)
2. Create a new issue with:
   - Detailed description
   - Steps to reproduce
   - Expected vs actual behavior
   - Environment details 