import { motion } from 'framer-motion'
import './index.css'

export default function App() {
  return (
    <>
      {/* Background Lighting & Effects */}
      <div className="portfolio-bg">
        {/* Giant background text: NADUN (Opacity set to 0.55 for perfect contrast with PRAMUDITHA) */}
        <motion.div 
          className="bg-text"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.55 }}
          transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
        >
          NADUN
        </motion.div>
      </div>

      <div className="portfolio-container">
        {/* Top Header Section */}
        <motion.div 
          className="top-section"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.6 }}
        >
          <div className="soon-label">
            PORTFOLIO<br />
            HOME PAGE
          </div>
          <div className="brand-subtitle">PRAMUDITHA NADUN 2.0.</div>
        </motion.div>

        {/* Hero Section (Typography Layout) */}
        <div className="hero-section">
          {/* Foreground container */}
          <div className="fg-text-container">
            {/* White Text: PRAMUDITHA (Bebas Neue style) */}
            <motion.h1 
              className="fg-text"
              initial={{ opacity: 0, y: 40, scaleY: 1.4 }}
              animate={{ opacity: 1, y: 0, scaleY: 1.75 }}
              transition={{ duration: 1.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              PRAMUDITHA
            </motion.h1>

            {/* Cursive overlay: Soon */}
            <motion.span 
              className="cursive-text"
              initial={{ opacity: 0, scale: 0.7, rotate: -15 }}
              animate={{ opacity: 1, scale: 1, rotate: -7 }}
              transition={{ duration: 1.4, delay: 1.1, ease: [0.16, 1, 0.3, 1] }}
            >
              Soon
            </motion.span>
          </div>
        </div>

        {/* Bottom Section */}
        <motion.div 
          className="bottom-section"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.8 }}
        >
          <p className="description-text">
            PRAMUDITHA NADUN IS A DIGITAL ARTIST & CREATIVE DEVELOPER CRAFTING NEXT-GENERATION WEB EXPERIENCES.<br />
            COMBINING HIGH-END AESTHETICS WITH ROBUST CODE TO BUILD IMMERSIVE DIGITAL PRODUCTS.<br />
            AVAILABLE FOR CLIENT WORK, PARTNERSHIPS, AND CREATIVE COLLABORATIONS WORLDWIDE.
          </p>

          <div className="footer-links">
            <a 
              href="https://pramuditha.dev" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="footer-link"
            >
              PRAMUDITHA.DEV
            </a>
            <a 
              href="mailto:hello@pramuditha.dev" 
              className="footer-link"
            >
              HELLO@PRAMUDITHA.DEV
            </a>
          </div>
        </motion.div>
      </div>
    </>
  )
}
