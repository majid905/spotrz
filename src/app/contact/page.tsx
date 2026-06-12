import type { Metadata } from 'next'
import ContactForm from './ContactForm'

export const metadata: Metadata = {
  title: 'Contact Us – espnsports.online',
  description: 'Get in touch with the espnsports.online team for general inquiries, advertising, press, DMCA notices, and more.',
  openGraph: {
    title: 'Contact Us – espnsports.online',
    url: 'https://espnsports.online/contact',
  },
}

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-gray-900 text-white py-14 sm:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <span className="text-red-500 text-xs font-bold uppercase tracking-widest block mb-3">Get in Touch</span>
          <h1 className="font-oswald font-black uppercase text-3xl sm:text-4xl tracking-tight mb-3">Contact Us</h1>
          <p className="text-gray-400 text-sm">Questions, press inquiries, advertising, or DMCA requests — we're here.</p>
        </div>
      </section>

      <section className="py-12 sm:py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <ContactForm />
        </div>
      </section>
    </main>
  )
}
