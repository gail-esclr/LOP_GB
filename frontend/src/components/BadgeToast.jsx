import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useGame } from './GameContext'
import './BadgeToast.css'

export default function BadgeToast() {
  const { toastQueue, dismissToast } = useGame()

  // Auto-dismiss after 4s
  useEffect(() => {
    if (toastQueue.length === 0) return
    const latest = toastQueue[toastQueue.length - 1]
    const timer = setTimeout(() => dismissToast(latest.id), 4000)
    return () => clearTimeout(timer)
  }, [toastQueue, dismissToast])

  return (
    <div className="badge-toast-container">
      <AnimatePresence>
        {toastQueue.map(({ badge, id }) => (
          <motion.div
            key={id}
            className="badge-toast"
            initial={{ opacity: 0, x: 120, scale: 0.85 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 120, scale: 0.85 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            onClick={() => dismissToast(id)}
          >
            <div className="badge-toast-glow" />
            <span className="badge-toast-emoji">{badge.emoji}</span>
            <div className="badge-toast-text">
              <strong>Badge Unlocked!</strong>
              <span>{badge.label}</span>
              <small>{badge.desc}</small>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}
