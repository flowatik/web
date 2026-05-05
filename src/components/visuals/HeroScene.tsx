import { useEffect, useState } from 'react'
import { motion } from 'motion/react'
import { TrendingUp, Check, ArrowUpRight, Mail } from 'lucide-react'

const ease = [0.22, 1, 0.36, 1] as const

export default function HeroScene() {
  return (
    <div className="relative aspect-[5/6.4] w-full max-w-[640px] mx-auto">
      {/* Card 1: Website preview (back, large). Outer div carries the
          CSS scroll-driven parallax; inner motion.div handles entrance. */}
      <div className="hero-parallax-back absolute left-0 top-[12%] w-[60%] z-10">
        <motion.div
          initial={{ opacity: 0, y: 24, rotate: -6 }}
          animate={{ opacity: 1, y: 0, rotate: -4 }}
          transition={{ duration: 0.9, ease, delay: 0.1 }}
        >
          <FloatWrapper amplitude={6} duration={6}>
            <SiteCard />
          </FloatWrapper>
        </motion.div>
      </div>

      {/* Card 2: Lead notification (top right, larger) */}
      <div className="hero-parallax-mid absolute right-0 top-0 w-[54%] z-20">
        <motion.div
          initial={{ opacity: 0, y: 24, rotate: 8 }}
          animate={{ opacity: 1, y: 0, rotate: 4 }}
          transition={{ duration: 0.9, ease, delay: 0.3 }}
        >
          <FloatWrapper amplitude={8} duration={5} delay={0.6}>
            <LeadCard />
          </FloatWrapper>
        </motion.div>
      </div>

      {/* Card 3: Booking / Calendar (bottom right, in front, larger) */}
      <div className="hero-parallax-front absolute right-[2%] bottom-0 w-[64%] z-30">
        <motion.div
          initial={{ opacity: 0, y: 24, rotate: -4 }}
          animate={{ opacity: 1, y: 0, rotate: -2 }}
          transition={{ duration: 0.9, ease, delay: 0.5 }}
        >
          <FloatWrapper amplitude={7} duration={5.6} delay={1.1}>
            <BookingCard />
          </FloatWrapper>
        </motion.div>
      </div>
    </div>
  )
}

function FloatWrapper({
  children,
  amplitude = 6,
  duration = 5,
  delay = 0,
}: {
  children: React.ReactNode
  amplitude?: number
  duration?: number
  delay?: number
}) {
  return (
    <motion.div
      animate={{ y: [0, -amplitude, 0] }}
      transition={{ duration, ease: 'easeInOut', repeat: Infinity, delay }}
    >
      {children}
    </motion.div>
  )
}

/* No-op kept for backwards-compat — cards use their own border */
function GradientRing() {
  return null
}

/* ─────────── Card 1: Website preview with sparkline ─────────── */
function SiteCard() {
  return (
    <div className="relative rounded-2xl border border-hairline bg-canvas overflow-hidden shadow-lift">
      <GradientRing />
      {/* Browser chrome */}
      <div className="flex items-center gap-1.5 px-4 py-2.5 border-b border-hairline bg-mist/40">
        <span className="w-2 h-2 rounded-full bg-hairline" />
        <span className="w-2 h-2 rounded-full bg-hairline" />
        <span className="w-2 h-2 rounded-full bg-hairline" />
        <div className="ml-2 flex-1 h-4 rounded-full bg-canvas border border-hairline" />
      </div>

      {/* Content */}
      <div className="p-5 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-gradient-bv" />
            <div className="space-y-1">
              <div className="h-1.5 w-20 rounded-full bg-ink/80" />
              <div className="h-1 w-12 rounded-full bg-hairline" />
            </div>
          </div>
          <div className="flex items-center gap-1 text-emerald-600">
            <ArrowUpRight size={11} strokeWidth={2.5} />
            <span className="text-[9px] font-semibold tabular-nums">+38%</span>
          </div>
        </div>

        <Sparkline />

        <div className="aspect-[5/3] rounded-xl bg-gradient-to-br from-mist to-mist-warm relative overflow-hidden">
          <div
            className="absolute inset-0"
            style={{
              background:
                'radial-gradient(circle at 30% 40%, rgba(23,71,255,0.15) 0%, transparent 50%), radial-gradient(circle at 70% 60%, rgba(124,58,255,0.18) 0%, transparent 50%)',
            }}
          />
          <div className="absolute bottom-3 left-3 right-3 space-y-1.5">
            <div className="h-2 w-3/4 rounded-full bg-canvas/80" />
            <div className="h-1 w-1/2 rounded-full bg-canvas/60" />
          </div>
        </div>

        <div className="flex gap-1.5 pt-1">
          <div className="h-6 w-20 rounded-full bg-gradient-bv" />
          <div className="h-6 w-14 rounded-full border border-hairline" />
        </div>
      </div>
    </div>
  )
}

function Sparkline() {
  return (
    <div className="relative h-10 -mx-1">
      <svg viewBox="0 0 200 40" className="w-full h-full" aria-hidden>
        <defs>
          <linearGradient id="sparkLine" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#1747FF" />
            <stop offset="100%" stopColor="#7c3aff" />
          </linearGradient>
          <linearGradient id="sparkFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#7c3aff" stopOpacity="0.18" />
            <stop offset="100%" stopColor="#7c3aff" stopOpacity="0" />
          </linearGradient>
        </defs>
        <motion.path
          d="M 0 30 L 25 26 L 50 28 L 75 22 L 100 24 L 125 16 L 150 18 L 175 10 L 200 8 L 200 40 L 0 40 Z"
          fill="url(#sparkFill)"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        />
        <motion.path
          d="M 0 30 L 25 26 L 50 28 L 75 22 L 100 24 L 125 16 L 150 18 L 175 10 L 200 8"
          stroke="url(#sparkLine)"
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.4, ease, delay: 0.4 }}
        />
        <motion.circle
          cx="200"
          cy="8"
          r="3"
          fill="#7c3aff"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.4, delay: 1.6 }}
        />
        <motion.circle
          cx="200"
          cy="8"
          r="6"
          fill="#7c3aff"
          opacity="0.3"
          initial={{ scale: 0 }}
          animate={{ scale: [1, 1.6, 1] }}
          transition={{ duration: 2, repeat: Infinity, delay: 1.6, ease: 'easeOut' }}
        />
      </svg>
    </div>
  )
}

/* ─────────── Card 2: Inbox with multiple leads + live counter ─────────── */
function LeadCard() {
  return (
    <div className="relative rounded-2xl border border-hairline bg-canvas p-5 shadow-lift">
      <GradientRing />

      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 grid place-items-center rounded-xl bg-gradient-bv">
            <Mail size={13} strokeWidth={2} className="text-canvas" />
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-[0.18em] text-ink-soft/70 font-medium">
              Inbox · live
            </p>
            <p className="text-xs font-semibold text-ink">3 new leads</p>
          </div>
        </div>
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
      </div>

      {/* Leads list */}
      <div className="space-y-2.5">
        <LeadRow initial="S" name="Sarah K." note="Wants a quote" t="0.4s" highlight />
        <LeadRow initial="M" name="Maya R." note="Booking enquiry" t="1.2s" />
        <LeadRow initial="A" name="Adam L." note="Follow-up reply" t="2.8s" />
      </div>

      {/* Footer */}
      <div className="mt-4 pt-3 border-t border-hairline flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <Check size={11} className="text-emerald-600" strokeWidth={2.5} />
          <span className="text-[10px] text-ink-soft">All replied automatically</span>
        </div>
        <LiveCounter />
      </div>
    </div>
  )
}

function LeadRow({
  initial,
  name,
  note,
  t,
  highlight,
}: {
  initial: string
  name: string
  note: string
  t: string
  highlight?: boolean
}) {
  return (
    <div
      className={`flex items-center gap-2.5 rounded-lg px-2 py-1.5 ${
        highlight ? 'bg-gradient-bv-soft' : ''
      }`}
    >
      <div
        className={`w-7 h-7 rounded-full grid place-items-center shrink-0 ${
          highlight ? 'bg-gradient-bv' : 'bg-mist'
        }`}
      >
        <span
          className={`text-[11px] font-semibold ${
            highlight ? 'text-canvas' : 'text-ink-soft'
          }`}
        >
          {initial}
        </span>
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-xs font-medium text-ink truncate leading-tight">{name}</p>
        <p className="text-[10px] text-ink-soft truncate">{note}</p>
      </div>
      <span className="text-[9px] font-mono text-ink-soft/70 tabular-nums shrink-0">{t}</span>
    </div>
  )
}

function LiveCounter() {
  const [n, setN] = useState(127)
  useEffect(() => {
    const id = setInterval(() => setN((x) => x + 1), 4000)
    return () => clearInterval(id)
  }, [])
  return (
    <div className="flex items-center gap-1 text-[10px] font-mono">
      <span className="text-ink-soft">today</span>
      <motion.span
        key={n}
        initial={{ y: 6, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4, ease }}
        className="text-violet font-semibold tabular-nums"
      >
        {n}
      </motion.span>
    </div>
  )
}

/* ─────────── Card 3: Larger calendar with day strip + slot grid ─────────── */
function BookingCard() {
  return (
    <div className="relative rounded-2xl border border-hairline bg-canvas p-5 shadow-lift">
      <GradientRing />

      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-[10px] uppercase tracking-[0.18em] text-ink-soft/70 font-medium">
            This week
          </p>
          <p className="text-base font-semibold text-ink">March 9 to 13</p>
        </div>
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-gradient-bv-soft">
          <TrendingUp size={11} className="text-violet" strokeWidth={2} />
          <span className="text-[10px] font-medium text-gradient-bv">+4 booked</span>
        </div>
      </div>

      {/* Day strip */}
      <div className="grid grid-cols-5 gap-1.5 mb-3">
        {[
          { d: 'M', n: 9, busy: 1 },
          { d: 'T', n: 10, busy: 3, today: true },
          { d: 'W', n: 11, busy: 2 },
          { d: 'T', n: 12, busy: 1 },
          { d: 'F', n: 13, busy: 0 },
        ].map((day, i) => (
          <div
            key={i}
            className={`text-center py-2 rounded-lg ${
              day.today
                ? 'bg-gradient-bv text-canvas'
                : 'bg-mist text-ink-soft'
            }`}
          >
            <div className="text-[8px] uppercase tracking-wider opacity-70">{day.d}</div>
            <div className="text-sm font-semibold tabular-nums leading-none mt-0.5">{day.n}</div>
            <div className="flex items-center justify-center gap-0.5 mt-1.5">
              {Array.from({ length: 3 }).map((_, j) => (
                <span
                  key={j}
                  className={`w-1 h-1 rounded-full ${
                    j < day.busy
                      ? day.today
                        ? 'bg-canvas/80'
                        : 'bg-violet'
                      : day.today
                      ? 'bg-canvas/30'
                      : 'bg-hairline'
                  }`}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Slot grid */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-[10px] uppercase tracking-[0.16em] text-ink-soft/70 font-medium">
            Tuesday slots
          </span>
          <span className="text-[10px] text-violet font-medium">3 available</span>
        </div>
        <div className="grid grid-cols-4 gap-1.5">
          {[
            { label: '9:00', filled: false },
            { label: '10:30', filled: true },
            { label: '11:00', filled: true },
            { label: '12:00', filled: false },
            { label: '1:30', filled: true },
            { label: '2:00', filled: true, highlight: true },
            { label: '3:30', filled: false },
            { label: '4:00', filled: false },
          ].map((slot, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 + i * 0.05, duration: 0.3 }}
              className={`text-center py-1.5 rounded-md text-[9px] font-medium ${
                slot.highlight
                  ? 'bg-gradient-bv text-canvas'
                  : slot.filled
                  ? 'bg-accent/10 text-accent'
                  : 'bg-mist text-ink-soft/60'
              }`}
            >
              {slot.label}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="mt-4 pt-3 border-t border-hairline flex items-center gap-1.5">
        <Check size={11} className="text-emerald-600" strokeWidth={2.5} />
        <span className="text-[10px] text-ink-soft">
          Confirmed. Synced to your calendar.
        </span>
      </div>
    </div>
  )
}
