import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Hearts from './Hearts'
const cols = ['#b76e79', '#f8d7dc', '#e7c08a', '#6d213c', '#fff']
export default function FinalSurprise({ c }) {
  const [hug, setHug] = useState(false)
  const rain = useMemo(() => Array.from({ length: 22 }, () => ({ x: Math.random() * 100, d: 6 + Math.random() * 6, de: Math.random() * 6, c: cols[Math.floor(Math.random() * 5)] })), [])
  const burst = useMemo(() => Array.from({ length: 60 }, (_, i) => ({ a: (i / 60) * 6.28, r: 150 + Math.random() * 250, c: cols[i % 5] })), [])
  return <section className="relative overflow-hidden px-6 py-24 flex flex-col items-center text-center gap-10" style={{ minHeight: '100dvh' }}>
    <Hearts n={10} />
    {rain.map((p, i) => <motion.span key={i} aria-hidden="true" className="absolute w-2 h-3 rounded-sm" style={{ left: p.x + '%', top: -20, background: p.c }}
      animate={{ y: ['0vh', '110vh'], rotate: 360 }} transition={{ duration: p.d, repeat: Infinity, delay: p.de, ease: 'linear' }} />)}
    <h2 className="relative font-display text-3xl sm:text-5xl max-w-2xl leading-snug">{c.text}</h2>
    <svg viewBox="0 0 200 190" width="220" role="img" aria-label="Birthday cake with candles" className="relative" style={{ filter: 'drop-shadow(0 0 25px rgba(255,200,120,.9))' }}>
      <rect x="25" y="110" width="150" height="65" rx="10" fill="#f8d7dc" /><rect x="25" y="110" width="150" height="20" rx="10" fill="#fff" />
      <path d="M25 125q12 14 25 0t25 0 25 0 25 0 25 0 25 0" fill="#b76e79" opacity=".7" />
      <rect x="45" y="165" width="110" height="10" fill="#e7c08a" opacity=".5" />
      {[70, 100, 130].map((x, i) => <g key={x}><rect x={x - 4} y="75" width="8" height="35" rx="2" fill="#fff" stroke="#b76e79" />
        <motion.ellipse cx={x} cy="66" rx="6" ry="11" fill="#ffb84d" animate={{ scaleY: [1, 1.2, 0.9, 1], scaleX: [1, 0.85, 1] }} style={{ transformOrigin: `${x}px 77px` }} transition={{ duration: 0.8 + i * 0.15, repeat: Infinity }} /></g>)}
    </svg>
    <button onClick={() => setHug(true)} className="relative px-8 py-4 rounded-full bg-wine text-cream text-lg shadow-xl border-0 font-medium">{c.button}</button>
    <AnimatePresence>{hug && <>
      {burst.map((p, i) => <motion.span key={i} aria-hidden="true" className="absolute left-1/2 top-1/2 w-3 h-3 rounded-full" style={{ background: p.c }}
        initial={{ x: 0, y: 0, opacity: 1 }} animate={{ x: Math.cos(p.a) * p.r, y: Math.sin(p.a) * p.r + 120, opacity: 0 }} transition={{ duration: 2, ease: 'easeOut' }} />)}
      <motion.p role="status" className="relative font-hand text-4xl sm:text-5xl text-rose" initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: [0.5, 1.2, 1] }} transition={{ duration: 0.9 }}>{c.hug}</motion.p></>}</AnimatePresence>
  </section>
}
