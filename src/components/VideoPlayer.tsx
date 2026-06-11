'use client'
import { useState, useRef, useEffect } from 'react' // useRef+useEffect used by HLSPlayer

function getEmbed(url: string): { type: 'youtube' | 'hls' | 'video' | 'iframe'; src: string } {
  const yt = url.match(/(?:youtube\.com\/(?:watch\?v=|live\/|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/)
  if (yt) return { type: 'youtube', src: `https://www.youtube.com/embed/${yt[1]}?autoplay=1&rel=0&modestbranding=1` }
  if (/\.m3u8(\?.*)?$/i.test(url)) return { type: 'hls', src: url }
  if (/\.(mp4|webm|ogg)(\?.*)?$/i.test(url)) return { type: 'video', src: url }
  const sep = url.includes('?') ? '&' : '?'
  return { type: 'iframe', src: `${url}${sep}autoplay=1&mute=0` }
}

function HLSPlayer({ src, title }: { src: string; title: string }) {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    if (video.canPlayType('application/vnd.apple.mpegurl')) {
      // Safari native HLS
      video.src = src
      video.play().catch(() => {})
      return
    }

    let hls: any
    import('hls.js').then(({ default: Hls }) => {
      if (!Hls.isSupported()) return
      hls = new Hls({ enableWorker: true, lowLatencyMode: true })
      hls.loadSource(src)
      hls.attachMedia(video)
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        video.play().catch(() => {})
      })
    })

    return () => hls?.destroy()
  }, [src])

  return (
    <video
      ref={videoRef}
      controls
      autoPlay
      playsInline
      className="w-full h-full"
      title={title}
    />
  )
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

  // HLS — direct stream, no ads, single click
  if (embed.type === 'hls') {
    return (
      <div className="w-full aspect-video bg-black rounded-xl overflow-hidden relative">
        {!playing && (
          <div
            className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-4 bg-black/80 group cursor-pointer hover:bg-black/70 transition-colors"
            onClick={() => setPlaying(true)}
          >
            <button className="w-20 h-20 bg-red-600 hover:bg-red-500 rounded-full flex items-center justify-center shadow-2xl transition-all group-hover:scale-110 pointer-events-none">
              <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z"/>
              </svg>
            </button>
            <span className="text-white text-sm font-bold uppercase tracking-widest">Click to Watch</span>
            <div className="absolute top-4 left-4 flex items-center gap-2">
              <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"/>
              <span className="text-red-400 text-xs font-bold uppercase tracking-widest">Live</span>
            </div>
          </div>
        )}
        {playing && <HLSPlayer src={embed.src} title={title} />}
      </div>
    )
  }

  // MP4 / WebM / Ogg
  if (embed.type === 'video') {
    return (
      <div className="w-full aspect-video bg-black rounded-xl overflow-hidden relative">
        {!playing && (
          <div
            className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-4 bg-black/80 group cursor-pointer hover:bg-black/70 transition-colors"
            onClick={() => setPlaying(true)}
          >
            <button className="w-20 h-20 bg-red-600 hover:bg-red-500 rounded-full flex items-center justify-center shadow-2xl transition-all group-hover:scale-110 pointer-events-none">
              <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z"/>
              </svg>
            </button>
            <span className="text-white text-sm font-bold uppercase tracking-widest">Click to Watch</span>
            <div className="absolute top-4 left-4 flex items-center gap-2">
              <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"/>
              <span className="text-red-400 text-xs font-bold uppercase tracking-widest">Live</span>
            </div>
          </div>
        )}
        <video src={embed.src} controls autoPlay={playing} playsInline className="w-full h-full" title={title} />
      </div>
    )
  }

  // YouTube / third-party iframe
  return (
    <div className="w-full aspect-video bg-black rounded-xl overflow-hidden relative">
      {!playing && (
        <div
          className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-4 bg-black group cursor-pointer"
          onClick={() => setPlaying(true)}
        >
          <button className="w-20 h-20 bg-red-600 hover:bg-red-500 rounded-full flex items-center justify-center shadow-2xl transition-all group-hover:scale-110 pointer-events-none">
            <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z"/>
            </svg>
          </button>
          <span className="text-white text-sm font-bold uppercase tracking-widest">Click to Watch</span>
          <div className="absolute top-4 left-4 flex items-center gap-2">
            <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"/>
            <span className="text-red-400 text-xs font-bold uppercase tracking-widest">Live</span>
          </div>
        </div>
      )}
      {/* Loads immediately so video is ready when overlay is dismissed */}
      <iframe
        src={embed.src}
        title={title}
        allow="autoplay; fullscreen; picture-in-picture; encrypted-media"
        allowFullScreen
        className="w-full h-full border-0"
        style={{ pointerEvents: playing ? 'auto' : 'none' }}
      />
    </div>
  )
}
