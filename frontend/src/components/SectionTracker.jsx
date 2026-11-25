import { useEffect } from 'react'
import { useGame, BADGES } from './GameContext'

/**
 * Invisible component that observes when sections scroll into view
 * and awards the corresponding badge.
 */
export default function SectionTracker() {
  const { awardBadge, badges } = useGame()

  useEffect(() => {
    // sections that map 1:1 to a DOM id
    const sectionBadges = BADGES.filter(b => b.section !== '__complete__' && b.section !== 'quiz')

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return
          const id = entry.target.id
          const badge = sectionBadges.find(b => b.section === id)
          if (badge) awardBadge(badge.id)
        })
      },
      { threshold: 0.35 }
    )

    sectionBadges.forEach(b => {
      const el = document.getElementById(b.section)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [awardBadge, badges])

  return null
}
