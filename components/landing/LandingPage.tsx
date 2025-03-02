import { Github, Globe2, Code2, Database, Palette, LucideIcon } from 'lucide-react'
import Link from 'next/link'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-teal-400">
            Welcome to Globetrotter
          </h1>
          <p className="text-xl mb-8 text-gray-600 dark:text-gray-300">
            The Ultimate Travel Guessing Game - Test your knowledge of world destinations through cryptic clues and fun facts!
          </p>
          <div className="flex justify-center gap-4 mb-12">
            <Link
              href="/login"
              className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-semibold transition-colors"
            >
              Start Playing
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900/50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Game Features</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              title="Cryptic Clues"
              description="Solve engaging riddles and hints about famous destinations around the world."
              icon="🌍"
            />
            <FeatureCard
              title="Learn Fun Facts"
              description="Discover interesting trivia and facts about each destination you encounter."
              icon="📚"
            />
            <FeatureCard
              title="Challenge Friends"
              description="Share your score and challenge friends to beat your record."
              icon="🏆"
            />
          </div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Built With Modern Tech</h2>
          <div className="grid md:grid-cols-4 gap-6">
            <TechCard name="Next.js" Icon={Globe2} />
            <TechCard name="TypeScript" Icon={Code2} />
            <TechCard name="Supabase" Icon={Database} />
            <TechCard name="Tailwind" Icon={Palette} />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-gray-200 dark:border-gray-700">
        <div className="max-w-6xl mx-auto px-4 flex justify-between items-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            © 2024 Globetrotter. All rights reserved.
          </p>
          <a
            href="https://github.com/yourusername/globetrotter"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
          >
            <Github className="w-6 h-6" />
          </a>
        </div>
      </footer>
    </div>
  )
}

function FeatureCard({ title, description, icon }: { title: string; description: string; icon: string }) {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600 dark:text-gray-300">{description}</p>
    </div>
  )
}

function TechCard({ name, Icon }: { name: string; Icon: LucideIcon }) {
  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg flex flex-col items-center">
      <div className="w-12 h-12 flex items-center justify-center mb-2">
        <Icon className="w-8 h-8" />
      </div>
      <p className="text-sm font-medium">{name}</p>
    </div>
  )
} 