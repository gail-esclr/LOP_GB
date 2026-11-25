import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './Characters.css'

const characters = [
  {
    id: 'pi',
    emoji: '🧑',
    name: 'Pi Patel',
    fullName: 'Piscine Molitor Patel',
    role: 'Protagonist',
    color: '#0891b2',
    description:
      'The narrator and main character. Pi is an introspective and philosophical young man who practices Hinduism, Christianity, and Islam simultaneously. His deep spiritual faith and vivid imagination are what ultimately allow him to survive his harrowing ordeal at sea.',
    facts: ['Named after a Paris swimming pool', 'Practices 3 religions at once', 'Son of a zookeeper', 'Survives 227 days at sea'],
  },
  {
    id: 'richard',
    emoji: '🐅',
    name: 'Richard Parker',
    fullName: 'Bengal Tiger',
    role: 'Companion / Antagonist',
    color: '#d97706',
    description:
      'A Royal Bengal tiger who shares Pi\'s lifeboat. Richard Parker is both a terrifying threat and Pi\'s reason to stay alive. Pi must tame and care for the tiger to survive, creating an unlikely bond forged by necessity and mutual dependence.',
    facts: ['Named due to a paperwork mix-up', 'Weighs 450 pounds', 'Keeps Pi focused on survival', 'Disappears into the jungle at story\'s end'],
  },
  {
    id: 'santosh',
    emoji: '👨',
    name: 'Santosh Patel',
    fullName: 'Pi\'s Father',
    role: 'Supporting Character',
    color: '#059669',
    description:
      'Pi\'s pragmatic and rational father who owns the Pondicherry Zoo. He instills in Pi a healthy respect and fear of wild animals, particularly Richard Parker. Though not religious himself, he respects his family\'s choices.',
    facts: ['Owned the Pondicherry Zoo', 'A practical rationalist', 'Decided to emigrate to Canada', 'Perished in the shipwreck'],
  },
  {
    id: 'ravi',
    emoji: '👦',
    name: 'Ravi Patel',
    fullName: 'Pi\'s Brother',
    role: 'Supporting Character',
    color: '#7c3aed',
    description:
      'Pi\'s older brother who frequently teases him about his multiple religious devotions. He represents a more conventional and skeptical view of the world, contrasting with Pi\'s open spiritual curiosity.',
    facts: ['Pi\'s older brother', 'Teased Pi about his religions', 'A sports enthusiast', 'Also perished in the shipwreck'],
  },
]

const panelVariants = {
  hidden: { opacity: 0, y: 24, scale: 0.97 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.45, ease: 'easeOut' } },
  exit: { opacity: 0, y: -16, scale: 0.97, transition: { duration: 0.25 } },
}

export default function Characters() {
  const [active, setActive] = useState('pi')
  const current = characters.find((c) => c.id === active)

  return (
    <section id="characters" style={{ background: 'var(--ocean-deep)' }}>
      <div className="section">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Characters
        </motion.h2>
        <div className="divider"></div>
        <motion.p
          className="section-subtitle"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Meet the key figures who shape Pi's extraordinary journey across the Pacific Ocean.
        </motion.p>

        <div className="char-tabs">
          {characters.map((c) => (
            <motion.button
              key={c.id}
              className={`char-tab ${active === c.id ? 'active' : ''}`}
              style={{ '--char-color': c.color }}
              onClick={() => setActive(c.id)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>{c.emoji}</span>
              <span>{c.name}</span>
            </motion.button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            className="char-panel"
            key={current.id}
            variants={panelVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div className="char-avatar" style={{ background: `${current.color}22`, borderColor: current.color }}>
              <span>{current.emoji}</span>
            </div>
            <div className="char-info">
              <span className="char-role" style={{ color: current.color }}>{current.role}</span>
              <h3 className="char-name">{current.fullName}</h3>
              <p className="char-desc">{current.description}</p>
              <ul className="char-facts">
                {current.facts.map((f, i) => (
                  <motion.li
                    key={f}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 + i * 0.08 }}
                  >
                    <span className="fact-dot" style={{ background: current.color }}></span>
                    {f}
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
