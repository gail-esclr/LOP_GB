import { motion } from 'framer-motion'
import './Footer.css'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-ocean">
        <div className="footer-wave"></div>
        <div className="footer-wave footer-wave--2"></div>
      </div>

      <motion.div
        className="footer-inner"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
      >
        <div className="footer-brand">
          <span className="footer-logo">🐯</span>
          <span className="footer-name">Life of Pi</span>
        </div>

        <p className="footer-quote">
          "Which story do you prefer?"
        </p>

        <div className="footer-links">
          {['Home', 'About', 'Characters', 'Themes', 'Timeline'].map((item, i) => {
            const href = item === 'Timeline' ? '#gallery' : `#${item.toLowerCase()}`
            return (
              <motion.a
                key={item}
                href={href}
                whileHover={{ color: '#fcd34d', y: -2 }}
                transition={{ duration: 0.2 }}
              >
                {item}
              </motion.a>
            )
          })}
        </div>

        <div className="footer-divider"></div>

        <p className="footer-credit">
          An informative website about Yann Martel's <em>Life of Pi</em> (2001).
          <br />
          Built with ⚛️ React · 🎮 Three.js · ✨ Framer Motion
        </p>

        <p className="footer-copy">
          © {new Date().getFullYear()} GB Life of Pi Project · For educational purposes.
        </p>
      </motion.div>
    </footer>
  )
}
