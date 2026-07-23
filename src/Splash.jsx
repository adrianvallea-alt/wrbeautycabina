import React, { useState, useEffect, useRef } from 'react'

const Splash = ({ onEnter }) => {
  // ---------- ESTADOS ----------
  const [displayText, setDisplayText] = useState('')
  const [isTypingDone, setIsTypingDone] = useState(false)
  const [isExiting, setIsExiting] = useState(false)
  const [spotlightPos, setSpotlightPos] = useState({ x: 50, y: 50 }) // para el foco
  const [isAudioMuted, setIsAudioMuted] = useState(false)
  const audioRef = useRef(null)   // para controlar el audio
  const audioCtxRef = useRef(null)

  // ---------- CONFIGURACIÓN ----------
  const fullText = '"TÚ MEJOR VERSIÓN EMPIEZA AQUÍ"'
  const typingSpeed = 70

  // ---------- SONIDO DE CLICK (igual que antes) ----------
  const playSubtleClick = () => {
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
      osc.frequency.setValueAtTime(800, ctx.currentTime)
      osc.frequency.exponentialRampToValueAtTime(200, ctx.currentTime + 0.04)

      gain.gain.setValueAtTime(0.015, ctx.currentTime)
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.04)

      osc.connect(gain)
      gain.connect(ctx.destination)
      osc.start()
      osc.stop(ctx.currentTime + 0.04)
    } catch {}
  }

  // ---------- EFECTO DE ESCRITURA ----------
  useEffect(() => {
    let charIndex = 0
    const interval = setInterval(() => {
      if (charIndex <= fullText.length) {
        setDisplayText(fullText.slice(0, charIndex))
        charIndex++
      } else {
        clearInterval(interval)
        setIsTypingDone(true)
      }
    }, typingSpeed)

    return () => clearInterval(interval)
  }, [])

  // ---------- GIROSCOPIO (efecto de inclinación) ----------
  useEffect(() => {
    const handleOrientation = (e) => {
      // Limitar el movimiento para que no sea exagerado
      const gamma = e.gamma || 0
      const beta = e.beta || 0
      const tiltX = Math.min(Math.max(gamma / 8, -8), 8).toFixed(2)
      const tiltY = Math.min(Math.max(beta / 8, -8), 8).toFixed(2)
      document.documentElement.style.setProperty('--tilt-x', `${tiltX}px`)
      document.documentElement.style.setProperty('--tilt-y', `${tiltY}px`)
    }

    window.addEventListener('deviceorientation', handleOrientation)
    return () => window.removeEventListener('deviceorientation', handleOrientation)
  }, [])

  // ---------- SPOTLIGHT (sigue al dedo / ratón) ----------
  const updateSpotlight = (clientX, clientY) => {
    const rect = document.documentElement.getBoundingClientRect()
    const x = ((clientX - rect.left) / rect.width) * 100
    const y = ((clientY - rect.top) / rect.height) * 100
    setSpotlightPos({ x, y })
    document.documentElement.style.setProperty('--spot-x', `${x}%`)
    document.documentElement.style.setProperty('--spot-y', `${y}%`)
  }

  // Eventos para ratón
  const handleMouseMove = (e) => {
    updateSpotlight(e.clientX, e.clientY)
  }
  // Eventos para táctil (móvil)
  const handleTouchMove = (e) => {
    const touch = e.touches[0]
    if (touch) updateSpotlight(touch.clientX, touch.clientY)
  }

  // ---------- CONTROL DE AUDIO ----------
  const toggleAudio = () => {
    if (audioRef.current) {
      if (isAudioMuted) {
        audioRef.current.play().catch(() => {})
      } else {
        audioRef.current.pause()
      }
      setIsAudioMuted(!isAudioMuted)
    }
  }

  // ---------- ENTRADA A LA WEB ----------
  const handleEnter = () => {
    playSubtleClick()

    // Reproducción de música Lo-Fi (si no está muteado)
    if (!isAudioMuted && !audioRef.current) {
      try {
        const bgAudio = new Audio('https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=lofi-study-112191.mp3')
        bgAudio.loop = true
        bgAudio.volume = 0.35
        bgAudio.play().catch(() => {})
        audioRef.current = bgAudio
      } catch {}
    }

    // Vibración háptica (si está disponible)
    if ('vibrate' in navigator) {
      try { navigator.vibrate([20, 30, 20]) } catch {}
    }

    setIsExiting(true)

    // Después de la animación de salida, llamamos a onEnter
    setTimeout(() => {
      if (onEnter) onEnter()
    }, 700)
  }

  // ---------- RENDER ----------
  return (
    <div
      className={`splash-container ${isExiting ? 'exit-active' : ''}`}
      onMouseMove={handleMouseMove}
      onTouchMove={handleTouchMove}
      onTouchStart={handleTouchMove} // para móviles sin movimiento
    >
      {/* Foco de luz (spotlight) */}
      <div className="splash-spotlight" />

      {/* Halo de fondo */}
      <div className="splash-glow" />

      {/* Partículas flotantes - dinámicas (menos en móvil) */}
      <div className="particles-container">
        {[...Array(window.innerWidth < 600 ? 12 : 25)].map((_, i) => (
          <span key={i} className={`p${i + 1}`} />
        ))}
      </div>

      {/* Marco exterior */}
      <div className="frame" />

      {/* Tarjeta central */}
      <div className="splash-card">
        <div className="logo">
          <img src="/logo.png" alt="WR Beauty Cabina" className="logo-img" />
        </div>

        <h1 className="typewriter">
          {displayText}
          <span className={`cursor ${isTypingDone ? 'done' : ''}`}>|</span>
        </h1>

        <button className="cta-button" onClick={handleEnter}>
          Explorar Experiencia
        </button>

        {/* Botón opcional para silenciar audio (muy discreto) */}
        <button
          onClick={toggleAudio}
          style={{
            position: 'absolute',
            bottom: '1rem',
            right: '1rem',
            background: 'transparent',
            border: 'none',
            color: 'rgba(0,0,0,0.3)',
            fontSize: '0.7rem',
            cursor: 'pointer',
            zIndex: 20,
            padding: '0.5rem',
            touchAction: 'manipulation'
          }}
          aria-label={isAudioMuted ? 'Activar sonido' : 'Silenciar sonido'}
        >
          {isAudioMuted ? '🔇' : '🔊'}
        </button>
      </div>
    </div>
  )
}

export default Splash