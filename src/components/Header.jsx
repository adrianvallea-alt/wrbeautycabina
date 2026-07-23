import React, { useState, useRef, useEffect } from 'react'

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  const audioCtxRef = useRef(null)
  const menuButtonRef = useRef(null)

  // ---------- SONIDO (compartido con Splash si usas el mismo contexto) ----------
  const playSubtleClick = (freq = 800, duration = 0.02) => {
    try {
      if (!audioCtxRef.current) {
        const AudioContext = window.AudioContext || window.webkitAudioContext
        audioCtxRef.current = new AudioContext()
      }
      const ctx = audioCtxRef.current
      if (ctx.state === 'suspended') ctx.resume()

      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.type = 'sine'
      osc.frequency.setValueAtTime(freq, ctx.currentTime)
      osc.frequency.exponentialRampToValueAtTime(freq * 0.3, ctx.currentTime + duration)

      gain.gain.setValueAtTime(0.008, ctx.currentTime)
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration)

      osc.connect(gain)
      gain.connect(ctx.destination)
      osc.start()
      osc.stop(ctx.currentTime + duration)
    } catch {
      // Silencioso
    }
  }

  const triggerHaptic = (pattern = 12) => {
    if ('vibrate' in navigator) {
      try { navigator.vibrate(pattern) } catch {}
    }
  }

  // ---------- TOGGLE MENÚ CON FEEDBACK ----------
  const toggleMenu = () => {
    const isOpening = !menuOpen
    playSubtleClick(isOpening ? 900 : 600, 0.02)
    triggerHaptic(isOpening ? [10, 20, 10] : 10)
    setMenuOpen(!menuOpen)
  }

  // ---------- CERRAR MENÚ AL HACER CLIC EN ENLACE ----------
  const handleNavClick = (e, link) => {
    e.preventDefault()
    playSubtleClick(700, 0.02)
    triggerHaptic(8)
    setMenuOpen(false)

    // Navegación suave al destino (scroll)
    const targetId = link.href.split('#')[1]
    if (targetId) {
      const targetEl = document.getElementById(targetId)
      if (targetEl) {
        targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }
  }

  // ---------- CERRAR MENÚ AL HACER SCROLL (mejora UX móvil) ----------
  useEffect(() => {
    if (!menuOpen) return

    const handleScroll = () => {
      setMenuOpen(false)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [menuOpen])

  // ---------- PREVENIR SCROLL DEL FONDO CUANDO EL MENÚ ESTÁ ABIERTO ----------
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden'
      document.body.style.touchAction = 'none'
    } else {
      document.body.style.overflow = ''
      document.body.style.touchAction = ''
    }
    return () => {
      document.body.style.overflow = ''
      document.body.style.touchAction = ''
    }
  }, [menuOpen])

  // ---------- LISTA DE ENLACES ----------
  const navLinks = [
    { label: 'Inicio', href: '#hero' },
    { label: 'Sobre Mí', href: '#about' },
    { label: 'Tratamientos', href: '#services' },
    { label: 'Galería', href: '#gallery' },
    { label: 'Contacto', href: '#contact' },
  ]

  return (
    <>
      <header className="header">
        <a
          href="#hero"
          className="header-logo-link"
          onClick={(e) => {
            e.preventDefault()
            playSubtleClick(850, 0.02)
            triggerHaptic(6)
            const hero = document.getElementById('hero')
            if (hero) hero.scrollIntoView({ behavior: 'smooth' })
          }}
        >
          <img src="/logo.png" alt="WR Beauty Cabina" className="header-logo" />
        </a>

        <p className="header-tagline">WR BEAUTY CABINA</p>

        <button
          ref={menuButtonRef}
          className={`header-hamburger ${menuOpen ? 'active' : ''}`}
          onClick={toggleMenu}
          aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
          style={{ position: 'relative', zIndex: 1002 }}
        >
          <span />
          <span />
          <span />
        </button>
      </header>

      {/* Menú Overlay con animación de entrada escalonada */}
      <nav className={`header-nav ${menuOpen ? 'open' : ''}`}>
        <div className="header-nav-inner">
          {navLinks.map((link, idx) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleNavClick(e, link)}
              style={{
                '--nav-i': idx,
                animationDelay: menuOpen ? `${idx * 0.08}s` : '0s',
                opacity: menuOpen ? 1 : 0,
                transform: menuOpen ? 'translateY(0)' : 'translateY(20px)',
                transition: `all 0.5s cubic-bezier(0.16, 1, 0.3, 1) ${menuOpen ? idx * 0.08 : 0}s`
              }}
            >
              {link.label}
            </a>
          ))}
        </div>
      </nav>
    </>
  )
}

export default Header