import { useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'
import { ImageOff } from 'lucide-react'
import type { Project } from '../data/projects'

interface StackCardProps {
  project: Project
  index: number
  total: number
}

export default function StackCard({ project, index, total }: StackCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(0)
  const [failed, setFailed] = useState<Record<number, boolean>>({})

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'start start'],
  })

  // Cards earlier in the stack shrink more as later cards cover them.
  const remaining = total - index
  const targetScale = 1 - remaining * 0.04
  const scale = useTransform(scrollYProgress, [0, 1], [1, targetScale])

  const accent = project.accent === 'signal' ? 'var(--color-signal)' : 'var(--color-signal-2)'
  const media = project.media ?? []
  const activeMedia = media[active]
  const hasMedia = media.length > 0

  return (
    <div ref={ref} className="sticky top-24 h-screen flex items-center justify-center px-6 md:px-8">
      <motion.div
        style={{ scale, top: `${index * 16}px` }}
        className="relative w-full max-w-5xl rounded-3xl border border-line bg-paper p-8 md:p-12 shadow-2xl shadow-black/50"
      >
        <div className={`grid gap-10 ${hasMedia ? 'md:grid-cols-2 md:items-center' : ''}`}>
          <div>
            <span className="font-mono text-sm" style={{ color: accent }}>
              {project.index}
            </span>
            <h3 className="font-display text-3xl md:text-5xl font-medium mt-3">{project.title}</h3>
            <p className="text-muted font-mono text-sm mt-2">{project.role}</p>

            <p className="text-fg/90 mt-6 leading-relaxed">{project.description}</p>

            <div className="mt-6 flex flex-wrap gap-2">
              {project.stack.map((s) => (
                <span
                  key={s}
                  className="font-mono text-xs text-muted border border-line rounded-full px-3 py-1.5"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>

          {hasMedia && (
            <div>
              <div className="rounded-2xl border border-line bg-ink overflow-hidden">
                <div className="flex items-center gap-1.5 px-3.5 py-2.5 border-b border-line bg-paper-hi">
                  <span className="w-2 h-2 rounded-full bg-white/15" />
                  <span className="w-2 h-2 rounded-full bg-white/15" />
                  <span className="w-2 h-2 rounded-full bg-white/15" />
                </div>

                <div className="aspect-video relative bg-paper-hi">
                  {activeMedia && !failed[active] ? (
                    activeMedia.type === 'video' ? (
                      <video
                        key={activeMedia.src}
                        src={activeMedia.src}
                        className="w-full h-full object-cover"
                        autoPlay
                        muted
                        loop
                        playsInline
                        onError={() => setFailed((f) => ({ ...f, [active]: true }))}
                      />
                    ) : (
                      <img
                        key={activeMedia.src}
                        src={activeMedia.src}
                        alt={activeMedia.alt}
                        className="w-full h-full object-cover"
                        onError={() => setFailed((f) => ({ ...f, [active]: true }))}
                      />
                    )
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center gap-2 text-muted px-6 text-center">
                      <ImageOff size={22} />
                      <span className="font-mono text-[11px] break-all">
                        {activeMedia ? activeMedia.src : 'No media added yet'}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {media.length > 1 && (
                <div className="mt-3 flex gap-2">
                  {media.map((m, i) => (
                    <button
                      key={m.src}
                      onClick={() => setActive(i)}
                      aria-label={`Show ${m.alt}`}
                      className="h-1.5 rounded-full transition-all"
                      style={{
                        width: i === active ? '28px' : '14px',
                        backgroundColor: i === active ? accent : 'var(--color-line)',
                      }}
                    />
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </motion.div>
    </div>
  )
}
