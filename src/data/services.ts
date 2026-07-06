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
      'Fast, responsive React interfaces with clean component architecture. Built to scale, not just to ship — so the codebase stays sane six months from now.',
  },
  {
    id: 'fullstack',
    title: 'Full-Stack Products',
    description:
      'End-to-end builds — database schema to deployed UI. One person who owns the whole thing, so nothing gets lost in handoffs.',
  },
  {
    id: 'seo',
    title: 'SEO Optimization',
    description:
      'Technical SEO that actually works: semantic markup, meta tags, sitemaps, structured data, performance tuning. Built to be found, not just built to load fast.',
  },
  {
    id: 'audit',
    title: 'Product Audits & Redesigns',
    description:
      'A close read of your existing product — performance bottlenecks, broken flows, dated UI — paired with concrete, prototyped fixes. Not a slide deck of observations.',
  },
]
