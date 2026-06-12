'use client'
import { useState } from 'react'

interface FAQ { id: number; question: string; answer: string }

export default function FAQClient({ faqs }: { faqs: FAQ[] }) {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section className="py-16 sm:py-20" style={{ background: '#07091a' }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid md:grid-cols-5 gap-8 md:gap-10 items-start">

          {/* Left heading */}
          <div className="md:col-span-2">
            <span className="text-red-500 text-xs font-bold uppercase tracking-widest block mb-3">FAQ</span>
            <h2 className="font-oswald font-bold text-white uppercase leading-tight mb-4 tracking-tight"
              style={{ fontSize: 'clamp(1.8rem, 7vw, 3rem)' }}>
              Frequently Asked Questions
            </h2>
            <p className="text-gray-500 text-sm leading-relaxed">
              Everything you need to know about FIFA World Cup 2026 and ESPN Sports live streaming.
            </p>
          </div>

          {/* Right accordion */}
          <div className="md:col-span-3 space-y-2">
            {faqs.map(f => (
              <div key={f.id} className="rounded-xl overflow-hidden border border-white/5">
                <button
                  onClick={() => setOpen(open === f.id ? null : f.id)}
                  className="w-full flex items-center justify-between gap-3 px-5 py-4 text-left transition-colors hover:bg-white/5"
                  style={{ background: open === f.id ? '#0d1526' : '#0a0f1e' }}
                >
                  <span className="text-white font-semibold text-sm leading-snug pr-2">{f.question}</span>
                  <span className={`flex-shrink-0 w-6 h-6 rounded-full border transition-all flex items-center justify-center ${
                    open === f.id ? 'border-red-500 bg-red-600' : 'border-white/20'
                  }`}>
                    <svg className={`w-3.5 h-3.5 text-white transition-transform ${open === f.id ? 'rotate-180' : ''}`}
                      fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7"/>
                    </svg>
                  </span>
                </button>
                {open === f.id && (
                  <div className="px-5 pb-5 pt-1" style={{ background: '#0d1526' }}>
                    <p className="text-gray-400 text-sm leading-relaxed">{f.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}
