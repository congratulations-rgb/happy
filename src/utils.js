import { useEffect, useRef, useState } from 'react'
export const asset = (p) => import.meta.env.BASE_URL + p.replace(/^\//, '')

// Returns only the photos that really exist (with their real aspect ratio).
export function useAvailableImages(list) {
  const [items, setItems] = useState([])
  useEffect(() => {
    let live = true
    Promise.all(list.map((m) => new Promise((res) => {
      const i = new Image()
      i.onload = () => res({ ...m, url: asset(m.src), ratio: i.naturalWidth / i.naturalHeight })
      i.onerror = () => res(null)
      i.src = asset(m.src)
    }))).then((a) => live && setItems(a.filter(Boolean)))
    return () => { live = false }
  }, [])
  return items
}

// Music with fade in/out, auto-pause when the tab is hidden. Never throws if file is missing.
export function useAudio(src) {
  const a = useRef(null), want = useRef(false), t = useRef()
  const [playing, setPlaying] = useState(false), [muted, setMuted] = useState(false)
  useEffect(() => {
    const el = new Audio(asset(src)); el.loop = true; el.volume = 0; a.current = el
    const vis = () => { if (document.hidden) el.pause(); else if (want.current) el.play().catch(() => {}) }
    document.addEventListener('visibilitychange', vis)
    return () => { document.removeEventListener('visibilitychange', vis); el.pause() }
  }, [src])
  const fade = (to) => { clearInterval(t.current); t.current = setInterval(() => {
    const el = a.current; if (!el) return
    el.volume = Math.max(0, Math.min(1, el.volume + (to > el.volume ? 0.05 : -0.05)))
    if (Math.abs(el.volume - to) < 0.06) { el.volume = to; clearInterval(t.current) } }, 80) }
  const play = () => a.current?.play().then(() => { want.current = true; setPlaying(true); fade(0.6) }).catch(() => {})
  const toggle = () => { const el = a.current; if (!el) return
    if (playing) { want.current = false; setPlaying(false); el.pause() } else play() }
  const mute = () => { const el = a.current; if (!el) return; el.muted = !muted; setMuted(!muted) }
  return { play, toggle, mute, playing, muted }
}
