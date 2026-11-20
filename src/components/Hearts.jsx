import { useMemo } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
// Soft floating hearts. n is reduced on small screens / reduced-motion for performance.
export default function Hearts({ n = 10 }) {
  const reduce = useReducedMotion()
  const count = reduce ? 0 : window.innerWidth < 640 ? Math.ceil(n / 2) : n
  const items = useMemo(() => Array.from({ length: count }, () => ({
    x: Math.random() * 100, s: 12 + Math.random() * 20, d: 9 + Math.random() * 8, delay: Math.random() * 8 })), [count])
  return <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
    {items.map((h, i) => <motion.span key={i} className="absolute text-rose/60" style={{ left: h.x + '%', bottom: -40, fontSize: h.s }}
      animate={{ y: [0, -900], opacity: [0, 0.8, 0] }} transition={{ duration: h.d, repeat: Infinity, delay: h.delay, ease: 'easeOut' }}>❤</motion.span>)}
  </div>
}
