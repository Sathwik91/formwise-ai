'use client';

import { useState } from 'react';
import { Mail, User, MessageSquare } from 'lucide-react';

export default function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('Sending...');

    try {
      const response = await fetch(
        process.env.NEXT_PUBLIC_CONTACT_FUNCTION_URL || '/api/contact',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': process.env.NEXT_PUBLIC_CONTACT_API_KEY || '',
          },
          body: JSON.stringify(form),
        }
      );

      const result = await response.json();

      if (result.success) {
        setStatus('✅ Message sent successfully!');
        setForm({ name: '', email: '', message: '' });
      } else {
        setStatus(`❌ ${result.error || 'Failed to send message'}`);
      }
    } catch (error) {
      console.error(error);
      setStatus('❌ Network or server error.');
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-100 dark:from-gray-900 dark:to-blue-950 px-4 py-20">
      <section className="max-w-2xl mx-auto bg-white dark:bg-gray-900 rounded-3xl shadow-xl p-10">
        <h1 className="text-4xl font-extrabold text-center text-blue-700 dark:text-blue-400 mb-6">
          ✉️ Contact Us
        </h1>
        <p className="text-center text-gray-600 dark:text-gray-300 mb-10">
          We'd love to hear from you! Send us your thoughts, feedback, or questions and we’ll respond as soon as possible.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name */}
          <div>
            <label htmlFor="name" className="block mb-1 font-medium text-gray-800 dark:text-gray-200">
              <User size={18} className="inline mr-1" />
              Your Name
            </label>
            <input
              id="name"
              type="text"
              placeholder="Jane Doe"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block mb-1 font-medium text-gray-800 dark:text-gray-200">
              <Mail size={18} className="inline mr-1" />
              Your Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="jane@example.com"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Message */}
          <div>
            <label htmlFor="message" className="block mb-1 font-medium text-gray-800 dark:text-gray-200">
              <MessageSquare size={18} className="inline mr-1" />
              Your Message
            </label>
            <textarea
              id="message"
              placeholder="Type your message here..."
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white h-32 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition"
          >
            📤 Send Message
          </button>

          {/* Status Message */}
          {status && (
            <p className="text-center text-sm mt-3 text-gray-700 dark:text-gray-300">
              {status}
            </p>
          )}
        </form>
      </section>
    </main>
  );
}
