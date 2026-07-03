import { motion } from 'motion/react'
import Magnet from '../components/Magnet'
import Marquee from '../components/Marquee'
import { ArrowUpRight } from 'lucide-react'

const STACK = ['React', 'Node.js', 'Express', 'MongoDB', 'TypeScript', 'Tailwind CSS', 'Vite', 'Git']

export default function Hero() {
  return (
    <section id="top" className="relative min-h-screen flex flex-col justify-center pt-24 pb-16 px-6 md:px-8">
      <div className="max-w-6xl mx-auto w-full grid md:grid-cols-[1.3fr_1fr] gap-12 items-center">
        <div>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-mono text-sm text-signal mb-6"
          >
            <span className="text-muted">$</span> whoami
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="font-display text-5xl sm:text-6xl lg:text-7xl font-semibold leading-[1.05] tracking-tight"
          >
            Harsh Prajapati.
            <br />
            <span className="signal-text">Full-stack developer.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 text-muted text-lg max-w-lg leading-relaxed"
          >
            I build MERN-stack products end to end — from schema to shipped UI.
            Recent BCA graduate, hands-on by default, currently taking on new work.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="mt-10 flex items-center gap-4"
          >
            <Magnet>
              <a
                href="#work"
                className="inline-flex items-center gap-2 bg-fg text-ink font-medium rounded-full pl-6 pr-5 py-3 hover:shadow-[0_0_0_3px_var(--color-signal)] focus-visible:outline-2 focus-visible:outline-[var(--color-signal)] focus-visible:outline-offset-2 transition-all"
              >
                See my work
                <ArrowUpRight size={18} />
              </a>
            </Magnet>
            <a
              href="#contact"
              className="font-mono text-xs uppercase tracking-widest text-muted hover:text-fg focus-visible:outline-2 focus-visible:outline-[var(--color-signal)] focus-visible:outline-offset-2 rounded p-1 transition-all"
            >
              Get in touch
            </a>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="rounded-2xl border border-line bg-paper overflow-hidden shadow-2xl shadow-black/40"
        >
          <div className="flex items-center gap-1.5 px-4 py-3 border-b border-line bg-paper-hi">
            <span className="w-2.5 h-2.5 rounded-full bg-muted/40" />
            <span className="w-2.5 h-2.5 rounded-full bg-muted/40" />
            <span className="w-2.5 h-2.5 rounded-full bg-muted/40" />
            <span className="ml-3 font-mono text-[11px] text-muted">profile.json</span>
          </div>
          <pre className="font-mono text-[13px] leading-relaxed p-5 overflow-x-auto text-fg/80">
            <span className="text-fg/50">{'{'}</span>
            {'\n'}
            <span className="text-muted">  "name"</span>: <span className="text-[var(--color-signal)]">"Harsh Prajapati"</span>,
            {'\n'}
            <span className="text-muted">  "role"</span>: <span className="text-[var(--color-signal)]">"Full-Stack Developer"</span>,
            {'\n'}
            <span className="text-muted">  "stack"</span>: <span className="text-[var(--color-signal)]">"MERN"</span>,
            {'\n'}
            <span className="text-muted">  "base"</span>: <span className="text-[var(--color-signal)]">"Ahmedabad, IN"</span>,
            {'\n'}
            <span className="text-muted">  "experience"</span>: <span className="text-[var(--color-signal)]">"TodoIT Services"</span>,
            {'\n'}
            <span className="text-muted">  "shipped"</span>: <span className="text-fg/50">[</span>
            <span className="text-[var(--color-signal)]">"Optivis"</span>, <span className="text-[var(--color-signal)]">"Finnova"</span>
            <span className="text-fg/50">]</span>,
            {'\n'}
            <span className="text-muted">  "status"</span>: <span className="text-[var(--color-signal-2)]">"open_to_work"</span>
            {'\n'}
            <span className="text-fg/50">{'}'}</span>
          </pre>
        </motion.div>
      </div>

      <div className="max-w-6xl mx-auto w-full mt-20 md:mt-28">
        <Marquee
          items={STACK.map((s) => (
            <span
              key={s}
              className="font-mono text-sm text-muted border border-line rounded-full px-5 py-2.5 whitespace-nowrap"
            >
              {s}
            </span>
          ))}
        />
      </div>
    </section>
  )
}
