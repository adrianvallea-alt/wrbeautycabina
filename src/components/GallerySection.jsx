import React, { useEffect, useRef, useState } from 'react'

// Después
const base = import.meta.env.BASE_URL || '/'
const images = [
  `${base}fotos/images.jpg`,
  `${base}fotos/imagess.jpg`,
]
const GallerySection = () => {
  const sectionRef = useRef(null)
  const canvasRef = useRef(null)
  const [hoveredIndex, setHoveredIndex] = useState(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.querySelectorAll('.section-reveal').forEach((el) => {
            el.classList.add('revealed')
          })
        }
      },
      { threshold: 0.15 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let animationFrameId

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    const particles = Array.from({ length: 30 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 2 + 1,
      alpha: Math.random() * 0.4 + 0.3,
      speedX: (Math.random() - 0.5) * 0.25,
      speedY: -Math.random() * 0.35 - 0.1,
    }))

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particles.forEach((p) => {
        p.x += p.speedX
        p.y += p.speedY

        if (p.y < 0) p.y = canvas.height
        if (p.x < 0) p.x = canvas.width
        if (p.x > canvas.width) p.x = 0

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(229, 155, 199, ${p.alpha})`
        ctx.shadowBlur = 10
        ctx.shadowColor = '#ffcef6'
        ctx.fill()
      })

      animationFrameId = requestAnimationFrame(render)
    }

    render()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  const handleMouseMove = (e, index) => {
    const rect = e.currentTarget.getBoundingClientRect()
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    })
    setHoveredIndex(index)
  }

  return (
    <section
      id="gallery"
      className="section section-light stack-section"
      ref={sectionRef}
      style={{
        position: 'relative',
        backgroundColor: 'transparent',
        padding: '4rem 1.5rem',
        overflow: 'hidden',
        color: '#0d0d0d',
        minHeight: 'auto',
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          zIndex: 1,
        }}
      />

      <div
        style={{
          position: 'absolute',
          top: '0%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '70vw',
          height: '250px',
          background: 'radial-gradient(circle, rgba(255, 206, 246, 0.35) 0%, rgba(255,255,255,0) 70%)',
          pointerEvents: 'none',
          zIndex: 1,
        }}
      />

      <div
        style={{
          maxWidth: '1150px',
          margin: '0 auto',
          width: '100%',
          textAlign: 'center',
          position: 'relative',
          zIndex: 2,
        }}
      >
        <h2
          className="section-title section-reveal"
          style={{
            fontSize: 'clamp(2.2rem, 5vw, 3.5rem)',
            fontWeight: 300,
            lineHeight: 1.15,
            letterSpacing: '0.08em',
            margin: 0,
            fontFamily: "'Cormorant Garamond', serif",
            textTransform: 'uppercase',
            color: '#0d0d0d',
            textShadow: '0 0 15px rgba(255, 206, 246, 0.6)'
          }}
        >
          Nuestro Espacio
        </h2>

        <div
          className="section-divider section-reveal"
          style={{
            margin: '1.2rem auto 2.5rem',
            width: '50px',
            height: '1.5px',
            background: 'linear-gradient(90deg, transparent, #b36b8e, transparent)',
            boxShadow: '0 0 10px rgba(255, 206, 246, 0.8)',
          }}
        />

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1.5rem',
            alignItems: 'stretch'
          }}
        >
          {images.map((img, i) => {
            const isHovered = hoveredIndex === i
            const isFeatured = i === 0 || i === 3
            const cardHeight = isFeatured ? '440px' : '360px'

            return (
              <div
                key={i}
                className="section-reveal section-image-wrapper"
                onMouseMove={(e) => handleMouseMove(e, i)}
                onMouseLeave={() => setHoveredIndex(null)}
                style={{
                  transitionDelay: `${i * 0.1}s`,
                  position: 'relative',
                  borderRadius: '20px',
                  overflow: 'hidden',
                  background: 'rgba(255, 255, 255, 0.08)',
                  backdropFilter: 'blur(8px)',
                  WebkitBackdropFilter: 'blur(8px)',
                  border: '1.5px solid rgba(255, 206, 246, 0.5)',
                  boxShadow: isHovered
                    ? '0 20px 40px -10px rgba(255, 206, 246, 0.5), 0 0 25px rgba(255, 206, 246, 0.3)'
                    : '0 10px 30px rgba(0,0,0,0.04)',
                  transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
                  cursor: 'pointer',
                  height: cardHeight
                }}
              >
                {isHovered && (
                  <div
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      pointerEvents: 'none',
                      zIndex: 3,
                      background: `radial-gradient(350px circle at ${mousePos.x}px ${mousePos.y}px, rgba(255, 206, 246, 0.35), transparent 80%)`,
                    }}
                  />
                )}

                <div style={{ overflow: 'hidden', height: '100%', width: '100%' }}>
                  <img
                    src={img}
                    alt={`Espacio WR Cabina ${i + 1}`}
                    className="section-image"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      filter: isHovered ? 'brightness(1.05) contrast(1.02)' : 'brightness(0.96) contrast(0.98)',
                      transform: isHovered ? 'scale(1.06)' : 'scale(1)',
                      transition: 'transform 0.8s cubic-bezier(0.16, 1, 0.3, 1), filter 0.5s ease',
                    }}
                  />
                </div>

                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    border: '2px solid rgba(255, 206, 246, 0.9)',
                    borderRadius: '20px',
                    opacity: isHovered ? 1 : 0,
                    transition: 'opacity 0.4s ease',
                    pointerEvents: 'none',
                    zIndex: 4,
                  }}
                />
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default GallerySection;