'use client'
import { useRef, useState } from 'react'

interface Props {
  currentUrl?: string
  onUpload: (url: string) => void
  label?: string
  previewHeight?: string
}

export default function ImageUpload({ currentUrl, onUpload, label = 'Upload Image', previewHeight = 'h-36' }: Props) {
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true); setError('')
    const fd = new FormData()
    fd.append('file', file)
    const res = await fetch('/api/upload', { method: 'POST', body: fd })
    const data = await res.json()
    setUploading(false)
    if (data.url) { onUpload(data.url) }
    else { setError(data.error || 'Upload failed') }
    e.target.value = ''
  }

  return (
    <div className="space-y-2">
      {currentUrl && (
        <div className={`relative ${previewHeight} rounded-xl overflow-hidden bg-gray-100`}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img key={currentUrl} src={currentUrl} alt="Preview" className="w-full h-full object-cover" />
          <button type="button" onClick={() => onUpload('')}
            className="absolute top-2 right-2 bg-black/60 hover:bg-black/80 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
            ✕
          </button>
        </div>
      )}
      <input ref={inputRef} type="file" accept="image/*" onChange={handleFile} className="hidden" />
      <button type="button" onClick={() => inputRef.current?.click()} disabled={uploading}
        className="flex items-center gap-2 border border-dashed border-gray-300 hover:border-blue-400 bg-gray-50 hover:bg-blue-50 text-gray-600 hover:text-blue-600 text-xs font-semibold px-4 py-2.5 rounded-xl transition-all w-full justify-center disabled:opacity-50">
        {uploading ? (
          <><span className="w-3 h-3 border-2 border-blue-400 border-t-transparent rounded-full animate-spin" />Uploading...</>
        ) : (
          <><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"/></svg>{label}</>
        )}
      </button>
      {error && <p className="text-red-500 text-xs">{error}</p>}
    </div>
  )
}
