import FadeIn from '../components/FadeIn'
import { services } from '../data/services'

export default function Services() {
  return (
    <section id="services" className="px-6 md:px-8 py-28 md:py-36 bg-paper/40">
      <div className="max-w-6xl mx-auto">
        <FadeIn as="p" className="font-mono text-xs uppercase tracking-widest text-signal mb-6">
          // 02 — Services
        </FadeIn>
        <FadeIn as="h2" className="font-display text-3xl md:text-5xl font-medium max-w-2xl">
          What I take on
        </FadeIn>

        <div className="mt-16 grid md:grid-cols-2 gap-6">
          {services.map((s, i) => (
            <FadeIn
              as="div"
              key={s.id}
              delay={i * 0.06}
              className="bg-paper border border-line rounded-2xl p-8 md:p-10 transition-all duration-300 hover:border-signal/40 hover:bg-paper-hi"
            >
              <span className="font-mono text-xs text-muted">0{i + 1}</span>
              <h3 className="font-display text-xl md:text-2xl mt-4">{s.title}</h3>
              <p className="text-muted mt-3 leading-relaxed">{s.description}</p>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}

