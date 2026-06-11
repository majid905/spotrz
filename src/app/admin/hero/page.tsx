'use client'
import { useEffect, useState } from 'react'
import ImageUpload from '@/components/ImageUpload'

interface Hero { id:number; title:string; description:string; button_text:string; button_link:string; image_url:string }

export default function HeroAdmin() {
  const [form, setForm] = useState<Hero>({ id:1,title:'',description:'',button_text:'',button_link:'',image_url:'' })
  const [saving, setSaving] = useState(false)
  const [msg, setMsg] = useState('')

  useEffect(() => {
    fetch('/api/hero').then(r => r.json()).then(d => { if(d) setForm(d) })
  }, [])

  function set(k: keyof Hero, v: string) { setForm(f => ({...f,[k]:v})) }

  async function save() {
    setSaving(true); setMsg('')
    const r = await fetch('/api/hero', { method:'PUT', headers:{'Content-Type':'application/json'}, body: JSON.stringify(form) })
    setSaving(false)
    setMsg(r.ok ? 'Saved successfully!' : 'Error saving.')
    setTimeout(() => setMsg(''), 3000)
  }

  return (
    <div className="max-w-3xl space-y-6">
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <h2 className="text-base font-bold text-gray-900 mb-1">Hero Section Content</h2>
        <p className="text-xs text-gray-500 mb-6">This content shows on the main homepage hero banner.</p>

        <div className="space-y-5">
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-widest mb-1.5">Title</label>
            <input value={form.title} onChange={e=>set('title',e.target.value)}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-50"
              placeholder="Join the Ultimate Football Network" />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-widest mb-1.5">Description</label>
            <textarea value={form.description} onChange={e=>set('description',e.target.value)} rows={4}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-50 resize-none"
              placeholder="Subtitle text shown below the heading..." />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-widest mb-1.5">Button Text</label>
              <input value={form.button_text} onChange={e=>set('button_text',e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-50"
                placeholder="Learn More" />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-widest mb-1.5">Button Link</label>
              <input value={form.button_link} onChange={e=>set('button_link',e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-50"
                placeholder="#live-scores" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-widest mb-1.5">Background Image <span className="text-gray-400 normal-case font-normal">(optional)</span></label>
            <ImageUpload currentUrl={form.image_url} onUpload={url => set('image_url', url)} previewHeight="h-40" label="Upload Background Image" />
            <input value={form.image_url} onChange={e=>set('image_url',e.target.value)} placeholder="or paste image URL..."
              className="mt-2 w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-50 text-gray-500" />
          </div>
        </div>

        <div className="flex items-center gap-4 mt-6 pt-5 border-t border-gray-100">
          <button onClick={save} disabled={saving}
            className="bg-[#0d1526] hover:bg-[#1a2744] text-white text-sm font-bold px-8 py-3 rounded-xl transition-colors disabled:opacity-60">
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
          {msg && <span className={`text-sm font-medium ${msg.includes('Error') ? 'text-red-500' : 'text-green-600'}`}>{msg}</span>}
        </div>
      </div>

      {/* Preview */}
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <h3 className="text-sm font-bold text-gray-700 mb-4">Preview</h3>
        <div className="rounded-xl overflow-hidden" style={{
          background: form.image_url
            ? `linear-gradient(rgba(2,8,16,.75),rgba(3,14,8,.85)), url(${form.image_url}) center/cover no-repeat`
            : 'linear-gradient(180deg,#020810,#030e08)',
          minHeight:'200px', display:'flex',alignItems:'center',justifyContent:'center'
        }}>
          <div className="text-center px-8 py-10">
            <div className="inline-block bg-red-600 text-white text-[10px] font-bold uppercase tracking-widest px-5 py-1.5 mb-4 rounded-sm">Connect and Compete</div>
            <h1 className="font-oswald text-2xl font-bold text-white uppercase mb-3">{form.title || 'Hero Title'}</h1>
            <p className="text-gray-400 text-xs mb-5 max-w-sm mx-auto">{form.description || 'Description text...'}</p>
            <div className="inline-block border-2 border-white text-white text-xs font-bold uppercase tracking-widest px-8 py-2.5">
              {form.button_text || 'Button Text'}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
