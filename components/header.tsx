'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth'
import { app } from '@/lib/firebase'
import { useRouter, usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'
import { getUserRole } from '@/lib/firebaseUser'

export default function Header() {
  const [user, setUser] = useState<any>(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    const auth = getAuth(app)
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const role = await getUserRole(user.uid)
        setUser({ ...user, role })
      }
    })
    return () => unsubscribe()
  }, [])

  const handleLogout = async () => {
    const auth = getAuth(app)
    await signOut(auth)
    setUser(null)
    router.push('/')
  }

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About Us', href: '/about' },
    { name: 'Contact Us', href: '/contact-us' },
  ]

  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/formwise-logo.png" alt="Formwise-AI Logo" width={36} height={36} />
          <span className="text-2xl font-bold text-blue-600">
            Formwise<span className="text-gray-800 dark:text-white">-AI</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`${
                pathname === link.href ? 'text-blue-600 font-semibold' : 'text-gray-700 dark:text-gray-300'
              } hover:text-blue-600 transition`}
            >
              {link.name}
            </Link>
          ))}

          {user?.role === 'admin' && (
            <Link
              href="/admin-dashboard"
              className="text-red-600 font-semibold hover:underline"
            >
              Admin Panel
            </Link>
          )}

          {user ? (
            <>
              <span className="text-sm text-gray-800 dark:text-white font-semibold">
                {user.email.split('@')[0]}
              </span>
              {user.role === 'admin' && (
                <span className="ml-2 bg-yellow-100 text-yellow-800 px-2 py-1 text-xs rounded">
                  Admin
                </span>
              )}
              <button
                onClick={handleLogout}
                className="text-xs px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <Link href="/auth" className="text-blue-600 hover:underline">
              Login
            </Link>
          )}
        </nav>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden text-gray-700 dark:text-white focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle Menu"
        >
          {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      <div
        aria-hidden={!menuOpen}
        className={`md:hidden px-4 transition-all duration-300 ease-in-out overflow-hidden ${
          menuOpen ? 'max-h-96 opacity-100 pb-4' : 'max-h-0 opacity-0'
        } bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800`}
      >
        <div className="space-y-2">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className={`block text-sm font-medium ${
                pathname === link.href ? 'text-blue-600 font-semibold' : 'text-gray-700 dark:text-gray-300'
              } hover:text-blue-600 transition`}
            >
              {link.name}
            </Link>
          ))}

          {user?.role === 'admin' && (
            <Link
              href="/admin-dashboard"
              onClick={() => setMenuOpen(false)}
              className="block text-sm text-red-600 font-medium hover:underline"
            >
              Admin Panel
            </Link>
          )}

          {user ? (
            <>
              <p className="text-sm text-gray-700 dark:text-white font-semibold">
                {user.email.split('@')[0]}
              </p>
              {user.role === 'admin' && (
                <span className="inline-block bg-yellow-100 text-yellow-800 px-2 py-1 text-xs rounded">
                  Admin
                </span>
              )}
              <button
                onClick={() => {
                  handleLogout()
                  setMenuOpen(false)
                }}
                className="text-left w-full text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-800 px-4 py-2 rounded"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              href="/auth"
              onClick={() => setMenuOpen(false)}
              className="block text-blue-600 hover:underline text-sm font-medium"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </header>
  )
}
// This component is the header for the Formwise-AI application.
// It includes a logo, navigation links, and user authentication options.
// The header is responsive, with a mobile dropdown menu for smaller screens.
// It uses Firebase for authentication and displays user roles if applicable.