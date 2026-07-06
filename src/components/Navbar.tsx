import { useEffect, useState, useRef } from 'react'
import { motion } from 'motion/react'
import { Menu, X } from 'lucide-react'
import StaggeredMenu, { type StaggeredMenuHandle } from './StaggeredMenu'

const LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Work', href: '#work' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const menuRef = useRef<StaggeredMenuHandle>(null)

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
          className={`font-mono text-sm tracking-tight focus-visible:outline-2 focus-visible:outline-[var(--color-signal)] focus-visible:outline-offset-2 rounded relative z-[70] transition-colors duration-300 ${
            mobileMenuOpen ? 'text-ink' : 'text-fg'
          }`}
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
          <a
            href="#contact"
            className="font-mono text-xs uppercase tracking-widest bg-signal text-ink rounded-full px-4 py-2 hover:bg-signal-2 focus-visible:outline-2 focus-visible:outline-[var(--color-signal)] focus-visible:outline-offset-2 transition-all font-medium hidden md:inline-block"
          >
            Let's talk
          </a>
          <button
            id="mobile-menu-trigger"
            onClick={() => menuRef.current?.toggle()}
            className={`md:hidden focus-visible:outline-2 focus-visible:outline-[var(--color-signal)] focus-visible:outline-offset-2 rounded p-1 transition-colors z-[70] relative ${
              mobileMenuOpen ? 'text-black hover:text-signal' : 'text-fg hover:text-signal'
            }`}
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileMenuOpen}
            aria-controls="staggered-menu-panel"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>
      <div className="md:hidden">
        <StaggeredMenu
          ref={menuRef}
          position="right"
          isFixed={true}
          items={[
            { label: 'About', ariaLabel: 'Go to About section', link: '#about' },
            { label: 'Services', ariaLabel: 'Go to Services section', link: '#services' },
            { label: 'Work', ariaLabel: 'Go to Work section', link: '#work' },
            { label: 'Contact', ariaLabel: 'Go to Contact section', link: '#contact' },
          ]}
          socialItems={[
            { label: 'GitHub', link: 'https://github.com/harshcode26-creator' },
            { label: 'LinkedIn', link: 'https://www.linkedin.com/in/harshprajapati-dev23/' },
          ]}
          displaySocials={true}
          displayItemNumbering={true}
          colors={['#F6F6F4', '#1B2A4A']}
          accentColor="#E5231B"
          onMenuOpen={() => setMobileMenuOpen(true)}
          onMenuClose={() => setMobileMenuOpen(false)}
        />
      </div>
    </motion.header>
  )
}

