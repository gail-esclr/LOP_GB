import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useGame } from './GameContext'
import './Quiz.css'

const questions = [
  {
    q: 'What is Pi Patel\'s full first name?',
    options: ['Piscine Molitor', 'Piscine Ravi', 'Pierre Molitor', 'Patel Molitor'],
    answer: 0,
  },
  {
    q: 'How many days does Pi survive at sea?',
    options: ['100', '185', '227', '365'],
    answer: 2,
  },
  {
    q: 'What type of animal is Richard Parker?',
    options: ['African Lion', 'Bengal Tiger', 'Siberian Tiger', 'Black Panther'],
    answer: 1,
  },
  {
    q: 'Which literary prize did Life of Pi win in 2002?',
    options: ['Pulitzer Prize', 'National Book Award', 'Man Booker Prize', 'Nobel Prize'],
    answer: 2,
  },
  {
    q: 'What is unique about the island Pi discovers at sea?',
    options: [
      'It is made of ice',
      'It is carnivorous',
      'It floats above the water',
      'It is inhabited by pirates',
    ],
    answer: 1,
  },
]

const resultTitles = [
  { min: 0, label: 'Castaway 🌊',    desc: 'You might need to re-read the book!' },
  { min: 2, label: 'Deckhand ⚓',     desc: 'You know some of the basics.' },
  { min: 4, label: 'Navigator 🧭',    desc: 'Impressive knowledge of Pi\'s journey!' },
  { min: 5, label: 'Pi Scholar 🏆',   desc: 'Perfect score! You truly know Pi\'s story.' },
]

function getResult(score) {
  return [...resultTitles].reverse().find(r => score >= r.min) || resultTitles[0]
}

export default function Quiz() {
  const { quizScore, quizTotal, setQuizResult, awardBadge } = useGame()

  const [current, setCurrent] = useState(0)
  const [selected, setSelected] = useState(null)      // index of picked option
  const [revealed, setRevealed] = useState(false)
  const [score, setScore] = useState(0)
  const [finished, setFinished] = useState(quizScore !== null)

  const handlePick = (idx) => {
    if (revealed) return
    setSelected(idx)
    setRevealed(true)
    if (idx === questions[current].answer) {
      setScore(s => s + 1)
    }
  }

  const handleNext = () => {
    const nextIdx = current + 1
    if (nextIdx >= questions.length) {
      const finalScore = score + (selected === questions[current].answer ? 0 : 0) // already counted
      setFinished(true)
      setQuizResult(finalScore >= score ? score : finalScore, questions.length)
      awardBadge('quizmaster')
    } else {
      setCurrent(nextIdx)
      setSelected(null)
      setRevealed(false)
    }
  }

  const handleRetry = () => {
    setCurrent(0)
    setSelected(null)
    setRevealed(false)
    setScore(0)
    setFinished(false)
  }

  // If already completed before, allow retry
  const displayScore = finished ? (quizScore ?? score) : score
  const displayTotal = quizTotal ?? questions.length

  return (
    <section id="quiz" className="quiz-section">
      <div className="section">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          📝 Story Quiz
        </motion.h2>
        <div className="divider" />
        <motion.p
          className="section-subtitle"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Test your knowledge of Pi's extraordinary journey!
        </motion.p>

        <div className="quiz-container">
          <AnimatePresence mode="wait">
            {!finished ? (
              <motion.div
                key={`q-${current}`}
                className="quiz-card"
                initial={{ opacity: 0, x: 60 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -60 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
              >
                {/* Progress dots */}
                <div className="quiz-progress">
                  {questions.map((_, i) => (
                    <span
                      key={i}
                      className={`quiz-dot ${i === current ? 'active' : ''} ${i < current ? 'done' : ''}`}
                    />
                  ))}
                </div>

                <p className="quiz-question-number">Question {current + 1} of {questions.length}</p>
                <h3 className="quiz-question">{questions[current].q}</h3>

                <div className="quiz-options">
                  {questions[current].options.map((opt, i) => {
                    let cls = 'quiz-option'
                    if (revealed) {
                      if (i === questions[current].answer) cls += ' correct'
                      else if (i === selected) cls += ' wrong'
                    } else if (i === selected) {
                      cls += ' selected'
                    }
                    return (
                      <motion.button
                        key={i}
                        className={cls}
                        onClick={() => handlePick(i)}
                        whileHover={!revealed ? { scale: 1.02 } : {}}
                        whileTap={!revealed ? { scale: 0.98 } : {}}
                      >
                        <span className="quiz-option-letter">
                          {String.fromCharCode(65 + i)}
                        </span>
                        {opt}
                      </motion.button>
                    )
                  })}
                </div>

                {revealed && (
                  <motion.button
                    className="btn btn-primary quiz-next"
                    onClick={handleNext}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    {current + 1 < questions.length ? 'Next Question →' : 'See Results 🏆'}
                  </motion.button>
                )}
              </motion.div>
            ) : (
              <motion.div
                key="result"
                className="quiz-card quiz-result"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <span className="quiz-result-emoji">
                  {getResult(displayScore).label.split(' ').pop()}
                </span>
                <h3 className="quiz-result-title">{getResult(displayScore).label}</h3>
                <p className="quiz-result-score">
                  You scored <strong>{displayScore}</strong> out of <strong>{displayTotal}</strong>
                </p>
                <p className="quiz-result-desc">{getResult(displayScore).desc}</p>
                <motion.button
                  className="btn btn-outline quiz-retry"
                  onClick={handleRetry}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Try Again 🔄
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
