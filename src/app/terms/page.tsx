import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Terms of Service – espnsports.online',
  description: 'Read the espnsports.online Terms of Service. By using our sports scores and highlights platform, you agree to these terms.',
  openGraph: {
    title: 'Terms of Service – espnsports.online',
    url: 'https://espnsports.online/terms',
  },
}

export default function TermsPage() {
  const updated = 'June 11, 2026'
  return (
    <main className="min-h-screen bg-white">
      <section className="bg-gray-900 text-white py-14 sm:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <span className="text-red-500 text-xs font-bold uppercase tracking-widest block mb-3">Legal</span>
          <h1 className="font-oswald font-black uppercase text-3xl sm:text-4xl tracking-tight mb-3">Terms of Service</h1>
          <p className="text-gray-400 text-sm">Last updated: {updated}</p>
        </div>
      </section>

      <section className="py-12 sm:py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <TermsSection title="1. Acceptance of Terms">
            <p>By accessing or using <strong>espnsports.online</strong> ("Site," "Service"), you confirm that you are at least 13 years old and agree to be bound by these Terms of Service ("Terms"). If you do not agree to these Terms, please do not use our Service.</p>
          </TermsSection>

          <TermsSection title="2. Description of Service">
            <p>espnsports.online provides:</p>
            <ul>
              <li>Live and historical sports scores (football/soccer, boxing, UFC, NFL)</li>
              <li>Match highlights and video content</li>
              <li>Sports news and editorial blog posts</li>
              <li>Newsletter and sports alerts</li>
            </ul>
            <p>We reserve the right to modify, suspend, or discontinue any aspect of the Service at any time without notice.</p>
          </TermsSection>

          <TermsSection title="3. User Conduct">
            <p>You agree not to:</p>
            <ul>
              <li>Use the Service for any unlawful purpose or in violation of any regulations</li>
              <li>Scrape, crawl, or use automated tools to extract data without written permission</li>
              <li>Attempt to gain unauthorized access to any part of the Service or its infrastructure</li>
              <li>Transmit viruses, malware, or any harmful code</li>
              <li>Impersonate any person or entity</li>
              <li>Use the Service to spam, harass, or abuse others</li>
              <li>Reproduce or redistribute our original content without attribution or permission</li>
            </ul>
          </TermsSection>

          <TermsSection title="4. Intellectual Property">
            <p>All original content on espnsports.online — including articles, editorial text, graphics, logos, and UI design — is the intellectual property of espnsports.online or its content partners and is protected by copyright and trademark laws.</p>
            <p>Sports scores and statistics are factual data and are not subject to copyright. However, the presentation, analysis, and formatting of this data is our proprietary work.</p>
            <p>You may share links to our content. Reproducing full articles or embedding our video highlights on third-party websites without permission is prohibited.</p>
          </TermsSection>

          <TermsSection title="5. Third-Party Content & Links">
            <p>Our Service may contain links to third-party websites or embed content from third-party platforms (e.g., YouTube). We do not control these third-party sites and are not responsible for their content or privacy practices. Links are provided for convenience only.</p>
          </TermsSection>

          <TermsSection title="6. Disclaimer of Warranties">
            <p>The Service is provided on an <strong>"AS IS" and "AS AVAILABLE"</strong> basis without warranties of any kind, express or implied. We do not warrant that:</p>
            <ul>
              <li>The Service will be uninterrupted or error-free</li>
              <li>Sports scores and data will be 100% accurate or up to date</li>
              <li>The Service will meet your specific requirements</li>
            </ul>
            <p>Use of the Service is at your sole risk.</p>
          </TermsSection>

          <TermsSection title="7. Limitation of Liability">
            <p>To the fullest extent permitted by law, espnsports.online and its operators shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of (or inability to use) the Service, including but not limited to loss of data, revenue, or profits.</p>
          </TermsSection>

          <TermsSection title="8. DMCA & Copyright">
            <p>We respect intellectual property rights. If you believe content on our site infringes your copyright, please see our <Link href="/dmca" className="text-red-600 hover:underline">DMCA Policy</Link> and submit a takedown notice.</p>
          </TermsSection>

          <TermsSection title="9. Privacy">
            <p>Your use of the Service is also governed by our <Link href="/privacy" className="text-red-600 hover:underline">Privacy Policy</Link>, which is incorporated into these Terms by reference.</p>
          </TermsSection>

          <TermsSection title="10. Cookies">
            <p>By using espnsports.online, you consent to our use of cookies as described in our <Link href="/cookies" className="text-red-600 hover:underline">Cookie Policy</Link>.</p>
          </TermsSection>

          <TermsSection title="11. Termination">
            <p>We may suspend or terminate your access to the Service immediately, without prior notice, if you breach these Terms or engage in conduct we determine to be harmful to the Service or other users.</p>
          </TermsSection>

          <TermsSection title="12. Governing Law">
            <p>These Terms shall be governed by and construed in accordance with applicable laws. Any disputes arising under these Terms shall be subject to the exclusive jurisdiction of the competent courts in the jurisdiction of the site operator.</p>
          </TermsSection>

          <TermsSection title="13. Changes to Terms">
            <p>We reserve the right to update these Terms at any time. Changes are effective upon posting to the Site. Your continued use of the Service after changes constitutes your acceptance of the new Terms.</p>
          </TermsSection>

          <TermsSection title="14. Contact">
            <p>Questions about these Terms? Contact us at <a href="mailto:majid.bd905@gmail.com" className="text-red-600 hover:underline">majid.bd905@gmail.com</a> or via our <Link href="/contact" className="text-red-600 hover:underline">contact page</Link>.</p>
          </TermsSection>

          <div className="mt-10 pt-8 border-t border-gray-100">
            <div className="flex flex-wrap gap-3 text-xs text-gray-500">
              <Link href="/privacy" className="hover:text-red-600 transition-colors">Privacy Policy</Link>
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

function TermsSection({ title, children }: { title: string; children: React.ReactNode }) {
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
