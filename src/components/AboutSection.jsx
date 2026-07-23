import { useEffect, useRef, useState } from 'react'

const AboutSection = () => {
  const sectionRef = useRef(null)

  const headlineText = '...TU MEJOR VERSIÓN EMPIEZA AQUÍ...'
  const paragraphText =
    'En WR Beauty Cabina ofrecemos tratamientos faciales personalizados y depilación láser para todo el cuerpo, tanto para hombres como para mujeres, con productos profesionales, innovadores y la mejor tecnología para obtener los mejores resultados y confort garantizado.'

  const [displayedHeadline, setDisplayedHeadline] = useState('')
  const [displayedParagraph, setDisplayedParagraph] = useState('')
  const [activePhase, setActivePhase] = useState('idle')

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && activePhase === 'idle') {
          setActivePhase('headline')
        }
      },
      { threshold: 0.15 }
    )

    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [activePhase])

  useEffect(() => {
    if (activePhase === 'headline') {
      let index = 0
      const interval = setInterval(() => {
        if (index <= headlineText.length) {
          setDisplayedHeadline(headlineText.slice(0, index))
          index++
        } else {
          clearInterval(interval)
          setTimeout(() => setActivePhase('paragraph'), 350)
        }
      }, 35)
      return () => clearInterval(interval)
    }

    if (activePhase === 'paragraph') {
      let index = 0
      const interval = setInterval(() => {
        if (index <= paragraphText.length) {
          setDisplayedParagraph(paragraphText.slice(0, index))
          index++
        } else {
          clearInterval(interval)
          setActivePhase('done')
        }
      }, 18)
      return () => clearInterval(interval)
    }
  }, [activePhase])

  return (
    <section
      id="about"
      className="about-luxe stack-section"
      ref={sectionRef}
      style={{ backgroundColor: 'transparent' }}
    >
      <div className="about-luxe-content">
        <div className="hero-compact-text-wrapper">
          <p className="placeholder-headline" aria-hidden="true">
            {headlineText}
          </p>
          <p className="hero-compact-text">
            {displayedHeadline}
            {activePhase === 'headline' && <span className="cursor-blink">|</span>}
          </p>
        </div>

        <img
          src="/logo.png"
          alt="WR Beauty Cabina"
          className="about-luxe-logo"
        />

        <div className="about-luxe-divider" />

        <div className="about-luxe-text">
          <p className="placeholder-text" aria-hidden="true">
            {paragraphText}
          </p>
          <p className="typed-text">
            {displayedParagraph}
            {(activePhase === 'paragraph' || activePhase === 'done') && (
              <span className={`cursor-blink ${activePhase === 'done' ? 'done' : ''}`}>|</span>
            )}
          </p>
        </div>
      </div>
    </section>
  )
}

export default AboutSection