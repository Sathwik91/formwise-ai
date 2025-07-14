'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function GetStartedPage() {
  return (
    <main className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-white to-blue-50 dark:from-gray-900 dark:to-gray-800 px-4 py-20 overflow-hidden">
      {/* 🌀 Blurred Background Glow */}
      <div className="absolute inset-0 overflow-hidden -z-10">
        <div className="absolute top-1/4 left-1/3 w-[400px] h-[400px] bg-blue-400 opacity-30 rounded-full filter blur-3xl animate-pulse" />
        <div className="absolute bottom-1/3 right-1/4 w-[300px] h-[300px] bg-green-400 opacity-20 rounded-full filter blur-2xl animate-ping" />
      </div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center space-y-10 z-10"
      >
        <h1 className="text-4xl sm:text-5xl font-extrabold text-blue-700 dark:text-blue-300">
          🚀 AI Data Extraction Tools
        </h1>
        <p className="text-lg sm:text-xl text-gray-700 dark:text-gray-200 max-w-xl mx-auto">
          Choose how you'd like to extract structured form data — from your voice or from a PDF. Powered by Gemini AI + Google Cloud.
        </p>

        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mt-8">
          {/* 🎙 Voice Upload */}
          <motion.div whileHover={{ scale: 1.05 }} className="w-full sm:w-auto">
            <Link
              href="/get-voice"
              className="relative bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-2xl shadow-lg text-xl font-semibold transition-all duration-300 w-72 text-center block"
            >
              🎙️ Upload Voice
              <span className="absolute top-2 right-2 text-xs bg-white text-blue-600 px-2 py-0.5 rounded-full font-bold shadow">
                Live
              </span>
            </Link>
          </motion.div>

          {/* 📄 PDF Upload */}
          <motion.div whileHover={{ scale: 1.05 }} className="w-full sm:w-auto">
            <Link
              href="/upload-pdf"
              className="relative bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-2xl shadow-lg text-xl font-semibold transition-all duration-300 w-72 text-center block"
            >
              📄 Upload PDF
              <span className="absolute top-2 right-2 text-xs bg-white text-green-600 px-2 py-0.5 rounded-full font-bold shadow">
                Beta
              </span>
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </main>
  );
}
