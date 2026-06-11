'use client'
import { useSession } from 'next-auth/react'
import { usePathname } from 'next/navigation'

const titles: Record<string, string> = {
  '/admin': 'Dashboard',
  '/admin/hero': 'Hero Section',
  '/admin/scores': 'Live Scores',
  '/admin/matches': 'Match Schedule',
  '/admin/blog': 'Blog Posts',
  '/admin/faq': 'FAQ Management',
  '/admin/settings': 'Settings',
  '/admin/analytics': 'Analytics',
  '/admin/live-matches': 'Live Streams',
  '/admin/highlights': 'Highlights',
}

export default function AdminHeader() {
  const { data: session } = useSession()
  const pathname = usePathname()
  const title = titles[pathname] || 'Admin Panel'

  return (
    <header className="bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between sticky top-0 z-30">
      <h1 className="text-xl font-bold text-gray-900">{title}</h1>

      <div className="flex items-center gap-4">
        {/* Notification */}
        <button className="relative p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-50 transition">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/>
          </svg>
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
        </button>

        {/* User */}
        <div className="flex items-center gap-3 pl-4 border-l border-gray-100">
          <div className="w-8 h-8 bg-[#0d1526] rounded-full flex items-center justify-center text-white text-xs font-bold">
            {session?.user?.name?.[0] || 'A'}
          </div>
          <div className="hidden sm:block">
            <p className="text-sm font-semibold text-gray-900 leading-none">{session?.user?.name || 'Admin'}</p>
            <p className="text-xs text-gray-400 mt-0.5">{(session?.user as any)?.role || 'admin'}</p>
          </div>
          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7"/>
          </svg>
        </div>

        {/* Messages */}
        <button className="relative p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-50 transition">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"/>
          </svg>
          <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-500 rounded-full text-white text-[9px] font-bold flex items-center justify-center">3</span>
        </button>
      </div>
    </header>
  )
}
