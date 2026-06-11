'use client'
import { useState } from 'react'
import Link from 'next/link'

export default function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'loading' | 'ok' | 'err'>('idle')

  function setF(k: string, v: string) {
    setForm(f => ({ ...f, [k]: v }))
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    if (!form.name || !form.email || !form.message) return
    setStatus('loading')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      setStatus(res.ok ? 'ok' : 'err')
      if (res.ok) setForm({ name: '', email: '', subject: '', message: '' })
    } catch {
      setStatus('err')
    }
    setTimeout(() => setStatus('idle'), 6000)
  }

  const inp = 'w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 outline-none focus:border-red-400 focus:ring-1 focus:ring-red-100 transition-all placeholder-gray-400'

  return (
    <div className="grid md:grid-cols-5 gap-10 md:gap-14">
      {/* Info */}
      <div className="md:col-span-2 space-y-6">
        <div>
          <h2 className="font-oswald font-bold text-gray-900 uppercase text-xl tracking-tight mb-4">Contact Info</h2>
          <div className="space-y-4">
            {[
              { icon: '✉️', label: 'General Inquiries', value: 'majid.bd905@gmail.com', href: 'mailto:majid.bd905@gmail.com' },
              { icon: '⚖️', label: 'Legal / DMCA', value: 'majid.bd905@gmail.com', href: 'mailto:majid.bd905@gmail.com' },
              { icon: '📢', label: 'Advertising', value: 'majid.bd905@gmail.com', href: 'mailto:majid.bd905@gmail.com' },
            ].map(item => (
              <div key={item.label} className="flex gap-3">
                <span className="text-xl shrink-0 mt-0.5">{item.icon}</span>
                <div>
                  <div className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-0.5">{item.label}</div>
                  <a href={item.href} className="text-sm text-red-600 hover:underline">{item.value}</a>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="border-t border-gray-100 pt-6">
          <h3 className="font-bold text-gray-900 text-sm uppercase tracking-widest mb-3">Quick Links</h3>
          <div className="space-y-2">
            {[
              { href: '/dmca', label: 'DMCA Takedown Notice' },
              { href: '/privacy', label: 'Privacy Policy' },
              { href: '/terms', label: 'Terms of Service' },
              { href: '/about', label: 'About Spotrz' },
            ].map(link => (
              <Link key={link.href} href={link.href} className="flex items-center gap-2 text-sm text-gray-600 hover:text-red-600 transition-colors">
                <span className="text-red-500 text-xs">→</span>
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="border-t border-gray-100 pt-6">
          <p className="text-gray-500 text-xs leading-relaxed">
            We aim to respond to all enquiries within <strong>1–3 business days</strong>. For urgent copyright or legal matters, include "URGENT" in your subject line.
          </p>
        </div>
      </div>

      {/* Form */}
      <div className="md:col-span-3">
        <h2 className="font-oswald font-bold text-gray-900 uppercase text-xl tracking-tight mb-6">Send a Message</h2>

        {status === 'ok' ? (
          <div className="bg-green-50 border border-green-200 rounded-2xl p-8 text-center">
            <div className="text-4xl mb-3">✓</div>
            <h3 className="font-bold text-green-800 text-lg mb-2">Message Sent!</h3>
            <p className="text-green-700 text-sm">Thanks for reaching out. We'll get back to you within 1–3 business days.</p>
          </div>
        ) : (
          <form onSubmit={submit} className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">Name *</label>
                <input
                  value={form.name}
                  onChange={e => setF('name', e.target.value)}
                  placeholder="Your full name"
                  required
                  className={inp}
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">Email *</label>
                <input
                  type="email"
                  value={form.email}
                  onChange={e => setF('email', e.target.value)}
                  placeholder="your@email.com"
                  required
                  className={inp}
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">Subject</label>
              <select
                value={form.subject}
                onChange={e => setF('subject', e.target.value)}
                className={inp}
              >
                <option value="">Select a topic…</option>
                <option value="General Inquiry">General Inquiry</option>
                <option value="Advertising">Advertising</option>
                <option value="DMCA Takedown">DMCA Takedown</option>
                <option value="Press / Media">Press / Media</option>
                <option value="Bug Report">Bug Report</option>
                <option value="Partnership">Partnership</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">Message *</label>
              <textarea
                value={form.message}
                onChange={e => setF('message', e.target.value)}
                placeholder="Tell us how we can help…"
                required
                rows={6}
                className={`${inp} resize-none`}
              />
            </div>

            {status === 'err' && (
              <p className="text-red-500 text-sm">Something went wrong. Please try again or email us directly.</p>
            )}

            <button
              type="submit"
              disabled={status === 'loading'}
              className="bg-red-600 hover:bg-red-700 disabled:opacity-60 text-white text-xs font-bold uppercase tracking-widest px-8 py-3.5 transition-colors w-full sm:w-auto"
            >
              {status === 'loading' ? 'Sending…' : 'Send Message'}
            </button>
          </form>
        )}
      </div>
    </div>
  )
}
