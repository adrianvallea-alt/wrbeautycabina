import React, { useState, useRef, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';

const getImagePath = (path) => {
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  return `${import.meta.env.BASE_URL}${cleanPath}`;
};

export const SERVICES_DATA = [
  {
    id: 'hollywood-peel',
    title: 'Hollywood Peel (Láser de Carbón Activado)',
    quote: 'El secreto del efecto "filtro de Instagram" antes de tu evento importante.',
    badge: 'Efecto Inmediato',
    description: 'Se aplica una fina capa de mascarilla de carbón activado sobre el rostro que absorbe impurezas y grasa. Luego, se pasa un láser Nd:YAG que "explota" suavemente las partículas de carbón, pulverizando células muertas, limpiando poros y estimulando colágeno al instante sin dañar la piel.',
    benefits: 'Devuelve la luminosidad inmediata, cierra poros dilatados, equilibra la producción de grasa y unifica el tono sin tiempo de recuperación.',
    idealFor: [
      'Tienes un evento o boda a la puerta y quieres lucir radiante de inmediato.',
      'Sientes la piel opaca, cansada o con textura irregular.',
      'Buscas combatir poros abiertos y exceso de brillo facial.'
    ],
    image: getImagePath('fotos/hollywood.jpg')
  },
  {
    id: 'dermapen',
    title: 'Dermapen (Microneedling)',
    quote: 'Induce la regeneración natural de tu piel desde sus capas más profundas.',
    badge: 'Resultados Progresivos',
    description: 'Un dispositivo médico con microagujas ultrafinas crea miles de microcanales invisibles en la epidermis. Esto activa la respuesta de curación natural del cuerpo, disparando la producción masiva de colágeno y elastina mientras absorbe principios activos (como ácido hialurónico) hasta un 80% más.',
    benefits: 'Rellena líneas finas, atenúa cicatrices, firma tejidos flácidos y restaura la textura tersa y joven del rostro.',
    idealFor: [
      'Deseas atenuar cicatrices de acné o marcas antiguas.',
      'Buscas prevenir y corregir arrugas finas o flacidez inicial.',
      'Tienes poros dilatados o textura "de cáscara de naranja".'
    ],
    image: getImagePath('fotos/dermapen.webp')
  },
  {
    id: 'fototerapia',
    title: 'Fototerapia (Luz LED)',
    quote: 'La energía de la luz para sanar, rejuvenecer y calmar la piel sin dolor.',
    badge: 'Cero Dolor',
    description: 'Utiliza longitudes de onda de luz de baja intensidad (azul, roja, verde) para penetrar la piel a diferentes profundidades. Cada color estimula funciones celulares específicas: la luz roja repara y rejuvenece; la azul elimina bacterias del acné; la verde unifica la pigmentación.',
    benefits: 'Acelera la cicatrización, destruye la bacteria del acné, calma rojeces e inflamaciones y potencia los resultados de otros tratamientos.',
    idealFor: [
      'Padeces de acné activo o brotes recurrentes.',
      'Tienes piel sensible, con rosácea o fácilmente irritable.',
      'Buscas un tratamiento 100% relajante, no invasivo y sin agujas.'
    ],
    image: getImagePath('fotos/fototer.jpg')
  },
  {
    id: 'remocion-tatuajes',
    title: 'Remoción de Tatuajes con Láser',
    quote: 'Lienzo limpio: despídete del tinta del pasado con precisión de alta tecnología.',
    badge: 'Alta Tecnología',
    description: 'Emplea un láser de impulsos ultrasrápidos (Q-Switched) que fragmenta el pigmento de la tinta atrapado en la dermis en partículas diminutas. Luego, el propio sistema linfático del cuerpo procesa y elimina de forma natural estas partículas gradualmente.',
    benefits: 'Borra o atenúa sustancialmente tatuajes indeseados (negros o a color) y delineados permanentes antiguos, respetando la piel circundante.',
    idealFor: [
      'Quieres eliminar por completo un tatuaje del cual te arrepentiste.',
      'Buscas aclarar un tatuaje previo para hacer un cover-up impecable.',
      'Quieres corregir un procedimiento fallido de microblading o delineado.'
    ],
    image: getImagePath('fotos/tattoo.jpg')
  },
  {
    id: 'peeling-quimico',
    title: 'Peeling Químico',
    quote: 'Renovación celular profunda para revelar una piel fresca y uniforme.',
    badge: 'Renovación Profunda',
    description: 'Aplicación controlada de soluciones ácidas médicas (ácido glicólico, salicílico, mandélico, etc.) que exfolian suavemente las capas superiores dañadas de la dermis. Esto acelera el recambio celular para dar paso a una piel nueva, suave y saludable.',
    benefits: 'Elimina capas de células muertas, reduce manchas de sol o edad, mejora líneas de expresión y combate el acné de raíz.',
    idealFor: [
      'Presentas hiperpigmentación, melasma o manchas solares.',
      'Tu piel luce envejecida, con daño solar o tono desparejo.',
      'Tienes tendencia al acné o puntos negros rebeldes.'
    ],
    image: getImagePath('fotos/quimico.jpg')
  },
  {
    id: 'laser-pigmentaciones',
    title: 'Láser para Pigmentaciones',
    quote: 'Precisión avanzada para devolverle a tu piel un tono claro y juvenil.',
    badge: 'Precisión Avanzada',
    description: 'Un haz de luz de alta precisión busca y destruye específicamente los cúmulos de melanina (el pigmento oscuro) sin dañar los tejidos sanos alrededor. La mancha se oscurece temporalmente y luego se desprende o absorbe de forma natural.',
    benefits: 'Elimina manchas localizadas, léntigos solares, pecas rebeldes y marcas post-inflamatorias.',
    idealFor: [
      'Tienes manchas marcadas en cara, cuello, escote o manos causadas por el sol o la edad.',
      'Buscas eliminar hiper pigmentaciones específicas de forma rápida y efectiva.',
      'Quieres unificar el tono facial sin depender del maquillaje diario.'
    ],
    image: getImagePath('fotos/pigment.jpg')
  },
  {
    id: 'alta-frecuencia',
    title: 'Alta Frecuencia',
    quote: 'Acción bactericida y oxigenante para reconfortar y purificar tu piel.',
    badge: 'Piel Purificada',
    description: 'Emplea electrodos de vidrio que contienen gas (neón u argón) para generar una corriente de alta frecuencia. Al contacto con la piel, produce ozono, el cual posee potentes propiedades antisépticas, descongestivas y descongestionantes.',
    benefits: 'Cierra poros tras una limpieza, cauteriza granitos, reduce la inflamación, estimula la circulación y tonifica la piel.',
    idealFor: [
      'Acabas de realizarte una extracción o limpieza facial profunda.',
      'Tienes brotes puntuales de acné o piel propensa a infecciones.',
      'Sufres de piel congestionada, inflamada o con falta de vitalidad.'
    ],
    image: getImagePath('fotos/frecu.jpg')
  },
  {
    id: 'hidrafacial',
    title: 'Hidrafacial',
    quote: 'El tratamiento integral de 3 pasos: Limpia, extrae e hidrata con tecnología Vortex.',
    badge: 'Limpieza Vortex',
    description: 'Combina la succión por agua (tecnología Vortex) con la infusión de sueros nutritivos. En una sola sesión limpia profundamente, realiza un peeling suave, extrae impurezas de forma indolora e infunde antioxidantes, péptidos y ácido hialurónico.',
    benefits: 'Ofrece una limpieza extrema sin dolor ni enrojecimiento, aportando una hidratación profunda y un brillo saludable inmediato.',
    idealFor: [
      'Buscas una limpieza facial profunda pero le temes a los pellizcos/extracciones manuales.',
      'Tienes piel deshidratada, opaca o con poros obstruidos.',
      'Quieres un cuidado preventivo global apto para todo tipo de piel.'
    ],
    image: getImagePath('fotos/Hydrafacial.jpg')
  }
];

export const FACIALS_DATA = [
  {
    id: 'limpieza-profunda',
    title: 'Facial Limpieza Profunda',
    quote: 'Siente la ligereza de una piel completamente pura, libre de impurezas y toxinas.',
    badge: 'Higiene Purificante',
    description: 'Un protocolo higiénico completo que incluye vapor ozono para abrir poros, extracción minuciosa de puntos negros, exfoliación física y una mascarilla purificante adaptada a tu tipo de piel.',
    benefits: 'Desobstruye poros de raíz, elimina células muertas acumuladas y equilibra la producción de grasa para devolver el aliento natural a tu piel.',
    idealFor: [
      'Sientes la piel pesada, congestionada o con textura áspera.',
      'Notas acumulación de puntos negros en zona T (nariz, barbilla, frente).',
      'Buscas el mantenimiento básico esencial para cualquier rutina de cuidado facial.'
    ],
    image: getImagePath('fotos/profunda.webp')
  },
  {
    id: 'limpieza-dermaplaning',
    title: 'Facial Limpieza Profunda + Dermaplaning',
    quote: 'El dúo definitivo: limpieza profunda y suavidad efecto "porcelana" al instante.',
    badge: 'Efecto Porcelana',
    description: 'Combina la extracción profunda tradicional con el Dermaplaning, un bisturí médico esterilizado que se desliza suavemente sobre la piel para retirar el vello facial fino (durazno) y la capa más externa de piel muerta.',
    benefits: 'Deja el rostro con una tersura extrema, permite que tus productos de skincare penetren al 100% y logra un acabado de maquillaje perfectamente uniforme y sin grumos.',
    idealFor: [
      'Quieres eliminar el vello facial sutil y la opacidad en una sola sesión.',
      'Buscas un lienzo impecable para que el maquillaje se adhiera de forma profesional.',
      'Deseas una exfoliación física superior sin irritar la piel.'
    ],
    image: getImagePath('fotos/fderma.jpg')
  },
  {
    id: 'control-acne',
    title: 'Facial Control Acné',
    quote: 'Calma la inflamación, combate la bacteria y recupera la tranquilidad de tu piel.',
    badge: 'Control & Calma',
    description: 'Un tratamiento especializado que utiliza principios activos antisépticos y seborreguladores (como ácido salicílico y té verde) junto a aparatología descongestiva para desinfectar brotes activos sin dejar cicatrices.',
    benefits: 'Reduce la inflamación roja, regula el exceso de sebo, mata la bacteria del acné y acelera la cicatrización de imperfecciones existentes.',
    idealFor: [
      'Tienes brotes frecuentes, espinillas o acné inflamatorio.',
      'Sufres de exceso de brillo y poros tapados a lo largo del día.',
      'Quieres frenar los brotes sin recurrir a productos agresivos que resequen tu rostro.'
    ],
    image: getImagePath('fotos/acne.webp')
  },
  {
    id: 'despigmentante',
    title: 'Facial Despigmentante',
    quote: 'Aclara, unifica y borra las huellas que el sol y el tiempo dejaron en tu rostro.',
    badge: 'Tono Homogéneo',
    description: 'Un coctel de activos aclarantes de alta gama (como vitamina C, ácido kójico y arbutina) combinado con exfoliantes enzimáticos que inhiben la producción excesiva de melanina en las zonas manchadas.',
    benefits: 'Reduce visiblemente la intensidad de manchas oscuras, aporta luminosidad homogénea y previene la aparición de nuevas pigmentaciones.',
    idealFor: [
      'Tienes manchas solares, melasma o paño.',
      'Te quedaron marcas oscuras o pigmentadas tras brotes de acné pasados.',
      'Sientes que el tono de tu rostro se ve desigual o deslucido.'
    ],
    image: getImagePath('fotos/despig.jpg')
  },
  {
    id: 'hidratante',
    title: 'Facial Hidratante',
    quote: 'Un baño de frescura y nutrición intensa para devolverle la elasticidad a tu piel.',
    badge: 'Nutrición Intensa',
    description: 'Una infusión concentrada de ácido hialurónico multi-molecular, ceramidas y mascarillas hidroplásticas que sellan la humedad en las capas más profundas de la epidermis.',
    benefits: 'Restaura la barrera cutánea, alisa líneas de expresión causadas por la resequedad y devuelve el aspecto "plump" (relleno y elástico) a la cara.',
    idealFor: [
      'Sientes la piel tirante, descamada o áspera al tacto.',
      'Estuviste expuesta al sol, al frío extremo o a viajes recientes.',
      'Buscas prevenir el envejecimiento prematuro manteniendo la hidratación óptima.'
    ],
    image: getImagePath('fotos/hidrata.jpg')
  },
  {
    id: 'desintoxicacion',
    title: 'Desintoxicación Facial',
    quote: 'Libera tu rostro de la contaminación urbana y el estrés digital.',
    badge: 'Protección Anti-Polución',
    description: 'Tratamiento con mascarillas de arcilla, carbón y agentes antioxidantes que actúan como "imanes" para atrapar toxinas, metales pesados y radicales libres generados por la polución y la luz azul de las pantallas.',
    benefits: 'Oxigena los tejidos, reduce el aspecto grisáceo de la piel fatigada y estimula la microcirculación celular.',
    idealFor: [
      'Vives en la ciudad y estás expuesta diariamente a contaminación y smog.',
      'Pasas muchas horas frente a computadoras o teléfonos móviles.',
      'Notas tu rostro asfixiado, opaco y falto de vitalidad.'
    ],
    image: getImagePath('fotos/detox.jpg')
  },
  {
    id: 'drenaje-linfatico',
    title: 'Facial de Drenaje Linfático',
    quote: 'Desinflama, esculpe y activa la juventud natural de tu rostro.',
    badge: 'Efecto Desinflamante',
    description: 'Un masaje suave, rítmico y preciso siguiendo las vías linfáticas del rostro y cuello, diseñado para canalizar y eliminar el exceso de líquidos retenidos y toxinas.',
    benefits: 'Reduce visiblemente la hinchazón, atenúa bolsas en los ojos, perfila el contorno facial y activa la circulación para un brillo saludable natural.',
    idealFor: [
      'Sueles amanecer con el rostro o la zona de los ojos hinchados.',
      'Te realizaste algún procedimiento estético reciente y buscas reducir la inflamación.',
      'Quieres definir tus facciones y relajar la tensión acumulada.'
    ],
    image: getImagePath('fotos/linfati.jpg')
  },
  {
    id: 'relajante',
    title: 'Facial Relajante',
    quote: 'Un pausa de bienestar donde tu piel se renueva mientras tu mente descansa.',
    badge: 'Bienestar & Spa',
    description: 'Una experiencia sensorial que combina limpieza suave, aromaterapia, mascarillas nutritivas y un masaje extendido en rostro, cuello, escote y trapecios.',
    benefits: 'Libera la tensión muscular acumulada por el estrés, mejora el flujo sanguíneo y devuelve un rubor fresco y relajado a tu piel.',
    idealFor: [
      'Buscas despejarte del estrés diario en un ambiente de spa.',
      'Sientes tensión acumulada en la mandíbula o el cuello.',
      'Quieres consentir tu piel sin someterla a extracciones o ácidos intensos.'
    ],
    image: getImagePath('fotos/relax.jpg')
  }
];

export const LASER_ZONES = [
  {
    id: 'rostro',
    name: 'Rostro',
    subtitle: 'Patillas, Bozo, Mentón',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="10" r="7"/>
        <path d="M12 17v4M9 21h6"/>
      </svg>
    ),
    quote: 'Un rostro despejado, radiante y suave al tacto las 24 horas del día.',
    pain: 'Leve a moderado (1/5). Pequeños chispazos tibios e instantáneos.',
    duration: '10 a 15 minutos.',
    protocol: 'Mínimo 10 sesiones (intervalos de 3 a 4 semanas).',
    benefit: 'Elimina el vello hormonal o fino, previene manchas por cera o pinzas y logra un acabado de maquillaje perfectamente liso.'
  },
  {
    id: 'axilas',
    name: 'Axilas',
    subtitle: 'Zona Axilar Completa',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 3a9 9 0 0 0-9 9v7a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7a9 9 0 0 0-9-9z"/>
        <path d="M12 3v18"/>
      </svg>
    ),
    quote: 'Piel clara, uniforme y libre de vello encarnado. Dile adiós a las sombras oscuras.',
    pain: 'Moderado bajo (2/5). Rápida sensación de calor superficial.',
    duration: '10 a 15 minutos.',
    protocol: 'Mínimo 10 sesiones (intervalos de 4 a 6 semanas).',
    benefit: 'Aclara la zona al eliminar la sombra del rasurado diario y desaparece los pelos encarnados (foliculitis) desde las primeras sesiones.'
  },
  {
    id: 'brazos',
    name: 'Brazos',
    subtitle: 'Completos o Medios',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 4l3 8-2 8"/>
        <path d="M18 4l-3 8 2 8"/>
      </svg>
    ),
    quote: 'Brazos estilizados, tersos y con un tono visiblemente más homogéneo.',
    pain: 'Muy bajo (1/5). Sensación tibia muy llevadera.',
    duration: '20 a 30 minutos.',
    protocol: 'Mínimo 10 sesiones (intervalos de 6 semanas).',
    benefit: 'Elimina la densidad del vello sin alterar la textura de la piel, dándole a tus brazos un aspecto limpio y delicado.'
  },
  {
    id: 'bikini',
    name: 'Bikini',
    subtitle: 'Línea, Italiano o Completo',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 6h16l-8 12L4 6z"/>
      </svg>
    ),
    quote: 'Seguridad y máxima comodidad con cualquier prenda, bikini o lencería.',
    pain: 'Moderado (3/5). Impulsos breves de calor. (Sistemas de enfriamiento en el cabezal reducen la molestia hasta un 60%).',
    duration: '15 a 25 minutos.',
    protocol: 'Mínimo 10 sesiones (intervalos de 6 semanas).',
    benefit: 'Elimina la irritación por rozamiento o rasurado y otorga total libertad sin preocuparte por retoques de último minuto.'
  },
  {
    id: 'piernas',
    name: 'Piernas',
    subtitle: 'Completas o Media Pierna',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 3v18M15 3v18"/>
      </svg>
    ),
    quote: 'Piernas sedosas, pulidas y listas para lucir en cualquier temporada.',
    pain: 'Bajo (1.5/5). Sensación similar a un masaje tibio.',
    duration: '35 a 45 minutos.',
    protocol: 'Mínimo 10 sesiones (intervalos de 6 a 8 semanas).',
    benefit: 'Elimina el efecto "piel de fresa" (poros oscuros o inflamados) y ahorra años de esfuerzo en depilaciones tradicionales.'
  }
];

export const LASER_FAQS = [
  {
    question: '¿Por qué son necesarias mínimo 10 sesiones?',
    answer: 'El pelo crece en 3 fases. El láser solo destruye el folículo cuando está en fase activa (anágena). En cada sesión se elimina entre el 10% y el 15% del vello activo; por ello, se requiere un ciclo constante para cauterizar cada folículo progresivamente.'
  },
  {
    question: '¿Es 100% definitivo?',
    answer: 'Elimina hasta un 90% - 95% del vello en la zona tratada. El porcentaje restante que pudiera brotar con los años lo hace de forma extremadamente fina, lenta e imperceptible. Un retoque anual suele ser suficiente para mantener el resultado de por vida.'
  },
  {
    question: '¿Cómo debo ir preparada a mi cita?',
    answer: 'Debes acudir con la zona rasurada con rastrillo/cuchilla 24 horas antes. No debes arrancar el vello de raíz (con cera o pinzas) al menos 15 días antes, ni aplicar cremas, desodorantes o aceites el día de la sesión.'
  },
  {
    question: '¿Sirve para corregir la piel irritada o los pelos encarnados?',
    answer: 'Es el tratamiento número uno recomendado por dermatólogos para la foliculitis. Al cauterizar el folículo, el pelo deja de enterrarse y la piel se recupera completamente.'
  },
  {
    question: '¿Afecta la piel o los órganos internos?',
    answer: 'No. La luz del láser únicamente penetra unos milímetros en la dermis hasta encontrar la melanina del folículo piloso. No emite radiaciones profundas ni afecta tejidos circundantes.'
  }
];

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

const CarouselTrack = ({ items, onCardClick }) => {
  const scrollRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const { playClick, triggerHaptic } = useAudioFeedback();

  const updateProgress = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const maxScroll = el.scrollWidth - el.clientWidth;
    const current = el.scrollLeft;
    const progress = maxScroll > 0 ? (current / maxScroll) * 100 : 0;
    setScrollProgress(progress);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener('scroll', updateProgress);
    updateProgress();
    return () => el.removeEventListener('scroll', updateProgress);
  }, [updateProgress]);

  const handleTouchStart = (e) => {
    const touch = e.touches[0];
    setStartX(touch.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
    setIsDragging(true);
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    const touch = e.touches[0];
    const x = touch.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 1.2;
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  const handleCardMove = (e, cardRef) => {
    if (!cardRef) return;
    const rect = cardRef.getBoundingClientRect();
    const clientX = e.clientX || (e.touches && e.touches[0].clientX);
    const clientY = e.clientY || (e.touches && e.touches[0].clientY);
    if (clientX === undefined) return;

    const x = (clientX - rect.left) / rect.width - 0.5;
    const y = (clientY - rect.top) / rect.height - 0.5;
    cardRef.style.transform = `rotateX(${y * -8}deg) rotateY(${x * 8}deg) scale(1.02)`;
  };

  const handleCardLeave = (cardRef) => {
    if (cardRef) {
      cardRef.style.transform = 'rotateX(0deg) rotateY(0deg) scale(1)';
    }
  };

  return (
    <div className="services-carousel-wrapper" style={{ position: 'relative' }}>
      <div
        ref={scrollRef}
        className="services-track"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        style={{
          display: 'flex',
          gap: '1.2rem',
          overflowX: 'auto',
          scrollSnapType: 'x mandatory',
          scrollBehavior: 'smooth',
          padding: '0.5rem 1.25rem 0.8rem 1.25rem',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          cursor: isDragging ? 'grabbing' : 'grab',
        }}
      >
        {items.map((item, index) => {
          const cardRef = useRef(null);

          return (
            <article
              key={item.id || index}
              ref={cardRef}
              className="service-card carousel-card section-reveal"
              style={{
                scrollSnapAlign: 'start',
                flexShrink: 0,
                transformStyle: 'preserve-3d',
                transition: 'transform 0.2s ease',
                willChange: 'transform',
              }}
              onMouseMove={(e) => handleCardMove(e, cardRef.current)}
              onMouseLeave={() => handleCardLeave(cardRef.current)}
              onTouchMove={(e) => handleCardMove(e, cardRef.current)}
              onTouchEnd={() => handleCardLeave(cardRef.current)}
              onClick={() => {
                playClick(850);
                triggerHaptic();
                onCardClick(item);
              }}
            >
              <div className="card-number-tag">
                {String(index + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')}
              </div>

              <div className="service-card-img-wrapper">
                <img
                  src={item.image || item.img}
                  alt={item.title}
                  className="service-card-img"
                  loading="lazy"
                />
                <div className="service-card-img-overlay"></div>
              </div>

              <div className="service-card-body" style={{ marginTop: '0.8rem', textAlign: 'left' }}>
                {item.badge && (
                  <div className="card-badge-wrapper">
                    <span className="service-badge-pill">{item.badge}</span>
                  </div>
                )}

                <h3 className="service-card-title">{item.title}</h3>

                <p className="service-card-quote">"{item.quote}"</p>

                <button
                  type="button"
                  className="service-explore-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    playClick(700);
                    triggerHaptic();
                    onCardClick(item);
                  }}
                >
                  <span>Descubrir ritual</span>
                  <span>→</span>
                </button>
              </div>
            </article>
          );
        })}
      </div>

      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '0.5rem',
          marginTop: '0.5rem',
        }}
      >
        {items.map((_, idx) => {
          const isActive = Math.round(scrollProgress / (100 / (items.length - 1))) === idx;
          return (
            <span
              key={idx}
              style={{
                width: isActive ? '24px' : '8px',
                height: '4px',
                borderRadius: '4px',
                background: isActive ? 'var(--accent)' : 'rgba(0,0,0,0.2)',
                transition: 'all 0.3s ease',
                boxShadow: isActive ? '0 0 12px rgba(255, 217, 239, 0.8)' : 'none',
              }}
            />
          );
        })}
      </div>
    </div>
  );
};

export const ServicesSection = ({ services, facials }) => {
  const servicesList = services?.length > 0 ? services : SERVICES_DATA;
  const facialsList = facials?.length > 0 ? facials : FACIALS_DATA;

  const [selectedItem, setSelectedItem] = useState(null);
  const [activeTab, setActiveTab] = useState('detalle');
  const [selectedLaserZone, setSelectedLaserZone] = useState(null);
  const [showFaqSection, setShowFaqSection] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  const { playClick, triggerHaptic } = useAudioFeedback();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
          }
        });
      },
      { threshold: 0.15 }
    );

    document.querySelectorAll('.section-reveal').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const handleOpenModal = (item) => {
    setSelectedItem(item);
    setActiveTab('detalle');
    playClick(900);
    triggerHaptic();
  };

  const handleCloseModal = (e) => {
    if (e) e.stopPropagation();
    setSelectedItem(null);
    playClick(600);
    triggerHaptic();
  };

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
    playClick(700);
    triggerHaptic();
  };

  const [touchStartY, setTouchStartY] = useState(0);
  const handleModalTouchStart = (e) => {
    setTouchStartY(e.touches[0].clientY);
  };
  const handleModalTouchMove = (e) => {
    const deltaY = e.touches[0].clientY - touchStartY;
    if (deltaY > 80) {
      handleCloseModal(e);
    }
  };

  const overlayFixedStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    backgroundColor: 'rgba(0, 0, 0, 0.65)',
    backdropFilter: 'blur(5px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 999999,
    padding: '1rem',
    boxSizing: 'border-box',
  };

  const contentFixedStyle = {
    maxHeight: '85vh',
    overflowY: 'auto',
    margin: 'auto',
    width: '100%',
  };

  return (
    <section id="services" className="stack-section" style={{ background: 'transparent' }}>
      <div className="catalog-container" style={{
        background: 'transparent',
        color: '#111111',
        padding: '2rem 1rem',
        fontFamily: "'Cormorant Garamond', serif",
        width: '100%',
        maxWidth: '100%',
      }}>
        {/* ====== ESPECIALIDADES ====== */}
        <section className="services-section">
          <header className="services-header section-reveal">
            <h2 className="services-title">Nuestros Servicios</h2>
            <div className="section-divider"></div>
          </header>
          <CarouselTrack items={servicesList} onCardClick={handleOpenModal} />
        </section>

        {/* ====== FACIALES ====== */}
        <section className="services-section facials-section">
          <header className="services-header section-reveal">
            <h2 className="services-title">Nuestros Faciales</h2>
            <div className="section-divider"></div>
          </header>
          <CarouselTrack items={facialsList} onCardClick={handleOpenModal} />
        </section>

        {/* ====== DEPILACIÓN LÁSER ====== */}
        <section
          className="laser-section"
          style={{
            margin: '3rem auto',
            maxWidth: '750px',
            textAlign: 'center',
          }}
        >
          <header className="services-header section-reveal">
            <h2 className="services-title">Depilación Láser</h2>
            <p
              style={{
                fontStyle: 'italic',
                color: '#555555',
                maxWidth: '580px',
                margin: '0.5rem auto 1.5rem auto',
                fontSize: '0.95rem',
                lineHeight: '1.5',
              }}
            >
              Selecciona una zona para consultar detalles, protocolo recomendado y disponibilidad.
            </p>
            <div className="section-divider"></div>
          </header>

          <div
            className="section-reveal"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
              gap: '0.8rem',
              margin: '0 auto 2rem auto',
              maxWidth: '650px',
            }}
          >
            {LASER_ZONES.map((zone) => (
              <button
                key={zone.id}
                type="button"
                className="laser-zone-btn"
                onClick={() => {
                  setSelectedLaserZone(zone);
                  playClick(850);
                  triggerHaptic();
                }}
                style={{
                  background: '#ffffff',
                  border: '1px solid rgba(179, 107, 142, 0.25)',
                  borderRadius: '16px',
                  padding: '1rem 0.6rem',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 4px 15px rgba(255, 217, 239, 0.2)',
                  color: '#111111',
                  touchAction: 'manipulation',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#b36b8e';
                  e.currentTarget.style.transform = 'translateY(-3px)';
                  e.currentTarget.style.boxShadow = '0 8px 20px rgba(255, 217, 239, 0.5)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(179, 107, 142, 0.25)';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 15px rgba(255, 217, 239, 0.2)';
                }}
                onTouchStart={(e) => {
                  e.currentTarget.style.transform = 'scale(0.95)';
                }}
                onTouchEnd={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                }}
              >
                <div
                  style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '50%',
                    background: '#fff0f7',
                    color: '#b36b8e',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {zone.icon}
                </div>
                <span style={{ fontSize: '0.95rem', fontWeight: '500', letterSpacing: '0.5px' }}>
                  {zone.name}
                </span>
                <span style={{ fontSize: '0.7rem', color: '#888888', fontWeight: '300' }}>
                  Ver detalle →
                </span>
              </button>
            ))}
          </div>

          <div style={{ maxWidth: '650px', margin: '0 auto', textAlign: 'left' }}>
            <button
              type="button"
              className="section-reveal"
              onClick={() => {
                setShowFaqSection(!showFaqSection);
                playClick(700);
                triggerHaptic();
              }}
              style={{
                width: '100%',
                padding: '1rem 1.2rem',
                background: '#fff0f7',
                border: '1px solid #f2cbe0',
                borderRadius: '12px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                cursor: 'pointer',
                color: '#111111',
                fontSize: '0.95rem',
                fontWeight: '600',
                letterSpacing: '0.5px',
                touchAction: 'manipulation',
              }}
            >
              <span>💡 Preguntas Frecuentes sobre Depilación Láser</span>
              <span style={{ color: '#b36b8e', fontSize: '1.2rem' }}>
                {showFaqSection ? '▲' : '▼'}
              </span>
            </button>

            {showFaqSection && (
              <div
                className="section-reveal"
                style={{
                  marginTop: '0.8rem',
                  padding: '0.5rem',
                  background: '#faf6f8',
                  borderRadius: '12px',
                  border: '1px solid #f0e0ea',
                }}
              >
                {LASER_FAQS.map((faq, index) => (
                  <div
                    key={index}
                    style={{
                      marginBottom: '0.5rem',
                      borderBottom: index !== LASER_FAQS.length - 1 ? '1px solid #e8d8e2' : 'none',
                      paddingBottom: '0.5rem',
                    }}
                  >
                    <button
                      type="button"
                      onClick={() => toggleFaq(index)}
                      style={{
                        width: '100%',
                        padding: '0.8rem 0.5rem',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        background: 'transparent',
                        border: 'none',
                        color: '#222222',
                        fontSize: '0.9rem',
                        fontWeight: '500',
                        textAlign: 'left',
                        cursor: 'pointer',
                        touchAction: 'manipulation',
                      }}
                    >
                      <span>{faq.question}</span>
                      <span style={{ fontSize: '1.1rem', color: '#b36b8e', marginLeft: '0.5rem' }}>
                        {openFaq === index ? '−' : '+'}
                      </span>
                    </button>

                    {openFaq === index && (
                      <div
                        style={{
                          padding: '0 0.5rem 0.8rem 0.5rem',
                          fontSize: '0.85rem',
                          color: '#555555',
                          lineHeight: '1.5',
                        }}
                      >
                        {faq.answer}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {selectedLaserZone && typeof document !== 'undefined' && createPortal(
          <div
            className="service-modal-overlay"
            style={overlayFixedStyle}
            onClick={() => {
              setSelectedLaserZone(null);
              playClick(600);
              triggerHaptic();
            }}
            onTouchStart={handleModalTouchStart}
            onTouchMove={handleModalTouchMove}
          >
            <div
              className="service-modal-content"
              onClick={(e) => e.stopPropagation()}
              style={{ ...contentFixedStyle, maxWidth: '520px' }}
            >
              <button
                type="button"
                className="modal-close-btn"
                onClick={() => {
                  setSelectedLaserZone(null);
                  playClick(600);
                  triggerHaptic();
                }}
                aria-label="Cerrar"
              >
                ✕
              </button>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '0.8rem' }}>
                <div
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    background: '#fff0f7',
                    color: '#b36b8e',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {selectedLaserZone.icon}
                </div>
                <div>
                  <span
                    className="editorial-badge"
                    style={{ color: '#b36b8e', fontWeight: '600', display: 'block', margin: 0 }}
                  >
                    Depilación Láser
                  </span>
                  <h3 className="modal-title" style={{ margin: 0, fontSize: '1.5rem' }}>
                    {selectedLaserZone.name}
                  </h3>
                </div>
              </div>

              <p style={{ fontStyle: 'italic', color: '#555555', margin: '0 0 1.2rem 0', fontSize: '0.95rem' }}>
                "{selectedLaserZone.quote}"
              </p>

              <hr style={{ border: 'none', borderTop: '1px solid #f0e6eb', margin: '1rem 0' }} />

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem', textAlign: 'left' }}>
                <div>
                  <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '1px', color: '#b36b8e', display: 'block', fontWeight: '600' }}>
                    Sensación de dolor
                  </span>
                  <p style={{ margin: '0.2rem 0', fontSize: '0.9rem', color: '#222222' }}>
                    {selectedLaserZone.pain}
                  </p>
                </div>
                <div>
                  <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '1px', color: '#b36b8e', display: 'block', fontWeight: '600' }}>
                    Duración por sesión
                  </span>
                  <p style={{ margin: '0.2rem 0', fontSize: '0.9rem', color: '#222222' }}>
                    {selectedLaserZone.duration}
                  </p>
                </div>
                <div style={{ gridColumn: '1 / -1' }}>
                  <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '1px', color: '#b36b8e', display: 'block', fontWeight: '600' }}>
                    Protocolo recomendado
                  </span>
                  <p style={{ margin: '0.2rem 0', fontSize: '0.9rem', color: '#222222' }}>
                    {selectedLaserZone.protocol}
                  </p>
                </div>
                <div style={{ gridColumn: '1 / -1' }}>
                  <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '1px', color: '#b36b8e', display: 'block', fontWeight: '600' }}>
                    Beneficio clave
                  </span>
                  <p style={{ margin: '0.2rem 0', fontSize: '0.9rem', color: '#222222', lineHeight: '1.4' }}>
                    {selectedLaserZone.benefit}
                  </p>
                </div>
              </div>

              <div className="modal-footer" style={{ marginTop: '1.5rem', paddingTop: '1rem' }}>
                <button
                  type="button"
                  className="cta-button"
                  style={{ width: '100%' }}
                  onClick={() => {
                    const msg = encodeURIComponent(
                      `Hola WR Cabina, deseo agendar cita para: Depilación Láser en ${selectedLaserZone.name} me ayudas?`
                    );
                    window.open(`https://wa.me/5214341036074?text=${msg}`, '_blank');
                    playClick(850);
                    triggerHaptic();
                  }}
                >
                  Agendar sesión en {selectedLaserZone.name}
                </button>
              </div>
            </div>
          </div>,
          document.body
        )}

        {selectedItem && typeof document !== 'undefined' && createPortal(
          <div
            className="service-modal-overlay"
            style={overlayFixedStyle}
            onClick={handleCloseModal}
            onTouchStart={handleModalTouchStart}
            onTouchMove={handleModalTouchMove}
          >
            <div
              className="service-modal-content"
              style={contentFixedStyle}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                className="modal-close-btn"
                onClick={handleCloseModal}
                aria-label="Cerrar"
              >
                ✕
              </button>

              <div className="modal-image-banner">
                <img src={selectedItem.image || selectedItem.img} alt={selectedItem.title} />
                <div className="modal-image-overlay"></div>
              </div>

              <span className="editorial-badge" style={{ color: '#b36b8e', fontWeight: '600' }}>
                Experiencia WR Beauty
              </span>
              <h3 className="modal-title">{selectedItem.title}</h3>

              {selectedItem.quote && <p className="modal-quote">"{selectedItem.quote}"</p>}

              <div className="modal-tabs">
                <button
                  type="button"
                  className={`tab-btn ${activeTab === 'detalle' ? 'active' : ''}`}
                  onClick={() => {
                    setActiveTab('detalle');
                    playClick(700);
                    triggerHaptic();
                  }}
                >
                  ¿En qué consiste?
                </button>
                {selectedItem.idealFor && (
                  <button
                    type="button"
                    className={`tab-btn ${activeTab === 'ideal' ? 'active' : ''}`}
                    onClick={() => {
                      setActiveTab('ideal');
                      playClick(700);
                      triggerHaptic();
                    }}
                  >
                    Ideal para ti si...
                  </button>
                )}
              </div>

              <div className="modal-tab-body">
                {activeTab === 'detalle' && (
                  <div className="modal-text-fade">
                    <p style={{ margin: '0 0 0.8rem 0' }}>
                      <strong>¿En qué consiste?:</strong> {selectedItem.description}
                    </p>
                    {selectedItem.benefits && (
                      <p style={{ margin: 0 }}>
                        <strong>¿Para qué sirve?:</strong> {selectedItem.benefits}
                      </p>
                    )}
                  </div>
                )}

                {activeTab === 'ideal' && selectedItem.idealFor && (
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                    {selectedItem.idealFor.map((item, i) => (
                      <li
                        key={i}
                        style={{
                          fontSize: '0.88rem',
                          color: '#333333',
                          marginBottom: '0.6rem',
                          lineHeight: '1.4',
                          display: 'flex',
                          gap: '0.5rem',
                        }}
                      >
                        <span style={{ color: '#b36b8e' }}>✨</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <div className="modal-footer">
                <span className="micro-security">
                  ✦ Procedimiento no invasivo • Evaluación personalizada previa
                </span>
                <button
                  type="button"
                  className="cta-button"
                  style={{ width: '100%' }}
                  onClick={() => {
                    const msg = encodeURIComponent(
                      `Hola WR Cabina, deseo agendar cita para: ${selectedItem.title} me ayudas?`
                    );
                    window.open(`https://wa.me/5214341036074?text=${msg}`, '_blank');
                    playClick(850);
                    triggerHaptic();
                  }}
                >
                  Quiero una piel radiante
                </button>
              </div>
            </div>
          </div>,
          document.body
        )}
      </div>
    </section>
  );
};

export default ServicesSection;