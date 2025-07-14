'use client';

import { useEffect, useState } from 'react';
import { useAuthRedirect } from '@/lib/hooks/useAuthRedirect';
import { motion } from 'framer-motion';
import Lottie from 'lottie-react';
import aiAnimation from '@/public/lottie/ai-data-flow.json';

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

export default function LandingPage() {
  const checkingAuth = useAuthRedirect();

  useEffect(() => {
    const saved = localStorage.getItem('theme');
    if (saved === 'dark') {
      document.documentElement.classList.add('dark');
    }
  }, []);

  if (checkingAuth) {
    return <div className="min-h-screen flex items-center justify-center text-gray-500">Checking authentication...</div>;
  }

  return (
    <main className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white scroll-smooth">
      {/* Hero Section */}
      <section className="grid md:grid-cols-2 gap-6 items-center justify-center text-center px-4 py-20 md:py-32 bg-gradient-to-br from-blue-100 to-white dark:from-gray-800 dark:to-gray-900">
        <div>
          <motion.h1
            className="text-4xl md:text-6xl font-bold leading-tight mb-4 text-gray-800 dark:text-white"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}>
            Turn Voice or PDF Inputs into Smart Structured Forms
          </motion.h1>
          <motion.p
            className="text-lg md:text-xl max-w-2xl mx-auto mb-6 text-gray-700 dark:text-gray-300"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}>
            Formwise-AI uses powerful AI (Gemini) to extract structured data from voice notes or messy PDFs in seconds.
          </motion.p>
          <motion.div
            className="mt-8 space-x-4"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}>
            <a href="/auth" className="bg-blue-700 text-white px-6 py-3 rounded-full shadow-md hover:bg-blue-800 transition">
              Try Formwise-AI Now →
            </a>
            <a href="/demo" className="border border-blue-600 text-blue-700 dark:text-blue-400 px-6 py-3 rounded-full hover:bg-blue-100 dark:hover:bg-gray-800 transition">
              Try Demo
            </a>
          </motion.div>
        </div>
        <motion.div
          className="max-w-md mx-auto"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}>
          <Lottie animationData={aiAnimation} loop={true} />
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-6 bg-blue-50 dark:bg-gray-800">
        <div className="max-w-6xl mx-auto text-center">
          <motion.h2
            className="text-3xl font-bold mb-10 text-gray-800 dark:text-white"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}>
            Why Formwise-AI?
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            {[
              {
                title: '🎙️ Voice to Form',
                desc: 'Record your voice and get structured data instantly using Google Cloud Speech + Gemini.',
              },
              {
                title: '📄 Smart PDF Parsing',
                desc: 'Upload PDFs and extract clean JSON-formatted data without manual effort.',
              },
              {
                title: '⚡ Instant Results',
                desc: 'Get results in seconds. Formwise-AI handles the heavy lifting on Google Cloud.',
              },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow hover:shadow-lg transition"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}>
                <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">{item.title}</h3>
                <p className="text-gray-700 dark:text-gray-300">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-white dark:bg-gray-900 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <motion.h2
            className="text-3xl font-bold mb-12 text-gray-800 dark:text-white"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}>
            How It Works
          </motion.h2>
          <div className="flex flex-col md:flex-row items-start justify-between gap-10 text-left">
            {[
              { step: '1', title: 'Upload Voice or PDF', desc: 'Drop in your input from any device or system.' },
              { step: '2', title: 'AI Parses It', desc: 'Gemini and Google Speech-To-Text cleanly extract data.' },
              { step: '3', title: 'Get Structured Output', desc: 'View or copy structured data immediately.' },
            ].map((item, i) => (
              <motion.div
                key={i}
                className="flex-1 bg-blue-100 dark:bg-gray-800 p-6 rounded-xl shadow-sm"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}>
                <div className="text-4xl font-bold text-blue-700 dark:text-blue-400 mb-4">Step {item.step}</div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">{item.title}</h3>
                <p className="text-gray-700 dark:text-gray-300">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Get in Touch CTA */}
      <section className="py-20 px-6 bg-gray-100 dark:bg-gray-800">
        <motion.div
          className="max-w-2xl mx-auto text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}>
          <h3 className="text-3xl font-bold mb-4 text-gray-800 dark:text-white">Let’s Connect</h3>
          <p className="mb-6 text-gray-700 dark:text-gray-300">Reach out to partner, integrate, or support us.</p>
          <a
            href="/contact"
            className="inline-block bg-black text-white px-6 py-3 rounded-xl hover:bg-gray-800">
            Get in Touch
          </a>
        </motion.div>
      </section>
    </main>
  );
}
// This is the main landing page for Formwise-AI, showcasing its features and how it works.
// It uses Framer Motion for animations and Lottie for the AI animation.