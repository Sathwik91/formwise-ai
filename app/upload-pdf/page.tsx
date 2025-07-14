// app/upload-pdf/page.tsx
'use client';

import { useState } from 'react';
import Head from 'next/head';
import { PDFDownloadLink, PDFViewer } from '@react-pdf/renderer';
import BrandedPdfDocument from '../../components/BrandedPdfDocument';

export default function UploadPdfPage() {
  const [file, setFile] = useState<File | null>(null);
  const [jsonData, setJsonData] = useState<Record<string, any> | null>(null);
  const [rawResponse, setRawResponse] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const handleUpload = async () => {
    if (!file) return alert('Please select a PDF');
    setLoading(true);
    setSuccess(false);
    setJsonData(null);
    setRawResponse(null);

    const formData = new FormData();
    formData.append('pdf', file);

    try {
      const res = await fetch('/api/parsePdf', {
        method: 'POST',
        body: formData,
      });

      const result = await res.json();
      setLoading(false);

      if (result.error && result.raw) {
        setRawResponse(result.raw);
      } else {
        setJsonData(result);
      }
    } catch (err) {
      setLoading(false);
      setRawResponse('Unexpected error while parsing the PDF.');
    }
  };

  const handleChange = (key: string, value: string) => {
    if (!jsonData) return;
    setJsonData({ ...jsonData, [key]: value });
  };

  const handleSave = async () => {
    const res = await fetch('/api/save-data', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(jsonData),
    });

    const result = await res.json();
    if (result.id) {
      setSuccess(true);
    }
  };

  return (
    <>
      <Head>
        <title>Universal PDF Parsing | Formwise-AI</title>
        <meta
          name="description"
          content="Upload any PDF and extract structured JSON using Gemini AI. Works for resumes, invoices, forms, and more."
        />
      </Head>

      <main className="min-h-screen bg-gradient-to-br from-white to-blue-50 p-6">
        <div className="max-w-6xl mx-auto space-y-6">
          <h1 className="text-3xl font-extrabold text-blue-700 tracking-tight">
            📄 Universal PDF Parser
          </h1>
          <p className="text-gray-600 max-w-2xl">
            Upload any PDF — resume, invoice, report, certificate, etc. Gemini AI will extract structured JSON. You can review and edit before saving.
          </p>

          <div className="bg-white rounded-xl shadow-md p-6 space-y-4 border">
            <input
              type="file"
              accept="application/pdf"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              className="w-full border border-gray-300 rounded px-4 py-2"
            />

            <button
              onClick={handleUpload}
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-2 rounded transition"
            >
              {loading ? '⏳ Processing...' : '📤 Upload & Parse'}
            </button>
          </div>

          {!jsonData && !rawResponse && !loading && (
            <p className="text-sm text-gray-500 mt-4">
              Upload a PDF to see structured data here.
            </p>
          )}

          {file && (
            <div className="mt-6">
              <h2 className="text-lg font-semibold mb-2 text-gray-800">📎 PDF Preview</h2>
              <iframe
                src={URL.createObjectURL(file)}
                className="w-full rounded-xl shadow border h-96"
              />
            </div>
          )}

          {rawResponse && (
            <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-800 p-4 mt-6 rounded">
              <p>
                <strong>⚠️ Could not parse JSON:</strong>
              </p>
              <pre className="mt-2 text-xs whitespace-pre-wrap">{rawResponse}</pre>
            </div>
          )}

          {jsonData && (
            <div className="bg-white shadow-md rounded-xl p-6 mt-8 space-y-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                🧠 AI Extracted Data
              </h2>

              {Object.entries(jsonData).map(([key, value]) => (
                <div key={key}>
                  <label className="block font-bold text-blue-800 capitalize mb-1">{key}</label>
                  <input
                    value={String(value)}
                    onChange={(e) => handleChange(key, e.target.value)}
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm mb-4"
                  />
                </div>
              ))}

              <div className="flex flex-wrap gap-4 mt-6">
                <button
                  onClick={handleSave}
                  className="mt-4 bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg font-semibold transition"
                >
                  💾 Save to Firestore
                </button>

                <PDFDownloadLink
        document={<BrandedPdfDocument data={jsonData} />}
        fileName="Formwise-Parsed.pdf"
        className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded transition"
      >
        {({ loading }) => loading ? 'Preparing PDF...' : '⬇️ Download PDF'}
      </PDFDownloadLink>

      <a
        href={`mailto:?subject=Formwise-AI Parsed PDF&body=Please find the extracted PDF attached from Formwise-AI.`}
        className="mt-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-2 rounded transition"
      >
        📧 Email PDF
      </a>

      <a
        href={`https://wa.me/?text=Here's the extracted PDF from Formwise-AI. Download from our app.`}
        target="_blank"
        className="mt-4 bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-2 rounded transition"
      >
        📲 Share on WhatsApp
      </a>
    </div>

    <div className="mt-10 bg-white rounded-xl border shadow-lg p-4">
      <h3 className="text-lg font-bold mb-2 text-gray-800">🔍 PDF Preview</h3>
      <PDFViewer width="100%" height={500} className="border rounded">
        <BrandedPdfDocument data={jsonData} />
      </PDFViewer>
    </div>
    </div>
          )}
        </div>
      </main>
    </>
  );
}