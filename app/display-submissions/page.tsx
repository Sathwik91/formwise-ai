'use client'
import AuthCheck from '@/components/AuthCheck'
import { useEffect, useState } from 'react'

export default function DisplaySubmissions() {
const [submissions, setSubmissions] = useState<any[]>([])

useEffect(() => {
const fetchSubmissions = async () => {
const res = await fetch('/api/get-submissions')
const { submissions } = await res.json()
setSubmissions(submissions)
}
fetchSubmissions()
}, [])

const downloadJSON = (entry: any) => {
const blob = new Blob([JSON.stringify(entry, null, 2)], { type: 'application/json' })
const url = URL.createObjectURL(blob)
const a = document.createElement('a')
a.href = url
a.download = `submission-${entry.id}.json`
a.click()
}

const shareWhatsApp = (entry: any) => {
const msg = encodeURIComponent(
  `🧾 Submission Details:\n\n` +
    Object.entries(entry)
      .map(([k, v]) => `${k}: ${v}`)
      .join('\n')
)
window.open(`https://wa.me/?text=${msg}`, '_blank')
}

const shareEmail = (entry: any) => {
const body = encodeURIComponent(
  Object.entries(entry).map(([k, v]) => `${k}: ${v}`).join('\n')
)
window.location.href = `mailto:?subject=Formwise-AI Submission&body=${body}`
}

return (
<AuthCheck>
<div className="p-4 max-w-5xl mx-auto">
<h1 className="text-2xl font-bold mb-6">📋 Form Submissions</h1>
<div className="grid gap-6">
{submissions.map((entry) => (
<div key={entry.id} className="border p-4 rounded-lg shadow space-y-1">
{Object.entries(entry).map(([key, value]) => (
key !== 'id' && (
<p key={key}><strong>{key}:</strong> {String(value)}</p>
)
))}

php-template
Copy
Edit
          <div className="mt-3 flex gap-2 text-sm">
            <button onClick={() => downloadJSON(entry)} className="bg-gray-200 px-3 py-1 rounded hover:bg-gray-300">
              ⬇️ Download
            </button>
            <button onClick={() => shareWhatsApp(entry)} className="bg-green-100 text-green-700 px-3 py-1 rounded hover:bg-green-200">
              📲 WhatsApp
            </button>
            <button onClick={() => shareEmail(entry)} className="bg-blue-100 text-blue-700 px-3 py-1 rounded hover:bg-blue-200">
              📧 Email
            </button>
          </div>
        </div>
      ))}
    </div>
  </div>
</AuthCheck>
)
}