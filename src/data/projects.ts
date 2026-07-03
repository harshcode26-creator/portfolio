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
  description: string
  stack: string[]
  link?: string
  accent: 'signal' | 'signal-2'
  media?: ProjectMedia[]
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
      { type: 'image', src: '/projects/optivis/dashboard.png', alt: 'Optivis dashboard view' },
      { type: 'image', src: '/projects/optivis/insights.png', alt: 'Optivis insights view' },
      { type: 'video', src: '/projects/optivis/demo.mp4', alt: 'Optivis product walkthrough' },
    ],
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
      { type: 'image', src: '/projects/finnova/upload.png', alt: 'Finnova statement upload screen' },
      { type: 'image', src: '/projects/finnova/analysis.png', alt: 'Finnova analysis output' },
    ],
  },
  {
    id: 'einvite-audit',
    index: '03',
    title: 'EInvite Audit & Redesign',
    role: 'Independent Product Audit — TodoIT Services',
    description:
      'Self-initiated audit of a live product: found broken CTAs, unresolved template variables, duplicate analytics tags, and missing security headers. Followed it with live redesign prototypes of two pages and a full PageSpeed report, packaged into a pitch deck for the company\u2019s CEO.',
    stack: ['React', 'Performance Audit', 'UI Redesign'],
    accent: 'signal',
    media: [
      { type: 'image', src: '/projects/einvite/before-after-pricing.png', alt: 'EInvite pricing page before and after redesign' },
      { type: 'image', src: '/projects/einvite/before-after-articles.png', alt: 'EInvite articles page before and after redesign' },
    ],
  },
]
