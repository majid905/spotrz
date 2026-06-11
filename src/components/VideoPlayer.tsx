'use client'
import { useEffect, useRef, useState } from 'react'

function getEmbed(url: string): { type: 'youtube' | 'video' | 'iframe'; src: string } {
  const yt = url.match(/(?:youtube\.com\/(?:watch\?v=|live\/|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/)
  if (yt) return { type: 'youtube', src: `https://www.youtube.com/embed/${yt[1]}?autoplay=1&rel=0&modestbranding=1` }
  if (/\.(mp4|webm|ogg)(\?.*)?$/i.test(url)) return { type: 'video', src: url }
  return { type: 'iframe', src: url }
}

interface Props { url: string; title?: string }

export default function VideoPlayer({ url, title = '' }: Props) {
  const [playing, setPlaying] = useState(false)
  const embed = getEmbed(url)

  if (!url) {
    return (
      <div className="w-full aspect-video bg-gray-900 flex items-center justify-center rounded-xl">
        <p className="text-gray-500 text-sm">No stream URL provided</p>
      </div>
    )
  }

  if (!playing) {
    return (
      <div className="w-full aspect-video bg-black rounded-xl overflow-hidden relative group cursor-pointer" onClick={() => setPlaying(true)}>
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-black/70 group-hover:bg-black/60 transition-colors">
          <button className="w-20 h-20 bg-red-600 hover:bg-red-500 rounded-full flex items-center justify-center shadow-2xl transition-all group-hover:scale-110">
            <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z"/>
            </svg>
          </button>
          <span className="text-white text-sm font-bold uppercase tracking-widest">Click to Watch</span>
        </div>
        <div className="absolute top-4 left-4 flex items-center gap-2">
          <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"/>
          <span className="text-red-400 text-xs font-bold uppercase tracking-widest">Live</span>
        </div>
      </div>
    )
  }

  if (embed.type === 'video') {
    return (
      <div className="w-full aspect-video bg-black rounded-xl overflow-hidden">
        <video src={embed.src} controls autoPlay className="w-full h-full" title={title} />
      </div>
    )
  }

  return (
    <div className="w-full aspect-video bg-black rounded-xl overflow-hidden">
      <iframe src={embed.src} title={title} allow="autoplay; fullscreen; picture-in-picture"
        allowFullScreen className="w-full h-full border-0" />
    </div>
  )
}
