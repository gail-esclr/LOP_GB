import { motion } from 'framer-motion'
import './About.css'

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.15, ease: 'easeOut' },
  }),
}

const scaleIn = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: (i = 0) => ({
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, delay: i * 0.1, ease: 'easeOut' },
  }),
}

export default function About() {
  return (
    <section id="about">
      <div className="section">
        <motion.h2
          className="section-title"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          About the Novel
        </motion.h2>
        <div className="divider"></div>

        <div className="about-grid">
          <div className="about-info">
            {[
              {
                icon: '📖',
                title: 'The Story',
                text: (
                  <>
                    <em>Life of Pi</em> is a 2001 Canadian philosophical adventure novel by
                    Yann Martel. The story follows Piscine Molitor "Pi" Patel, an Indian boy
                    from Pondicherry who explores issues of spirituality and metaphysics from
                    an early age.
                  </>
                ),
              },
              {
                icon: '⛵',
                title: 'The Survival',
                text: 'After a shipwreck, Pi survives 227 days adrift in the Pacific Ocean on a lifeboat alongside a Bengal tiger named Richard Parker. The novel explores how imagination and storytelling can be a means of survival.',
              },
              {
                icon: '🏆',
                title: 'Awards & Legacy',
                text: 'The novel won the 2002 Man Booker Prize for Fiction and was adapted into a critically acclaimed 2012 film directed by Ang Lee, which won four Academy Awards including Best Director.',
              },
            ].map((card, i) => (
              <motion.div
                key={card.title}
                className="about-card"
                variants={fadeUp}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-60px' }}
              >
                <span className="about-icon">{card.icon}</span>
                <div>
                  <h3>{card.title}</h3>
                  <p>{card.text}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="about-stats">
            {[
              { number: '227', label: 'Days at Sea' },
              { number: '3', label: 'Religions Embraced' },
              { number: '1', label: 'Bengal Tiger' },
              { number: '2002', label: 'Man Booker Prize' },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                className="stat-card"
                variants={scaleIn}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-60px' }}
              >
                <span className="stat-number">{stat.number}</span>
                <span className="stat-label">{stat.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
