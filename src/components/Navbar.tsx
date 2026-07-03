import { useEffect, useState } from 'react'
import { motion } from 'motion/react'
import { Sun, Moon } from 'lucide-react'
import { useTheme } from '../hooks/useTheme'

const LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Work', href: '#work' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const { theme, toggle } = useTheme()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 inset-x-0 z-50 transition-colors duration-300 ${
        scrolled ? 'bg-ink/85 backdrop-blur-md border-b border-line' : 'bg-transparent'
      }`}
    >
      <nav className="max-w-6xl mx-auto flex items-center justify-between px-6 md:px-8 h-16">
        <a
          href="#top"
          className="font-mono text-sm tracking-tight text-fg focus-visible:outline-2 focus-visible:outline-[var(--color-signal)] focus-visible:outline-offset-2 rounded"
        >
          harsh<span className="text-signal">.</span>dev
        </a>
        <ul className="hidden md:flex items-center gap-8 font-mono text-xs uppercase tracking-widest text-muted">
          {LINKS.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="hover:text-fg focus-visible:outline-2 focus-visible:outline-[var(--color-signal)] focus-visible:outline-offset-2 rounded transition-colors"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-3">
          <button
            onClick={toggle}
            aria-label="Toggle theme"
            aria-pressed={theme === 'light'}
            className="p-2 rounded-full border border-line text-muted hover:text-fg hover:border-signal focus-visible:outline-2 focus-visible:outline-[var(--color-signal)] focus-visible:outline-offset-2 transition-all cursor-pointer flex items-center justify-center"
          >
            {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
          </button>
          <a
            href="#contact"
            className="font-mono text-xs uppercase tracking-widest border border-line rounded-full px-4 py-2 hover:border-signal hover:text-fg hover:shadow-[0_0_0_3px_var(--color-signal)] focus-visible:outline-2 focus-visible:outline-[var(--color-signal)] focus-visible:outline-offset-2 transition-all text-muted"
          >
            Let's talk
          </a>
        </div>
      </nav>
    </motion.header>
  )
}

