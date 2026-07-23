import { useState } from 'react'
import Splash from './Splash'
import Layout from './Layout'
import AboutSection from './components/AboutSection'
import { ServicesSection } from './components/ServicesSection';
import GallerySection from './components/GallerySection'
import QuizSection from './components/QuizSection';
import ContactSection from './components/ContactSection'

function App() {
  const [showSplash, setShowSplash] = useState(true)

  return (
    <>
      {showSplash ? (
        <Splash onEnter={() => setShowSplash(false)} />
      ) : (
       <Layout>
  <AboutSection />
  <div className="editorial-divider" />
  <ServicesSection />
  <div className="editorial-divider" />
  <GallerySection />
  <div className="editorial-divider" />
  <QuizSection />
  <div className="editorial-divider" />
  <ContactSection />
</Layout>
      )}
    </>
  )
}

export default App