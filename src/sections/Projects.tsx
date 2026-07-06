import FadeIn from '../components/FadeIn'
import StackCard from '../components/StackCard'
import { projects } from '../data/projects'

export default function Projects() {
  return (
    <section id="work" className="py-20 md:py-28">
      <div className="max-w-6xl mx-auto px-6 md:px-8 mb-16">
        <FadeIn as="p" className="font-mono text-xs uppercase tracking-widest text-signal mb-6">
          // 03 — Selected work
        </FadeIn>
        <FadeIn as="h2" className="font-display text-3xl md:text-5xl font-medium max-w-2xl">
          Built, shipped, and one audited in the wild
        </FadeIn>
      </div>

      {projects.map((p, i) => (
        <StackCard key={p.id} project={p} index={i} total={projects.length} />
      ))}
    </section>
  )
}
