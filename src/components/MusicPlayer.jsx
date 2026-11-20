import { motion } from 'framer-motion'
import { Pause, Play, Volume2, VolumeX } from 'lucide-react'
export default function MusicPlayer({ audio }) {
  const b = 'w-11 h-11 rounded-full glass flex items-center justify-center text-wine border-0 shadow-lg'
  return <div className="fixed z-40 flex items-center gap-2" style={{ right: 'max(1rem,env(safe-area-inset-right))', bottom: 'max(1rem,env(safe-area-inset-bottom))' }}>
    <div className="flex items-end gap-[3px] h-5 mr-1" aria-hidden="true">{[0, 1, 2, 3].map((i) => <motion.span key={i} className="w-[3px] rounded bg-rose" animate={{ height: audio.playing ? [4, 18, 8, 16, 4] : 4 }} transition={{ duration: 1 + i * 0.15, repeat: Infinity }} />)}</div>
    <button className={b} onClick={audio.toggle} aria-label={audio.playing ? 'Pause music' : 'Play music'}>{audio.playing ? <Pause size={18} /> : <Play size={18} />}</button>
    <button className={b} onClick={audio.mute} aria-label={audio.muted ? 'Unmute' : 'Mute'}>{audio.muted ? <VolumeX size={18} /> : <Volume2 size={18} />}</button>
  </div>
}
