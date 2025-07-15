import './globals.css'
import { Inter } from 'next/font/google'
import Header from '@/components/header'
import GoogleAnalytics from '@/app/analytics'
import { Toaster } from 'react-hot-toast'
import { Analytics } from "@vercel/analytics/next"

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Formwise-AI – Voice & PDF to Form',
  description: 'Turn voice recordings and PDFs into structured form data using AI.',
  keywords: ['AI forms', 'PDF parser', 'Voice to form', 'Gemini AI', 'Google Cloud'],
  metadataBase: new URL('https://formwise-q4oedg28m-sathwiks-projects-2ca82166.vercel.app'),
  openGraph: {
    title: 'Formwise-AI',
    description: 'AI-powered structured form extraction from voice or PDF.',
    url: 'https://formwise-q4oedg28m-sathwiks-projects-2ca82166.vercel.app',
    siteName: 'Formwise-AI',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Formwise-AI Landing Preview',
      },
    ],
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300`}>
        <Toaster
          position="top-right"
          toastOptions={{
            className: 'bg-blue-600 text-white font-semibold',
            style: {
              borderRadius: '8px',
              padding: '12px 16px',
              fontSize: '14px',
            },
          }}
        />
        <GoogleAnalytics />
        <Analytics />

        {/* Header */}
        <Header />

        <main className="min-h-[80vh] px-4 md:px-8 py-8 transition-all duration-300 ease-in-out">
          {children}
        </main>

        <footer className="bg-gray-50 dark:bg-gray-950 border-t border-gray-200 dark:border-gray-800 mt-16 py-6 text-center text-sm text-gray-600 dark:text-gray-400">
          <div className="flex flex-col md:flex-row items-center justify-center gap-2">
            <span>© {new Date().getFullYear()} Formwise-AI</span>
            <span className="hidden md:inline">•</span>
            <span>Built with 💡 using Google Cloud & Gemini</span>
          </div>
            <div className="mt-2">
                <a href="/privacy" className="text-blue-600 dark:text-blue-400 hover:underline">Privacy Policy</a>
                <span className="mx-2">|</span>
                <a href="/terms" className="text-blue-600 dark:text-blue-400 hover:underline">Terms of Service</a>
            </div>
        </footer>
      </body>
    </html>
  )
}
