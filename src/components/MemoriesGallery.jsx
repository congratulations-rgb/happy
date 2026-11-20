import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import { useAvailableImages } from '../utils'
const tilt = [-4, 3, -2, 4, -3, 2, -5, 3]
export default function MemoriesGallery({ c, memories }) {
  const items = useAvailableImages(memories)
  const [open, setOpen] = useState(false), [page, setPage] = useState(0), [dir, setDir] = useState(1), [lb, setLb] = useState(null)
  const [per, setPer] = useState(window.innerWidth >= 900 ? 3 : 2)
  useEffect(() => { const f = () => { setPer(window.innerWidth >= 900 ? 3 : 2); setPage(0) }; window.addEventListener('resize', f); return () => removeEventListener('resize', f) }, [])
  useEffect(() => {
    if (lb === null) return
    const k = (e) => { if (e.key === 'Escape') setLb(null); if (e.key === 'ArrowRight') setLb((i) => (i + 1) % items.length); if (e.key === 'ArrowLeft') setLb((i) => (i - 1 + items.length) % items.length) }
    addEventListener('keydown', k); return () => removeEventListener('keydown', k)
  }, [lb, items.length])
  if (!items.length) return null
  const pages = Math.ceil(items.length / per), shown = items.slice(page * per, page * per + per)
  const turn = (d) => { const n = page + d; if (n < 0 || n >= pages) return; setDir(d); setPage(n) }
  return <section className="px-4 py-20 flex flex-col items-center">
    <h2 className="font-display text-4xl sm:text-5xl text-center mb-10">{c.title}</h2>
    <div className="relative w-full" style={{ maxWidth: 780, perspective: 1800 }}>
      <div className="paper rounded-r-xl rounded-l-sm p-5 sm:p-8 shadow-2xl border-l-8 border-rose/70" style={{ minHeight: 480 }}>
        {open && <>
          <AnimatePresence mode="wait" custom={dir}>
            <motion.div key={page} custom={dir} style={{ transformOrigin: 'left center' }}
              initial={{ rotateY: dir > 0 ? 80 : -80, opacity: 0 }} animate={{ rotateY: 0, opacity: 1 }} exit={{ rotateY: dir > 0 ? -80 : 80, opacity: 0 }} transition={{ duration: 0.6 }}
              className="flex flex-wrap justify-center items-start gap-x-6 gap-y-8 pt-2">
              {shown.map((m, i) => <motion.button key={m.src} onClick={() => setLb(page * per + i)} aria-label={`Open photo: ${m.caption}`}
                className="bg-white p-2 pb-3 shadow-xl border-0 cursor-zoom-in" style={{ width: per === 3 ? 210 : 'min(42vw,230px)', rotate: tilt[(page * per + i) % tilt.length] }}
                initial={{ opacity: 0, y: 40, scale: 0.9 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ delay: 0.5 + i * 0.3 }} whileHover={{ scale: 1.05, rotate: 0, zIndex: 5 }}>
                <img src={m.url} alt={m.caption} loading="lazy" decoding="async" className="w-full h-auto block" style={{ aspectRatio: m.ratio }} />
                <span className="block mt-2 font-hand text-xl text-wine leading-tight">{m.caption}</span>
              </motion.button>)}
            </motion.div>
          </AnimatePresence>
          <p className="text-center font-hand text-2xl text-rose mt-8">{c.notes[page % c.notes.length]}</p>
          <div className="flex items-center justify-center gap-6 mt-4">
            <button onClick={() => turn(-1)} disabled={page === 0} aria-label="Previous page" className="p-2 rounded-full glass disabled:opacity-30"><ChevronLeft /></button>
            <span className="text-sm">{page + 1} / {pages}</span>
            <button onClick={() => turn(1)} disabled={page === pages - 1} aria-label="Next page" className="p-2 rounded-full glass disabled:opacity-30"><ChevronRight /></button>
          </div>
        </>}
      </div>
      <motion.div className="absolute inset-0 rounded-r-xl rounded-l-sm flex flex-col items-center justify-center text-center gap-6 paper border-l-8 border-rose"
        style={{ transformOrigin: 'left center', backfaceVisibility: 'hidden', pointerEvents: open ? 'none' : 'auto', zIndex: 10, boxShadow: 'inset 0 0 60px rgba(183,110,121,.25), 0 25px 50px rgba(109,33,60,.3)' }}
        animate={{ rotateY: open ? -170 : 0 }} transition={{ duration: 1.3, ease: 'easeInOut' }}>
        <div className="absolute right-10 top-0 bottom-0 w-5 bg-rose/70" aria-hidden="true" />
        <span className="text-4xl" aria-hidden="true">❤ ❤ ❤</span>
        <h3 className="font-display text-4xl sm:text-5xl">{c.cover}</h3>
        <button onClick={() => setOpen(true)} className="px-6 py-3 rounded-full bg-wine text-cream shadow-lg border-0 font-medium">{c.button}</button>
      </motion.div>
    </div>
    <AnimatePresence>{lb !== null && <motion.div role="dialog" aria-modal="true" aria-label="Photo viewer" className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setLb(null)}>
      <button autoFocus onClick={() => setLb(null)} aria-label="Close" className="absolute top-4 right-4 text-white bg-transparent border-0"><X size={32} /></button>
      <button onClick={(e) => { e.stopPropagation(); setLb((lb - 1 + items.length) % items.length) }} aria-label="Previous photo" className="absolute left-2 text-white bg-transparent border-0"><ChevronLeft size={40} /></button>
      <button onClick={(e) => { e.stopPropagation(); setLb((lb + 1) % items.length) }} aria-label="Next photo" className="absolute right-2 text-white bg-transparent border-0"><ChevronRight size={40} /></button>
      <AnimatePresence mode="wait"><motion.figure key={lb} className="m-0 text-center" onClick={(e) => e.stopPropagation()} drag="x" dragSnapToOrigin
        onDragEnd={(_, i) => { if (i.offset.x < -80) setLb((lb + 1) % items.length); if (i.offset.x > 80) setLb((lb - 1 + items.length) % items.length) }}
        initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}>
        <img src={items[lb].url} alt={items[lb].caption} className="max-h-[78dvh] max-w-[88vw] object-contain rounded shadow-2xl mx-auto" draggable="false" />
        <figcaption className="mt-4 font-hand text-3xl text-cream">{items[lb].caption}</figcaption></motion.figure></AnimatePresence>
    </motion.div>}</AnimatePresence>
  </section>
}
