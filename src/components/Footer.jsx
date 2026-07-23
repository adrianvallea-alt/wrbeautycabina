import React from 'react';

const Footer = () => {
  const whatsappNumber = '5214341036074';
  const whatsappMessage = encodeURIComponent('Hola WR Cabina, necesito más información.');
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;
  const instagramUrl = 'https://www.instagram.com/wrbeautycabina/';

  return (
    <footer
      className="stack-section"
      style={{
        position: 'relative',
        backgroundColor: '#000000',
        color: '#ffffff',
        padding: '1rem 1rem',
        borderTop: '1px solid rgba(255, 206, 246, 0.25)',
        boxShadow: '0 -10px 25px rgba(255, 206, 246, 0.08)',
        overflow: 'hidden',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: 'auto', // ← sin altura fija, se ajusta al contenido
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '50vw',
          height: '80px',
          background: 'radial-gradient(circle, rgba(255, 206, 246, 0.15) 0%, rgba(0,0,0,0) 70%)',
          pointerEvents: 'none',
          zIndex: 1,
        }}
      />

      <div
        style={{
          maxWidth: '500px',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.6rem',
          textAlign: 'center',
          position: 'relative',
          zIndex: 2,
          width: '100%',
        }}
      >
        {/* Logo añadido */}
        <img
          src="/logobco.png"
          alt="WR Beauty Cabina"
          style={{
            height: '50px',
            width: 'auto',
            objectFit: 'contain',
            filter: 'drop-shadow(0 0 12px rgba(255, 206, 246, 0.6))',
          }}
        />

        <h3
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: '1.1rem',
            fontWeight: '300',
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            margin: 0,
            color: '#ffffff',
            textShadow: '0 0 12px rgba(255, 206, 246, 0.6)',
          }}
        >
          WR Beauty Cabina
        </h3>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '1rem',
          }}
        >
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: 'rgba(255, 255, 255, 0.75)',
              textDecoration: 'none',
              fontSize: '0.7rem',
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              fontWeight: '400',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={(e) => {
              e.target.style.color = '#ffcef6';
              e.target.style.textShadow = '0 0 10px rgba(255, 206, 246, 0.8)';
            }}
            onMouseLeave={(e) => {
              e.target.style.color = 'rgba(255, 255, 255, 0.75)';
              e.target.style.textShadow = 'none';
            }}
          >
            +52 434 103 6074
          </a>

          <span style={{ color: 'rgba(255, 206, 246, 0.4)', fontSize: '0.6rem' }}>•</span>

          <a
            href={instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram WR Beauty Cabina"
            style={{
              color: 'rgba(255, 255, 255, 0.75)',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = '#ffcef6';
              e.currentTarget.style.filter = 'drop-shadow(0 0 8px rgba(255, 206, 246, 0.9))';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = 'rgba(255, 255, 255, 0.75)';
              e.currentTarget.style.filter = 'none';
            }}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;