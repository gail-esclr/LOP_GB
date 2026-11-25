import { useState, useEffect } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useGame, BADGES } from './GameContext'
import './ScrollProgress.css'

export default function ScrollProgress() {
  const [pct, setPct] = useState(0)
  const { badges, awardBadge } = useGame()
  const motionPct = useMotionValue(0)
  const smoothPct = useSpring(motionPct, { stiffness: 120, damping: 30 })

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = docHeight > 0 ? Math.min(scrollTop / docHeight, 1) : 0
      const p = Math.round(progress * 100)
      setPct(p)
      motionPct.set(progress)

      // "Voyager" badge when scroll >= 95%
      if (p >= 95) awardBadge('voyager')
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [awardBadge, motionPct])

  const earnedCount = badges.length
  const totalBadges = BADGES.length

  return (
    <div className="scroll-progress-bar">
      <motion.div
        className="scroll-progress-fill"
        style={{ scaleX: smoothPct }}
      />
      <div className="scroll-progress-info">
        <span className="scroll-progress-label">
          🧭 Journey Progress
        </span>
        <span className="scroll-progress-stats">
          <span className="scroll-pct">{pct}%</span>
          <span className="scroll-badge-count" title={`${earnedCount} of ${totalBadges} badges earned`}>
            🏅 {earnedCount}/{totalBadges}
          </span>
        </span>
      </div>
    </div>
  )
}
