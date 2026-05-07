import { motion } from 'motion/react'
import { Wand, Search, Target } from 'lucide-react'
import Container from '../ui/Container'
import Eyebrow from '../ui/Eyebrow'
import MonitorShowcase from '../visuals/MonitorShowcase'

const features = [
  {
    Icon: Wand,
    title: 'Built to win first impressions',
    body: 'Premium design that signals the quality of your work before a single word is read.',
  },
  {
    Icon: Search,
    title: 'Found by the right customers',
    body: 'Optimized for search and speed so the people already looking for you find you first.',
  },
  {
    Icon: Target,
    title: 'Made to convert, not just exist',
    body: 'Every page guides visitors toward one thing: picking up the phone or booking a call.',
  },
]

export default function WebDesign() {
  return (
    <section
      id="work"
      className="relative min-h-screen flex flex-col justify-center py-16 sm:py-20 lg:py-24 overflow-hidden bg-mist snap-start"
    >
      <Container>
        <div className="grid lg:grid-cols-12 gap-10 sm:gap-12 lg:gap-16 items-center">
          {/* Visual showcase — below text on mobile, left on desktop */}
          <div className="lg:col-span-6 order-2 lg:order-1">
            <MonitorShowcase compact />
          </div>

          <motion.div
            className="lg:col-span-6 order-1 lg:order-2 view-rise"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <Eyebrow>The Website</Eyebrow>
            <h2 className="mt-5 sm:mt-6 text-3xl sm:text-4xl lg:text-5xl text-ink tracking-[-0.025em] leading-[1.05] text-balance font-semibold">
              Look like the leader{' '}
              <span className="text-gradient-bv">you already are.</span>
            </h2>
            <p className="mt-6 text-lg text-ink-soft text-pretty max-w-lg">
              A site that earns trust in five seconds and turns visitors into booked calls, on
              every screen they happen to be holding.
            </p>

            <ul className="mt-10 space-y-6">
              {features.map((f, i) => (
                <motion.li
                  key={f.title}
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: i * 0.08 }}
                  className="flex gap-4 group"
                >
                  <div className="w-10 h-10 grid place-items-center rounded-xl bg-gradient-bv-soft shrink-0 group-hover:scale-105 transition-transform">
                    <f.Icon size={18} strokeWidth={1.5} className="text-violet" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="text-base text-ink font-semibold leading-snug">{f.title}</h3>
                    <p className="mt-1 text-ink-soft text-base">{f.body}</p>
                  </div>
                </motion.li>
              ))}
            </ul>

            {/* Compact stat strip */}
            <div className="mt-10 grid grid-cols-3 divide-x divide-hairline border-y border-hairline py-6">
              <div className="px-4">
                <div className="text-2xl text-gradient-bv font-semibold tabular-nums tracking-tight">
                  5s
                </div>
                <div className="mt-0.5 text-xs text-ink-soft">to win their trust</div>
              </div>
              <div className="px-4">
                <div className="text-2xl text-gradient-bv font-semibold tabular-nums tracking-tight">
                  +38%
                </div>
                <div className="mt-0.5 text-xs text-ink-soft">conversion lift</div>
              </div>
              <div className="px-4">
                <div className="text-2xl text-gradient-bv font-semibold tabular-nums tracking-tight">
                  99
                </div>
                <div className="mt-0.5 text-xs text-ink-soft">Lighthouse score</div>
              </div>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  )
}
