import React, { useEffect, useRef, useCallback } from 'react';

const useAudioFeedback = () => {
  const audioCtxRef = useRef(null);

  const playClick = useCallback((freq = 800) => {
    try {
      if (!audioCtxRef.current) {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        audioCtxRef.current = new AudioContext();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') ctx.resume();

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(220, ctx.currentTime + 0.02);

      gain.gain.setValueAtTime(0.008, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.02);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.02);
    } catch {}
  }, []);

  const triggerHaptic = useCallback(() => {
    if ('vibrate' in navigator) {
      try { navigator.vibrate(10); } catch {}
    }
  }, []);

  return { playClick, triggerHaptic };
};

const ContactSection = () => {
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);
  const { playClick, triggerHaptic } = useAudioFeedback();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.querySelectorAll('.section-reveal').forEach((el) => {
            el.classList.add('revealed');
          });
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const particles = Array.from({ length: 20 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 2 + 1.5,
      alpha: Math.random() * 0.25 + 0.15,
      speedX: (Math.random() - 0.5) * 0.2,
      speedY: -Math.random() * 0.25 - 0.05,
    }));

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        p.x += p.speedX;
        p.y += p.speedY;

        if (p.y < 0) p.y = canvas.height;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 217, 239, ${p.alpha})`;
        ctx.shadowBlur = 8;
        ctx.shadowColor = 'rgba(255, 217, 239, 0.3)';
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const whatsappNumber = '5214341036074';
  const whatsappMessage = encodeURIComponent('Hola WR Cabina, necesito más información.');
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  const plusCode = 'G97M+RXW Pátzcuaro, Michoacán';
  const mapsEmbedUrl = `https://maps.google.com/maps?q=${encodeURIComponent(plusCode)}&t=&z=16&ie=UTF8&iwloc=&output=embed`;
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(plusCode)}`;

  const handleMapClick = (e) => {
    e.preventDefault();
    playClick(850);
    triggerHaptic();
    window.open(directionsUrl, '_blank');
  };

  const handleWhatsAppClick = () => {
    playClick(900);
    triggerHaptic();
  };

  return (
    <section
      id="contact"
      className="stack-section"
      ref={sectionRef}
      style={{
        position: 'relative',
        padding: '4rem 1.5rem',
        backgroundColor: 'transparent',
        color: '#0d0d0d',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: 'auto',
        overflow: 'hidden',
        width: '100%',
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
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '80vw',
          height: '60vh',
          background: 'radial-gradient(circle, rgba(255, 217, 239, 0.15) 0%, transparent 70%)',
          pointerEvents: 'none',
          zIndex: 1,
        }}
      />

      <div
        className="section-reveal"
        style={{
          maxWidth: '680px',
          width: '100%',
          textAlign: 'center',
          border: '1.5px solid rgba(255, 217, 239, 0.6)',
          borderRadius: '24px',
          padding: '1.5rem',
          background: 'rgba(255, 255, 255, 0.12)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          boxShadow: '0 0 35px rgba(255, 217, 239, 0.25), 0 15px 40px rgba(0, 0, 0, 0.03)',
          position: 'relative',
          zIndex: 2,
        }}
      >
        <h2
          className="section-title section-reveal"
          style={{
            color: '#0d0d0d',
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 'clamp(1.8rem, 5vw, 2.5rem)',
            fontWeight: '300',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            margin: '0 0 0.5rem',
            textShadow: '0 0 15px rgba(255, 217, 239, 0.8)',
          }}
        >
          Ubicación
        </h2>

        <div
          className="section-divider section-reveal"
          style={{
            width: '40px',
            height: '1px',
            background: '#0d0d0d',
            margin: '0.5rem auto 1.5rem',
            boxShadow: '0 0 14px rgba(255, 217, 239, 1)',
          }}
        />

        <div
          className="section-reveal"
          style={{
            position: 'relative',
            width: '100%',
            height: '280px',
            borderRadius: '18px',
            overflow: 'hidden',
            border: '1.5px solid rgba(255, 217, 239, 0.8)',
            boxShadow: '0 0 25px rgba(255, 217, 239, 0.35)',
            marginBottom: '1.5rem',
            cursor: 'pointer',
          }}
        >
          <iframe
            title="Ubicación WR Cabina"
            src={mapsEmbedUrl}
            width="100%"
            height="100%"
            style={{ border: 0, pointerEvents: 'none' }}
            loading="lazy"
          />

          <button
            type="button"
            onClick={handleMapClick}
            style={{
              position: 'absolute',
              inset: 0,
              zIndex: 5,
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'center',
              paddingBottom: '1rem',
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              width: '100%',
              height: '100%',
            }}
            aria-label="Abrir ubicación en Google Maps"
          >
            <span
              style={{
                backgroundColor: 'rgba(13, 13, 13, 0.82)',
                color: '#ffffff',
                padding: '0.45rem 1.2rem',
                borderRadius: '20px',
                fontSize: 'clamp(0.55rem, 1.8vw, 0.68rem)',
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                backdropFilter: 'blur(6px)',
                WebkitBackdropFilter: 'blur(6px)',
                border: '1px solid rgba(255, 217, 239, 0.6)',
                boxShadow: '0 0 18px rgba(0, 0, 0, 0.3)',
              }}
            >
              ¿Cómo llegar? →
            </span>
          </button>
        </div>

        <div className="section-reveal">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="cta-button"
            onClick={handleWhatsAppClick}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '100%',
              maxWidth: '340px',
              padding: '0.9rem 1.8rem',
              borderRadius: '30px',
              backgroundColor: '#0d0d0d',
              color: '#ffffff',
              border: '1px solid rgba(255, 217, 239, 0.8)',
              textDecoration: 'none',
              textTransform: 'uppercase',
              fontSize: 'clamp(0.65rem, 1.8vw, 0.78rem)',
              letterSpacing: '0.22em',
              boxShadow: '0 0 20px rgba(255, 217, 239, 0.5)',
              transition: 'all 0.35s ease',
              touchAction: 'manipulation',
            }}
          >
            <span>💬</span>
            <span style={{ marginLeft: '0.5rem' }}>Agendar por WhatsApp</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;