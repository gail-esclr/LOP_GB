import { lazy, Suspense } from 'react'
import { GameProvider } from './components/GameContext'
import ScrollProgress from './components/ScrollProgress'
import BadgeToast from './components/BadgeToast'
import SectionTracker from './components/SectionTracker'
import Navbar from './components/Navbar'
import About from './components/About'
import Characters from './components/Characters'
import Themes from './components/Themes'
import Quiz from './components/Quiz'
import Gallery from './components/Gallery'
import Footer from './components/Footer'
import './App.css'

// Lazy-load the heavy 3D hero so it doesn't block initial render
const Hero3D = lazy(() => import('./components/Hero3D'))

function HeroFallback() {
  return (
    <div className="hero-loading">
      <div className="loading-ocean">
        <div className="loading-wave"></div>
        <div className="loading-wave"></div>
        <div className="loading-wave"></div>
      </div>
      <div className="loading-text">
        <div className="loading-spinner"></div>
        <p>Setting sail…</p>
      </div>
    </div>
  )
}

function App() {
  return (
    <GameProvider>
      <ScrollProgress />
      <BadgeToast />
      <SectionTracker />
      <Navbar />
      <main>
        <Suspense fallback={<HeroFallback />}>
          <Hero3D />
        </Suspense>
        <About />
        <Characters />
        <Themes />
        <Quiz />
        <Gallery />
      </main>
      <Footer />
    </GameProvider>
  )
}

export default App
