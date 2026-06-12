import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'DMCA Policy – espnsports.online',
  description: 'espnsports.online DMCA takedown policy. Report copyright infringement and learn how we handle intellectual property complaints.',
  openGraph: {
    title: 'DMCA Policy – espnsports.online',
    url: 'https://espnsports.online/dmca',
  },
}

export default function DMCAPage() {
  const updated = 'June 11, 2026'
  return (
    <main className="min-h-screen bg-white">
      <section className="bg-gray-900 text-white py-14 sm:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <span className="text-red-500 text-xs font-bold uppercase tracking-widest block mb-3">Legal</span>
          <h1 className="font-oswald font-black uppercase text-3xl sm:text-4xl tracking-tight mb-3">DMCA Policy</h1>
          <p className="text-gray-400 text-sm">Last updated: {updated}</p>
        </div>
      </section>

      <section className="py-12 sm:py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">

          <DMCASection title="1. Our Commitment">
            <p>espnsports.online respects the intellectual property rights of others and expects users of our Service to do the same. We comply with the Digital Millennium Copyright Act (DMCA) and respond to valid notices of alleged copyright infringement.</p>
          </DMCASection>

          <DMCASection title="2. Reporting Copyright Infringement">
            <p>If you believe that content on espnsports.online infringes your copyright, please send a written DMCA Notice to our designated agent at:</p>
            <div className="mt-3 p-4 bg-gray-50 rounded-xl text-sm text-gray-700 space-y-1">
              <p><strong>DMCA Agent:</strong> espnsports.online Legal</p>
              <p><strong>Email:</strong> <a href="mailto:majid.bd905@gmail.com" className="text-red-600 hover:underline">majid.bd905@gmail.com</a></p>
              <p><strong>Subject line:</strong> DMCA Takedown Notice</p>
            </div>
          </DMCASection>

          <DMCASection title="3. What Your DMCA Notice Must Include">
            <p>To be effective under the DMCA (17 U.S.C. § 512(c)(3)), your notice must include:</p>
            <ol className="pl-5 space-y-2 list-decimal">
              <li>A physical or electronic <strong>signature of the copyright owner</strong> (or authorized agent)</li>
              <li><strong>Identification of the copyrighted work</strong> claimed to be infringed</li>
              <li>The <strong>URL(s) of the infringing content</strong> on espnsports.online</li>
              <li>Your <strong>contact information</strong> (name, address, phone, email)</li>
              <li>A statement that you have a <strong>good-faith belief</strong> that use of the material is not authorized by the copyright owner, its agent, or the law</li>
              <li>A statement, made <strong>under penalty of perjury</strong>, that the information in your notice is accurate and that you are the copyright owner or are authorized to act on their behalf</li>
            </ol>
            <p className="mt-3">Incomplete or false notices may not be acted upon and could result in legal liability.</p>
          </DMCASection>

          <DMCASection title="4. Our Response">
            <p>Upon receipt of a valid DMCA notice, we will:</p>
            <ul>
              <li>Remove or disable access to the allegedly infringing content promptly</li>
              <li>Notify the user who posted the content (if identifiable)</li>
              <li>Forward a copy of the notice to the content provider where appropriate</li>
            </ul>
            <p>We aim to respond to all valid notices within <strong>3-5 business days</strong>.</p>
          </DMCASection>

          <DMCASection title="5. Counter-Notice">
            <p>If you believe your content was removed by mistake or misidentification, you may send a Counter-Notice to our DMCA agent. Your counter-notice must include:</p>
            <ol className="pl-5 space-y-2 list-decimal">
              <li>Your physical or electronic signature</li>
              <li>Identification of the removed content and its location before removal</li>
              <li>A statement under penalty of perjury that you believe the content was removed in error</li>
              <li>Your name, address, phone number, and consent to the jurisdiction of the relevant federal district court</li>
            </ol>
            <p className="mt-3">Upon receipt of a valid counter-notice, we may restore the content after 10-14 business days unless the original complainant seeks a court order.</p>
          </DMCASection>

          <DMCASection title="6. Repeat Infringers">
            <p>We maintain a policy of terminating accounts of users who are found to be repeat infringers of intellectual property rights in appropriate circumstances.</p>
          </DMCASection>

          <DMCASection title="7. Disclaimer">
            <p>espnsports.online aggregates sports scores (factual data) and publishes original editorial content. We do not host full match broadcasts or pay-per-view streams. Video highlights posted on our platform are either (a) original content, (b) licensed content, or (c) embedded from official third-party platforms such as YouTube. If you believe any embedded content infringes your rights, please also contact the originating platform directly.</p>
          </DMCASection>

          <div className="mt-10 pt-8 border-t border-gray-100">
            <div className="flex flex-wrap gap-3 text-xs text-gray-500">
              <Link href="/terms" className="hover:text-red-600 transition-colors">Terms of Service</Link>
              <span>·</span>
              <Link href="/privacy" className="hover:text-red-600 transition-colors">Privacy Policy</Link>
              <span>·</span>
              <Link href="/contact" className="hover:text-red-600 transition-colors">Contact</Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

function DMCASection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-8">
      <h2 className="font-oswald font-bold text-gray-900 uppercase text-lg sm:text-xl tracking-tight mb-3 pb-2 border-b border-gray-100">
        {title}
      </h2>
      <div className="text-gray-600 text-sm leading-relaxed space-y-3 [&_ul]:pl-5 [&_ul]:space-y-1.5 [&_ul]:list-disc [&_ol]:space-y-1.5 [&_strong]:text-gray-800 [&_p]:text-sm [&_p]:leading-relaxed">
        {children}
      </div>
    </div>
  )
}
