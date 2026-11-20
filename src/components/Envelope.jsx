import { useState } from 'react'
import { motion } from 'framer-motion'
import Hearts from './Hearts'
const tri = (p) => ({ clipPath: `polygon(${p})` })
// Stages: 0 closed · 1 seal gone · 2 flap opens · 3 letter slides out · 4 letter rises + unfolds · 5 camera moves in
export default function Envelope({ c, onOpen, onDone }) {
  const [s, setS] = useState(0)
  const go = () => {
    if (s) return
    onOpen(); setS(1)
    ;[[650, 2], [1600, 3], [2500, 4], [3700, 5]].forEach(([t, v]) => setTimeout(() => setS(v), t))
    setTimeout(onDone, 4600)
  }
  const sparks = s >= 4 ? Array.from({ length: 18 }, (_, i) => i) : []
  return (
    <motion.div className="fixed inset-0 flex flex-col items-center justify-center gap-10 px-4 overflow-hidden"
      style={{ height: '100dvh' }} animate={s === 5 ? { scale: 3, opacity: 0 } : {}} transition={{ duration: 0.9, ease: 'easeIn' }}>
      <Hearts n={12} />
      <motion.p className="font-display italic text-xl sm:text-2xl text-center" animate={{ opacity: s ? 0 : 1 }}>{c.above}</motion.p>
      <button onClick={go} aria-label="Open your surprise" className="relative bg-transparent border-0 p-0" style={{ perspective: 1000 }}>
        <motion.div className="relative" style={{ width: 'min(84vw,340px)', aspectRatio: '3/2' }}
          animate={s === 0 ? { y: [0, -10, 0] } : { y: 0 }} transition={s === 0 ? { duration: 3.5, repeat: Infinity } : {}}>
          <div className="absolute inset-0 rounded-md" style={{ background: '#d99aa5', boxShadow: '0 25px 50px rgba(109,33,60,.3)' }} />
          <motion.div className="paper absolute rounded-sm text-left p-4 font-hand text-rose text-lg shadow-md" style={{ left: '7%', right: '7%', top: '6%', height: '86%', zIndex: s >= 4 ? 6 : 2 }}
            animate={{ y: s >= 4 ? '-95%' : s === 3 ? '-45%' : 0, scale: s >= 4 ? 1.12 : 1 }} transition={{ type: 'spring', stiffness: 70, damping: 14 }}>
            <div>Dear you,</div><div className="mt-2 opacity-60">♥ ♥ ♥</div>
          </motion.div>
          <div className="absolute inset-0 z-[3]" style={{ ...tri('0 0,50% 52%,0 100%'), background: '#f0b6c0' }} />
          <div className="absolute inset-0 z-[3]" style={{ ...tri('100% 0,50% 52%,100% 100%'), background: '#f2bcc6' }} />
          <div className="absolute inset-0 z-[3]" style={{ ...tri('0 100%,50% 44%,100% 100%'), background: '#f7ccd3' }} />
          <motion.div className="absolute left-0 top-0 w-full origin-top" style={{ height: '56%', zIndex: s >= 2 ? 1 : 4, ...tri('0 0,100% 0,50% 100%'), background: 'linear-gradient(#f4c2cb,#e8a3af)' }}
            animate={{ rotateX: s >= 2 ? 180 : 0 }} transition={{ duration: 0.9, ease: 'easeInOut' }} />
          <motion.svg viewBox="0 0 24 24" className="absolute z-[5] drop-shadow-lg" style={{ left: '50%', top: '56%', width: 56, height: 56, x: '-50%', y: '-50%' }}
            animate={s >= 1 ? { scale: 0, opacity: 0 } : { scale: 1, opacity: 1 }} transition={{ duration: 0.5 }}>
            <path fill="#8c1d3f" d="M12 21s-8-5.2-8-11a4.5 4.5 0 0 1 8-2.7A4.5 4.5 0 0 1 20 10c0 5.8-8 11-8 11z" /></motion.svg>
          {sparks.map((i) => <motion.span key={i} className="absolute left-1/2 top-1/2 text-rose" initial={{ opacity: 0 }}
            animate={{ x: Math.cos(i) * (110 + (i % 4) * 25), y: Math.sin(i) * (90 + (i % 3) * 25), opacity: [0, 1, 0], scale: [0.4, 1.2, 0.6] }}
            transition={{ duration: 1.8, delay: i * 0.03 }}>{i % 2 ? '✦' : '❤'}</motion.span>)}
        </motion.div>
      </button>
      <motion.p className="text-sm sm:text-base tracking-wide" animate={{ opacity: s ? 0 : [0.6, 1, 0.6] }} transition={{ duration: 2.2, repeat: Infinity }}>{c.below}</motion.p>
    </motion.div>
  )
}
