'use client'
import { useState } from 'react'

const faqs = [
  { q: 'How can I register my team?', a: 'You can register your team through our official registration portal. Fill in your team details, player roster, and pay the registration fee to get started.' },
  { q: 'What is the tournament format?', a: 'Our tournaments follow a group stage followed by knockout rounds. Each group has 4 teams playing round-robin, with the top 2 advancing to the knockout phase.' },
  { q: 'Who is eligible to participate?', a: 'Players aged 18 and above are eligible to participate. Amateur and semi-professional players are welcome. Professional players with active contracts may have restrictions.' },
  { q: 'Where will the matches be held?', a: 'Matches will be held at multiple stadiums across the city. The specific venue for each match will be communicated at least 7 days in advance.' },
  { q: 'Are there prizes for winners?', a: 'Yes! The winning team receives a cash prize, trophies, and medals. Runners-up and third-place teams also receive recognition and prizes.' },
  { q: 'Can fans attend the tournament?', a: 'Absolutely! Fans are welcome to attend all matches. Tickets can be purchased online through our website or at the venue on match day.' },
]

export default function FAQSection() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section className="py-16 sm:py-20" style={{ background: '#07091a' }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid md:grid-cols-5 gap-8 md:gap-10 items-start">

          {/* Left Card */}
          <div className="md:col-span-2">
            <div className="bg-white rounded-3xl rounded-tl-none p-6 sm:p-10">
              <h2 className="font-oswald font-bold text-gray-900 uppercase leading-tight mb-4 tracking-tight"
                style={{ fontSize: 'clamp(1.6rem, 6vw, 2.5rem)' }}>
                Got Questions?<br />We&apos;ve Got Answers.
              </h2>
              <p className="text-gray-500 text-sm leading-relaxed mb-6 sm:mb-8">
                From registration to match day — here&apos;s what players and fans should know.
              </p>
              <p className="text-gray-700 text-sm font-semibold mb-4">Do you have another question?</p>
              <button className="bg-red-600 hover:bg-red-700 active:bg-red-800 text-white text-xs font-bold uppercase tracking-widest px-8 py-3.5 rounded-full transition-colors min-h-[44px]">
                Contact Us
              </button>
            </div>
          </div>

          {/* Right Accordion */}
          <div className="md:col-span-3 space-y-2">
            {faqs.map((faq, i) => (
              <div key={i} className="border border-white/10 rounded-xl overflow-hidden">
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  className="w-full flex items-center justify-between px-4 sm:px-5 py-4 text-left min-h-[56px] active:opacity-80 transition-opacity"
                  style={{ background: open === i ? '#0d1a2e' : '#0d1526' }}
                >
                  <span className="text-white text-sm font-semibold pr-4 leading-snug">{faq.q}</span>
                  <span className={`text-gray-400 text-xl font-light shrink-0 transition-transform duration-200 ${open === i ? 'rotate-45' : ''}`}>
                    +
                  </span>
                </button>
                {open === i && (
                  <div className="px-4 sm:px-5 py-4" style={{ background: '#0d1a2e' }}>
                    <p className="text-gray-400 text-sm leading-relaxed">{faq.a}</p>
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
