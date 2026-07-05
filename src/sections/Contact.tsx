import FadeIn from '../components/FadeIn'
import Magnet from '../components/Magnet'
import AnimatedText from '../components/AnimatedText'
import { ArrowUpRight, Mail } from 'lucide-react'

// Custom local SVG implementations of Github and Linkedin matching Lucide style
function Github({ size = 16, className = "" }: { size?: number; className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  )
}

function Linkedin({ size = 16, className = "" }: { size?: number; className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  )
}

const CONTACT_EMAIL = 'your.email@example.com'
const GITHUB_URL = 'https://github.com/your-username'
const LINKEDIN_URL = 'https://linkedin.com/in/your-username'

export default function Contact() {
  return (
    <section id="contact" className="px-6 md:px-8 py-28 md:py-40 border-t border-line">
      <div className="max-w-6xl mx-auto text-center">
        <FadeIn as="p" className="font-mono text-xs uppercase tracking-widest text-signal mb-6">
          // 04 — Contact
        </FadeIn>

        <h2 className="font-display text-4xl md:text-6xl font-medium leading-tight">
          <AnimatedText text="Have something worth building?" />
        </h2>

        <FadeIn delay={0.1} className="mt-10 flex justify-center">
          <Magnet>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="inline-flex items-center gap-3 bg-fg text-ink font-medium rounded-full pl-7 pr-6 py-4 text-lg hover:shadow-[0_0_0_3px_var(--color-signal)] focus-visible:outline-2 focus-visible:outline-signal focus-visible:outline-offset-2 transition-all"
            >
              <Mail size={20} />
              {CONTACT_EMAIL}
              <ArrowUpRight size={20} />
            </a>
          </Magnet>
        </FadeIn>

        <FadeIn delay={0.2} className="mt-12 flex items-center justify-center gap-6 font-mono text-sm text-muted">
          <a
            href={GITHUB_URL}
            className="inline-flex items-center gap-2 hover:text-fg focus-visible:outline-2 focus-visible:outline-signal focus-visible:outline-offset-2 rounded p-1 transition-colors"
          >
            <Github size={16} /> GitHub
          </a>
          <a
            href={LINKEDIN_URL}
            className="inline-flex items-center gap-2 hover:text-fg focus-visible:outline-2 focus-visible:outline-signal focus-visible:outline-offset-2 rounded p-1 transition-colors"
          >
            <Linkedin size={16} /> LinkedIn
          </a>
        </FadeIn>

        <p className="mt-24 font-mono text-xs text-muted">
          Ahmedabad, IN — © {new Date().getFullYear()} Harsh Prajapati
        </p>
      </div>
    </section>
  )
}

