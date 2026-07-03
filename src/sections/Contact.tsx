import FadeIn from '../components/FadeIn'
import Magnet from '../components/Magnet'
import AnimatedText from '../components/AnimatedText'
import { ArrowUpRight, Link2, Mail } from 'lucide-react'

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
              className="inline-flex items-center gap-3 bg-fg text-ink font-medium rounded-full pl-7 pr-6 py-4 text-lg hover:opacity-90 transition-opacity"
            >
              <Mail size={20} />
              {CONTACT_EMAIL}
              <ArrowUpRight size={20} />
            </a>
          </Magnet>
        </FadeIn>

        <FadeIn delay={0.2} className="mt-12 flex items-center justify-center gap-6 font-mono text-sm text-muted">
          <a href={GITHUB_URL} className="inline-flex items-center gap-2 hover:text-fg transition-colors">
            <Link2 size={16} /> GitHub
          </a>
          <a href={LINKEDIN_URL} className="inline-flex items-center gap-2 hover:text-fg transition-colors">
            <Link2 size={16} /> LinkedIn
          </a>
        </FadeIn>

        <p className="mt-24 font-mono text-xs text-muted">
          Ahmedabad, IN — © {new Date().getFullYear()} Harsh Prajapati
        </p>
      </div>
    </section>
  )
}
