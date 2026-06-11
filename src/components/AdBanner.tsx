'use client'
import { useEffect, useRef } from 'react'

interface Props {
  adKey: string
  width: number
  height: number
  format?: string
}

export default function AdBanner({ adKey, width, height, format = 'iframe' }: Props) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = ref.current
    if (!container) return
    container.innerHTML = ''

    const optScript = document.createElement('script')
    optScript.type = 'text/javascript'
    optScript.text = `atOptions={'key':'${adKey}','format':'${format}','height':${height},'width':${width},'params':{}};`

    const invokeScript = document.createElement('script')
    invokeScript.type = 'text/javascript'
    invokeScript.src = `//www.topcreativeformat.com/${adKey}/invoke.js`
    invokeScript.async = true

    container.appendChild(optScript)
    container.appendChild(invokeScript)

    return () => { container.innerHTML = '' }
  }, [adKey, width, height, format])

  return (
    <div className="flex justify-center overflow-hidden" style={{ minHeight: height, width: '100%' }}>
      <div ref={ref} />
    </div>
  )
}
