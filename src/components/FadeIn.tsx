import { motion, type Variants } from 'motion/react'
import type { ReactNode } from 'react'

type Tag = 'div' | 'section' | 'h1' | 'h2' | 'h3' | 'p' | 'span' | 'li' | 'ul'

interface FadeInProps {
  children: ReactNode
  as?: Tag
  delay?: number
  y?: number
  className?: string
  once?: boolean
}

export default function FadeIn({
  children,
  as = 'div',
  delay = 0,
  y = 24,
  className,
  once = true,
}: FadeInProps) {
  const MotionTag = motion.create(as)

  const variants: Variants = {
    hidden: { opacity: 0, y },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] },
    },
  }

  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: '-80px' }}
      variants={variants}
    >
      {children}
    </MotionTag>
  )
}
