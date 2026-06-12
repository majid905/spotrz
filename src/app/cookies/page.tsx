import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Cookie Policy – espnsports.online',
  description: 'Learn how espnsports.online uses cookies and similar technologies, and how you can control them.',
  openGraph: {
    title: 'Cookie Policy – espnsports.online',
    url: 'https://espnsports.online/cookies',
  },
}

const cookieTypes = [
  {
    name: 'Strictly Necessary Cookies',
    icon: '🔒',
    required: true,
    description: 'These cookies are essential for the website to function. They enable basic features like page navigation, authentication, and security.',
    examples: ['Session authentication', 'CSRF protection', 'Load balancing'],
  },
  {
    name: 'Analytics Cookies',
    icon: '📊',
    required: false,
    description: 'Help us understand how visitors interact with our website by collecting anonymous usage data.',
    examples: ['Google Analytics (_ga, _gid)', 'Page view tracking', 'Traffic source analysis'],
  },
  {
    name: 'Preference Cookies',
    icon: '⚙️',
    required: false,
    description: 'Remember your settings and preferences to provide a more personalized experience.',
    examples: ['Preferred sports tab', 'Dark/light mode', 'Notification preferences'],
  },
  {
    name: 'Marketing Cookies',
    icon: '📢',
    required: false,
    description: 'Used to deliver relevant advertisements and track ad campaign effectiveness.',
    examples: ['Ad network targeting', 'Conversion tracking', 'Retargeting'],
  },
]

export default function CookiesPage() {
  const updated = 'June 11, 2026'
  return (
    <main className="min-h-screen bg-white">
      <section className="bg-gray-900 text-white py-14 sm:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <span className="text-red-500 text-xs font-bold uppercase tracking-widest block mb-3">Legal</span>
          <h1 className="font-oswald font-black uppercase text-3xl sm:text-4xl tracking-tight mb-3">Cookie Policy</h1>
          <p className="text-gray-400 text-sm">Last updated: {updated}</p>
        </div>
      </section>

      <section className="py-12 sm:py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">

          <div className="mb-10 p-5 bg-amber-50 border border-amber-200 rounded-xl">
            <p className="text-amber-800 text-sm leading-relaxed">
              <strong>Your choices matter.</strong> Strictly necessary cookies cannot be disabled as they keep the site working. All other cookies can be managed through your browser settings or our cookie preferences panel.
            </p>
          </div>

          <h2 className="font-oswald font-bold text-gray-900 uppercase text-xl tracking-tight mb-4">What Are Cookies?</h2>
          <p className="text-gray-600 text-sm leading-relaxed mb-8">
            Cookies are small text files placed on your device by websites you visit. They are widely used to make websites work efficiently, provide information to site owners, and enable certain features. espnsports.online uses cookies and similar technologies (local storage, session storage, pixels) to deliver a fast and personalized sports experience.
          </p>

          <h2 className="font-oswald font-bold text-gray-900 uppercase text-xl tracking-tight mb-6">Types of Cookies We Use</h2>
          <div className="space-y-5 mb-10">
            {cookieTypes.map(type => (
              <div key={type.name} className="border border-gray-100 rounded-xl p-5">
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-2.5">
                    <span className="text-xl">{type.icon}</span>
                    <h3 className="font-bold text-gray-900 text-sm">{type.name}</h3>
                  </div>
                  {type.required ? (
                    <span className="shrink-0 bg-gray-900 text-white text-[9px] font-bold uppercase tracking-widest px-2 py-1 rounded-full">
                      Always On
                    </span>
                  ) : (
                    <span className="shrink-0 bg-gray-100 text-gray-500 text-[9px] font-bold uppercase tracking-widest px-2 py-1 rounded-full">
                      Optional
                    </span>
                  )}
                </div>
                <p className="text-gray-600 text-xs leading-relaxed mb-3">{type.description}</p>
                <div className="flex flex-wrap gap-1.5">
                  {type.examples.map(ex => (
                    <span key={ex} className="text-[10px] bg-gray-50 text-gray-500 px-2 py-1 rounded-md">{ex}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <h2 className="font-oswald font-bold text-gray-900 uppercase text-xl tracking-tight mb-4">How to Control Cookies</h2>
          <p className="text-gray-600 text-sm leading-relaxed mb-4">
            You can manage cookies through your browser settings. Note that disabling certain cookies may affect website functionality:
          </p>
          <ul className="text-gray-600 text-sm space-y-2 pl-5 list-disc mb-8">
            <li><strong>Chrome:</strong> Settings → Privacy and security → Cookies</li>
            <li><strong>Firefox:</strong> Options → Privacy & Security → Cookies</li>
            <li><strong>Safari:</strong> Preferences → Privacy → Cookies</li>
            <li><strong>Edge:</strong> Settings → Cookies and site permissions</li>
          </ul>
          <p className="text-gray-600 text-sm leading-relaxed mb-8">
            To opt out of Google Analytics tracking specifically, you can install the <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" className="text-red-600 hover:underline">Google Analytics Opt-out Browser Add-on</a>.
          </p>

          <h2 className="font-oswald font-bold text-gray-900 uppercase text-xl tracking-tight mb-4">Third-Party Cookies</h2>
          <p className="text-gray-600 text-sm leading-relaxed mb-8">
            Some cookies on our site are set by third-party services such as Google Analytics, YouTube (for embedded videos), and advertising partners. These third parties have their own cookie policies which we encourage you to review.
          </p>

          <h2 className="font-oswald font-bold text-gray-900 uppercase text-xl tracking-tight mb-4">Changes to This Policy</h2>
          <p className="text-gray-600 text-sm leading-relaxed mb-8">
            We may update this Cookie Policy from time to time. Changes will be reflected by the updated date at the top of the page.
          </p>

          <h2 className="font-oswald font-bold text-gray-900 uppercase text-xl tracking-tight mb-4">Contact</h2>
          <p className="text-gray-600 text-sm leading-relaxed">
            Questions about cookies? Email <a href="mailto:majid.bd905@gmail.com" className="text-red-600 hover:underline">majid.bd905@gmail.com</a> or visit our <Link href="/contact" className="text-red-600 hover:underline">contact page</Link>.
          </p>

          <div className="mt-10 pt-8 border-t border-gray-100">
            <div className="flex flex-wrap gap-3 text-xs text-gray-500">
              <Link href="/privacy" className="hover:text-red-600 transition-colors">Privacy Policy</Link>
              <span>·</span>
              <Link href="/terms" className="hover:text-red-600 transition-colors">Terms of Service</Link>
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
