export interface ProjectMedia {
  type: 'image' | 'video'
  src: string
  alt: string
}

export interface Project {
  id: string
  index: string
  title: string
  role: string
  subtitle?: string
  description: string
  stack: string[]
  tags?: string[]
  accent: 'signal' | 'signal-2'
  media?: ProjectMedia[]
  githubUrl: string | null
  liveUrl: string | string[] | null
  videoSrc?: string
  posterImage?: string
  slideImages?: string[]
  auditDeckUrl?: string
  links?: { label: string; url: string }[]
}

export const projects: Project[] = [
  {
    id: 'optivis',
    index: '01',
    title: 'Optivis',
    role: 'Team Productivity & Insights Platform',
    description:
      'A MERN-stack platform built to give teams a clearer read on how work actually moves — tracking productivity signals and surfacing insights instead of just logging tasks. Designed and shipped the full product, including brand identity and UI system.',
    stack: ['React', 'Node.js', 'Express', 'MongoDB', 'Vite'],
    accent: 'signal',
    media: [
      { type: 'video', src: '/projects/optivis/optivis.mp4', alt: 'Optivis view' },
    ],
    videoSrc: '/projects/optivis/optivis.mp4',
    posterImage: '/projects/optivis/dashboard.png',
    githubUrl: 'https://github.com/harshcode26-creator/optivis.git',
    liveUrl: 'http://optivis-delta.vercel.app/',
  },
  {
    id: 'finnova',
    index: '02',
    title: 'Finnova',
    role: 'Financial Statement Analyzer',
    description:
      'A tool that parses financial statements and turns raw numbers into a readable analysis — built to make sense of statements faster than reading them line by line, without needing a finance background to use it.',
    stack: ['React', 'Node.js', 'Express', 'MongoDB'],
    accent: 'signal-2',
    media: [
      { type: 'video', src: '/projects/finnova/finnova.mp4', alt: 'Finnova product demo' },
    ],
    videoSrc: '/projects/finnova/finnova.mp4',
    posterImage: '/projects/finnova/upload.png',
    githubUrl: 'https://github.com/harshcode26-creator/bank_statement_anaylser.git',
    liveUrl: 'https://finnova-livid.vercel.app/',
  },
  {
    id: 'einvite',
    index: '03',
    title: 'EInvite Audit & Redesign',
    role: 'Independent Product Audit — EInvite',
    subtitle: 'Independent Product Audit — EInvite',
    description:
      "Independent audit of EInvite's public site across 9 pages — surfaced pricing-page conversion friction, duplicate/undiscoverable articles, technical SEO gaps, and a 41s mobile load time. Shipped two live, interactive redesigns (pricing + articles) plus a full performance and SEO roadmap, packaged into a pitch deck for their CEO.",
    stack: ['React', 'Performance Audit', 'UI Redesign', 'Technical SEO'],
    tags: ['React', 'Performance Audit', 'UI Redesign', 'Technical SEO'],
    accent: 'signal',
    slideImages: [
      '/projects/einvite/einvite-slide-cover.png',
      '/projects/einvite/einvite-slide-pricing.png',
      '/projects/einvite/einvite-slide-articles.png',
    ],
    githubUrl: null,
    liveUrl: [
      'https://einvite-pricing-625378471000.asia-southeast1.run.app/',
      'https://einvite-articles-resources-625378471000.asia-southeast1.run.app/',
    ],
    links: [
      { label: 'Pricing Redesign', url: 'https://einvite-pricing-625378471000.asia-southeast1.run.app/' },
      { label: 'Articles Redesign', url: 'https://einvite-articles-resources-625378471000.asia-southeast1.run.app/' },
    ],
    auditDeckUrl: '/projects/einvite/einvite-audit.pdf',
  },
]
