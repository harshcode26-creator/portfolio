export interface Service {
  id: string
  title: string
  description: string
}

export const services: Service[] = [
  {
    id: 'frontend',
    title: 'Frontend Development',
    description:
      'React interfaces that are fast, responsive, and built with a clear component structure — not just made to work, but made to hold up.',
  },
  {
    id: 'backend',
    title: 'Backend & APIs',
    description:
      'Node.js and Express services with MongoDB behind them — auth, data modeling, and APIs built to be predictable under real usage.',
  },
  {
    id: 'fullstack',
    title: 'Full-Stack Products',
    description:
      'End-to-end builds, from database schema to deployed UI, for people who want one person who can own the whole thing.',
  },
  {
    id: 'audit',
    title: 'Product Audits & Redesigns',
    description:
      'A close read of an existing product — performance, broken flows, dated UI — followed by concrete, prototyped fixes, not just a list of notes.',
  },
]
