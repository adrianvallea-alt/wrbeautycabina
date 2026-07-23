import React, { useState, useRef, useEffect, useCallback } from 'react';

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

const QUIZ_QUESTIONS = [
  {
    id: 'preocupacion',
    question: '¿Cuál es tu principal preocupación?',
    options: [
      { label: 'Manchas o tono desigual', value: 'manchas' },
      { label: 'Arrugas o flacidez', value: 'arrugas' },
      { label: 'Acné o brotes', value: 'acne' },
      { label: 'Piel opaca o cansada', value: 'opaca' },
      { label: 'Vello no deseado', value: 'vello' },
    ],
  },
  {
    id: 'resultado',
    question: '¿Qué tipo de resultado buscas?',
    options: [
      { label: 'Resultado inmediato (para un evento)', value: 'inmediato' },
      { label: 'Resultado progresivo y profundo', value: 'progresivo' },
      { label: 'Relajación y bienestar', value: 'relajacion' },
      { label: 'Limpieza profunda', value: 'limpieza' },
    ],
  },
  {
    id: 'tiempo',
    question: '¿Cuánto tiempo puedes invertir por sesión?',
    options: [
      { label: 'Menos de 30 minutos', value: 'corto' },
      { label: '30 a 60 minutos', value: 'medio' },
      { label: 'Más de 60 minutos', value: 'largo' },
    ],
  },
  {
    id: 'sensibilidad',
    question: '¿Tienes piel sensible?',
    options: [
      { label: 'Sí, es muy reactiva', value: 'sensible' },
      { label: 'No, es resistente', value: 'normal' },
    ],
  },
  {
    id: 'experiencia',
    question: '¿Has tenido tratamientos faciales antes?',
    options: [
      { label: 'Sí, con buenos resultados', value: 'experto' },
      { label: 'Sí, pero no me gustaron', value: 'malexperiencia' },
      { label: 'No, es mi primera vez', value: 'novato' },
    ],
  },
];

const getRecommendation = (answers) => {
  if (answers.preocupacion === 'vello') {
    return {
      title: 'Depilación Láser',
      description: 'Ideal para eliminar el vello no deseado de forma definitiva. Ofrecemos sesiones personalizadas para todo el cuerpo.',
      badge: 'Recomendado para ti',
      image: '/fotos/laser.jpg',
    };
  }

  if (answers.preocupacion === 'manchas') {
    if (answers.resultado === 'inmediato') {
      return {
        title: 'Hollywood Peel (Láser de Carbón)',
        description: 'Efecto "filtro de Instagram" al instante. Ideal para unificar el tono y devolver luminosidad sin tiempo de recuperación.',
        badge: 'Efecto Inmediato',
        image: '/fotos/hollywood.jpg',
      };
    } else {
      return {
        title: 'Facial Despigmentante',
        description: 'Aclara y unifica el tono de la piel, borrando manchas solares y marcas de acné con activos de alta gama.',
        badge: 'Tono Homogéneo',
        image: '/fotos/despig.jpg',
      };
    }
  }

  if (answers.preocupacion === 'arrugas') {
    if (answers.sensibilidad === 'sensible') {
      return {
        title: 'Facial Hidratante',
        description: 'Hidratación intensa con ácido hialurónico para rellenar líneas finas y devolver elasticidad, ideal para pieles sensibles.',
        badge: 'Nutrición Intensa',
        image: '/fotos/hidrata.jpg',
      };
    } else {
      return {
        title: 'Dermapen (Microneedling)',
        description: 'Regeneración profunda de colágeno y elastina. Atenúa arrugas, cicatrices y flacidez con resultados progresivos.',
        badge: 'Resultados Progresivos',
        image: '/fotos/dermapen.webp',
      };
    }
  }

  if (answers.preocupacion === 'acne') {
    if (answers.sensibilidad === 'sensible') {
      return {
        title: 'Fototerapia (Luz LED)',
        description: 'Tratamiento sin dolor que calma la inflamación, elimina bacterias y acelera la curación de brotes activos.',
        badge: 'Cero Dolor',
        image: '/fotos/fototer.jpg',
      };
    } else {
      return {
        title: 'Facial Control Acné',
        description: 'Tratamiento especializado con ácido salicílico y té verde para desinfectar, regular la grasa y prevenir brotes.',
        badge: 'Control & Calma',
        image: '/fotos/acne.webp',
      };
    }
  }

  if (answers.preocupacion === 'opaca') {
    if (answers.tiempo === 'corto') {
      return {
        title: 'Alta Frecuencia',
        description: 'Rápido y efectivo: oxigena, purifica y reactiva la circulación para un brillo saludable en menos de 30 min.',
        badge: 'Piel Purificada',
        image: '/fotos/frecu.jpg',
      };
    } else {
      return {
        title: 'Hidrafacial',
        description: 'Limpieza Vortex, exfoliación suave e hidratación profunda en un solo tratamiento de 45 minutos.',
        badge: 'Limpieza Vortex',
        image: 'Hydrafacial.jpg',
      };
    }
  }

  return {
    title: 'Consulta personalizada',
    description: 'Te recomendamos agendar una evaluación con nuestra experta para encontrar el tratamiento perfecto para ti.',
    badge: 'Recomendado',
    image: '/fotos/persona.jpg',
  };
};

const QuizSection = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResult, setShowResult] = useState(false);
  const [recommendation, setRecommendation] = useState(null);
  const sectionRef = useRef(null);
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
      { threshold: 0.15 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleSelect = (questionId, value) => {
    playClick(800);
    triggerHaptic();

    const newAnswers = { ...answers, [questionId]: value };
    setAnswers(newAnswers);

    if (currentStep === QUIZ_QUESTIONS.length - 1) {
      const rec = getRecommendation(newAnswers);
      setRecommendation(rec);
      setShowResult(true);
      playClick(950);
      triggerHaptic();
    } else {
      setTimeout(() => {
        setCurrentStep(currentStep + 1);
      }, 300);
    }
  };

  const handleReset = () => {
    playClick(600);
    triggerHaptic();
    setCurrentStep(0);
    setAnswers({});
    setShowResult(false);
    setRecommendation(null);
  };

  const handleWhatsApp = () => {
    const message = encodeURIComponent(
      `Hola WR Cabina, me interesa el tratamiento "${recommendation?.title}" que me recomendaron en el cuestionario. ¿Podrían darme más información?`
    );
    window.open(`https://wa.me/5214341036074?text=${message}`, '_blank');
    playClick(900);
    triggerHaptic();
  };

  return (
    <section
      id="quiz"
      ref={sectionRef}
      className="stack-section"
      style={{
        position: 'relative',
        padding: '4rem 1.5rem',
        backgroundColor: 'transparent',
        color: '#0d0d0d',
        overflow: 'hidden',
        fontFamily: "'Cormorant Garamond', serif",
        minHeight: 'auto',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: '20%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '80vw',
          height: '300px',
          background: 'radial-gradient(circle, rgba(255, 217, 239, 0.2) 0%, transparent 70%)',
          pointerEvents: 'none',
          zIndex: 1,
        }}
      />

      <div
        style={{
          maxWidth: '600px',
          width: '100%',
          position: 'relative',
          zIndex: 2,
        }}
      >
        <div
          className="section-reveal"
          style={{
            background: 'rgba(255, 255, 255, 0.15)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            borderRadius: '24px',
            border: '1px solid rgba(255, 217, 239, 0.6)',
            boxShadow: '0 0 30px rgba(255, 217, 239, 0.2)',
            padding: '1.5rem',
            transition: 'all 0.3s ease',
            marginBottom: '1.5rem',
            textAlign: 'center',
          }}
        >
          <h2
            style={{
              fontSize: 'clamp(1.4rem, 3vw, 2rem)',
              fontWeight: '400',
              marginBottom: '0.5rem',
              color: '#0d0d0d',
            }}
          >
            Encuentra tu tratamiento ideal
          </h2>
          <div
            style={{
              width: '50px',
              height: '1.5px',
              background: 'linear-gradient(90deg, transparent, #b36b8e, transparent)',
              margin: '0.5rem auto',
              boxShadow: '0 0 10px rgba(255, 206, 246, 0.8)',
            }}
          />
          <p
            style={{
              fontSize: '0.9rem',
              color: '#666666',
              fontStyle: 'italic',
              maxWidth: '400px',
              margin: '0 auto',
            }}
          >
            Responde 5 preguntas y descubre el tratamiento perfecto para ti
          </p>
        </div>

        <div
          className="section-reveal"
          style={{
            background: 'rgba(255, 255, 255, 0.15)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            borderRadius: '24px',
            border: '1px solid rgba(255, 217, 239, 0.6)',
            boxShadow: '0 0 30px rgba(255, 217, 239, 0.2)',
            padding: '1.5rem',
            transition: 'all 0.3s ease',
          }}
        >
          {!showResult ? (
            <>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginBottom: '1.5rem',
                  gap: '0.3rem',
                }}
              >
                {QUIZ_QUESTIONS.map((_, idx) => (
                  <div
                    key={idx}
                    style={{
                      flex: 1,
                      height: '4px',
                      borderRadius: '4px',
                      background: idx <= currentStep ? '#b36b8e' : 'rgba(0,0,0,0.1)',
                      transition: 'background 0.4s ease',
                      boxShadow: idx <= currentStep ? '0 0 10px rgba(255, 217, 239, 0.6)' : 'none',
                    }}
                  />
                ))}
              </div>

              <div
                style={{
                  fontSize: '0.7rem',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: '#b36b8e',
                  marginBottom: '0.5rem',
                  fontWeight: '600',
                }}
              >
                Paso {currentStep + 1} de {QUIZ_QUESTIONS.length}
              </div>

              <h3
                style={{
                  fontSize: 'clamp(1.2rem, 3vw, 1.6rem)',
                  fontWeight: '400',
                  marginBottom: '1.5rem',
                  lineHeight: 1.3,
                  color: '#0d0d0d',
                }}
              >
                {QUIZ_QUESTIONS[currentStep].question}
              </h3>

              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.8rem',
                }}
              >
                {QUIZ_QUESTIONS[currentStep].options.map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => handleSelect(QUIZ_QUESTIONS[currentStep].id, opt.value)}
                    style={{
                      padding: '0.9rem 1.2rem',
                      borderRadius: '16px',
                      border: '1px solid rgba(255, 217, 239, 0.5)',
                      background: 'transparent',
                      color: '#0d0d0d',
                      fontSize: '1rem',
                      fontFamily: "'Cormorant Garamond', serif",
                      textAlign: 'left',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      touchAction: 'manipulation',
                      boxShadow: '0 2px 10px rgba(0,0,0,0.02)',
                    }}
                    onTouchStart={(e) => {
                      e.currentTarget.style.transform = 'scale(0.97)';
                      e.currentTarget.style.background = 'rgba(255, 217, 239, 0.15)';
                    }}
                    onTouchEnd={(e) => {
                      e.currentTarget.style.transform = 'scale(1)';
                      e.currentTarget.style.background = 'transparent';
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = '#b36b8e';
                      e.currentTarget.style.boxShadow = '0 0 20px rgba(255, 217, 239, 0.3)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = 'rgba(255, 217, 239, 0.5)';
                      e.currentTarget.style.boxShadow = '0 2px 10px rgba(0,0,0,0.02)';
                    }}
                  >
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                      <span
                        style={{
                          width: '20px',
                          height: '20px',
                          borderRadius: '50%',
                          border: '2px solid rgba(255, 217, 239, 0.6)',
                          display: 'inline-flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0,
                        }}
                      >
                        <span
                          style={{
                            width: '8px',
                            height: '8px',
                            borderRadius: '50%',
                            background: 'transparent',
                            transition: 'background 0.2s ease',
                          }}
                          className="option-dot"
                        />
                      </span>
                      {opt.label}
                    </span>
                  </button>
                ))}
              </div>
            </>
          ) : (
            <>
              <div
                style={{
                  display: 'inline-block',
                  padding: '0.3rem 1.2rem',
                  borderRadius: '20px',
                  background: '#fff0f7',
                  border: '1px solid rgba(255, 217, 239, 0.8)',
                  color: '#b36b8e',
                  fontSize: '0.7rem',
                  letterSpacing: '0.16em',
                  textTransform: 'uppercase',
                  fontWeight: '600',
                  marginBottom: '1rem',
                  boxShadow: '0 0 15px rgba(255, 217, 239, 0.4)',
                }}
              >
                ✦ Tu tratamiento recomendado ✦
              </div>

              <div
                style={{
                  width: '100%',
                  height: '180px',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  marginBottom: '1.2rem',
                  border: '1px solid rgba(255, 217, 239, 0.4)',
                  boxShadow: '0 0 20px rgba(255, 217, 239, 0.2)',
                }}
              >
                <img
                  src={recommendation?.image}
                  alt={recommendation?.title}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                />
              </div>

              <h3
                style={{
                  fontSize: 'clamp(1.3rem, 3vw, 1.8rem)',
                  fontWeight: '500',
                  color: '#0d0d0d',
                  marginBottom: '0.5rem',
                }}
              >
                {recommendation?.title}
              </h3>

              <p
                style={{
                  fontSize: '0.95rem',
                  color: '#555555',
                  lineHeight: 1.6,
                  marginBottom: '1.5rem',
                }}
              >
                {recommendation?.description}
              </p>

              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.8rem',
                }}
              >
                <button
                  type="button"
                  className="cta-button"
                  onClick={handleWhatsApp}
                  style={{
                    width: '100%',
                    padding: '0.9rem',
                    fontSize: '0.85rem',
                    background: '#0d0d0d',
                    color: '#ffffff',
                    border: '1px solid rgba(255, 217, 239, 0.8)',
                    boxShadow: '0 0 25px rgba(255, 217, 239, 0.4)',
                    borderRadius: '30px',
                    cursor: 'pointer',
                    touchAction: 'manipulation',
                    transition: 'all 0.3s ease',
                  }}
                  onTouchStart={(e) => {
                    e.currentTarget.style.transform = 'scale(0.96)';
                  }}
                  onTouchEnd={(e) => {
                    e.currentTarget.style.transform = 'scale(1)';
                  }}
                >
                  <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.8rem' }}>
                    <span>💬</span>
                    Agendar por WhatsApp
                  </span>
                </button>

                <button
                  type="button"
                  onClick={handleReset}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    color: '#999999',
                    fontSize: '0.7rem',
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    cursor: 'pointer',
                    padding: '0.5rem',
                    touchAction: 'manipulation',
                    transition: 'color 0.3s ease',
                  }}
                  onTouchStart={(e) => {
                    e.currentTarget.style.color = '#b36b8e';
                  }}
                  onTouchEnd={(e) => {
                    e.currentTarget.style.color = '#999999';
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = '#b36b8e';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = '#999999';
                  }}
                >
                  ↻ Realizar otro test
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default QuizSection;