'use client'
import { useEffect, useState } from 'react'
import ImageUpload from '@/components/ImageUpload'

interface Highlight {
  id: number; title: string; slug: string; description: string
  video_url: string; thumbnail: string; duration: string; category: string
  tags: string; competition: string; match_date: string
  views: number; is_active: boolean; sort_order: number
}

const blank = {
  title: '', slug: '', description: '', video_url: '', thumbnail: '',
  duration: '', category: 'Football', tags: '', competition: '',
  match_date: '', is_active: true, sort_order: 0
}

export default function HighlightsAdmin() {
  const [items, setItems] = useState<Highlight[]>([])
  const [modal, setModal] = useState<{ open: boolean; data: any }>({ open: false, data: { ...blank } })
  const [saving, setSaving] = useState(false)

  const load = () => fetch('/api/highlights?all=1').then(r => r.json()).then(setItems)
  useEffect(() => { load() }, [])

  function setF(k: string, v: any) { setModal(m => ({ ...m, data: { ...m.data, [k]: v } })) }

  async function save() {
    setSaving(true)
    const { id, ...body } = modal.data
    if (id) await fetch(`/api/highlights/${id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) })
    else await fetch('/api/highlights', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) })
    setSaving(false)
    setModal(m => ({ ...m, open: false }))
    load()
  }

  async function del(id: number) {
    if (!confirm('Delete this highlight?')) return
    await fetch(`/api/highlights/${id}`, { method: 'DELETE' })
    load()
  }

  async function toggleActive(h: Highlight) {
    await fetch(`/api/highlights/${h.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...h, is_active: !h.is_active })
    })
    load()
  }

  const inp = 'w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-blue-400 text-gray-900 bg-white'
  const lb = 'block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5'

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500">{items.length} highlights</p>
          <p className="text-xs text-gray-400 mt-0.5">Each highlight gets its own SEO page at <code>/highlights/[slug]</code></p>
        </div>
        <button
          onClick={() => setModal({ open: true, data: { ...blank } })}
          className="bg-[#0d1526] hover:bg-[#1a2744] text-white text-xs font-bold px-5 py-2.5 rounded-xl"
        >
          + Add Highlight
        </button>
      </div>

      <div className="space-y-3">
        {items.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm py-12 text-center text-gray-400">
            No highlights yet. Add one to get started.
          </div>
        ) : items.map(h => (
          <div key={h.id} className={`bg-white rounded-2xl shadow-sm p-4 border-l-4 ${h.is_active ? 'border-l-green-500' : 'border-l-gray-200'}`}>
            <div className="flex items-start gap-4">
              {h.thumbnail && (
                <img src={h.thumbnail} alt="" className="w-24 h-14 object-cover rounded-lg flex-shrink-0" />
              )}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap mb-1">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${h.is_active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-400'}`}>
                    {h.is_active ? 'Active' : 'Hidden'}
                  </span>
                  {h.competition && <span className="text-[10px] text-gray-500 font-medium">{h.competition}</span>}
                  {h.duration && <span className="text-[10px] text-gray-400">{h.duration}</span>}
                </div>
                <p className="font-bold text-gray-900 text-sm">{h.title}</p>
                {h.slug && <p className="text-gray-400 text-[10px] mt-0.5">/highlights/{h.slug}</p>}
                {h.description && <p className="text-gray-500 text-xs mt-1 line-clamp-1">{h.description}</p>}
                {h.tags && (
                  <div className="flex flex-wrap gap-1 mt-1.5">
                    {h.tags.split(',').filter(Boolean).map(t => (
                      <span key={t} className="text-[9px] bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">#{t.trim()}</span>
                    ))}
                  </div>
                )}
              </div>
              <div className="flex flex-col gap-1.5 flex-shrink-0">
                <button
                  onClick={() => toggleActive(h)}
                  className={`text-xs font-semibold px-2.5 py-1 rounded-lg ${h.is_active ? 'bg-gray-50 text-gray-500' : 'bg-green-50 text-green-600'}`}
                >
                  {h.is_active ? 'Hide' : 'Show'}
                </button>
                <button
                  onClick={() => setModal({ open: true, data: { ...h } })}
                  className="text-xs font-semibold text-blue-500 bg-blue-50 px-2.5 py-1 rounded-lg"
                >
                  Edit
                </button>
                <button
                  onClick={() => del(h.id)}
                  className="text-xs font-semibold text-red-500 bg-red-50 px-2.5 py-1 rounded-lg"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {modal.open && (
        <div
          className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4"
          onClick={e => { if (e.target === e.currentTarget) setModal(m => ({ ...m, open: false })) }}
        >
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl p-6 max-h-[90vh] overflow-y-auto">
            <h3 className="font-bold text-gray-900 mb-5">{modal.data.id ? 'Edit Highlight' : 'Add Highlight'}</h3>
            <div className="space-y-4">
              <div>
                <label className={lb}>Title <span className="normal-case font-normal text-gray-400">(used as page title for Google)</span></label>
                <input value={modal.data.title} onChange={e => setF('title', e.target.value)} className={inp} placeholder="Manchester City vs Arsenal — Premier League Highlights" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={lb}>URL Slug <span className="normal-case font-normal text-gray-400">(auto-generated if empty)</span></label>
                  <input value={modal.data.slug} onChange={e => setF('slug', e.target.value)} className={inp} placeholder="man-city-vs-arsenal-highlights" />
                </div>
                <div>
                  <label className={lb}>Duration</label>
                  <input value={modal.data.duration} onChange={e => setF('duration', e.target.value)} className={inp} placeholder="5:42" />
                </div>
              </div>

              <div>
                <label className={lb}>Description <span className="normal-case font-normal text-gray-400">(shown in Google search results)</span></label>
                <textarea value={modal.data.description} onChange={e => setF('description', e.target.value)} className={`${inp} h-20 resize-none`} placeholder="Watch the full highlights from this thrilling match..." />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={lb}>Competition</label>
                  <input value={modal.data.competition} onChange={e => setF('competition', e.target.value)} className={inp} placeholder="Premier League" />
                </div>
                <div>
                  <label className={lb}>Category</label>
                  <input value={modal.data.category} onChange={e => setF('category', e.target.value)} className={inp} placeholder="Football" />
                </div>
              </div>

              <div>
                <label className={lb}>Tags <span className="normal-case font-normal text-gray-400">(comma-separated, helps SEO)</span></label>
                <input value={modal.data.tags} onChange={e => setF('tags', e.target.value)} className={inp} placeholder="premier league, goals, highlights, 2026" />
              </div>

              <div>
                <label className={lb}>Video URL</label>
                <input value={modal.data.video_url} onChange={e => setF('video_url', e.target.value)} className={inp} placeholder="https://youtube.com/watch?v=... or embed URL" />
                <p className="text-[11px] text-gray-400 mt-1">Supports YouTube, direct .mp4, or any iframe embed URL</p>
              </div>

              <div>
                <label className={lb}>Thumbnail Image</label>
                <ImageUpload currentUrl={modal.data.thumbnail} onUpload={url => setF('thumbnail', url)} previewHeight="h-28" label="Upload Thumbnail" />
                <input value={modal.data.thumbnail} onChange={e => setF('thumbnail', e.target.value)} className={`mt-1.5 ${inp} text-gray-400`} placeholder="or paste image URL..." />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className={lb}>Match Date</label>
                  <input type="date" value={modal.data.match_date ? String(modal.data.match_date).slice(0, 10) : ''} onChange={e => setF('match_date', e.target.value)} className={inp} />
                </div>
                <div>
                  <label className={lb}>Sort Order</label>
                  <input type="number" value={modal.data.sort_order} onChange={e => setF('sort_order', +e.target.value)} className={inp} />
                </div>
                <div className="flex items-end pb-1">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" checked={!!modal.data.is_active} onChange={e => setF('is_active', e.target.checked)} className="w-4 h-4 rounded" />
                    <span className="text-xs font-bold text-gray-700 uppercase tracking-wider">Publish</span>
                  </label>
                </div>
              </div>
            </div>

            <div className="flex gap-3 mt-5 pt-4 border-t border-gray-100">
              <button onClick={save} disabled={saving} className="bg-[#0d1526] text-white text-sm font-bold px-6 py-2.5 rounded-xl disabled:opacity-60">
                {saving ? 'Saving...' : 'Save'}
              </button>
              <button onClick={() => setModal(m => ({ ...m, open: false }))} className="border border-gray-200 text-gray-600 text-sm font-bold px-6 py-2.5 rounded-xl hover:bg-gray-50">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
