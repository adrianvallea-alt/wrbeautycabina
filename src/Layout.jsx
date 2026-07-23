import { useState, useEffect, useRef } from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import React from 'react'

const Layout = ({ children }) => {
  const [scrolled, setScrolled] = useState(false)
  const containerRef = useRef(null)

  // 1. Manejo del estado del Header al hacer scroll
  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const handleScroll = () => {
      setScrolled(container.scrollTop > 20)
    }

    container.addEventListener('scroll', handleScroll, { passive: true })
    return () => container.removeEventListener('scroll', handleScroll)
  }, [])

  // 2. Activador de Scroll Reveal con IntersectionObserver
  useEffect(() => {
    const observerOptions = {
      root: null, // Viewport de la pantalla
      rootMargin: '0px 0px -80px 0px', // Se activa 80px antes de llegar al borde inferior
      threshold: 0.1,
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
        }
      })
    }, observerOptions)

    // Observa todos los elementos con clases de animación
    const elements = document.querySelectorAll('.reveal, .reveal-scale, .reveal-fade')
    elements.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  return (
    <div className="layout-container">
      <div className="layout-wrapper" ref={containerRef}>
        <Header scrolled={scrolled} />
        <main className="page-content" style={{ display: 'flex', flexDirection: 'column' }}>
          {children}
        </main>
        <Footer />
      </div>
      <div className="frame" />
      <div className="vignette" />
      <div className="grain" />
      <div className="particles-container">
        <span className="p1"></span>
        <span className="p2"></span>
        <span className="p3"></span>
        <span className="p4"></span>
        <span className="p5"></span>
        <span className="p6"></span>
        <span className="p7"></span>
        <span className="p8"></span>
        <span className="p9"></span>
        <span className="p10"></span>
        <span className="p11"></span>
        <span className="p12"></span>
        <span className="p13"></span>
        <span className="p14"></span>
        <span className="p15"></span>
      </div>
    </div>
  )
}

export default Layout