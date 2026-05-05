import { motion } from 'motion/react'
import Container from '../ui/Container'
import Eyebrow from '../ui/Eyebrow'

const ease = [0.22, 1, 0.36, 1] as const

const principles = [
  {
    Visual: BarChartVisual,
    title: 'Built for outcomes',
    body: 'Every pixel and every automation is measured against one question: did it earn you more business or buy you back time?',
  },
  {
    Visual: TranslateVisual,
    title: 'Designed in plain English',
    body: 'No jargon, no mystery dashboards. We explain everything in the language you already speak, and hand over tools you actually want to use.',
  },
  {
    Visual: RingsVisual,
    title: 'Quietly powerful',
    body: 'The polish a Fortune 500 takes for granted. The automation that used to need a full-time team. Built around how your business actually works.',
  },
]

export default function About() {
  return (
    <section
      id="about"
      className="relative min-h-screen flex flex-col justify-center py-20 lg:py-24 overflow-hidden bg-canvas"
    >
      <Container>
        {/* Manifesto header */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease }}
          className="text-center max-w-3xl mx-auto view-rise"
        >
          <Eyebrow>About Flowatik</Eyebrow>
          <h2 className="mt-6 text-4xl lg:text-6xl text-ink tracking-[-0.025em] leading-[1.05] text-balance font-semibold">
            Built for the businesses{' '}
            <span className="text-gradient-bv">the big agencies overlook.</span>
          </h2>
          <p className="mt-7 text-lg text-ink-soft text-pretty max-w-xl mx-auto leading-relaxed">
            Flowatik exists for one reason: small businesses deserve the same caliber of design
            and the same time-saving tools that the world's biggest companies quietly run on.
            We pair the polish of a top studio with automations that used to need a full-time
            team, all built around how your business actually works.
          </p>
        </motion.div>

        {/* Hairline + dot separator */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease, delay: 0.2 }}
          className="mt-14 flex items-center justify-center gap-4"
          aria-hidden
        >
          <span className="h-px w-16 bg-hairline" />
          <span className="w-2 h-2 rounded-full bg-gradient-bv" />
          <span className="h-px w-16 bg-hairline" />
        </motion.div>

        {/* 3 manifesto cards */}
        <div className="mt-14 grid lg:grid-cols-3 gap-6">
          {principles.map((p, i) => (
            <motion.article
              key={p.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6, ease, delay: 0.1 + i * 0.1 }}
              className="group relative rounded-3xl border border-hairline bg-canvas p-7 lg:p-8 transition-colors hover:border-violet/30"
            >
              {/* Mini-visual at top */}
              <div className="h-20 mb-7 grid place-items-center">
                <p.Visual />
              </div>
              <h3 className="text-xl lg:text-2xl text-ink leading-snug font-semibold tracking-[-0.01em]">
                {p.title}
              </h3>
              <p className="mt-3 text-ink-soft text-pretty text-[15px] leading-relaxed">
                {p.body}
              </p>
            </motion.article>
          ))}
        </div>
      </Container>
    </section>
  )
}

/* ─────────── Unique mini-visuals ─────────── */

function BarChartVisual() {
  return (
    <div className="relative w-32 h-20 flex items-end justify-center gap-2">
      <svg
        className="absolute -top-2 right-2 text-emerald-600"
        width="20"
        height="20"
        viewBox="0 0 20 20"
        aria-hidden
      >
        <motion.path
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
          d="M 4 14 L 14 4 M 8 4 L 14 4 L 14 10"
          stroke="currentColor"
          strokeWidth="1.75"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      {[24, 36, 50, 68].map((h, i) => (
        <motion.div
          key={i}
          initial={{ height: 0, opacity: 0 }}
          whileInView={{ height: h, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="w-5 rounded-md bg-gradient-bv"
          style={{ minHeight: 4 }}
        />
      ))}
    </div>
  )
}

function TranslateVisual() {
  return (
    <div className="relative w-44 h-16 flex items-center justify-between">
      {/* Left: code-style block */}
      <motion.div
        initial={{ opacity: 0, x: -8 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="rounded-lg border border-hairline bg-mist px-3 py-2 space-y-1"
      >
        <div className="h-1 w-12 rounded-full bg-ink-soft/40" />
        <div className="h-1 w-10 rounded-full bg-ink-soft/40" />
        <div className="h-1 w-14 rounded-full bg-ink-soft/40" />
      </motion.div>

      {/* Arrow */}
      <motion.svg
        width="28"
        height="14"
        viewBox="0 0 28 14"
        className="text-violet shrink-0 mx-2"
        aria-hidden
      >
        <motion.path
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          d="M 2 7 L 24 7 M 18 2 L 24 7 L 18 12"
          stroke="currentColor"
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </motion.svg>

      {/* Right: friendly word */}
      <motion.div
        initial={{ opacity: 0, x: 8 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.7 }}
        className="rounded-full bg-gradient-bv px-3 py-1.5"
      >
        <span className="text-xs font-medium text-canvas">yours</span>
      </motion.div>
    </div>
  )
}

function RingsVisual() {
  return (
    <div className="relative w-20 h-20">
      {[60, 44, 28].map((size, i) => (
        <motion.div
          key={size}
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{
            scale: [1, 1.08, 1],
            opacity: [0.6, 1, 0.6],
          }}
          viewport={{ once: true }}
          transition={{
            scale: {
              duration: 3,
              ease: 'easeInOut',
              repeat: Infinity,
              delay: i * 0.3,
            },
            opacity: {
              duration: 3,
              ease: 'easeInOut',
              repeat: Infinity,
              delay: i * 0.3,
            },
          }}
          className="absolute inset-0 grid place-items-center"
        >
          <span
            className="rounded-full border border-violet/40"
            style={{ width: size, height: size }}
          />
        </motion.div>
      ))}
      {/* Center solid dot */}
      <div className="absolute inset-0 grid place-items-center">
        <span className="w-3 h-3 rounded-full bg-gradient-bv" />
      </div>
    </div>
  )
}
