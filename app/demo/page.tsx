'use client'

import { useState } from 'react'

export default function DemoPage() {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [previewData, setPreviewData] = useState<any>(null)

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setUploadedFile(file)

    // Simulate AI parsed output
    setPreviewData({
      name: file.name,
      result: {
        full_name: 'John Doe',
        email: 'john@example.com',
        message: 'This is a simulated AI preview of your structured form data.',
      },
    })
  }

  return (
    <main className="min-h-screen py-20 px-6 bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
      <div className="max-w-3xl mx-auto text-center">
        <h1 className="text-4xl font-bold mb-4">Try Formwise-AI Demo</h1>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Upload a sample voice or PDF file to see how Formwise-AI parses your data.
        </p>

        <input
          type="file"
          accept=".pdf,.mp3,.wav"
          onChange={handleFileUpload}
          className="mb-6 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700"
        />

        {uploadedFile && previewData && (
          <div className="bg-blue-50 dark:bg-gray-800 p-6 rounded-xl shadow text-left">
            <h2 className="text-lg font-semibold text-blue-800 dark:text-blue-300 mb-2">
              Uploaded File: {previewData.name}
            </h2>
            <pre className="bg-white dark:bg-gray-900 p-4 rounded text-sm overflow-auto text-gray-800 dark:text-gray-200">
              {JSON.stringify(previewData.result, null, 2)}
            </pre>
            <p className="mt-4 text-sm italic text-gray-600 dark:text-gray-400">
              This is a mock preview. Please log in for full AI capabilities.
            </p>
          </div>
        )}
      </div>
    </main>
  )
}
