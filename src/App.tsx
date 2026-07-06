import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import grayLogo from './assets/GRAY-AP.png'
import redLogo from './assets/RED-AP.png'
import './App.css'

export default function App() {
  const [activeColor, setActiveColor] = useState<'red' | 'gray'>('red');

  // Smoothly toggle the active color state every 3.5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveColor((prev) => (prev === 'red' ? 'gray' : 'red'));
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* Background elements */}
      <div className="ambient-bg">
        <div className="ambient-blob blob-red-1" />
        <div className="ambient-blob blob-red-2" />
        <div className="ambient-blob blob-gray" />
      </div>
      <div className="grid-overlay" />

      <div className="app-container">
        <div className="loading-wrapper">
          {/* Spinning Logo Showcase */}
          <div className="logo-container">
            {/* Dotted orbiting outer ring */}
            <div className="ring-orbit" />

            {/* Decorative Rings */}
            <svg className="svg-ring-container">
              <circle
                className="ring-track"
                cx="95"
                cy="95"
                r="80"
              />
              {/* Pulsing ring outline */}
              <motion.circle
                className="ring-track"
                cx="95"
                cy="95"
                r="80"
                style={{ fill: 'none', strokeWidth: 2, strokeLinecap: 'round' }}
                animate={{
                  stroke: activeColor === 'red' ? 'rgba(229, 46, 46, 0.4)' : 'rgba(163, 163, 194, 0.25)',
                  filter: activeColor === 'red' ? 'drop-shadow(0 0 4px rgba(229, 46, 46, 0.5))' : 'drop-shadow(0 0 4px rgba(163, 163, 194, 0.2))',
                }}
                transition={{ duration: 2.0, ease: 'easeInOut' }}
              />
            </svg>

            {/* Dynamic Background Glow behind the logos */}
            <motion.div
              className="logo-glow-aura"
              animate={{
                backgroundColor: activeColor === 'red' ? 'rgba(229, 46, 46, 0.35)' : 'rgba(163, 163, 194, 0.2)',
                boxShadow: activeColor === 'red' 
                  ? '0 0 60px 10px rgba(229, 46, 46, 0.3)' 
                  : '0 0 60px 10px rgba(163, 163, 194, 0.15)'
              }}
              transition={{ duration: 2.0, ease: 'easeInOut' }}
            />

            {/* Continuous Spinning Container */}
            <motion.div
              className="logo-spin-wrapper"
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 6.0, ease: 'linear' }}
            >
              {/* GRAY Logo (Base Layer - always fully visible) */}
              <img
                src={grayLogo}
                alt="GRAY AP Logo"
                className="logo-item"
                style={{ opacity: 1 }}
              />

              {/* RED Logo (Overlay Layer - opacity transitions smoothly to morph color) */}
              <motion.img
                src={redLogo}
                alt="RED AP Logo"
                className="logo-item"
                animate={{
                  opacity: activeColor === 'red' ? 1 : 0,
                }}
                transition={{ duration: 2.0, ease: 'easeInOut' }}
              />
            </motion.div>
          </div>

          {/* Catchphrase & Loading Wave */}
          <div className="catchphrase-container">
            <motion.p
              className="catchphrase-text"
              animate={{
                color: activeColor === 'red' ? '#ffffff' : '#a3a3c2',
                opacity: [0.5, 0.9, 0.5]
              }}
              transition={{
                color: { duration: 2.0, ease: 'easeInOut' },
                opacity: { duration: 3.0, repeat: Infinity, ease: 'easeInOut' }
              }}
            >
              Crafting Premium Digital Experiences
            </motion.p>
            
            <motion.div 
              className="loading-dots"
              animate={{
                color: activeColor === 'red' ? '#e52e2e' : '#a3a3c2'
              }}
              transition={{ duration: 2.0, ease: 'easeInOut' }}
            >
              <span>•</span>
              <span>•</span>
              <span>•</span>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  )
}
