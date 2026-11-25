import { motion } from 'framer-motion'
import './Themes.css'

const themes = [
  {
    icon: '🙏',
    title: 'Faith & Spirituality',
    color: '#f59e0b',
    description:
      'Pi embraces Hinduism, Christianity, and Islam, believing that all paths lead to God. His faith becomes his anchor during the voyage, providing meaning and hope in the face of despair.',
  },
  {
    icon: '🌊',
    title: 'Survival & Resilience',
    color: '#0891b2',
    description:
      'Pi\'s 227-day survival at sea is a testament to the human will to live. He adapts, learns, and endures conditions that would destroy most people, drawing on every resource available to him.',
  },
  {
    icon: '📖',
    title: 'Storytelling & Reality',
    color: '#8b5cf6',
    description:
      'The novel questions the nature of truth and narrative. Pi\'s two stories — one with animals, one without — force the reader to decide which story is "real" and what that choice reveals about themselves.',
  },
  {
    icon: '🤝',
    title: 'Human–Animal Bond',
    color: '#10b981',
    description:
      'The relationship between Pi and Richard Parker explores boundaries between civilization and nature. The tiger both threatens and saves Pi, representing the wild nature within all living beings.',
  },
  {
    icon: '🧠',
    title: 'Imagination as Survival',
    color: '#ef4444',
    description:
      'Pi\'s ability to reframe his experience through storytelling and imagination is what sustains his sanity. The novel suggests that the stories we tell ourselves shape our reality.',
  },
  {
    icon: '🌍',
    title: 'Identity & Belonging',
    color: '#f97316',
    description:
      'Pi straddles multiple cultural, religious, and personal identities. His journey can be seen as a search for self — a young man trying to understand his place in an indifferent universe.',
  },
]

const cardVariants = {
  hidden: { opacity: 0, y: 50, rotateX: -10 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: { duration: 0.5, delay: i * 0.1, ease: 'easeOut' },
  }),
}

export default function Themes() {
  return (
    <section id="themes" className="themes-section">
      <div className="section">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Major Themes
        </motion.h2>
        <div className="divider"></div>
        <motion.p
          className="section-subtitle"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Life of Pi weaves together profound themes that make it one of literature's most discussed novels.
        </motion.p>

        <div className="themes-grid">
          {themes.map((theme, i) => (
            <motion.div
              key={theme.title}
              className="theme-card"
              style={{ '--theme-color': theme.color }}
              variants={cardVariants}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-40px' }}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
            >
              <span className="theme-icon">{theme.icon}</span>
              <h3 className="theme-title">{theme.title}</h3>
              <p className="theme-desc">{theme.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
