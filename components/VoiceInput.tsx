'use client'

import { useState } from 'react'
import { Mic, MicOff } from 'lucide-react'

type Props = {
  onResult: (text: string) => void
}

export default function VoiceInput({ onResult }: Props) {
  const [listening, setListening] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const startListening = () => {
    try {
      const recognition = new (window as any).webkitSpeechRecognition()
      recognition.lang = 'en-US'
      recognition.interimResults = false

      recognition.onstart = () => {
        setListening(true)
        setError(null)
      }

      recognition.onerror = () => {
        setError('🎙️ Voice recognition failed. Please try again.')
        setListening(false)
      }

      recognition.onend = () => {
        setListening(false)
      }

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript
        onResult(transcript)
      }

      recognition.start()
    } catch (e) {
      setError('⚠️ Speech recognition is not supported in your browser.')
    }
  }

  return (
    <div className="space-y-4">
      <button
        onClick={startListening}
        disabled={listening}
        className={`w-full sm:w-auto flex items-center justify-center gap-3 px-6 py-3 text-white text-sm font-semibold rounded-full transition duration-300 shadow-md focus:outline-none ${
          listening
            ? 'bg-red-600 animate-pulse cursor-not-allowed'
            : 'bg-blue-600 hover:bg-blue-700'
        }`}
      >
        {listening ? (
          <>
            <MicOff className="h-5 w-5" /> Listening...
          </>
        ) : (
          <>
            <Mic className="h-5 w-5" /> Start Speaking
          </>
        )}
      </button>

      {error && (
        <div className="text-sm text-red-700 bg-red-50 border border-red-200 p-3 rounded animate-fade-in">
          {error}
        </div>
      )}
    </div>
  )
}
