import { useRef, useState } from 'react'
import { Icon } from '@iconify/react'

interface ShowcaseReel {
  id: string
  title: string
  year: string
  duration: string
  rating: string
  role: string
  tags: string[]
  description: string
  thumbnail: string
  videoUrl: string
}

// Mock reels using public sample video/image sources — swap with real work later.
const designReels: ShowcaseReel[] = [
  {
    id: 'design-01',
    title: 'Chromatic Bloom',
    year: '2024',
    duration: '1 MIN 12 SEC',
    rating: '9.1',
    role: 'Brand Identity / Motion',
    tags: ['Branding', 'Typography', 'Motion'],
    description: 'A generative brand reveal built from a modular type system, blending kinetic typography with layered color washes.',
    thumbnail: 'https://picsum.photos/seed/design01/900/1600',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
  },
  {
    id: 'design-02',
    title: 'Grid & Glass',
    year: '2024',
    duration: '0 MIN 48 SEC',
    rating: '8.7',
    role: 'Poster Series / Layout',
    tags: ['Poster', 'Layout', 'Print'],
    description: 'Minimalist poster series exploring negative space, grid discipline and glassmorphic texture overlays.',
    thumbnail: 'https://picsum.photos/seed/design02/900/1600',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
  },
  {
    id: 'design-03',
    title: 'Vector Palette',
    year: '2023',
    duration: '1 MIN 05 SEC',
    rating: '8.4',
    role: 'Visual System / Illustration',
    tags: ['Illustration', 'Vector', 'Palette'],
    description: 'A procedurally generated illustration set built around a restrained five-color palette and repeating vector motifs.',
    thumbnail: 'https://picsum.photos/seed/design03/900/1600',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
  },
  {
    id: 'design-04',
    title: 'Studio Type Specimen',
    year: '2023',
    duration: '0 MIN 55 SEC',
    rating: '8.9',
    role: 'Type Design / Specimen',
    tags: ['Typeface', 'Specimen', 'Editorial'],
    description: 'Custom typeface specimen animation showcasing weight, rhythm and optical spacing across editorial layouts.',
    thumbnail: 'https://picsum.photos/seed/design04/900/1600',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
  },
  {
    id: 'design-05',
    title: 'Generative Canvas',
    year: '2022',
    duration: '1 MIN 20 SEC',
    rating: '8.2',
    role: 'Interactive Art / Code',
    tags: ['Generative', '3D', 'Loop'],
    description: 'Procedural pattern loop rendered in real time, blurring the line between generative art and interface design.',
    thumbnail: 'https://picsum.photos/seed/design05/900/1600',
    videoUrl: 'https://youtu.be/rtwIa1_t3vo',
  },
]

const videoReels: ShowcaseReel[] = [
  {
    id: 'video-01',
    title: 'Editorial Promo Reel',
    year: '2024',
    duration: '2 MIN 06 SEC',
    rating: '9.3',
    role: 'Editing / Color Grade',
    tags: ['Promo', 'Color Grade', 'Sound Design'],
    description: 'A fast-cut editorial promo balancing rhythmic pacing with a warm cinematic grade for a product launch.',
    thumbnail: 'https://img.youtube.com/vi/RoTm7wOD1uI/hqdefault.jpg',
    videoUrl: 'https://youtu.be/RoTm7wOD1uI?si=p7yh3vy9IpPD6JNU',
  },
  {
    id: 'video-02',
    title: 'Kinetic Type Story',
    year: '2024',
    duration: '1 MIN 34 SEC',
    rating: '8.8',
    role: 'Motion Editing / VFX',
    tags: ['Kinetic Type', 'VFX', 'Reel'],
    description: 'Typography-led motion story built for social, layering VFX transitions with punchy kinetic type cues.',
    thumbnail: 'https://img.youtube.com/vi/yMo2v7vhQ6M/hqdefault.jpg',
    videoUrl: 'https://youtu.be/yMo2v7vhQ6M?si=-lNpvPfOsnoAIvI_',
  },
  {
    id: 'video-03',
    title: 'Cinematic Product Cut',
    year: '2023',
    duration: '1 MIN 48 SEC',
    rating: '9.0',
    role: 'Editing / Sound',
    tags: ['Cinematic', 'Product', 'Sound'],
    description: 'A moody, cinematic product reel edited to a custom sound design bed, built around slow reveals and hard cuts.',
    thumbnail: 'https://img.youtube.com/vi/VW9Fo3Bu_3w/hqdefault.jpg',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
  },
  {
    id: 'video-04',
    title: 'Travel Colour Grade',
    year: '2023',
    duration: '2 MIN 22 SEC',
    rating: '8.6',
    role: 'Color Grading / Editing',
    tags: ['Travel', 'Color Grade', 'Documentary'],
    description: 'Documentary-style travel edit with a custom LUT pass, balancing natural tones against saturated highlights.',
    thumbnail: 'https://img.youtube.com/vi/PRnL75jAY3s/hqdefault.jpg',
    videoUrl: 'https://youtu.be/PRnL75jAY3s',
  },
  {
    id: 'video-05',
    title: 'Automotive Showreel',
    year: '2022',
    duration: '1 MIN 15 SEC',
    rating: '8.5',
    role: 'Editing / VFX',
    tags: ['Automotive', 'VFX', 'Reel'],
    description: 'High-energy automotive showreel combining speed-ramped cuts with layered VFX light trails.',
    thumbnail: 'https://img.youtube.com/vi/rtwIa1_t3vo/hqdefault.jpg',
    videoUrl: 'https://youtu.be/rtwIa1_t3vo',
  },
]

type ShowcaseTab = 'design' | 'video'

export default function VideoShowcase() {
  const [tab, setTab] = useState<ShowcaseTab>('design')
  const [activeIndex, setActiveIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)

  const reels = tab === 'design' ? designReels : videoReels
  const active = reels[activeIndex]

  const selectTab = (nextTab: ShowcaseTab) => {
    if (nextTab === tab) return
    setTab(nextTab)
    setActiveIndex(0)
    setIsPlaying(false)
  }

  const selectReel = (index: number) => {
    if (index === activeIndex) return
    setActiveIndex(index)
    setIsPlaying(false)
  }

  const trackRef = useRef<HTMLDivElement>(null)

  const scrollRelated = (direction: 'left' | 'right') => {
    const nextIndex = direction === 'left'
      ? Math.max(0, activeIndex - 1)
      : Math.min(reels.length - 1, activeIndex + 1)
    if (nextIndex === activeIndex) return
    setActiveIndex(nextIndex)
    setIsPlaying(false)

    // Scroll only the track, not the whole page
    const track = trackRef.current
    if (!track) return
    const card = track.children[nextIndex] as HTMLElement
    if (card) {
      const scrollLeft = card.offsetLeft - track.offsetWidth / 2 + card.offsetWidth / 2
      track.scrollTo({ left: scrollLeft, behavior: 'smooth' })
    }
  }

  const getYouTubeEmbedUrl = (url: string): string | null => {
    const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/))([^?&/]+)/)
    return match ? `https://www.youtube.com/embed/${match[1]}?autoplay=1` : null
  }

  const isYouTube = (url: string) => /youtu\.?be/.test(url)

  // Swipe support
  const touchStartX = useRef(0)
  const touchEndX = useRef(0)

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX
  }

  const handleTouchEnd = () => {
    const diff = touchStartX.current - touchEndX.current
    const threshold = 50
    if (Math.abs(diff) > threshold) {
      scrollRelated(diff > 0 ? 'right' : 'left')
    }
  }

  return (
    <div className="video-showcase">
      <div className="showcase-tabs">
        <button
          type="button"
          className={`showcase-tab-btn${tab === 'design' ? ' active' : ''}`}
          onClick={() => selectTab('design')}
        >
          Graphic Design
        </button>
        <button
          type="button"
          className={`showcase-tab-btn${tab === 'video' ? ' active' : ''}`}
          onClick={() => selectTab('video')}
        >
          Video Editing
        </button>
      </div>

      <div className="showcase-hero">
        {isPlaying ? (
          <>
            {isYouTube(active.videoUrl) ? (
              <iframe
                key={active.id}
                className="showcase-video-el"
                src={getYouTubeEmbedUrl(active.videoUrl)!}
                title={active.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={{ border: 'none' }}
              />
            ) : (
              <video
                key={active.id}
                className="showcase-video-el"
                src={active.videoUrl}
                controls
                autoPlay
                onEnded={() => setIsPlaying(false)}
              />
            )}
            <button
              type="button"
              className="showcase-close-btn"
              onClick={() => setIsPlaying(false)}
              aria-label="Close video"
            >
              <Icon icon="mdi:close" />
            </button>
          </>
        ) : (
          <>
            <img className="showcase-thumbnail" src={active.thumbnail} alt={active.title} />
            <div className="showcase-overlay-gradient" />



            <div className="showcase-play-wrap">
              <span className="showcase-duration">{active.duration}</span>
              <button
                type="button"
                className="showcase-play-btn"
                onClick={() => setIsPlaying(true)}
                aria-label={`Play ${active.title}`}
              >
                <Icon icon="mdi:play" />
              </button>
            </div>

            <div className="showcase-bottom">
              <div className="showcase-info">
                <div className="showcase-tags">
                  {active.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
                <h3 className="showcase-title">{active.title}</h3>
                <p className="showcase-credit">
                  <strong>{active.year}</strong> &nbsp;|&nbsp; <strong>{active.role}</strong>
                </p>
                <p className="showcase-desc">{active.description}</p>
              </div>

              <div className="showcase-related">
                <div className="showcase-related-header">
                  <span>On Next</span>
                  <div className="showcase-related-nav">
                    <button type="button" onClick={() => scrollRelated('left')} aria-label="Scroll left">
                      <Icon icon="mdi:chevron-left" />
                    </button>
                    <button type="button" onClick={() => scrollRelated('right')} aria-label="Scroll right">
                      <Icon icon="mdi:chevron-right" />
                    </button>
                  </div>
                </div>
                <div
                  className="showcase-related-track"
                  ref={trackRef}
                >
                  {reels.map((reel, index) => (
                    <button
                      type="button"
                      key={reel.id}
                      className={`showcase-card${index === activeIndex ? ' active' : ''}`}
                      onClick={() => selectReel(index)}
                    >
                      <img src={reel.thumbnail} alt={reel.title} />
                      <span>{reel.title}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
