import { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'
export default function BirthdayLetter({ text }) {
  const ref = useRef(null), seen = useInView(ref, { once: true, amount: 0.4 }), [n, setN] = useState(0)
  useEffect(() => { if (!seen) return; const t = setInterval(() => setN((v) => { if (v >= text.length) { clearInterval(t); return v } return v + 1 }), 40); return () => clearInterval(t) }, [seen, text])
  return <section className="px-4 py-20 flex justify-center">
    <article ref={ref} className="paper relative w-full max-w-xl rounded-lg p-8 sm:p-12" style={{ boxShadow: '0 30px 60px rgba(109,33,60,.25)' }} aria-label="Birthday letter">
      <span className="absolute top-3 right-5 text-rose/60" aria-hidden="true">❤</span><span className="absolute bottom-3 left-5 text-rose/60" aria-hidden="true">❤</span>
      <p className="font-hand text-2xl sm:text-3xl leading-relaxed whitespace-pre-wrap" style={{ minHeight: 320 }} aria-label={text}>{text.slice(0, n)}<span className="opacity-50">{n < text.length ? '|' : ''}</span></p>
    </article>
  </section>
}
