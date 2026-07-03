import FadeIn from '../components/FadeIn'
import AnimatedText from '../components/AnimatedText'

const TIMELINE = [
  {
    year: '2023–2026',
    title: 'BCA, Kachchh University',
    detail: 'Computer Applications degree — where the fundamentals got built.',
  },
  {
    year: '2025',
    title: 'Team Lead Intern, TodoIT Services',
    detail: '3-month internship leading a team as a high performer, shipping real product work.',
  },
  {
    year: '2025–2026',
    title: 'Optivis & Finnova',
    detail: 'Designed, built, and deployed two full MERN products from the ground up.',
  },
]

export default function About() {
  return (
    <section id="about" className="px-6 md:px-8 py-28 md:py-36">
      <div className="max-w-6xl mx-auto">
        <FadeIn as="p" className="font-mono text-xs uppercase tracking-widest text-signal mb-6">
          // 01 — About
        </FadeIn>

        <h2 className="font-display text-3xl md:text-5xl font-medium leading-tight max-w-3xl">
          <AnimatedText text="I learn by building, not by reading ahead — and I'd rather ship something real than plan it forever." />
        </h2>

        <div className="mt-20 border-t border-line">
          {TIMELINE.map((item, i) => (
            <FadeIn
              as="div"
              key={item.title}
              delay={i * 0.08}
              className="grid md:grid-cols-[140px_1fr] gap-4 md:gap-10 py-8 border-b border-line"
            >
              <span className="font-mono text-sm text-muted">{item.year}</span>
              <div>
                <h3 className="font-display text-xl md:text-2xl">{item.title}</h3>
                <p className="text-muted mt-2 max-w-xl leading-relaxed">{item.detail}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
