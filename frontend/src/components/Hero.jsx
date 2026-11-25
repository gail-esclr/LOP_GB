import './Hero.css'

export default function Hero() {
  return (
    <section id="home" className="hero">
      <div className="hero-ocean">
        <div className="wave wave-1"></div>
        <div className="wave wave-2"></div>
        <div className="wave wave-3"></div>
      </div>

      <div className="hero-content">
        <p className="hero-label">An Informative Journey</p>
        <h1 className="hero-title">
          Life of <span className="highlight">Pi</span>
        </h1>
        <p className="hero-quote">
          "I must say a word about fear. It is life's only true opponent."
        </p>
        <p className="hero-author">— Yann Martel</p>

        <div className="hero-actions">
          <a href="#about" className="btn btn-primary">Explore the Story</a>
          <a href="#characters" className="btn btn-outline">Meet the Characters</a>
        </div>
      </div>

      <div className="hero-boat">🚣</div>
      <div className="hero-tiger">🐅</div>
    </section>
  )
}
