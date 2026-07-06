import { useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'
import { ImageOff, ExternalLink, ChevronLeft, ChevronRight, FileText } from 'lucide-react'
import { SiGithub } from 'react-icons/si'
import type { Project } from '../data/projects'

interface StackCardProps {
  project: Project
  index: number
  total: number
}

function SlideCarousel({ images, alt }: { images: string[]; alt: string }) {
  const [index, setIndex] = useState(0)

  return (
    <div className="relative w-full h-full">
      <img
        src={images[index]}
        alt={`${alt} — slide ${index + 1} of ${images.length}`}
        className="w-full h-full object-contain bg-paper"
      />
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-20">
        {images.map((_, i) => (
          <button
            key={i}
            aria-label={`Show slide ${i + 1}`}
            onClick={(e) => {
              e.stopPropagation()
              setIndex(i)
            }}
            className={`w-1.5 h-1.5 rounded-full transition-colors ${
              i === index ? 'bg-signal' : 'bg-line'
            }`}
          />
        ))}
      </div>
      {images.length > 1 && (
        <>
          <button
            aria-label="Previous slide"
            onClick={(e) => {
              e.stopPropagation()
              setIndex((i) => (i - 1 + images.length) % images.length)
            }}
            className="absolute left-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-white/85 hover:bg-white flex items-center justify-center text-neutral-900 shadow-md transition-all z-20"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            aria-label="Next slide"
            onClick={(e) => {
              e.stopPropagation()
              setIndex((i) => (i + 1) % images.length)
            }}
            className="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-white/85 hover:bg-white flex items-center justify-center text-neutral-900 shadow-md transition-all z-20"
          >
            <ChevronRight size={16} />
          </button>
        </>
      )}
    </div>
  )
}


export default function StackCard({ project, index, total }: StackCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  
  const [videoFailed, setVideoFailed] = useState(false)
  const [imageFailed, setImageFailed] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'start start'],
  })

  // Cards earlier in the stack shrink more as later cards cover them.
  const remaining = total - index
  const targetScale = 1 - remaining * 0.04
  const scale = useTransform(scrollYProgress, [0, 1], [1, targetScale])

  const accent = project.accent === 'signal' ? 'var(--color-signal)' : 'var(--color-signal-2)'
  const hasVideo = !!project.videoSrc && !videoFailed
  const liveUrl = project.liveUrl

  const handleMouseEnter = () => {
    if (!videoRef.current || videoFailed || !project.videoSrc) return
    videoRef.current.play().then(() => {
      setIsPlaying(true)
    }).catch((err) => {
      console.warn("Video play failed:", err)
    })
  }

  const handleMouseLeave = () => {
    if (!videoRef.current || videoFailed || !project.videoSrc) return
    videoRef.current.pause()
    videoRef.current.currentTime = 0
    setIsPlaying(false)
  }

  const handleTogglePlay = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (!videoRef.current || videoFailed || !project.videoSrc) return
    if (videoRef.current.paused) {
      videoRef.current.play().then(() => {
        setIsPlaying(true)
      }).catch((err) => {
        console.warn("Video play failed:", err)
      })
    } else {
      videoRef.current.pause()
      videoRef.current.currentTime = 0
      setIsPlaying(false)
    }
  }

  // Fallback image source: first try posterImage, then first item in media array
  const fallbackImgSrc = project.posterImage || (project.media && project.media[0]?.src)
  const fallbackImgAlt = project.title + " fallback"

  return (
    <div ref={ref} className="md:sticky md:top-24 md:h-screen flex items-center justify-center px-6 md:px-8">
      <motion.div
        style={{ scale, top: `${index * 16}px` }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleTogglePlay}
        className={`relative w-full max-w-6xl rounded-3xl border border-line bg-paper p-6 md:p-16 shadow-2xl shadow-black/50 transition-colors duration-300 cursor-pointer select-none max-h-[90vh] md:max-h-none overflow-y-auto md:overflow-visible ${
          project.accent === 'signal'
            ? 'hover:border-signal/40'
            : 'hover:border-signal-2/40'
        }`}
      >
        <div className="grid gap-6 md:gap-10 md:grid-cols-2 md:items-center">
          <div>
            <div className="flex items-center gap-3">
              <span className="font-mono text-sm" style={{ color: accent }}>
                {project.index}
              </span>
              <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full border border-signal-2 bg-signal-2/10 text-signal-2 font-mono text-[10px] uppercase tracking-wider">
                <span className="w-1.5 h-1.5 rounded-full bg-signal-2 animate-pulse" />
                shipped
              </div>
            </div>
            <h3 className="font-display text-2xl sm:text-3xl md:text-6xl font-medium mt-3">{project.title}</h3>
            <p className="text-muted font-mono text-sm mt-2">{project.role}</p>

            <p className="text-fg/90 mt-4 md:mt-6 leading-relaxed">{project.description}</p>

            {/* Tech Stack Pills */}
            <div className="mt-6 flex flex-wrap gap-2">
              {project.stack.map((s, idx) => {
                let borderClass = 'border-line text-muted'
                if (idx % 3 === 1) {
                  const isEvenColor = Math.floor(idx / 3) % 2 === 0
                  borderClass = isEvenColor 
                    ? 'border-signal text-signal' 
                    : 'border-signal-2 text-signal-2'
                }
                return (
                  <span
                    key={s}
                    className={`font-mono text-xs border rounded-full px-3 py-1.5 transition-colors ${borderClass}`}
                  >
                    {s}
                  </span>
                )
              })}
            </div>

            {/* Project Links (GitHub and Live Demo) */}
            <div className="mt-5 md:mt-8 flex flex-wrap gap-3" onClick={(e) => e.stopPropagation()}>
              {/* GitHub Chip */}
              {project.githubUrl ? (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-full border border-line bg-paper px-4 py-2 font-mono text-xs text-muted hover:text-fg hover:border-fg transition-colors"
                >
                  <SiGithub size={14} />
                  GitHub
                </a>
              ) : (
                <span
                  className="inline-flex items-center gap-1.5 rounded-full border border-line bg-paper/20 px-4 py-2 font-mono text-xs text-muted/40 cursor-not-allowed select-none"
                  title="Repository is private"
                >
                  <SiGithub size={14} className="opacity-40" />
                  Private Repo
                </span>
              )}

              {/* Custom Links or Live Demo Chip(s) */}
              {project.links ? (
                project.links.map((link) => (
                  <a
                    key={link.url}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-full bg-signal px-4 py-2 font-mono text-xs text-ink font-medium hover:bg-signal-2 transition-colors"
                  >
                    <ExternalLink size={14} />
                    {link.label}
                  </a>
                ))
              ) : liveUrl ? (
                Array.isArray(liveUrl) ? (
                  liveUrl.map((url, urlIdx) => (
                    <a
                      key={url}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-full bg-signal px-4 py-2 font-mono text-xs text-ink font-medium hover:bg-signal-2 transition-colors"
                    >
                      <ExternalLink size={14} />
                      Live Demo {liveUrl.length > 1 ? urlIdx + 1 : ''}
                    </a>
                  ))
                ) : (
                  <a
                    href={liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-full bg-signal px-4 py-2 font-mono text-xs text-ink font-medium hover:bg-signal-2 transition-colors"
                  >
                    <ExternalLink size={14} />
                    Live Demo
                  </a>
                )
              ) : (
                <span
                  className="inline-flex items-center gap-1.5 rounded-full border border-line bg-paper/20 px-4 py-2 font-mono text-xs text-muted/30 cursor-not-allowed select-none"
                >
                  <ExternalLink size={14} className="opacity-30" />
                  Coming soon
                </span>
              )}

              {/* View Full Audit Chip */}
              {project.auditDeckUrl && (
                <a
                  href={project.auditDeckUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-full border border-line px-4 py-2 font-mono text-xs hover:border-signal/40 transition-colors text-muted hover:text-fg"
                >
                  <FileText size={14} />
                  View Full Audit
                </a>
              )}
            </div>
          </div>

          {/* Media Window Chrome Frame */}
          <div>
            <div className="rounded-2xl border border-line bg-ink overflow-hidden">
              <div className="flex items-center gap-1.5 px-3.5 py-2.5 border-b border-line bg-paper-hi">
                <span className="w-2 h-2 rounded-full bg-muted/40" />
                <span className="w-2 h-2 rounded-full bg-muted/40" />
                <span className="w-2 h-2 rounded-full bg-muted/40" />
              </div>

              <div className="aspect-video relative bg-paper-hi flex items-center justify-center overflow-hidden">
                {project.slideImages && project.slideImages.length > 0 ? (
                  <SlideCarousel images={project.slideImages} alt={project.title} />
                ) : hasVideo ? (
                  <>
                    <video
                      ref={videoRef}
                      src={project.videoSrc}
                      poster={project.posterImage}
                      muted
                      loop
                      playsInline
                      className="w-full h-full object-cover"
                      onError={() => setVideoFailed(true)}
                    />
                    {/* Subtle Live/Preview indicator badge */}
                    <div className="absolute top-3 right-3 z-10 bg-black/65 backdrop-blur-xs text-white/90 font-mono text-[9px] px-2 py-0.5 rounded-sm flex items-center gap-1.5 pointer-events-none select-none uppercase tracking-wider">
                      <span className={`w-1.5 h-1.5 rounded-full ${isPlaying ? 'bg-signal animate-pulse' : 'bg-muted'}`} />
                      {isPlaying ? 'Live Demo' : 'Preview'}
                    </div>
                  </>
                ) : fallbackImgSrc && !imageFailed ? (
                  <img
                    src={fallbackImgSrc}
                    alt={fallbackImgAlt}
                    className="w-full h-full object-cover"
                    onError={() => setImageFailed(true)}
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center gap-2 text-muted px-6 text-center">
                    <ImageOff size={22} />
                    <span className="font-mono text-[11px] break-all">
                      {project.videoSrc || 'No preview available'}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
