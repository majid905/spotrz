import SessionWrapper from './components/SessionWrapper'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <SessionWrapper>{children}</SessionWrapper>
}
