import { useState, useRef, useEffect } from 'react'
import { motion } from 'motion/react'
import Magnet from '../components/Magnet'
import Marquee from '../components/Marquee'
import { ArrowUpRight, Play, Pause, Volume2, VolumeX, Webhook, Sparkles } from 'lucide-react'
import { 
  SiReact, 
  SiVuedotjs, 
  SiJavascript, 
  SiHtml5, 
  SiCss, 
  SiSass, 
  SiTailwindcss, 
  SiNodedotjs, 
  SiExpress, 
  SiDjango, 
  SiMongodb, 
  SiMysql, 
  SiSqlite, 
  SiGit, 
  SiGreensock 
} from 'react-icons/si'

const SKILL_ITEMS = [
  { name: 'React.js', iconKey: 'SiReact' },
  { name: 'Vue.js', iconKey: 'SiVuedotjs' },
  { name: 'JavaScript (ES6+)', iconKey: 'SiJavascript' },
  { name: 'HTML5', iconKey: 'SiHtml5' },
  { name: 'CSS3', iconKey: 'SiCss' },
  { name: 'SCSS', iconKey: 'SiSass' },
  { name: 'Tailwind CSS', iconKey: 'SiTailwindcss' },
  { name: 'Node.js', iconKey: 'SiNodedotjs' },
  { name: 'Express.js', iconKey: 'SiExpress' },
  { name: 'Django', iconKey: 'SiDjango' },
  { name: 'REST API Design', iconKey: 'Webhook' },
  { name: 'MongoDB', iconKey: 'SiMongodb' },
  { name: 'MySQL', iconKey: 'SiMysql' },
  { name: 'SQLite', iconKey: 'SiSqlite' },
  { name: 'Git & GitHub', iconKey: 'SiGit' },
  { name: 'LLM API Integration', iconKey: 'Sparkles' },
  { name: 'GSAP', iconKey: 'SiGreensock' }
]

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  SiReact,
  SiVuedotjs,
  SiJavascript,
  SiHtml5,
  SiCss,
  SiSass,
  SiTailwindcss,
  SiNodedotjs,
  SiExpress,
  SiDjango,
  Webhook,
  SiMongodb,
  SiMysql,
  SiSqlite,
  SiGit,
  Sparkles,
  SiGreensock
}


function HeroMedia() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [progress, setProgress] = useState(0)
  const [showControls, setShowControls] = useState(true)

  const videoRef = useRef<HTMLVideoElement>(null)
  const progressBarRef = useRef<HTMLDivElement>(null)
  const controlsTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const [isDragging, setIsDragging] = useState(false)

  const handlePlay = () => {
    setIsPlaying(true)
  }

  const handleEnded = () => {
    setIsPlaying(false)
    setIsPaused(false)
    setProgress(0)
    setShowControls(true)
  }

  const resetControlsTimeout = () => {
    setShowControls(true)
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current)
    }
    if (isPlaying && videoRef.current && !videoRef.current.paused && !isDragging) {
      controlsTimeoutRef.current = setTimeout(() => {
        setShowControls(false)
      }, 2000)
    }
  }

  useEffect(() => {
    if (isPlaying && videoRef.current) {
      videoRef.current.play().catch((err) => {
        console.error('Error playing video:', err)
      })
      setIsPaused(false)
      setProgress(0)
      resetControlsTimeout()
    } else {
      setShowControls(true)
    }

    return () => {
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current)
      }
    }
  }, [isPlaying])

  const togglePlay = (e?: React.MouseEvent) => {
    e?.stopPropagation()
    if (!videoRef.current) return
    if (videoRef.current.paused) {
      videoRef.current.play().catch(console.error)
      setIsPaused(false)
    } else {
      videoRef.current.pause()
      setIsPaused(true)
    }
    resetControlsTimeout()
  }

  const toggleMute = (e?: React.MouseEvent) => {
    e?.stopPropagation()
    if (!videoRef.current) return
    const nextMuted = !isMuted
    videoRef.current.muted = nextMuted
    setIsMuted(nextMuted)
    resetControlsTimeout()
  }

  const handleTimeUpdate = () => {
    if (!videoRef.current) return
    const duration = videoRef.current.duration || 1
    setProgress((videoRef.current.currentTime / duration) * 100)
  }

  const handleSeek = (clientX: number) => {
    if (!videoRef.current || !progressBarRef.current) return
    const rect = progressBarRef.current.getBoundingClientRect()
    const percentage = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width))
    videoRef.current.currentTime = percentage * videoRef.current.duration
  }

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation()
    setIsDragging(true)
    handleSeek(e.clientX)

    const handleMouseMove = (moveEvent: MouseEvent) => {
      handleSeek(moveEvent.clientX)
    }

    const handleMouseUp = () => {
      setIsDragging(false)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', handleMouseUp)
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseup', handleMouseUp)
  }

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    e.stopPropagation()
    setIsDragging(true)
    if (e.touches.length > 0) {
      handleSeek(e.touches[0].clientX)
    }

    const handleTouchMove = (moveEvent: TouchEvent) => {
      if (moveEvent.touches.length > 0) {
        handleSeek(moveEvent.touches[0].clientX)
      }
    }

    const handleTouchEnd = () => {
      setIsDragging(false)
      window.removeEventListener('touchmove', handleTouchMove)
      window.removeEventListener('touchend', handleTouchEnd)
    }

    window.addEventListener('touchmove', handleTouchMove)
    window.addEventListener('touchend', handleTouchEnd)
  }

  useEffect(() => {
    resetControlsTimeout()
  }, [isDragging])

  const handleVideoBodyClick = () => {
    if (!isPlaying) return
    if (!showControls) {
      resetControlsTimeout()
    } else {
      togglePlay()
    }
  }

  const pointerEventsClass = (showControls || isPaused) ? 'pointer-events-auto' : 'pointer-events-none'

  return (
    <div className="w-full relative z-10">
      <div className="rounded-2xl border border-line bg-paper overflow-hidden shadow-2xl">
        {/* Window Chrome Bar */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-line bg-paper-hi">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-muted/40" />
            <span className="w-2.5 h-2.5 rounded-full bg-muted/40" />
            <span className="w-2.5 h-2.5 rounded-full bg-muted/40" />
          </div>
          <span className="font-mono text-[11px] text-muted">intro.mp4</span>
        </div>

        {/* Media Body */}
        <div 
          className="relative aspect-[4/5] bg-paper-hi overflow-hidden flex items-center justify-center cursor-pointer select-none"
          onMouseMove={resetControlsTimeout}
          onMouseEnter={resetControlsTimeout}
          onMouseLeave={resetControlsTimeout}
          onClick={handleVideoBodyClick}
        >
          {!isPlaying ? (
            <div className="absolute inset-0 w-full h-full">
              <img
                src="/hero/harsh-portrait.png"
                alt="Harsh Prajapati Portrait"
                className="w-full h-full object-cover select-none"
              />
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  handlePlay()
                }}
                aria-label="Play introduction video"
                className="absolute inset-0 m-auto w-16 h-16 flex items-center justify-center rounded-full bg-signal text-white hover:bg-signal-2 hover:scale-105 transition-all shadow-lg cursor-pointer focus-visible:outline-2 focus-visible:outline-[var(--color-signal)] focus-visible:outline-offset-2"
              >
                <span className="text-xl translate-x-0.5 select-none">▶</span>
              </button>
            </div>
          ) : (
            <div className="relative w-full h-full">
              <video
                ref={videoRef}
                src="/hero/harsh-intro.mp4"
                playsInline
                onEnded={handleEnded}
                onTimeUpdate={handleTimeUpdate}
                className="w-full h-full object-cover"
              />

              {/* Custom controls overlay */}
              <div 
                className={`absolute inset-0 transition-opacity duration-300 z-20 ${(showControls || isPaused) ? 'opacity-100' : 'opacity-0'}`}
                onClick={(e) => e.stopPropagation()}
              >
                {/* Play/Pause icon (bottom-left) */}
                <button
                  onClick={togglePlay}
                  className={`absolute bottom-4 left-4 w-9 h-9 flex items-center justify-center rounded-full bg-[rgba(255,255,255,0.85)] text-fg hover:scale-105 transition-all shadow-md ${pointerEventsClass}`}
                  aria-label={isPaused ? "Play" : "Pause"}
                >
                  {isPaused ? <Play size={14} fill="currentColor" className="translate-x-0.5" /> : <Pause size={14} fill="currentColor" />}
                </button>

                {/* Mute icon (bottom-right) */}
                <button
                  onClick={toggleMute}
                  className={`absolute bottom-4 right-4 w-9 h-9 flex items-center justify-center rounded-full bg-[rgba(255,255,255,0.85)] text-fg hover:scale-105 transition-all shadow-md ${pointerEventsClass}`}
                  aria-label={isMuted ? "Unmute" : "Mute"}
                >
                  {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
                </button>

                {/* Progress bar (very bottom edge) */}
                <div 
                  ref={progressBarRef}
                  className={`absolute bottom-0 left-0 w-full h-3 flex items-end cursor-pointer group/progress ${pointerEventsClass}`}
                  onMouseDown={handleMouseDown}
                  onTouchStart={handleTouchStart}
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="w-full h-[3px] bg-line transition-all group-hover/progress:h-[5px]">
                    <div 
                      className="h-full bg-signal"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Transcript Fallback */}
      <div className="mt-4 relative z-20">
        <details className="group border border-line rounded-xl bg-paper text-xs overflow-hidden transition-all duration-300">
          <summary className="flex items-center justify-between p-3.5 font-mono text-muted cursor-pointer hover:text-fg hover:bg-paper-hi transition-colors select-none focus-visible:outline-2 focus-visible:outline-[var(--color-signal)] focus-visible:outline-offset-2 rounded-xl">
            <span>[View transcript]</span>
            <span className="transition-transform duration-300 group-open:rotate-180 font-bold font-mono text-[10px]">▼</span>
          </summary>
          <div className="p-4 border-t border-line text-muted leading-relaxed font-mono whitespace-pre-line bg-paper/50">
            {"Hi, I'm Harsh prajapati. I'm a Full Stack Developer passionate about building scalable web applications, solving real-world problems, and continuously learning new technologies. Welcome to my portfolio."}
          </div>
        </details>
      </div>
    </div>
  )
}

export default function Hero() {
  return (
    <section id="top" className="relative min-h-screen flex flex-col justify-between pt-24 pb-0">
      {/* Fine Dot Grid Background */}
      <div 
        className="absolute inset-0 -z-20 pointer-events-none" 
        style={{
          backgroundImage: 'radial-gradient(var(--color-line) 1px, transparent 1px)',
          backgroundSize: '20px 20px',
          opacity: 0.4
        }} 
      />

      {/* Main Grid Content Area */}
      <div className="flex-grow flex items-center w-full">
        <div className="max-w-6xl mx-auto w-full grid md:grid-cols-[1.3fr_1fr] gap-12 items-center px-6 md:px-8">
          <div className="md:self-start md:mt-[18px]">
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-mono text-sm text-signal mb-6"
            >
              <span className="text-muted">$</span> whoami
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="font-display text-5xl sm:text-6xl lg:text-7xl font-semibold leading-[1.05] tracking-tight"
            >
              Harsh Prajapati.
              <br />
              <span className="signal-text">Full-stack developer.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="mt-6 text-muted text-lg max-w-lg leading-relaxed"
            >
              I build MERN-stack products end to end — from schema to shipped UI.
              Recent BCA graduate, hands-on by default, currently taking on new work.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="mt-8 flex items-center gap-4"
            >
              <Magnet>
                <a
                  href="#work"
                  className="inline-flex items-center gap-2 bg-fg text-ink font-medium rounded-full pl-6 pr-5 py-3 hover:shadow-[0_0_0_3px_var(--color-signal)] focus-visible:outline-2 focus-visible:outline-[var(--color-signal)] focus-visible:outline-offset-2 transition-all"
                >
                  See my work
                  <ArrowUpRight size={18} />
                </a>
              </Magnet>
              <a
                href="#contact"
                className="font-mono text-xs uppercase tracking-widest text-muted hover:text-fg focus-visible:outline-2 focus-visible:outline-[var(--color-signal)] focus-visible:outline-offset-2 rounded p-1 transition-all"
              >
                Get in touch
              </a>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-sm mx-auto md:max-w-none"
          >
            {/* Red Background Rectangle Shape (Vivid Red Accent) */}
            <div 
              className="absolute -right-2 md:-right-20 -bottom-6 md:-bottom-12 -top-6 md:-top-12 left-6 md:left-12 bg-hero-red rounded-[2rem] md:rounded-[4rem] -z-10 pointer-events-none opacity-95" 
            />

            <HeroMedia />
          </motion.div>
        </div>
      </div>

      {/* Ticker Band (Subtle full-bleed band background, thin border-y) */}
      <div className="w-full bg-paper/40 border-y border-line py-5 mt-10 md:mt-14 relative z-10">
        <Marquee
          items={SKILL_ITEMS.map((item) => {
            const IconComponent = iconMap[item.iconKey]
            return {
              label: item.name,
              icon: IconComponent ? (
                <IconComponent size={16} className="text-muted shrink-0 group-hover/pill:text-fg transition-colors" />
              ) : null
            }
          })}
        />
      </div>
    </section>
  )
}
