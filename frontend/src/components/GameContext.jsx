import { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react'

/* ─── Badge definitions ───────────────────────── */
export const BADGES = [
  { id: 'explorer',   emoji: '🧭', label: 'Explorer',      desc: 'Discovered the About section',       section: 'about' },
  { id: 'naturalist', emoji: '🐅', label: 'Naturalist',    desc: 'Met all the Characters',              section: 'characters' },
  { id: 'thinker',    emoji: '🧠', label: 'Deep Thinker',  desc: 'Explored the Major Themes',           section: 'themes' },
  { id: 'quizmaster', emoji: '📝', label: 'Quiz Taker',    desc: 'Completed the Story Quiz',            section: 'quiz' },
  { id: 'historian',  emoji: '📜', label: 'Historian',     desc: 'Followed the full Timeline',          section: 'gallery' },
  { id: 'voyager',    emoji: '⛵', label: 'Voyager',       desc: 'Scrolled through the entire journey', section: '__complete__' },
]

const STORAGE_KEY = 'lop_game_state'

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) return JSON.parse(raw)
  } catch { /* ignore */ }
  return { badges: [], quizScore: null, quizTotal: null }
}

function saveState(state) {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)) } catch { /* ignore */ }
}

const GameContext = createContext(null)

export function GameProvider({ children }) {
  const [state, setState] = useState(loadState)
  const [toastQueue, setToastQueue] = useState([])          // { badge, id }
  const toastIdRef = useRef(0)

  // persist on change
  useEffect(() => { saveState(state) }, [state])

  /* Award a badge (idempotent) */
  const awardBadge = useCallback((badgeId) => {
    setState(prev => {
      if (prev.badges.includes(badgeId)) return prev
      return { ...prev, badges: [...prev.badges, badgeId] }
    })
    // fire toast (always check freshness inside)
    setToastQueue(prev => {
      // avoid duplicate toasts in the same session
      if (prev.some(t => t.badge.id === badgeId)) return prev
      const badge = BADGES.find(b => b.id === badgeId)
      if (!badge) return prev
      const id = ++toastIdRef.current
      return [...prev, { badge, id }]
    })
  }, [])

  const dismissToast = useCallback((id) => {
    setToastQueue(prev => prev.filter(t => t.id !== id))
  }, [])

  const setQuizResult = useCallback((score, total) => {
    setState(prev => ({ ...prev, quizScore: score, quizTotal: total }))
  }, [])

  const resetProgress = useCallback(() => {
    setState({ badges: [], quizScore: null, quizTotal: null })
    setToastQueue([])
  }, [])

  return (
    <GameContext.Provider value={{
      badges: state.badges,
      quizScore: state.quizScore,
      quizTotal: state.quizTotal,
      toastQueue,
      awardBadge,
      dismissToast,
      setQuizResult,
      resetProgress,
    }}>
      {children}
    </GameContext.Provider>
  )
}

export function useGame() {
  const ctx = useContext(GameContext)
  if (!ctx) throw new Error('useGame must be inside <GameProvider>')
  return ctx
}
