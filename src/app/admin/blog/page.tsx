'use client'
import { useEffect, useState, useCallback } from 'react'
import ImageUpload from '@/components/ImageUpload'

interface Post {
  id: number
  title: string
  slug: string
  excerpt: string
  content: string
  category: string
  image_url: string
  author: string
  read_time: number
  is_featured: boolean
  views: number
}

const BLANK: Omit<Post, 'id' | 'views'> = {
  title: '', slug: '', excerpt: '', content: '',
  category: 'General', image_url: '',
  author: 'Sports Editor', read_time: 5, is_featured: false,
}

const CATEGORIES = [
  'General', 'Teams', 'Players', 'Venues', 'Group Stage',
  'Qualifying', 'Fan Guide', 'History', 'FIFA', 'Boxing', 'UFC', 'NFL',
]

const inp = 'w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-blue-400 text-gray-900 bg-white'
const lb = 'block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5'

export default function BlogAdmin() {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [modal, setModal] = useState<{ open: boolean; data: Partial<Post> }>({ open: false, data: { ...BLANK } })
  const [saving, setSaving] = useState(false)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [total, setTotal] = useState(0)

  const load = useCallback(async (p: number) => {
    setLoading(true)
    try {
      const res = await fetch(`/api/blog?limit=20&page=${p}`)
      if (!res.ok) throw new Error('fetch failed')
      const data = await res.json()
      // Handle both {posts:[]} and plain array responses
      if (Array.isArray(data)) {
        setPosts(data)
        setTotal(data.length)
        setTotalPages(1)
      } else {
        setPosts(Array.isArray(data.posts) ? data.posts : [])
        setTotal(data.total || 0)
        setTotalPages(data.pages || 1)
      }
    } catch {
      setPosts([])
      setTotal(0)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { load(1) }, [load])

  function open(data: Partial<Post>) { setModal({ open: true, data }) }
  function close() { setModal(m => ({ ...m, open: false })) }
  function setF(k: string, v: any) { setModal(m => ({ ...m, data: { ...m.data, [k]: v } })) }

  async function save() {
    setSaving(true)
    try {
      const { id, views, ...body } = modal.data as any
      const url = id ? `/api/blog/${id}` : '/api/blog'
      const method = id ? 'PUT' : 'POST'
      await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
      close()
      load(page)
    } finally {
      setSaving(false)
    }
  }

  async function del(id: number) {
    if (!confirm('Delete this post permanently?')) return
    await fetch(`/api/blog/${id}`, { method: 'DELETE' })
    load(page)
  }

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">
          {loading ? 'Loading…' : `${total} post${total !== 1 ? 's' : ''}`}
        </p>
        <button
          onClick={() => open({ ...BLANK })}
          className="bg-[#0d1526] hover:bg-[#1a2744] text-white text-xs font-bold px-5 py-2.5 rounded-xl"
        >
          + New Post
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-[10px] font-bold text-gray-400 uppercase tracking-widest border-b border-gray-100">
                <th className="text-left px-4 py-4">Title</th>
                <th className="text-left px-4 py-4">Category</th>
                <th className="text-left px-4 py-4">Author</th>
                <th className="text-left px-4 py-4">Views</th>
                <th className="text-left px-4 py-4">Featured</th>
                <th className="text-left px-4 py-4">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {loading ? (
                <tr><td colSpan={6} className="py-12 text-center text-gray-400">Loading posts…</td></tr>
              ) : posts.length === 0 ? (
                <tr><td colSpan={6} className="py-12 text-center text-gray-400">No posts yet.</td></tr>
              ) : posts.map(p => (
                <tr key={p.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3 max-w-[220px]">
                    <p className="font-semibold text-gray-800 text-xs line-clamp-1">{p.title}</p>
                    {p.slug && (
                      <p className="text-gray-400 text-[10px] mt-0.5 font-mono">/blog/{p.slug}</p>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-[10px] font-bold px-2 py-1 rounded-full bg-blue-50 text-blue-600 uppercase">
                      {p.category}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-xs text-gray-500 whitespace-nowrap">{p.author}</td>
                  <td className="px-4 py-3 text-xs text-gray-500">{p.views || 0}</td>
                  <td className="px-4 py-3">
                    <span className={`text-[10px] font-bold px-2 py-1 rounded-full ${p.is_featured ? 'bg-yellow-100 text-yellow-700' : 'bg-gray-100 text-gray-400'}`}>
                      {p.is_featured ? 'Yes' : 'No'}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-1.5">
                      <a
                        href={`/blog/${p.slug || p.id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-semibold text-green-500 bg-green-50 px-2.5 py-1 rounded-lg"
                      >
                        View
                      </a>
                      <button
                        onClick={() => open({ ...p })}
                        className="text-xs font-semibold text-blue-500 bg-blue-50 px-2.5 py-1 rounded-lg"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => del(p.id)}
                        className="text-xs font-semibold text-red-500 bg-red-50 px-2.5 py-1 rounded-lg"
                      >
                        Del
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 py-4 border-t border-gray-100">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
              <button
                key={p}
                onClick={() => { setPage(p); load(p) }}
                className={`w-8 h-8 rounded-lg text-xs font-bold transition-colors ${
                  page === p
                    ? 'bg-[#0d1526] text-white'
                    : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                }`}
              >
                {p}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Modal */}
      {modal.open && (
        <div
          className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4"
          onClick={e => { if (e.target === e.currentTarget) close() }}
        >
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-bold text-gray-900 text-base">
                {modal.data.id ? 'Edit Post' : 'New Post'}
              </h3>
              <button onClick={close} className="text-gray-400 hover:text-gray-600">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/>
                </svg>
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className={lb}>Title</label>
                <input
                  value={modal.data.title || ''}
                  onChange={e => setF('title', e.target.value)}
                  className={inp}
                  placeholder="Post title for SEO…"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={lb}>URL Slug</label>
                  <input
                    value={modal.data.slug || ''}
                    onChange={e => setF('slug', e.target.value)}
                    className={inp}
                    placeholder="auto-from-title"
                  />
                </div>
                <div>
                  <label className={lb}>Author</label>
                  <input
                    value={modal.data.author || ''}
                    onChange={e => setF('author', e.target.value)}
                    className={inp}
                  />
                </div>
              </div>

              <div>
                <label className={lb}>Excerpt <span className="normal-case font-normal text-gray-400">(Google description)</span></label>
                <textarea
                  value={modal.data.excerpt || ''}
                  onChange={e => setF('excerpt', e.target.value)}
                  className={`${inp} h-16 resize-none`}
                />
              </div>

              <div>
                <label className={lb}>Content <span className="normal-case font-normal text-gray-400">(HTML supported)</span></label>
                <textarea
                  value={modal.data.content || ''}
                  onChange={e => setF('content', e.target.value)}
                  rows={10}
                  className={`${inp} resize-y font-mono text-xs`}
                  placeholder="<p>Article content...</p>"
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className={lb}>Category</label>
                  <select
                    value={modal.data.category || 'General'}
                    onChange={e => setF('category', e.target.value)}
                    className={inp}
                  >
                    {CATEGORIES.map(c => <option key={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className={lb}>Read Time (min)</label>
                  <input
                    type="number"
                    value={modal.data.read_time || 5}
                    onChange={e => setF('read_time', +e.target.value)}
                    className={inp}
                    min="1"
                    max="60"
                  />
                </div>
                <div className="flex items-end pb-1">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={!!modal.data.is_featured}
                      onChange={e => setF('is_featured', e.target.checked)}
                      className="w-4 h-4 rounded"
                    />
                    <span className="text-xs font-bold text-gray-700 uppercase tracking-wider">Featured</span>
                  </label>
                </div>
              </div>

              <div>
                <label className={lb}>Post Image</label>
                <ImageUpload
                  currentUrl={modal.data.image_url || ''}
                  onUpload={url => setF('image_url', url)}
                  previewHeight="h-32"
                  label="Upload Image"
                />
                <input
                  value={modal.data.image_url || ''}
                  onChange={e => setF('image_url', e.target.value)}
                  placeholder="or paste image URL…"
                  className={`mt-1.5 ${inp} text-gray-400`}
                />
              </div>
            </div>

            <div className="flex gap-3 mt-5 pt-4 border-t border-gray-100">
              <button
                onClick={save}
                disabled={saving}
                className="bg-[#0d1526] text-white text-sm font-bold px-6 py-2.5 rounded-xl disabled:opacity-60"
              >
                {saving ? 'Saving…' : 'Save Post'}
              </button>
              <button
                onClick={close}
                className="border border-gray-200 text-gray-600 text-sm font-bold px-6 py-2.5 rounded-xl hover:bg-gray-50"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
