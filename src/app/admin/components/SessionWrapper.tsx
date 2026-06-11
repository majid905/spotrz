'use client'
import { SessionProvider } from 'next-auth/react'
import { usePathname } from 'next/navigation'
import AdminSidebar from './AdminSidebar'
import AdminHeader from './AdminHeader'

export default function SessionWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isLogin = pathname === '/admin/login'

  return (
    <SessionProvider>
      {isLogin ? (
        <>{children}</>
      ) : (
        <div className="admin-panel flex min-h-screen" style={{ background: '#eef2f7' }}>
          <AdminSidebar />
          <div className="flex-1 flex flex-col" style={{ marginLeft: '230px' }}>
            <AdminHeader />
            <main className="flex-1 p-6 overflow-auto">{children}</main>
          </div>
        </div>
      )}
    </SessionProvider>
  )
}
