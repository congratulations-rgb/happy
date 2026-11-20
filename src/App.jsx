import { useState } from 'react'
import { motion } from 'framer-motion'
import { config as c } from './config'
import { useAudio } from './utils'
import Envelope from './components/Envelope'
import BirthdayHero from './components/BirthdayHero'
import MemoriesGallery from './components/MemoriesGallery'
import BirthdayLetter from './components/BirthdayLetter'
import FinalSurprise from './components/FinalSurprise'
import MusicPlayer from './components/MusicPlayer'
export default function App() {
  const [opened, setOpened] = useState(false)
  const audio = useAudio(c.music)
  if (!opened) return <Envelope c={c.envelope} onOpen={audio.play} onDone={() => setOpened(true)} />  // music starts on the user's tap
  return <motion.main initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.1 }} className="overflow-x-hidden">
    <BirthdayHero c={c.hero} name={c.recipientName} />
    <MemoriesGallery c={c.album} memories={c.memories} />
    <BirthdayLetter text={c.letter} />
    <FinalSurprise c={c.final} />
    <MusicPlayer audio={audio} />
  </motion.main>
}
