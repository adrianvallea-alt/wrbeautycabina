import React, { useState, useEffect, useRef } from 'react'

const Home = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  // Hook para animación al scroll (usando Intersection Observer)
  const sectionsRef = useRef([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('section-visible')
          }
        })
      },
      { threshold: 0.15, rootMargin: '0px 0px -50px 0px' }
    )

    sectionsRef.current.forEach((el) => {
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <div className="home-wrapper relative z-10">
      {/* HEADER FIJO */}
      <header className="fixed top-4 left-4 right-4 z-40 bg-white/80 backdrop-blur-md border border-black/10 shadow-sm px-4 py-3 flex items-center justify-between rounded-sm">
        <div className="flex items-center">
          <img src="/logo.png" alt="Logo" className="h-6 w-auto object-contain" />
        </div>

        <div className="hidden md:block text-center">
          <span className="text-[10px] tracking-[0.3em] uppercase font-light text-black/60">
            “Tú mejor versión empieza aquí”
          </span>
        </div>

        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="flex flex-col justify-center items-end gap-[5px] p-1 group"
          aria-label="Abrir menú"
        >
          <span className={`h-[1.5px] bg-black transition-all duration-300 ${isMenuOpen ? 'w-5 rotate-45 translate-y-[6px]' : 'w-5'}`}></span>
          <span className={`h-[1.5px] bg-black transition-all duration-300 ${isMenuOpen ? 'opacity-0 w-5' : 'w-5'}`}></span>
          <span className={`h-[1.5px] bg-black transition-all duration-300 ${isMenuOpen ? 'w-5 -rotate-45 -translate-y-[6px]' : 'w-5'}`}></span>
        </button>
      </header>

      {/* MENÚ OVERLAY */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-white/98 z-50 flex flex-col justify-center items-center p-6">
          <button
            onClick={() => setIsMenuOpen(false)}
            className="absolute top-6 right-6 text-xs uppercase tracking-[0.2em] text-black/60 hover:text-black transition-colors"
          >
            Cerrar ✕
          </button>
          <nav className="flex flex-col gap-8 text-center">
            <a href="#seccion1" onClick={() => setIsMenuOpen(false)} className="text-3xl font-light uppercase tracking-[0.15em] hover:tracking-[0.3em] transition-all duration-300">
              Inicio
            </a>
            <a href="#seccion2" onClick={() => setIsMenuOpen(false)} className="text-3xl font-light uppercase tracking-[0.15em] hover:tracking-[0.3em] transition-all duration-300">
              Servicios
            </a>
            <a href="#seccion3" onClick={() => setIsMenuOpen(false)} className="text-3xl font-light uppercase tracking-[0.15em] hover:tracking-[0.3em] transition-all duration-300">
              Nosotros
            </a>
            <a href="#seccion4" onClick={() => setIsMenuOpen(false)} className="text-3xl font-light uppercase tracking-[0.15em] hover:tracking-[0.3em] transition-all duration-300">
              Contacto
            </a>
          </nav>
        </div>
      )}

      {/* CONTENIDO PRINCIPAL: SECCIONES APILADAS CON ANIMACIÓN */}
      <main className="pt-28 pb-16 px-6 max-w-4xl mx-auto">
        {/* Sección 1: Hero */}
        <section
          ref={(el) => (sectionsRef.current[0] = el)}
          className="section-item min-h-[70vh] flex flex-col justify-center items-center text-center opacity-0 translate-y-10 transition-all duration-700"
        >
          <span className="text-[11px] uppercase tracking-[0.35em] text-black/40 font-light mb-4">
            Bienvenido a tu espacio de belleza
          </span>
          <h1 className="font-['Playfair_Display'] text-4xl md:text-5xl lg:text-6xl font-light leading-[1.1] tracking-wide mb-6">
            La Elegancia<br />
            <span className="italic font-thin text-black/60">en su máxima expresión</span>
          </h1>
          <p className="text-sm md:text-base text-black/60 font-light max-w-2xl leading-relaxed tracking-wide">
            Descubre una experiencia diseñada minuciosamente para resaltar la belleza singular
            y la sofisticación contemporánea. Cada detalle está pensado para ti.
          </p>
          <div className="mt-10">
            <button className="cta-button !text-xs !py-3 !px-10">
              Descubrir más
            </button>
          </div>
        </section>

        {/* Sección 2: Servicios */}
        <section
          ref={(el) => (sectionsRef.current[1] = el)}
          className="section-item min-h-[60vh] flex flex-col justify-center items-center text-center opacity-0 translate-y-10 transition-all duration-700 delay-100"
        >
          <h2 className="font-['Playfair_Display'] text-3xl md:text-4xl font-light tracking-wide mb-8">
            Nuestros Servicios
          </h2>
          <div className="grid md:grid-cols-2 gap-8 w-full max-w-3xl">
            <div className="border border-black/10 p-6 hover:shadow-lg transition-all duration-300 hover:border-black/30">
              <span className="text-[10px] tracking-[0.25em] uppercase text-black/30 block mb-2">Tratamientos</span>
              <h3 className="font-['Playfair_Display'] text-xl font-light mb-2">Facial de Lujo</h3>
              <p className="text-xs text-black/50 leading-relaxed">Restauración biológica con activos premium.</p>
            </div>
            <div className="border border-black/10 p-6 hover:shadow-lg transition-all duration-300 hover:border-black/30">
              <span className="text-[10px] tracking-[0.25em] uppercase text-black/30 block mb-2">Experiencias</span>
              <h3 className="font-['Playfair_Display'] text-xl font-light mb-2">Ritual de Armonía</h3>
              <p className="text-xs text-black/50 leading-relaxed">Sesiones personalizadas de bienestar.</p>
            </div>
          </div>
        </section>

        {/* Sección 3: Nosotros */}
        <section
          ref={(el) => (sectionsRef.current[2] = el)}
          className="section-item min-h-[60vh] flex flex-col justify-center items-center text-center opacity-0 translate-y-10 transition-all duration-700 delay-200"
        >
          <h2 className="font-['Playfair_Display'] text-3xl md:text-4xl font-light tracking-wide mb-4">
            Sobre Nosotros
          </h2>
          <p className="text-sm text-black/60 max-w-2xl leading-relaxed">
            Somos un espacio dedicado a la belleza y el bienestar, donde la tradición se encuentra con la innovación.
            Cada experiencia está cuidadosamente diseñada para que te sientas único.
          </p>
        </section>

        {/* Sección 4: Contacto */}
        <section
          ref={(el) => (sectionsRef.current[3] = el)}
          className="section-item min-h-[60vh] flex flex-col justify-center items-center text-center opacity-0 translate-y-10 transition-all duration-700 delay-300"
        >
          <h2 className="font-['Playfair_Display'] text-3xl md:text-4xl font-light tracking-wide mb-4">
            Contacto
          </h2>
          <p className="text-sm text-black/60 max-w-2xl leading-relaxed mb-6">
            ¿Listo para comenzar tu transformación? Escríbenos y te responderemos a la brevedad.
          </p>
          <button className="cta-button !text-xs !py-3 !px-10">
            Enviar mensaje
          </button>
        </section>
      </main>

      {/* FOOTER FIJO */}
      <footer className="border-t border-black/5 py-6 px-4 text-center bg-white/80 backdrop-blur-sm">
        <span className="text-[9px] tracking-[0.3em] uppercase text-black/30 font-light">
          © 2026 — Todos los derechos reservados.
        </span>
      </footer>
    </div>
  )
}

export default Home