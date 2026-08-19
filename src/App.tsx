import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import './index.css'

export default function App() {
  const [page, setPage] = useState<'home' | 'logic' | 'aesthetics'>('home')

  const section2Ref = useRef<HTMLDivElement>(null)
  const fromSubpageRef = useRef<boolean>(false)

  // Helper function to handle navigation & URL updates
  const navigateTo = (newPage: 'home' | 'logic' | 'aesthetics') => {
    if (newPage === 'home' && page !== 'home') {
      fromSubpageRef.current = true
    }
    setPage(newPage)
    const path = newPage === 'home' ? '/' : `/${newPage}`
    window.history.pushState({ page: newPage }, '', path)
  }

  // Sync state with browser URLs & history popstates (Back/Forward buttons)
  useEffect(() => {
    const handlePopState = (event: PopStateEvent) => {
      const statePage = event.state?.page
      if (statePage) {
        if (statePage === 'home' && page !== 'home') {
          fromSubpageRef.current = true
        }
        setPage(statePage)
      } else {
        // Fallback checks
        const path = window.location.pathname
        if (path === '/logic') setPage('logic')
        else if (path === '/aesthetics') setPage('aesthetics')
        else {
          if (page !== 'home') fromSubpageRef.current = true
          setPage('home')
        }
      }
    }

    window.addEventListener('popstate', handlePopState)

    // Initial check on page load / refresh
    const initialPath = window.location.pathname
    if (initialPath === '/logic') {
      setPage('logic')
    } else if (initialPath === '/aesthetics') {
      setPage('aesthetics')
    } else {
      setPage('home')
    }

    return () => window.removeEventListener('popstate', handlePopState)
  }, [page])

  // Scroll back to Section 2 instantly if returning from a subpage
  useEffect(() => {
    if (page === 'home' && fromSubpageRef.current) {
      setTimeout(() => {
        section2Ref.current?.scrollIntoView({ block: 'start', behavior: 'auto' })
        fromSubpageRef.current = false // Reset trigger
      }, 0)
    }
  }, [page])

  // --- SUBPAGE RENDERING: LOGIC & SYSTEMS ---
  if (page === 'logic') {
    return (
      <div className="subpage-container logic-subpage">
        {/* Subpage Header */}
        <div className="top-header-row">
          <div className="stacked-logo">
            <span>PR</span>
            <span>NA</span>
          </div>
          <button className="theme-toggle-btn" onClick={() => navigateTo('home')}>
            Back to Portals
          </button>
        </div>

        {/* Subpage Intro */}
        <h1 className="subpage-title">Logic & Systems</h1>
        <p className="subpage-subtitle">Systems Architecture & Interactive Code</p>

        {/* Work Grid */}
        <div className="work-grid">
          <div className="work-card">
            <div>
              <div className="work-item-meta">01 / Fullstack Development</div>
              <h3 className="work-item-title">Real-Time Ecosystems</h3>
              <p className="work-item-desc">
                Architecting high-concurrency web services, API layers, and web socket feeds using Node.js, TypeScript, and Docker container grids.
              </p>
            </div>
            <span className="work-item-tag">Node.js / TS</span>
          </div>

          <div className="work-card">
            <div>
              <div className="work-item-meta">02 / Interactive Graphics</div>
              <h3 className="work-item-title">Web 3D Shader Engines</h3>
              <p className="work-item-desc">
                Building custom graphics engines, GLSL shader routines, and fluid simulation screens directly within browser runtimes.
              </p>
            </div>
            <span className="work-item-tag">WebGL / Three.js</span>
          </div>

          <div className="work-card">
            <div>
              <div className="work-item-meta">03 / Tooling & Performance</div>
              <h3 className="work-item-title">Vite & Build Tooling</h3>
              <p className="work-item-desc">
                Creating optimized bundler configs, custom hot-reloading hooks, and client environment packages to speed up builds.
              </p>
            </div>
            <span className="work-item-tag">Vite / AST</span>
          </div>
        </div>
      </div>
    )
  }

  // --- SUBPAGE RENDERING: AESTHETICS & MOTION ---
  if (page === 'aesthetics') {
    return (
      <div className="subpage-container aesthetics-subpage">
        {/* Subpage Header */}
        <div className="top-header-row">
          <div className="stacked-logo">
            <span>PR</span>
            <span>NA</span>
          </div>
          <button className="theme-toggle-btn" onClick={() => navigateTo('home')}>
            Back to Portals
          </button>
        </div>

        {/* Subpage Intro */}
        <h1 className="subpage-title">Aesthetics & Motion</h1>
        <p className="subpage-subtitle">Graphic Design & Cinematography</p>

        {/* Work Grid */}
        <div className="work-grid">
          <div className="work-card">
            <div>
              <div className="work-item-meta">01 / Brand Identity</div>
              <h3 className="work-item-title">Typographic Layouts</h3>
              <p className="work-item-desc">
                Shaping minimalist design frameworks, poster schemes, custom type identities, and vector palettes for brands.
              </p>
            </div>
            <span className="work-item-tag">Figma / Adobe</span>
          </div>

          <div className="work-card">
            <div>
              <div className="work-item-meta">02 / Video Production</div>
              <h3 className="work-item-title">Cinematic Motion Reels</h3>
              <p className="work-item-desc">
                Editing editorial promos, typography animations, and color grading reels to present dynamic products.
              </p>
            </div>
            <span className="work-item-tag">Premiere / After Effects</span>
          </div>

          <div className="work-card">
            <div>
              <div className="work-item-meta">03 / Visual Systems</div>
              <h3 className="work-item-title">Interactive Art Canvas</h3>
              <p className="work-item-desc">
                Generating procedural patterns, 3D abstract compositions, and loop animations that blur art with code.
              </p>
            </div>
            <span className="work-item-tag">Generative / 3D</span>
          </div>
        </div>
      </div>
    )
  }

  // --- MAIN LAYOUT (HOME & PORTAL SCROLLsnap) ---
  return (
    <div className="scroll-container">
      {/* SECTION 1: HOME PAGE (Always Dark Cinematic Theme) */}
      <section className="scroll-section">
        {/* Section 1 Background */}
        <div className="portfolio-bg">
          {/* Giant background text: NADUN */}
          <motion.div 
            className="bg-text"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.55 }}
            transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
          >
            NADUN
          </motion.div>
        </div>

        {/* Section 1 Content */}
        <div className="portfolio-container">
          {/* Top Header */}
          <motion.div 
            className="top-section"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.6 }}
          >
            <div className="brand-subtitle">Developer | Designer</div>
          </motion.div>

          {/* Hero Section */}
          <div className="hero-section">
            <div className="fg-text-container">
              {/* White Text: PRAMUDITHA */}
              <motion.h1 
                className="fg-text"
                initial={{ opacity: 0, y: 40, scaleY: 1.4 }}
                animate={{ opacity: 1, y: 0, scaleY: 1.75 }}
                transition={{ duration: 1.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              >
                PRAMUDITHA
              </motion.h1>
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
              PRAMUDITHA NADUN IS A DIGITAL ARTIST & CREATIVE DEVELOPER CRAFTING NEXT-GENERATION WEB EXPERIENCES. COMBINING HIGH-END AESTHETICS WITH ROBUST CODE TO BUILD IMMERSIVE DIGITAL PRODUCTS. AVAILABLE FOR CLIENT WORK, PARTNERSHIPS, AND CREATIVE COLLABORATIONS WORLDWIDE.
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
      </section>

      {/* SECTION 2: PORTALS (Horizontal Split Screen Layout - Light Clay Beige Theme) */}
      <section 
        ref={section2Ref}
        className="scroll-section split-scroll-section light-theme"
      >
        {/* Section 2 Background */}
        <div className="portfolio-bg" />

        {/* Top Half: Logic & Systems */}
        <div 
          className="split-half top-half"
          onClick={() => navigateTo('logic')}
        >
          <div className="split-title-wrapper">
            <motion.h2 
              className="split-half-title"
              initial={{ opacity: 0, y: -40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            >
              Logic & Systems
            </motion.h2>
            <svg 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2.5" 
              strokeLinecap="round" 
              strokeLinejoin="round"
              className="arrow-indicator"
            >
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
              <polyline points="15 3 21 3 21 9" />
              <line x1="10" y1="14" x2="21" y2="3" />
            </svg>
          </div>
        </div>

        {/* Bottom Half: Aesthetics & Motion */}
        <div 
          className="split-half bottom-half"
          onClick={() => navigateTo('aesthetics')}
        >
          <div className="split-title-wrapper">
            <motion.h2 
              className="split-half-title"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            >
              Aesthetics & Motion
            </motion.h2>
            <svg 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2.5" 
              strokeLinecap="round" 
              strokeLinejoin="round"
              className="arrow-indicator"
            >
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
              <polyline points="15 3 21 3 21 9" />
              <line x1="10" y1="14" x2="21" y2="3" />
            </svg>
          </div>
        </div>
      </section>
    </div>
  )
}
