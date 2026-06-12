'use client'
import { useEffect, useState } from 'react'
import ImageUpload from '@/components/ImageUpload'

interface Settings {
  site_title: string; meta_description: string; favicon_url: string
  logo_url: string; site_name: string; social_facebook: string
  social_twitter: string; social_instagram: string; social_youtube: string
  contact_email: string; contact_phone: string; contact_address: string
}

const blank: Settings = {
  site_title:'',meta_description:'',favicon_url:'/favicon.ico',logo_url:'/logo.png',
  site_name:'Sportz',social_facebook:'',social_twitter:'',social_instagram:'',
  social_youtube:'',contact_email:'',contact_phone:'',contact_address:''
}

export default function SettingsPage() {
  const [form, setForm] = useState<Settings>(blank)
  const [saving, setSaving] = useState(false)
  const [msg, setMsg] = useState('')

  useEffect(() => {
    fetch('/api/site-settings').then(r => r.json()).then(d => { if (d && d.site_title) setForm(f => ({ ...f, ...d })) })
  }, [])

  function set(k: keyof Settings, v: string) { setForm(f => ({ ...f, [k]: v })) }

  async function save() {
    setSaving(true); setMsg('')
    const r = await fetch('/api/site-settings', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
    setSaving(false)
    setMsg(r.ok ? '✓ Settings saved!' : '✗ Error saving settings.')
    setTimeout(() => setMsg(''), 4000)
  }

  const inputCls = 'w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-50 text-gray-900 bg-white'
  const labelCls = 'block text-xs font-bold text-gray-700 uppercase tracking-widest mb-1.5'

  function Section({ title, children }: { title: string; children: React.ReactNode }) {
    return (
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <h3 className="text-base font-bold text-gray-900 mb-5 pb-3 border-b border-gray-100">{title}</h3>
        <div className="space-y-5">{children}</div>
      </div>
    )
  }

  return (
    <div className="max-w-3xl space-y-6">

      {/* Branding */}
      <Section title="Branding">
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className={labelCls}>Logo</label>
            <ImageUpload currentUrl={form.logo_url} onUpload={url => set('logo_url', url)} previewHeight="h-24" label="Upload Logo" />
            <input value={form.logo_url} onChange={e => set('logo_url', e.target.value)} className={`mt-2 ${inputCls} text-gray-400`} placeholder="or paste URL..." />
          </div>
          <div>
            <label className={labelCls}>Favicon</label>
            <ImageUpload currentUrl={form.favicon_url} onUpload={url => set('favicon_url', url)} previewHeight="h-24" label="Upload Favicon" />
            <input value={form.favicon_url} onChange={e => set('favicon_url', e.target.value)} className={`mt-2 ${inputCls} text-gray-400`} placeholder="or paste URL..." />
            <p className="text-[11px] text-gray-400 mt-1">Recommended: 32×32 or 64×64 ICO/PNG</p>
          </div>
        </div>
        <div>
          <label className={labelCls}>Site Name <span className="normal-case font-normal text-gray-400">(shown in Navbar)</span></label>
          <input value={form.site_name} onChange={e => set('site_name', e.target.value)} className={inputCls} placeholder="Sportz" />
        </div>
      </Section>

      {/* SEO */}
      <Section title="SEO & Metadata">
        <div>
          <label className={labelCls}>Page Title</label>
          <input value={form.site_title} onChange={e => set('site_title', e.target.value)} className={inputCls} placeholder="Sportz - Live Scores | FIFA · Boxing · UFC · NFL" />
          <p className="text-[11px] text-gray-400 mt-1">Shown in browser tab and Google results.</p>
        </div>
        <div>
          <label className={labelCls}>Meta Description</label>
          <textarea value={form.meta_description} onChange={e => set('meta_description', e.target.value)} rows={3}
            className={`${inputCls} resize-none`} placeholder="Short description of your site (160 chars recommended)..." />
          <p className="text-[11px] text-gray-400 mt-1">{form.meta_description.length} / 160 characters</p>
        </div>
      </Section>

      {/* Social Media */}
      <Section title="Social Media">
        {[
          { key: 'social_facebook', label: 'Facebook', icon: '📘', placeholder: 'https://facebook.com/yourpage' },
          { key: 'social_twitter', label: 'Twitter / X', icon: '🐦', placeholder: 'https://twitter.com/yourhandle' },
          { key: 'social_instagram', label: 'Instagram', icon: '📷', placeholder: 'https://instagram.com/yourhandle' },
          { key: 'social_youtube', label: 'YouTube', icon: '▶️', placeholder: 'https://youtube.com/@yourchannel' },
        ].map(({ key, label, icon, placeholder }) => (
          <div key={key}>
            <label className={labelCls}>{icon} {label}</label>
            <input value={(form as any)[key]} onChange={e => set(key as keyof Settings, e.target.value)}
              className={inputCls} placeholder={placeholder} />
          </div>
        ))}
      </Section>

      {/* Contact */}
      <Section title="Contact Information">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelCls}>Email</label>
            <input type="email" value={form.contact_email} onChange={e => set('contact_email', e.target.value)} className={inputCls} placeholder="contact@espnsports.online" />
          </div>
          <div>
            <label className={labelCls}>Phone</label>
            <input value={form.contact_phone} onChange={e => set('contact_phone', e.target.value)} className={inputCls} placeholder="+880 1700-000000" />
          </div>
        </div>
        <div>
          <label className={labelCls}>Address</label>
          <textarea value={form.contact_address} onChange={e => set('contact_address', e.target.value)} rows={2}
            className={`${inputCls} resize-none`} placeholder="Dhaka, Bangladesh" />
        </div>
      </Section>

      {/* Save */}
      <div className="flex items-center gap-4 pb-6">
        <button onClick={save} disabled={saving}
          className="bg-[#0d1526] hover:bg-[#1a2744] text-white text-sm font-bold px-10 py-3 rounded-xl transition-colors disabled:opacity-60">
          {saving ? 'Saving...' : 'Save All Settings'}
        </button>
        {msg && <span className={`text-sm font-medium ${msg.includes('✗') ? 'text-red-500' : 'text-green-600'}`}>{msg}</span>}
      </div>
    </div>
  )
}
