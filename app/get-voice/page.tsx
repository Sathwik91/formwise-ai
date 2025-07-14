'use client'

import { useState } from 'react'
import VoiceInput from '@/components/VoiceInput'
import FormDisplay from '@/components/FormDisplay'

export default function VoiceFormPage() {
  const [formData, setFormData] = useState<{ [key: string]: any }>({})
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [rawText, setRawText] = useState<string | null>(null)

  const parseTextToForm = async (text: string) => {
    setLoading(true)
    setError(null)
    setSuccess(false)
    setRawText(text)

    try {
      const res = await fetch('/api/parseForm', {
        method: 'POST',
        body: JSON.stringify({ text }),
        headers: { 'Content-Type': 'application/json' },
      })

      const data = await res.json()

      if (res.ok && data && typeof data === 'object' && !data.error) {
        setFormData(data)
      } else {
        throw new Error(data.detail || 'AI could not parse your voice input.')
      }
    } catch (err: any) {
      console.error(err)
      setError(err.message || 'Something went wrong while parsing.')
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async () => {
    try {
      const res = await fetch('/api/save-data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const result = await res.json()
      if (result.id) {
        setSuccess(true)
      } else {
        throw new Error('Save failed')
      }
    } catch (err) {
      setError('Could not save to Firestore.')
    }
  }

  const handleReset = () => {
    setFormData({})
    setSuccess(false)
    setError(null)
    setRawText(null)
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-blue-50 p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <h1 className="text-3xl font-extrabold text-blue-700 tracking-tight">🎙️ Voice to Form</h1>
        <p className="text-gray-600 max-w-2xl">
          Speak aloud — Gemini AI + Google Speech will auto-parse and structure the data into a clean editable form.
        </p>

        <div className="bg-white shadow rounded-xl p-6 space-y-4 border">
          <VoiceInput onResult={parseTextToForm} />
        </div>

        {loading && (
          <div className="text-blue-600 font-medium">⏳ Parsing your input...</div>
        )}

        {error && (
          <div className="bg-red-100 text-red-700 p-4 rounded">❌ {error}</div>
        )}

        {rawText && !formData && !loading && (
          <div className="bg-yellow-100 text-yellow-800 p-4 rounded mt-4">
            ⚠️ Voice captured but parsing failed. Please try again or rephrase.
            <pre className="text-xs mt-2">{rawText}</pre>
          </div>
        )}

        {formData && typeof formData === 'object' && Object.keys(formData).length > 0 && (
          <div className="bg-white p-6 shadow rounded-xl">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-800">🧠 Extracted Data</h2>
              <button
                onClick={handleReset}
                className="text-sm text-gray-500 underline hover:text-gray-700"
              >
                Reset
              </button>
            </div>

            <FormDisplay data={formData} editable onChange={setFormData} />

            <button
              onClick={handleSave}
              className="mt-4 bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2 rounded transition"
            >
              💾 Save to Firestore
            </button>

            {success && (
              <p className="text-green-600 mt-2">✅ Saved successfully!</p>
            )}

            {/* Action Buttons */}
            <div className="mt-6 flex flex-wrap gap-4">
              {/* Preview */}
              <button
                onClick={() => alert(JSON.stringify(formData, null, 2))} // Optional: replace with modal
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded shadow text-sm"
              >
                📄 Preview
              </button>

              {/* Download JSON */}
              <button
                onClick={() => {
                  const blob = new Blob([JSON.stringify(formData, null, 2)], {
                    type: 'application/json',
                  })
                  const url = URL.createObjectURL(blob)
                  const link = document.createElement('a')
                  link.href = url
                  link.download = 'formwise-data.json'
                  link.click()
                }}
                className="bg-blue-100 hover:bg-blue-200 text-blue-800 px-4 py-2 rounded shadow text-sm"
              >
                ⬇️ Download JSON
              </button>

              {/* Share */}
              <button
                onClick={() => {
                  const shareText = JSON.stringify(formData, null, 2)
                  if (navigator.share) {
                    navigator.share({
                      title: 'Formwise Data',
                      text: 'Check out this structured form data from Formwise-AI',
                      url: window.location.href,
                    })
                  } else {
                    navigator.clipboard.writeText(shareText)
                    alert('📋 Data copied to clipboard.')
                  }
                }}
                className="bg-green-100 hover:bg-green-200 text-green-800 px-4 py-2 rounded shadow text-sm"
              >
                🔗 Share
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
