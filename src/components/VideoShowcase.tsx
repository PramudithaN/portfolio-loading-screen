import { useEffect, useRef, useState } from 'react'
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

const PINTEREST_USERNAME = 'ad0bep'
const BOARD_NAMES = ['all-pins', 'manipulations', 'flyers', 'social']

// const designReels: ShowcaseReel[] = [
//   {
//     id: 'design-01',
//     title: 'Chromatic Bloom',
//     year: '2024',
//     duration: '1 MIN 12 SEC',
//     rating: '9.1',
//     role: 'Brand Identity / Motion',
//     tags: ['Branding', 'Typography', 'Motion'],
//     description: 'A generative brand reveal built from a modular type system, blending kinetic typography with layered color washes.',
//     thumbnail: 'https://picsum.photos/seed/design01/900/1600',
//     videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
//   },
//   {
//     id: 'design-02',
//     title: 'Grid & Glass',
//     year: '2024',
//     duration: '0 MIN 48 SEC',
//     rating: '8.7',
//     role: 'Poster Series / Layout',
//     tags: ['Poster', 'Layout', 'Print'],
//     description: 'Minimalist poster series exploring negative space, grid discipline and glassmorphic texture overlays.',
//     thumbnail: 'https://picsum.photos/seed/design02/900/1600',
//     videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
//   },
//   {
//     id: 'design-03',
//     title: 'Vector Palette',
//     year: '2023',
//     duration: '1 MIN 05 SEC',
//     rating: '8.4',
//     role: 'Visual System / Illustration',
//     tags: ['Illustration', 'Vector', 'Palette'],
//     description: 'A procedurally generated illustration set built around a restrained five-color palette and repeating vector motifs.',
//     thumbnail: 'https://picsum.photos/seed/design03/900/1600',
//     videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
//   },
//   {
//     id: 'design-04',
//     title: 'Studio Type Specimen',
//     year: '2023',
//     duration: '0 MIN 55 SEC',
//     rating: '8.9',
//     role: 'Type Design / Specimen',
//     tags: ['Typeface', 'Specimen', 'Editorial'],
//     description: 'Custom typeface specimen animation showcasing weight, rhythm and optical spacing across editorial layouts.',
//     thumbnail: 'https://picsum.photos/seed/design04/900/1600',
//     videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
//   },
//   {
//     id: 'design-05',
//     title: 'Generative Canvas',
//     year: '2022',
//     duration: '1 MIN 20 SEC',
//     rating: '8.2',
//     role: 'Interactive Art / Code',
//     tags: ['Generative', '3D', 'Loop'],
//     description: 'Procedural pattern loop rendered in real time, blurring the line between generative art and interface design.',
//     thumbnail: 'https://picsum.photos/seed/design05/900/1600',
//     videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4',
//   },
// ]

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
    videoUrl: 'https://youtu.be/VW9Fo3Bu_3w',
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

export default function VideoShowcase() {
  const [activeVideoIndex, setActiveVideoIndex] = useState(0)
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)
  // const [galleryImages, setGalleryImages] = useState<string[]>([])

  const activeVideo = videoReels[activeVideoIndex]

 const [galleryImages, setGalleryImages] = useState<string[]>([])
console.log(galleryImages,"galleryImages");

useEffect(() => {
  const fetchPinterestImages = async () => {
    const fetchedImages: string[] = []

    for (const board of BOARD_NAMES) {
      // Use 'feed' for all pins, otherwise use the specific board name
      const rssName = board === 'all-pins' ? 'feed' : board
      const rawUrl = `https://www.pinterest.com/${PINTEREST_USERNAME}/${rssName}.rss`
      
      // rss2json avoids the 500 Internal Server errors you were getting
      const proxyUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rawUrl)}`

      try {
        const res = await fetch(proxyUrl)
        if (!res.ok) continue
        
        const data = await res.json()

        if (data.status !== 'ok') {
          console.warn(`[${board}] Failed to load RSS:`, data.message)
          continue
        }

        data.items.forEach((item: any) => {
          // Improved regex to grab the image src reliably
          const imgSrcMatch = item.description.match(/<img[^>]+src=["']([^"']+)["']/i)

          if (imgSrcMatch) {
            let src = imgSrcMatch[1]
            // Upgrade image resolution to high-quality original
            src = src.replace(/\/\d+x\//, '/originals/')
            fetchedImages.push(src)
          }
        })
      } catch (error) {
        console.error(`[${board}] Failed to fetch feed:`, error)
      }
    }

    if (fetchedImages.length > 0) {
      // Use a Set to strip out any duplicate pins shared across boards
      setGalleryImages([...new Set(fetchedImages)])
    }
  }

  fetchPinterestImages()
}, [])

  const selectVideoReel = (index: number) => {
    if (index === activeVideoIndex) return
    setActiveVideoIndex(index)
    setIsVideoPlaying(false)
  }

  const videoTrackRef = useRef<HTMLDivElement>(null)

  const scrollVideoRelated = (direction: 'left' | 'right') => {
    const nextIndex =
      direction === 'left'
        ? Math.max(0, activeVideoIndex - 1)
        : Math.min(videoReels.length - 1, activeVideoIndex + 1)
    if (nextIndex === activeVideoIndex) return
    setActiveVideoIndex(nextIndex)
    setIsVideoPlaying(false)

    const track = videoTrackRef.current
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

  const videoTouchStartX = useRef(0)
  const videoTouchEndX = useRef(0)

  const handleVideoTouchStart = (e: React.TouchEvent) => {
    videoTouchStartX.current = e.touches[0].clientX
  }

  const handleVideoTouchMove = (e: React.TouchEvent) => {
    videoTouchEndX.current = e.touches[0].clientX
  }

  const handleVideoTouchEnd = () => {
    const diff = videoTouchStartX.current - videoTouchEndX.current
    const threshold = 50
    if (Math.abs(diff) > threshold) {
      scrollVideoRelated(diff > 0 ? 'right' : 'left')
    }
  }

  return (
    <div className="video-showcase">
      {/* Pinterest pins — Instagram-style grid */}
      <div className="showcase-instagram-grid">
        {galleryImages.map((src, index) => (
          <div className="showcase-grid-post" key={index}>
            <img src={src} alt="" loading="lazy" />
          </div>
        ))}
      </div>

      <div className="showcase-section-break">
        <span>Video Editing</span>
      </div>

      <div className="showcase-hero">
        <div className="showcase-media-area">
          {isVideoPlaying ? (
            <>
              {isYouTube(activeVideo.videoUrl) ? (
                <iframe
                  key={activeVideo.id}
                  className="showcase-video-el"
                  src={getYouTubeEmbedUrl(activeVideo.videoUrl)!}
                  title={activeVideo.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  style={{ border: 'none' }}
                />
              ) : (
                <video
                  key={activeVideo.id}
                  className="showcase-video-el"
                  src={activeVideo.videoUrl}
                  controls
                  autoPlay
                  onEnded={() => setIsVideoPlaying(false)}
                />
              )}
              <button
                type="button"
                className="showcase-close-btn"
                onClick={() => setIsVideoPlaying(false)}
                aria-label="Close video"
              >
                <Icon icon="mdi:close" />
              </button>
            </>
          ) : (
            <>
              <img className="showcase-thumbnail" src={activeVideo.thumbnail} alt={activeVideo.title} />
              <div className="showcase-overlay-gradient" />

              <div className="showcase-play-wrap">
                <span className="showcase-duration">{activeVideo.duration}</span>
                <button
                  type="button"
                  className="showcase-play-btn"
                  onClick={() => setIsVideoPlaying(true)}
                  aria-label={`Play ${activeVideo.title}`}
                >
                  <Icon icon="mdi:play" />
                </button>
              </div>
            </>
          )}
        </div>

        <div className={`showcase-bottom${isVideoPlaying ? ' is-playing' : ''}`}>
          <div className="showcase-info">
            <div className="showcase-tags">
              {activeVideo.tags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
            <h3 className="showcase-title">{activeVideo.title}</h3>
            <p className="showcase-credit">
              <strong>{activeVideo.year}</strong> &nbsp;|&nbsp; <strong>{activeVideo.role}</strong>
            </p>
            <p className="showcase-desc">{activeVideo.description}</p>
          </div>

          <div className="showcase-related">
            <div className="showcase-related-header">
              <span>On Next</span>
              <div className="showcase-related-nav">
                <button type="button" onClick={() => scrollVideoRelated('left')} aria-label="Scroll left">
                  <Icon icon="mdi:chevron-left" />
                </button>
                <button type="button" onClick={() => scrollVideoRelated('right')} aria-label="Scroll right">
                  <Icon icon="mdi:chevron-right" />
                </button>
              </div>
            </div>
            <div
              className="showcase-related-track"
              ref={videoTrackRef}
              onTouchStart={handleVideoTouchStart}
              onTouchMove={handleVideoTouchMove}
              onTouchEnd={handleVideoTouchEnd}
            >
              {videoReels.map((reel, index) => (
                <button
                  type="button"
                  key={reel.id}
                  className={`showcase-card${index === activeVideoIndex ? ' active' : ''}`}
                  onClick={() => selectVideoReel(index)}
                >
                  <img src={reel.thumbnail} alt={reel.title} />
                  <span>{reel.title}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}