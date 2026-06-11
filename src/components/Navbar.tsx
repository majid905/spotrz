'use client'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

interface NavbarProps { logoUrl?: string; siteName?: string }

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/#live-scores', label: 'Live Scores' },
  { href: '/#highlights', label: 'Highlights' },
  { href: '/blog', label: 'Blog' },
]

export default function Navbar({ logoUrl = '/logo.png', siteName = 'Sportz' }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()

  function isActive(href: string) {
    if (href === '/') return pathname === '/'
    if (href.startsWith('/#')) return pathname === '/'
    return pathname.startsWith(href)
  }

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center h-16 relative">

          {/* Left Nav — desktop */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.slice(0, 2).map(item => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-xs font-bold uppercase tracking-widest transition-colors py-5 ${
                  isActive(item.href)
                    ? 'text-red-600 border-b-2 border-red-600'
                    : 'text-gray-600 hover:text-red-600'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Center Logo */}
          <Link href="/" className="flex items-center gap-2 absolute left-1/2 -translate-x-1/2">
            <Image
              src={logoUrl}
              alt={siteName}
              width={34}
              height={34}
              unoptimized={logoUrl.startsWith('/uploads/')}
            />
            <span className="font-oswald text-xl sm:text-2xl font-bold text-gray-900 uppercase tracking-widest">
              {siteName}
            </span>
          </Link>

          {/* Right Nav — desktop */}
          <div className="hidden md:flex items-center gap-8 ml-auto">
            {navLinks.slice(2).map(item => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-xs font-bold uppercase tracking-widest transition-colors py-5 ${
                  isActive(item.href)
                    ? 'text-red-600 border-b-2 border-red-600'
                    : 'text-gray-600 hover:text-red-600'
                }`}
              >
                {item.label}
              </Link>
            ))}

            {/* Live badge */}
            <Link
              href="/#live-streams"
              className="flex items-center gap-1.5 bg-red-600 hover:bg-red-700 text-white text-[10px] font-bold uppercase tracking-widest px-3.5 py-2 rounded-full transition-colors"
            >
              <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
              Live
            </Link>
          </div>

          {/* Mobile: hamburger only */}
          <div className="md:hidden flex items-center ml-auto">
            <button
              className="p-2.5 text-gray-600 hover:text-red-600 transition-colors"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={menuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
                />
              </svg>
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 shadow-lg">
          {navLinks.map(item => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center px-6 py-4 text-sm font-bold uppercase tracking-widest border-b border-gray-50 transition-colors ${
                isActive(item.href)
                  ? 'text-red-600 bg-red-50'
                  : 'text-gray-700 hover:text-red-600 hover:bg-red-50'
              }`}
              onClick={() => setMenuOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/#live-streams"
            className="flex items-center gap-2 px-6 py-4 text-sm font-bold text-red-600 uppercase tracking-widest"
            onClick={() => setMenuOpen(false)}
          >
            <span className="w-2 h-2 bg-red-600 rounded-full animate-pulse" />
            Watch Live
          </Link>
        </div>
      )}
    </nav>
  )
}
