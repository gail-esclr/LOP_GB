import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './Navbar.css'

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Characters', href: '#characters' },
  { label: 'Themes', href: '#themes' },
  { label: 'Quiz', href: '#quiz' },
  { label: 'Timeline', href: '#gallery' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60)

      // Track active section
      const sections = navLinks.map(l => l.href.slice(1))
      let current = 'home'
      for (const id of sections) {
        const el = document.getElementById(id)
        if (el && el.getBoundingClientRect().top <= 100) {
          current = id
        }
      }
      setActiveSection(current)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <motion.nav
      className={`navbar ${scrolled ? 'scrolled' : ''}`}
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
    >
      <a href="#home" className="navbar-brand">
        <span className="brand-icon">🐯</span>
        <span className="brand-text">Life of Pi</span>
      </a>

      <ul className={`nav-links ${menuOpen ? 'open' : ''}`}>
        {navLinks.map((link) => {
          const isActive = activeSection === link.href.slice(1)
          return (
            <li key={link.href}>
              <a
                href={link.href}
                className={isActive ? 'active' : ''}
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
                {isActive && (
                  <motion.span
                    className="nav-active-dot"
                    layoutId="active-dot"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </a>
            </li>
          )
        })}
      </ul>

      <button
        className={`hamburger ${menuOpen ? 'open' : ''}`}
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle menu"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>
    </motion.nav>
  )
}
