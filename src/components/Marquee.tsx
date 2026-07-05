import type { ReactNode } from 'react'

interface MarqueeProps {
  items: { label: string; icon: ReactNode }[]
  className?: string
}

export default function Marquee({ items, className }: MarqueeProps) {
  return (
    <div className={`marquee-viewport ${className ?? ''}`}>
      <div className="marquee-track">
        {[...items, ...items].map((item, i) => (
          <span 
            className="marquee-pill group/pill hover:border-signal/40 transition-colors font-mono text-sm" 
            key={i}
          >
            {item.icon}
            {item.label}
          </span>
        ))}
      </div>
    </div>
  )
}
