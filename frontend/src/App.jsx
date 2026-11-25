import { lazy, Suspense } from 'react'
import Navbar from './components/Navbar'
import About from './components/About'
import Characters from './components/Characters'
import Themes from './components/Themes'
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
    <>
      <Navbar />
      <main>
        <Suspense fallback={<HeroFallback />}>
          <Hero3D />
        </Suspense>
        <About />
        <Characters />
        <Themes />
        <Gallery />
      </main>
      <Footer />
    </>
  )
}

export default App
