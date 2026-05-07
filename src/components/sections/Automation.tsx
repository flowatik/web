import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import {
  Headphones,
  Reply,
  CalendarClock,
  ArrowRight,
  X,
  Wand,
  Send,
  Check,
  RotateCcw,
  type LucideIcon,
} from 'lucide-react'
import Eyebrow from '../ui/Eyebrow'
import PhoneFrame from './demos/PhoneFrame'
import DesktopFrame from './demos/DesktopFrame'
import FrontDeskDemo from './demos/FrontDeskDemo'
import FollowUpsDemo from './demos/FollowUpsDemo'
import { InvisibleAssistantProvider, BookingChat, BookingCalendar, BookingTryAgain } from './demos/InvisibleAssistantDemo'

const ease = [0.22, 1, 0.36, 1] as const

/* ─── Card data ─── */

type CardData = {
  id: string
  index: string
  tag: string
  Icon: LucideIcon
  title: string
  headline: string
  body: string
  outcomes: string[]
  bullets: string[]
  Preview: () => React.JSX.Element
  Demo?: () => React.JSX.Element
  frame: 'phone' | 'dashboard' | 'split'
}

const cards: CardData[] = [
  {
    id: 'frontdesk',
    index: '01',
    tag: 'Front desk',
    Icon: Headphones,
    title: 'A front desk that never sleeps.',
    headline: 'The Front Desk',
    body: 'A friendly AI assistant answers the same fifteen questions your team gets every day — in your voice, on your site, around the clock. No more lost leads at 11 PM.',
    outcomes: ['Open 24/7', 'Replies under 2s'],
    bullets: [
      'Answers common questions instantly, in your brand voice',
      'Hands off gracefully when a question is outside its scope',
      'Captures contact details so your team can follow up',
    ],
    Preview: ChatPreview,
    Demo: FrontDeskDemo,
    frame: 'phone',
  },
  {
    id: 'followups',
    index: '02',
    tag: 'Follow-ups',
    Icon: Reply,
    title: 'Follow-ups that actually happen.',
    headline: 'Automated Follow-ups',
    body: 'Every lead gets a warm, on-brand follow-up within seconds — not next Tuesday. The system reaches out across SMS, email, and push so no opportunity slips through.',
    outcomes: ['~30% more leads', 'Zero manual effort'],
    bullets: [
      'Sends personalized messages automatically after every inquiry',
      'Works across SMS, email, and push notifications',
      'Frees your team to focus on closing, not chasing',
    ],
    Preview: MessagePreview,
    Demo: FollowUpsDemo,
    frame: 'dashboard',
  },
  {
    id: 'assistant',
    index: '03',
    tag: 'Bookings',
    Icon: CalendarClock,
    title: 'Bookings without the back-and-forth.',
    headline: 'The Invisible Assistant',
    body: 'Customers ask for a time in plain language, the AI confirms, and your calendar updates all in one seamless step. No back-and-forth emails, no double-bookings.',
    outcomes: ['Zero back-and-forth', 'Synced in real time'],
    bullets: [
      'Understands natural-language scheduling requests',
      'Confirms and books directly into your calendar',
      'Proves the action was taken, no blind trust required',
    ],
    Preview: CalendarPreview,
    frame: 'split',
  },
]

/* ─── Main section ─── */

export default function Automation() {
  const [openId, setOpenId] = useState<string | null>(null)
  const open = openId ? cards.find((c) => c.id === openId) ?? null : null

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpenId(null) }
    window.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { window.removeEventListener('keydown', onKey); document.body.style.overflow = prev }
  }, [open])

  return (
    <section
      id="automation"
      className="relative min-h-screen flex flex-col justify-center py-16 sm:py-20 lg:py-24 overflow-hidden bg-canvas"
    >
      <div className="w-full mx-auto px-5 sm:px-6 lg:px-8 max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease }}
          className="text-center max-w-2xl mx-auto view-rise"
        >
          <Eyebrow>The Automation</Eyebrow>
          <h2 className="mt-5 text-3xl sm:text-4xl lg:text-5xl text-ink tracking-[-0.025em] leading-[1.05] text-balance font-semibold">
            Hours back. <span className="text-gradient-bv">Every week.</span> Forever.
          </h2>
          <p className="mt-5 text-base lg:text-lg text-ink-soft text-pretty">
            Three quiet systems that handle the work you keep meaning to get to. Click any card to
            try it live.
          </p>
        </motion.div>

        {/* Cards grid */}
        <div className="mt-10 sm:mt-12 lg:mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-7">
          {cards.map((c, i) => (
            <motion.button
              key={c.id}
              type="button"
              onClick={() => setOpenId(c.id)}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6, ease, delay: 0.1 + i * 0.08 }}
              className="group relative text-left rounded-3xl border border-hairline bg-canvas overflow-hidden transition-all duration-300 hover:border-violet/40 hover:shadow-lift hover:-translate-y-1 focus:outline-none focus-visible:border-violet focus-visible:ring-4 focus-visible:ring-violet/10 flex flex-col"
            >
              {/* Preview area */}
              <div className="p-4 pb-0 bg-mist/30 border-b border-hairline">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-[9px] uppercase tracking-[0.18em] text-ink-soft/70 font-medium">
                      Live preview
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-hairline" />
                    <span className="w-1.5 h-1.5 rounded-full bg-hairline" />
                    <span className="w-1.5 h-1.5 rounded-full bg-hairline" />
                  </div>
                </div>
                <div className="pb-4 min-h-[180px] flex items-start justify-center">
                  <c.Preview />
                </div>
              </div>

              {/* Card content */}
              <div className="p-6 flex-1 flex flex-col">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-[11px] font-mono font-semibold text-ink">{c.index}</span>
                  <span className="w-3 h-px bg-violet/60" />
                  <span className="text-[10px] uppercase tracking-[0.18em] text-violet font-medium">{c.tag}</span>
                </div>
                <h3 className="text-xl text-ink leading-snug font-semibold tracking-[-0.01em] text-balance">
                  {c.title}
                </h3>
                <p className="mt-2 text-[14px] text-ink-soft text-pretty leading-relaxed">{c.body.slice(0, 80)}…</p>

                <div className="mt-4 flex flex-wrap gap-1.5">
                  {c.outcomes.map((o) => (
                    <span key={o} className="inline-flex items-center gap-1.5 rounded-full border border-hairline bg-mist/40 px-2.5 py-1 text-[11px] text-ink">
                      <span className="w-1 h-1 rounded-full bg-gradient-bv" />
                      {o}
                    </span>
                  ))}
                </div>

                <div className="mt-auto pt-5 flex items-center justify-between text-sm">
                  <span className="text-violet font-medium">Try it live</span>
                  <ArrowRight size={15} strokeWidth={2} className="text-violet transition-transform group-hover:translate-x-0.5" />
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {open && <DemoModal card={open} onClose={() => setOpenId(null)} />}
      </AnimatePresence>
    </section>
  )
}

/* ─── Modal ─── */

function DemoModal({ card, onClose }: { card: CardData; onClose: () => void }) {
  const [resetKey, setResetKey] = useState(0)
  const [isDone, setIsDone] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-[80] flex items-center justify-center p-3 sm:p-4 lg:p-8"
      role="dialog"
      aria-modal="true"
      aria-labelledby={`modal-${card.id}-title`}
    >
      {/* Backdrop */}
      <motion.button
        type="button"
        aria-label="Close dialog"
        onClick={onClose}
        className="absolute inset-0 bg-ink/50 backdrop-blur-sm"
      />

      {/* Panel */}
      <motion.div
        initial={{ opacity: 0, y: 16, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 16, scale: 0.97 }}
        transition={{ duration: 0.3, ease }}
        className={`relative w-full max-h-[90vh] overflow-y-auto rounded-2xl sm:rounded-3xl border border-hairline bg-canvas shadow-lift ${
          card.frame === 'split' || card.frame === 'dashboard' ? 'max-w-[1400px]' : 'max-w-5xl'
        }`}
      >
        {/* Close */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="sticky top-5 ml-auto mr-5 mt-5 w-9 h-9 grid place-items-center rounded-full border border-hairline bg-canvas hover:bg-mist hover:border-ink-soft/30 transition-colors z-10 -mb-9"
        >
          <X size={16} strokeWidth={1.75} className="text-ink-soft" />
        </button>

        {/* Two-column layout */}
        <div className="p-5 sm:p-8 lg:p-10 pt-0">
          <div className={`grid gap-6 sm:gap-10 items-start ${card.frame === 'split' || card.frame === 'dashboard' ? 'lg:grid-cols-[3fr_8fr]' : 'lg:grid-cols-2'}`}>
            {/* Left: Description */}
            <div>
              <div className="flex items-center gap-2 mb-5">
                <span className="text-[12px] font-mono font-semibold text-ink">{card.index}</span>
                <span className="w-3 h-px bg-violet/60" />
                <span className="text-[10px] uppercase tracking-[0.2em] text-violet font-medium">{card.tag}</span>
              </div>

              <h3
                id={`modal-${card.id}-title`}
                className="text-2xl lg:text-3xl text-ink tracking-[-0.025em] leading-[1.1] font-semibold text-balance pr-12"
              >
                {card.headline}
              </h3>

              <div className="mt-4 flex flex-wrap gap-2">
                {card.outcomes.map((o) => (
                  <span key={o} className="inline-flex items-center gap-2 rounded-full border border-hairline bg-mist/40 px-3 py-1.5 text-xs text-ink">
                    <span className="w-1.5 h-1.5 rounded-full bg-gradient-bv" />
                    {o}
                  </span>
                ))}
              </div>

              <p className="mt-5 text-ink-soft text-pretty leading-relaxed text-[15px]">
                {card.body}
              </p>

              <ul className="mt-5 space-y-2.5">
                {card.bullets.map((b) => (
                  <li key={b} className="flex items-start gap-2.5 text-[14px] text-ink-soft">
                    <span className="mt-1.5 w-4 h-4 grid place-items-center rounded-full bg-gradient-bv-soft shrink-0">
                      <Check size={9} strokeWidth={3} className="text-violet" />
                    </span>
                    {b}
                  </li>
                ))}
              </ul>

              <div className="mt-6">
                <a
                  href="#cta"
                  onClick={onClose}
                  className="group inline-flex items-center gap-2 rounded-full bg-ink hover:bg-ink/90 text-canvas px-5 py-3 font-medium text-sm transition-colors"
                >
                  <span>Talk to us about this</span>
                  <ArrowRight size={15} strokeWidth={2} className="transition-transform group-hover:translate-x-0.5" />
                </a>
              </div>
            </div>

            {/* Right: Demo in device frame(s) */}
            <div className={`${card.frame === 'phone' ? 'flex flex-col items-center gap-4' : 'w-full overflow-x-auto'}`}>
              {card.frame === 'phone' && card.Demo ? (
                <>
                  <PhoneFrame key={resetKey}>
                    {card.id === 'frontdesk'
                      ? <FrontDeskDemo onAllAnswered={() => setIsDone(true)} />
                      : <card.Demo />}
                  </PhoneFrame>
                  {isDone && (
                    <button
                      onClick={() => { setResetKey((k) => k + 1); setIsDone(false) }}
                      className="flex items-center gap-1.5 text-xs text-ink-soft hover:text-ink transition-colors"
                    >
                      <RotateCcw size={12} strokeWidth={2} />
                      Try again
                    </button>
                  )}
                </>
              ) : card.frame === 'dashboard' && card.Demo ? (
                <card.Demo />
              ) : card.frame === 'split' ? (
                <InvisibleAssistantProvider>
                  <div className="flex flex-col sm:flex-row items-center sm:items-end gap-5 w-full">
                    {/* Phone: chat */}
                    <div className="flex flex-col items-center gap-4 shrink-0">
                      <PhoneFrame>
                        <BookingChat />
                      </PhoneFrame>
                      <BookingTryAgain />
                    </div>
                    {/* Monitor: calendar */}
                    <div className="flex-1 min-w-0 w-full">
                      <DesktopFrame>
                        <BookingCalendar />
                      </DesktopFrame>
                    </div>
                  </div>
                </InvisibleAssistantProvider>
              ) : null}
            </div>
          </div>


        </div>
      </motion.div>
    </motion.div>
  )
}

/* ─── Card mini-previews (unchanged from original) ─── */

function MessagePreview() {
  return (
    <div className="w-full max-w-[260px] mx-auto space-y-2">
      <div className="flex items-start gap-1.5">
        <div className="w-6 h-6 rounded-full bg-gradient-bv-soft grid place-items-center shrink-0">
          <span className="text-[9px] font-semibold text-gradient-bv">M</span>
        </div>
        <div className="flex-1 rounded-xl rounded-tl-sm bg-canvas border border-hairline px-2.5 py-1.5">
          <div className="text-[8px] uppercase tracking-wider text-ink-soft/70 mb-0.5 font-medium">Maya · just now</div>
          <div className="text-[10px] text-ink leading-snug">Can I get a quote for a 3-bed redesign?</div>
        </div>
      </div>
      <div className="flex items-start gap-1.5 justify-end">
        <div className="flex-1 max-w-[88%] rounded-xl rounded-tr-sm bg-gradient-bv px-2.5 py-1.5 shadow-card">
          <div className="flex items-center gap-1 text-[8px] uppercase tracking-wider text-canvas/80 mb-0.5 font-medium">
            <Wand size={8} strokeWidth={2} />Auto · 0.4s
          </div>
          <div className="text-[10px] text-canvas leading-snug">Hi Maya, happy to help! Could I grab your address and a few photos?</div>
        </div>
        <div className="w-6 h-6 rounded-full bg-ink grid place-items-center shrink-0">
          <Send size={9} strokeWidth={2} className="text-canvas" />
        </div>
      </div>
      <div className="flex items-center justify-end gap-1 text-[8px] text-ink-soft/70">
        <Check size={8} strokeWidth={2.5} className="text-emerald-600" />
        <Check size={8} strokeWidth={2.5} className="text-emerald-600 -ml-1.5" />
        <span>Read</span>
      </div>
    </div>
  )
}

function ChatPreview() {
  return (
    <div className="w-full max-w-[260px] mx-auto">
      <div className="rounded-xl border border-hairline bg-canvas overflow-hidden">
        <div className="px-3 py-2 border-b border-hairline flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <div className="w-5 h-5 rounded-full bg-gradient-bv grid place-items-center">
              <Wand size={9} strokeWidth={2} className="text-canvas" />
            </div>
            <div>
              <div className="text-[10px] font-semibold text-ink leading-tight">Verde Assistant</div>
              <div className="text-[8px] text-ink-soft">Always available</div>
            </div>
          </div>
          <span className="text-[8px] uppercase tracking-wider text-emerald-600 font-medium">Online</span>
        </div>
        <div className="p-2.5 space-y-2 bg-mist/30">
          <div className="flex justify-start">
            <div className="rounded-xl rounded-bl-sm bg-canvas border border-hairline px-2 py-1 max-w-[80%]">
              <div className="text-[10px] text-ink-soft">What are your hours?</div>
            </div>
          </div>
          <div className="flex justify-end">
            <div className="rounded-xl rounded-br-sm bg-gradient-bv px-2 py-1 max-w-[80%]">
              <div className="text-[10px] text-canvas">9 to 6, Mon to Fri. Want a slot?</div>
            </div>
          </div>
          <div className="flex items-center gap-0.5 px-1">
            <span className="w-1 h-1 rounded-full bg-violet animate-pulse" />
            <span className="w-1 h-1 rounded-full bg-violet animate-pulse [animation-delay:0.2s]" />
            <span className="w-1 h-1 rounded-full bg-violet animate-pulse [animation-delay:0.4s]" />
            <span className="text-[8px] text-ink-soft ml-0.5">typing…</span>
          </div>
        </div>
      </div>
    </div>
  )
}

function CalendarPreview() {
  return (
    <div className="w-full max-w-[260px] mx-auto">
      <div className="rounded-xl border border-hairline bg-canvas p-3">
        <div className="flex items-center justify-between mb-2.5">
          <div>
            <div className="text-[8px] text-ink-soft uppercase tracking-wider">March</div>
            <div className="text-xs font-semibold text-ink">Pick a slot</div>
          </div>
          <div className="flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-gradient-bv-soft">
            <CalendarClock size={9} className="text-violet" strokeWidth={2} />
            <span className="text-[8px] font-medium text-gradient-bv">+4</span>
          </div>
        </div>
        <div className="grid grid-cols-7 gap-1 mb-2">
          {['M','T','W','T','F','S','S'].map((d, i) => (
            <div key={i} className="text-center text-[7px] text-ink-soft/60 font-medium leading-none py-0.5">{d}</div>
          ))}
          {Array.from({ length: 14 }).map((_, i) => {
            const filled = [3, 7, 11].includes(i)
            const today = i === 5
            return (
              <div
                key={i}
                className={`aspect-square rounded grid place-items-center text-[8px] font-medium ${
                  today ? 'bg-gradient-bv text-canvas' : filled ? 'bg-violet/10 text-violet' : 'bg-mist text-ink-soft/50'
                }`}
              >
                {i + 1}
              </div>
            )
          })}
        </div>
        <div className="grid grid-cols-3 gap-1">
          {['9:00', '10:30', '2:00'].map((t, i) => (
            <div
              key={t}
              className={`text-center py-1 rounded text-[8px] font-medium ${
                i === 1 ? 'bg-gradient-bv text-canvas' : 'bg-mist text-ink-soft border border-hairline'
              }`}
            >
              {t}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}