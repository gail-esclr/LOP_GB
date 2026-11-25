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
    bonusFact: '"I have nothing to say of my working life, only that a tie is a noose, and inverted though it is, it will hang a man nonetheless." — Pi Patel',
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
    bonusFact: 'The name "Richard Parker" has an eerie literary history — it was the name of a cannibalized cabin boy in a real 1884 shipwreck, and Edgar Allan Poe used the name in a similar tale decades before it happened.',
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
    bonusFact: 'Santosh taught Pi a traumatic but life-saving lesson by forcing him to watch a tiger kill a goat — a memory that kept Pi cautious of Richard Parker on the lifeboat.',
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
    bonusFact: 'Ravi once joked that if Pi kept joining religions, he\'d soon be praying 60 hours a day. Despite the teasing, the brothers\' relationship shows how faith can be both unifying and isolating.',
  },
]

const panelVariants = {
  hidden: { opacity: 0, y: 24, scale: 0.97 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.45, ease: 'easeOut' } },
  exit: { opacity: 0, y: -16, scale: 0.97, transition: { duration: 0.25 } },
}

export default function Characters() {
  const [active, setActive] = useState('pi')
  const [flipped, setFlipped] = useState({})
  const current = characters.find((c) => c.id === active)

  const toggleFlip = (id) => {
    setFlipped(prev => ({ ...prev, [id]: !prev[id] }))
  }

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
        <div className="divider" />
        <motion.p
          className="section-subtitle"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Meet the key figures who shape Pi's extraordinary journey. <em>Click a card to flip it!</em>
        </motion.p>

        {/* Flip cards grid */}
        <div className="char-cards-grid">
          {characters.map((c, i) => {
            const isFlipped = !!flipped[c.id]
            return (
              <motion.div
                key={c.id}
                className={`char-flip-wrapper ${active === c.id ? 'ring' : ''}`}
                style={{ '--char-color': c.color }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                onClick={() => {
                  setActive(c.id)
                  toggleFlip(c.id)
                }}
              >
                <div className={`char-flip-card ${isFlipped ? 'flipped' : ''}`}>
                  {/* Front */}
                  <div className="char-flip-face char-flip-front">
                    <span className="char-card-emoji">{c.emoji}</span>
                    <h4 className="char-card-name">{c.name}</h4>
                    <span className="char-card-role" style={{ color: c.color }}>{c.role}</span>
                    <span className="char-card-hint">tap to flip 🔄</span>
                  </div>
                  {/* Back */}
                  <div className="char-flip-face char-flip-back" style={{ borderColor: c.color }}>
                    <span className="char-card-bonus-label">✨ Bonus Fact</span>
                    <p className="char-card-bonus-text">{c.bonusFact}</p>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Detail panel (unchanged) */}
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
                    <span className="fact-dot" style={{ background: current.color }} />
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
