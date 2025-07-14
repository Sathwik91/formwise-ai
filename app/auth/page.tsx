'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'

const FirebaseAuthClient = dynamic(() => import('@/components/FirebaseAuthClient'), {
  ssr: false,
})

export default function AuthPage() {
  const [mode, setMode] = useState<'signUp' | 'signIn'>('signUp')

  const toggleMode = () => {
    setMode((prev) => (prev === 'signUp' ? 'signIn' : 'signUp'))
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-md w-full max-w-md text-center">
        <h1 className="text-2xl font-bold mb-6 text-blue-600 dark:text-blue-300">
          {mode === 'signUp' ? 'Create your Formwise-AI Account' : 'Login to Formwise-AI'}
        </h1>

        <FirebaseAuthClient mode={mode} />

        <p className="mt-6 text-sm text-gray-600 dark:text-gray-300">
          {mode === 'signUp' ? (
            <>
              Already a user?{' '}
              <button onClick={toggleMode} className="text-blue-600 hover:underline font-medium">
                Login
              </button>
            </>
          ) : (
            <>
              New to Formwise-AI?{' '}
              <button onClick={toggleMode} className="text-blue-600 hover:underline font-medium">
                Sign Up
              </button>
            </>
          )}
        </p>
      </div>
    </main>
  )
}
//   </div>
//   )
