// app/about/page.tsx
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us – Formwise-AI',
  description:
    'Discover how Formwise-AI turns voice and PDF input into structured data using AI. Learn about our mission, tech stack, and the future we’re building.',
  keywords: [
    'About Formwise-AI',
    'AI startup',
    'PDF to JSON',
    'Voice to structured form',
    'Google Gemini AI',
  ],
};

export default function AboutPage() {
  return (
    <main className="max-w-6xl mx-auto px-6 py-20 text-gray-900 dark:text-gray-100">
      {/* Hero Header */}
      <section className="text-center mb-16">
        <h1 className="text-5xl font-extrabold tracking-tight bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 text-transparent bg-clip-text">
          Built for the Future of Forms
        </h1>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          At Formwise-AI, we’re on a mission to revolutionize data collection by turning voice and PDF into clean, structured data — powered by AI.
        </p>
      </section>

      {/* Core Sections */}
      <section className="space-y-12 text-lg leading-relaxed">

        {/* Mission */}
        <div className="rounded-3xl p-8 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900 dark:to-blue-950 border dark:border-blue-800 shadow">
          <h2 className="text-2xl font-bold text-blue-700 dark:text-blue-300 mb-2">🚀 Our Mission</h2>
          <p>
            We help people and organizations automate boring data entry by translating voice recordings and PDF files into accurate, structured formats — instantly.
          </p>
        </div>

        {/* What We Do */}
        <div className="rounded-3xl p-8 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900 dark:to-green-950 border dark:border-green-800 shadow">
          <h2 className="text-2xl font-bold text-green-700 dark:text-green-300 mb-2">💡 What We Do</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>🎤 Transform <strong>voice input</strong> into structured form fields using Gemini AI</li>
            <li>📄 Parse <strong>PDF documents</strong> into editable, shareable data</li>
            <li>✏️ Enable users to <strong>review, edit, save & share</strong> instantly</li>
            <li>🔒 Prioritize security with encrypted cloud infrastructure</li>
          </ul>
        </div>

        {/* Technology */}
        <div className="rounded-3xl p-8 bg-gradient-to-br from-indigo-50 to-indigo-100 dark:from-indigo-900 dark:to-indigo-950 border dark:border-indigo-800 shadow">
          <h2 className="text-2xl font-bold text-indigo-700 dark:text-indigo-300 mb-2">⚙️ Technology Stack</h2>
          <p>
            We leverage bleeding-edge tools like <strong>Next.js 15</strong>, <strong>Tailwind CSS</strong>, <strong>Firebase</strong>, and <strong>Gemini AI</strong> to deliver secure, scalable, and lightning-fast experiences.
          </p>
        </div>

        {/* Security */}
        <div className="rounded-3xl p-8 bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900 dark:to-red-950 border dark:border-red-800 shadow">
          <h2 className="text-2xl font-bold text-red-600 dark:text-red-300 mb-2">🔐 Privacy & Trust</h2>
          <p>
            All data is encrypted and stored in Google Cloud via Firebase. We don’t sell or share your information — ever.
          </p>
        </div>

        {/* Why It Matters */}
        <div className="rounded-3xl p-8 bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-900 dark:to-yellow-950 border dark:border-yellow-800 shadow">
          <h2 className="text-2xl font-bold text-yellow-600 dark:text-yellow-300 mb-2">🌱 Why It Matters</h2>
          <p>
            Manual data entry is slow, error-prone, and outdated. Formwise-AI helps professionals, students, and field teams save time, reduce stress, and get smarter with data.
          </p>
        </div>
      </section>

      {/* Footer Note */}
      <div className="mt-20 text-center text-sm text-gray-500 dark:text-gray-400 italic">
        Proudly built in India 🇮🇳 using Google Gemini AI — making data smarter, faster, and more human.
      </div>
    </main>
  );
}
