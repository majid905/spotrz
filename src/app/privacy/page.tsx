import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Privacy Policy – espnsports.online',
  description: 'Read the espnsports.online Privacy Policy. Learn how we collect, use, and protect your personal data in compliance with GDPR and applicable laws.',
  openGraph: {
    title: 'Privacy Policy – espnsports.online',
    url: 'https://espnsports.online/privacy',
  },
}

export default function PrivacyPage() {
  const updated = 'June 11, 2026'
  return (
    <main className="min-h-screen bg-white">
      <section className="bg-gray-900 text-white py-14 sm:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <span className="text-red-500 text-xs font-bold uppercase tracking-widest block mb-3">Legal</span>
          <h1 className="font-oswald font-black uppercase text-3xl sm:text-4xl tracking-tight mb-3">Privacy Policy</h1>
          <p className="text-gray-400 text-sm">Last updated: {updated}</p>
        </div>
      </section>

      <section className="py-12 sm:py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 prose-custom">
          <PolicySection title="1. Introduction">
            <p>Welcome to <strong>espnsports.online</strong> ("we," "us," or "our"). We respect your privacy and are committed to protecting your personal data. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website at <a href="https://espnsports.online" className="text-red-600 hover:underline">https://espnsports.online</a>.</p>
            <p>Please read this policy carefully. If you disagree with its terms, please discontinue use of the site.</p>
          </PolicySection>

          <PolicySection title="2. Information We Collect">
            <p><strong>Information you provide directly:</strong></p>
            <ul>
              <li>Email address when subscribing to our newsletter</li>
              <li>Name and email when contacting us via the contact form</li>
              <li>Account credentials if you register for an account</li>
            </ul>
            <p><strong>Information collected automatically:</strong></p>
            <ul>
              <li>IP address and approximate geographic location</li>
              <li>Browser type, operating system, and device information</li>
              <li>Pages visited, time spent on pages, and referring URLs</li>
              <li>Cookies and similar tracking technologies (see our <Link href="/cookies" className="text-red-600 hover:underline">Cookie Policy</Link>)</li>
            </ul>
          </PolicySection>

          <PolicySection title="3. How We Use Your Information">
            <p>We use the collected information to:</p>
            <ul>
              <li>Deliver and improve our sports scores, highlights, and news services</li>
              <li>Send newsletter updates and sports alerts (only if you subscribed)</li>
              <li>Respond to your enquiries and support requests</li>
              <li>Analyze website usage to enhance user experience</li>
              <li>Prevent fraud and ensure website security</li>
              <li>Comply with legal obligations</li>
            </ul>
          </PolicySection>

          <PolicySection title="4. Legal Basis for Processing (GDPR)">
            <p>If you are in the European Economic Area (EEA), our legal bases for processing your data include:</p>
            <ul>
              <li><strong>Consent</strong> – when you subscribe to our newsletter or accept cookies</li>
              <li><strong>Legitimate interests</strong> – for analytics and website security</li>
              <li><strong>Contract performance</strong> – when providing services you requested</li>
              <li><strong>Legal obligation</strong> – where required by law</li>
            </ul>
          </PolicySection>

          <PolicySection title="5. Cookies">
            <p>We use cookies and similar technologies to enhance your experience. You can control cookie preferences via our cookie banner or browser settings. For full details, see our <Link href="/cookies" className="text-red-600 hover:underline">Cookie Policy</Link>.</p>
          </PolicySection>

          <PolicySection title="6. Third-Party Services">
            <p>We may share data with trusted third parties for:</p>
            <ul>
              <li><strong>Analytics</strong> – Google Analytics (anonymized IP)</li>
              <li><strong>Sports data</strong> – third-party sports score APIs</li>
              <li><strong>Email delivery</strong> – newsletter service providers</li>
              <li><strong>Advertising</strong> – display ad networks (non-personally identifiable data only)</li>
            </ul>
            <p>These third parties have their own privacy policies and we encourage you to review them.</p>
          </PolicySection>

          <PolicySection title="7. Data Retention">
            <p>We retain your data only as long as necessary for the purposes outlined in this policy. Newsletter subscriber data is kept until you unsubscribe. Analytics data is retained per our analytics provider's data retention settings (default 26 months).</p>
          </PolicySection>

          <PolicySection title="8. Your Rights">
            <p>Depending on your location, you may have the right to:</p>
            <ul>
              <li>Access and receive a copy of your personal data</li>
              <li>Rectify inaccurate data</li>
              <li>Request erasure of your data ("right to be forgotten")</li>
              <li>Object to or restrict processing</li>
              <li>Data portability</li>
              <li>Withdraw consent at any time (where processing is based on consent)</li>
            </ul>
            <p>To exercise your rights, email us at <a href="mailto:majid.bd905@gmail.com" className="text-red-600 hover:underline">majid.bd905@gmail.com</a>.</p>
          </PolicySection>

          <PolicySection title="9. Children's Privacy">
            <p>espnsports.online is not directed to children under 13. We do not knowingly collect personal information from children. If you believe we have inadvertently collected such data, please contact us and we will delete it promptly.</p>
          </PolicySection>

          <PolicySection title="10. Changes to This Policy">
            <p>We may update this Privacy Policy periodically. We will notify you of significant changes by updating the "Last updated" date at the top of this page. We encourage you to review this policy regularly.</p>
          </PolicySection>

          <PolicySection title="11. Contact Us">
            <p>For any privacy-related questions or requests:</p>
            <ul>
              <li>Email: <a href="mailto:majid.bd905@gmail.com" className="text-red-600 hover:underline">majid.bd905@gmail.com</a></li>
              <li>Website: <Link href="/contact" className="text-red-600 hover:underline">espnsports.online/contact</Link></li>
            </ul>
          </PolicySection>

          <div className="mt-10 pt-8 border-t border-gray-100">
            <div className="flex flex-wrap gap-3 text-xs text-gray-500">
              <Link href="/terms" className="hover:text-red-600 transition-colors">Terms of Service</Link>
              <span>·</span>
              <Link href="/cookies" className="hover:text-red-600 transition-colors">Cookie Policy</Link>
              <span>·</span>
              <Link href="/dmca" className="hover:text-red-600 transition-colors">DMCA</Link>
              <span>·</span>
              <Link href="/contact" className="hover:text-red-600 transition-colors">Contact</Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

function PolicySection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-8">
      <h2 className="font-oswald font-bold text-gray-900 uppercase text-lg sm:text-xl tracking-tight mb-3 pb-2 border-b border-gray-100">
        {title}
      </h2>
      <div className="text-gray-600 text-sm leading-relaxed space-y-3 [&_ul]:pl-5 [&_ul]:space-y-1.5 [&_ul]:list-disc [&_strong]:text-gray-800 [&_p]:text-sm [&_p]:leading-relaxed">
        {children}
      </div>
    </div>
  )
}
