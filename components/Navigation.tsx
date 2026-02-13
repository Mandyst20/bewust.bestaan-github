'use client'

import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'
import { useState } from 'react'
import { getInitials } from '@/lib/utils'

export function Navigation() {
  const { data: session, status } = useSession()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const isAdmin = session?.user?.role === 'ADMIN'

  const navLinks = session ? [
    { href: '/community', label: 'Community', icon: '💭' },
    { href: '/blogs', label: 'Blogs', icon: '📖' },
    { href: '/oefeningen', label: 'Oefeningen', icon: '🧘' },
    { href: '/cursus', label: 'Cursus', icon: '🌱' },
    { href: '/messages', label: 'Berichten', icon: '💌' },
  ] : []

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-sand-200">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">🌿</span>
            <span className="text-xl font-medium text-sand-900">Bewust Bestaan</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="nav-link px-4 py-2 rounded-lg hover:bg-sand-100"
              >
                <span className="mr-1">{link.icon}</span>
                {link.label}
              </Link>
            ))}
            
            {isAdmin && (
              <Link
                href="/admin"
                className="nav-link px-4 py-2 rounded-lg hover:bg-sand-100 text-terracotta-600"
              >
                <span className="mr-1">⚙️</span>
                Admin
              </Link>
            )}
          </div>

          {/* User Menu */}
          <div className="hidden md:flex items-center gap-3">
            {status === 'loading' ? (
              <div className="w-8 h-8 rounded-full bg-sand-200 animate-pulse" />
            ) : session ? (
              <>
                <Link
                  href="/profile"
                  className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-sand-100 transition-colors"
                >
                  <div className="w-8 h-8 rounded-full bg-terracotta-100 flex items-center justify-center text-terracotta-700 font-medium">
                    {getInitials(session.user.username || session.user.email)}
                  </div>
                  <span className="text-sm font-medium text-sand-700">
                    {session.user.username}
                  </span>
                </Link>
                <button
                  onClick={() => signOut({ callbackUrl: '/' })}
                  className="btn-ghost text-sm"
                >
                  Uitloggen
                </button>
              </>
            ) : (
              <>
                <Link href="/login" className="btn-ghost text-sm">
                  Inloggen
                </Link>
                <Link href="/register" className="btn-primary text-sm">
                  Registreren
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-sand-100"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <svg className="w-6 h-6 text-sand-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-sand-200">
            <div className="space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-sand-100 text-sand-700"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span>{link.icon}</span>
                  {link.label}
                </Link>
              ))}
              
              {isAdmin && (
                <Link
                  href="/admin"
                  className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-sand-100 text-terracotta-600"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span>⚙️</span>
                  Admin
                </Link>
              )}

              {session ? (
                <>
                  <Link
                    href="/profile"
                    className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-sand-100 text-sand-700"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <span>👤</span>
                    Profiel
                  </Link>
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false)
                      signOut({ callbackUrl: '/' })
                    }}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-sand-100 text-sand-700 text-left"
                  >
                    <span>🚪</span>
                    Uitloggen
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-sand-100 text-sand-700"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <span>🔑</span>
                    Inloggen
                  </Link>
                  <Link
                    href="/register"
                    className="flex items-center gap-3 px-4 py-3 rounded-lg bg-terracotta-600 text-white"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <span>✨</span>
                    Registreren
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
