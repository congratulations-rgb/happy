import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import Hearts from './Hearts'
export default function BirthdayHero({ c, name }) {
  const title = `${c.title}${name ? ', ' + name : ''}! ❤️`
  return <section className="relative flex flex-col items-center justify-center text-center px-6 overflow-hidden" style={{ minHeight: '100dvh' }}>
    <Hearts n={14} />
    <div className="absolute w-[70vmin] h-[70vmin] rounded-full bg-rose/20 blur-3xl" aria-hidden="true" />
    <motion.h1 className="relative font-display font-bold text-5xl sm:text-7xl leading-tight" style={{ textShadow: '0 4px 30px rgba(183,110,121,.4)' }}
      initial={{ opacity: 0, scale: 0.8, filter: 'blur(12px)' }} animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }} transition={{ duration: 1.4 }}>{title}</motion.h1>
    <motion.p className="relative mt-6 font-hand text-3xl sm:text-4xl text-rose" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2, duration: 1.2 }}>{c.subtitle}</motion.p>
    <motion.div className="absolute bottom-8 flex flex-col items-center text-sm opacity-70" animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity }}>
      {c.scroll}<ChevronDown aria-hidden="true" /></motion.div>
  </section>
}
