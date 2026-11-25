import { motion } from 'framer-motion'
import './Gallery.css'

const timelineItems = [
  {
    emoji: '🏡',
    year: 'Early Life',
    title: 'Growing Up in Pondicherry',
    desc: 'Pi grows up in Pondicherry, India, where his father runs the local zoo. He develops a fascination with animals and religion, embracing Hinduism, Christianity, and Islam.',
  },
  {
    emoji: '🚢',
    year: 'The Voyage',
    title: 'Setting Sail to Canada',
    desc: 'The Patel family decides to emigrate to Canada, taking many zoo animals aboard the Japanese cargo ship Tsimtsum to sell in North America.',
  },
  {
    emoji: '🌊',
    year: 'The Shipwreck',
    title: 'Disaster in the Pacific',
    desc: 'A violent storm sinks the Tsimtsum. Pi barely makes it onto a lifeboat, joined by a hyena, an injured zebra, an orangutan, and a Bengal tiger named Richard Parker.',
  },
  {
    emoji: '🐯',
    year: 'Days 1–50',
    title: 'Chaos on the Lifeboat',
    desc: 'The hyena kills the zebra and orangutan, then Richard Parker kills the hyena. Pi realizes he must manage the tiger or become its next meal.',
  },
  {
    emoji: '⚓',
    year: 'Days 50–200',
    title: 'Learning to Survive',
    desc: 'Pi fishes, collects rainwater, and uses a training manual to tame Richard Parker. He marks his territory on the boat and establishes a routine of coexistence with the tiger.',
  },
  {
    emoji: '🏝️',
    year: 'The Island',
    title: 'A Mysterious Carnivorous Island',
    desc: 'Pi and Richard Parker discover a floating algae island full of meerkats that provides food and fresh water — but the island turns out to be carnivorous, consuming flesh at night.',
  },
  {
    emoji: '🇲🇽',
    year: 'Day 227',
    title: 'Arrival in Mexico',
    desc: 'The lifeboat reaches the coast of Mexico. Richard Parker disappears into the jungle without looking back. Pi is rescued and taken to a hospital.',
  },
  {
    emoji: '🕊️',
    year: 'Aftermath',
    title: 'Two Stories, One Truth',
    desc: 'Pi tells investigators two versions of events — one with animals, one without. The investigators choose the animal story because it is better. The novel asks: which story do YOU prefer?',
  },
]

const itemVariants = {
  hidden: (isLeft) => ({
    opacity: 0,
    x: isLeft ? -60 : 60,
    y: 20,
  }),
  visible: {
    opacity: 1,
    x: 0,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
}

export default function Gallery() {
  return (
    <section id="gallery" className="gallery-section">
      <div className="section">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          The Journey Timeline
        </motion.h2>
        <div className="divider"></div>
        <motion.p
          className="section-subtitle"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Follow Pi's extraordinary odyssey from Pondicherry to the shores of Mexico.
        </motion.p>

        <div className="timeline">
          {timelineItems.map((item, i) => {
            const isLeft = i % 2 === 0
            return (
              <motion.div
                key={i}
                className={`timeline-item ${isLeft ? 'left' : 'right'}`}
                variants={itemVariants}
                custom={isLeft}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-80px' }}
              >
                <div className="timeline-content">
                  <span className="timeline-emoji">{item.emoji}</span>
                  <span className="timeline-year">{item.year}</span>
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                </div>
                <div className="timeline-dot"></div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
