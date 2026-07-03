import type { ReactNode } from 'react'

interface MarqueeProps {
  items: ReactNode[]
  direction?: 'left' | 'right'
  speedSeconds?: number
  className?: string
}

export default function Marquee({
  items,
  direction = 'left',
  speedSeconds = 28,
  className,
}: MarqueeProps) {
  return (
    <div className={`overflow-hidden ${className ?? ''}`}>
      <div
        className="flex w-max gap-4"
        style={{
          animation: `marquee-${direction} ${speedSeconds}s linear infinite`,
        }}
      >
        {[...items, ...items].map((item, i) => (
          <div key={i} className="shrink-0">
            {item}
          </div>
        ))}
      </div>
      <style>{`
        @keyframes marquee-left {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        @keyframes marquee-right {
          from { transform: translateX(-50%); }
          to { transform: translateX(0); }
        }
        div:hover > div[style*="marquee"] {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  )
}
