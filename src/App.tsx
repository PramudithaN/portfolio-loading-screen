import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import grayLogo from './assets/GRAY-AP.png'
import redLogo from './assets/RED-AP.png'
import './App.css'

export default function App() {
  const [activeColor, setActiveColor] = useState<'red' | 'gray'>('red')
  const [statusMessage, setStatusMessage] = useState<string>('Waking up the server, hang tight...')

  // Resolve the target Render URL
  const getRenderUrl = () => {
    const params = new URLSearchParams(window.location.search)
    const targetParam = params.get('render') || params.get('target') || params.get('to')
    if (targetParam) {
      try {
        new URL(targetParam)
        return targetParam.replace(/\/$/, '') // Remove trailing slash
      } catch (e) {
        console.error('Invalid target URL from query parameter', e)
      }
    }
    
    const envUrl = import.meta.env.VITE_RENDER_URL
    if (envUrl) {
      return envUrl.replace(/\/$/, '')
    }

    // Default fallback for Pramuditha Nadun's portfolio on Render
    return 'https://pramuditha-is-a-dev.onrender.com'
  }

  const RENDER_URL = getRenderUrl()

  // Smoothly toggle the active color state every 3.5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveColor((prev) => (prev === 'red' ? 'gray' : 'red'))
    }, 3500)
    return () => clearInterval(interval)
  }, [])

  // Poll the Render server health endpoint
  useEffect(() => {
    // 1. Check if we can skip the loading screen (if server was recently verified awake)
    const awakeAtStr = localStorage.getItem('render_awake_at')
    if (awakeAtStr) {
      const awakeAt = parseInt(awakeAtStr, 10)
      const tenMinutes = 10 * 60 * 1000 // 10 minutes session cache
      if (Date.now() - awakeAt < tenMinutes) {
        try {
          const targetUrlObj = new URL(RENDER_URL)
          const currentUrlObj = new URL(window.location.href)
          
          targetUrlObj.pathname = currentUrlObj.pathname
          
          const searchParams = new URLSearchParams(currentUrlObj.search)
          searchParams.delete('render')
          searchParams.delete('target')
          searchParams.delete('to')
          
          const searchStr = searchParams.toString()
          targetUrlObj.search = searchStr ? `?${searchStr}` : ''
          
          // Use replace to prevent back-button loops
          window.location.replace(targetUrlObj.toString())
          return
        } catch (e) {
          console.error('Error in instant redirect bypass:', e)
        }
      }
    }

    const POLL_INTERVAL_MS = 2500
    const MAX_WAIT_MS = 90000 // 90 seconds timeout
    const startTime = Date.now()
    let timeoutId: any

    const checkHealth = async () => {
      try {
        // Cache bust the request to make sure we don't get cached 502/504 errors from CDN
        const checkUrl = `${RENDER_URL}/health?cb=${Date.now()}`
        const response = await fetch(checkUrl, {
          method: 'GET',
          cache: 'no-store',
          headers: {
            'Accept': 'application/json'
          }
        })

        if (response.ok) {
          const contentType = response.headers.get('content-type')
          if (contentType && contentType.includes('application/json')) {
            const data = await response.json()
            if (data && data.status === 'ok') {
              setStatusMessage('Ready! Redirecting...')
              
              // Save wake-up timestamp to localStorage (so next load within 10m is instant)
              localStorage.setItem('render_awake_at', Date.now().toString())
              
              // Construct the final redirection URL:
              // Keep the original pathname and query parameters (minus our special bypass query parameters)
              const targetUrlObj = new URL(RENDER_URL)
              const currentUrlObj = new URL(window.location.href)
              
              // Copy pathname (e.g., /projects, /developer, or /)
              targetUrlObj.pathname = currentUrlObj.pathname
              
              // Copy search parameters but remove 'render', 'target', 'to', and our cache-buster
              const searchParams = new URLSearchParams(currentUrlObj.search)
              searchParams.delete('render')
              searchParams.delete('target')
              searchParams.delete('to')
              
              const searchStr = searchParams.toString()
              targetUrlObj.search = searchStr ? `?${searchStr}` : ''
              
              // Redirect to the awake Render app (using replace so back-button works normally)
              window.location.replace(targetUrlObj.toString())
              return
            }
          }
        }
      } catch (error) {
        console.error('Render wake-up check failed:', error)
      }

      // Check if we timed out or have taken longer than expected
      const elapsed = Date.now() - startTime
      if (elapsed > MAX_WAIT_MS) {
        setStatusMessage('Taking longer than expected. Retrying...')
      } else if (elapsed > 45000) {
        setStatusMessage('Render is still spinning up, please wait...')
      }

      // Schedule next poll
      timeoutId = setTimeout(checkHealth, POLL_INTERVAL_MS)
    }

    checkHealth()

    return () => {
      if (timeoutId) clearTimeout(timeoutId)
    }
  }, [RENDER_URL])

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
            <svg className="svg-ring-container" viewBox="0 0 190 190">
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

            <motion.p
              className="status-text"
              animate={{
                color: activeColor === 'red' ? '#e52e2e' : '#a3a3c2'
              }}
              transition={{ duration: 2.0, ease: 'easeInOut' }}
            >
              {statusMessage}
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

