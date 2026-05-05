import { createContext, useContext, useState, useRef, useEffect, type ReactNode } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Check, CalendarDays, Phone, Video, MoreVertical, RotateCcw } from 'lucide-react'

const ease = [0.22, 1, 0.36, 1] as const
const wait = (ms: number) => new Promise((r) => setTimeout(r, ms))

/* ─── Shared state via context so phone + monitor stay in sync ─── */

type Phase = 'idle' | 'step1' | 'step2' | 'step3' | 'step4' | 'done'
type Msg = { role: 'user' | 'assistant'; content: string; time?: string }

type DemoCtx = {
  phase: Phase
  messages: Msg[]
  booked: boolean
  run: () => void
  reset: () => void
}

const Ctx = createContext<DemoCtx>({
  phase: 'idle',
  messages: [],
  booked: false,
  run: () => {},
  reset: () => {},
})

const STEPS: Msg[] = [
  { role: 'user', content: 'Hi! Do you have a seat available next Tuesday at 2 PM?' },
  { role: 'assistant', content: 'Let me check… Yes! Tuesday, March 11 at 2 PM is open. Would you like me to book it?' },
  { role: 'user', content: 'Yes please, book it!' },
  { role: 'assistant', content: 'Done! You are confirmed for Tuesday, March 11 at 2 PM. See you then!' },
]

export function InvisibleAssistantProvider({ children }: { children: ReactNode }) {
  const [phase, setPhase] = useState<Phase>('idle')
  const [messages, setMessages] = useState<Msg[]>([])
  const [booked, setBooked] = useState(false)

  function t() {
    return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }

  async function run() {
    setMessages([])
    setBooked(false)

    setPhase('step1')
    setMessages([{ ...STEPS[0], time: t() }])
    await wait(1400)

    setPhase('step2')
    setMessages((p) => [...p, { ...STEPS[1], time: t() }])
    await wait(1600)

    setPhase('step3')
    setMessages((p) => [...p, { ...STEPS[2], time: t() }])
    await wait(1200)

    setPhase('step4')
    setMessages((p) => [...p, { ...STEPS[3], time: t() }])
    setBooked(true)
    await wait(400)

    setPhase('done')
  }

  function reset() {
    setPhase('idle')
    setMessages([])
    setBooked(false)
  }

  return <Ctx.Provider value={{ phase, messages, booked, run, reset }}>{children}</Ctx.Provider>
}

/* ─── Chat (for phone frame) ─── */

export function BookingChat() {
  const { phase, messages, run } = useContext(Ctx)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' })
  }, [messages, phase])

  const isTyping = ['step1', 'step3'].includes(phase) && messages.length % 2 !== 0

  return (
    <div className="flex flex-col h-full">

      {/* WhatsApp header */}
      <div className="pt-7 px-3 pb-2.5 flex items-center justify-between shrink-0" style={{ background: '#075E54' }}>
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-[11px] font-bold shrink-0" style={{ background: '#25D366' }}>
            BC
          </div>
          <div>
            <div className="text-[12px] font-semibold text-white leading-tight">Booking Chat</div>
            <div className="text-[9px]" style={{ color: 'rgba(255,255,255,0.7)' }}>online</div>
          </div>
        </div>
        <div className="flex items-center gap-3.5">
          <Video size={17} strokeWidth={1.75} style={{ color: 'rgba(255,255,255,0.85)' }} />
          <Phone size={15} strokeWidth={1.75} style={{ color: 'rgba(255,255,255,0.85)' }} />
          <MoreVertical size={17} strokeWidth={1.75} style={{ color: 'rgba(255,255,255,0.85)' }} />
        </div>
      </div>

      {/* Chat area */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto px-3 py-3 space-y-1.5 [&::-webkit-scrollbar]:hidden"
        style={{
          backgroundImage: 'url(/src/assets/wp-bg-img.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          scrollbarWidth: 'none',
          overscrollBehavior: 'contain',
        }}
      >
        {/* Date chip */}
        <div className="flex justify-center mb-3">
          <span className="text-[9px] px-2.5 py-0.5 rounded-full" style={{ background: 'rgba(255,255,255,0.65)', color: '#5a5a5a' }}>
            TODAY
          </span>
        </div>

        {phase === 'idle' ? (
          <div className="flex justify-center mt-4">
            <div className="rounded-xl px-4 py-3 text-center shadow-sm max-w-[85%]" style={{ background: 'rgba(255,255,255,0.92)' }}>
              <p className="text-[11px] mb-3" style={{ color: '#666' }}>
                Watch an AI book a seat and update the calendar live.
              </p>
              <button
                onClick={run}
                className="rounded-full px-4 py-1.5 text-[11px] font-medium text-white transition-opacity hover:opacity-90"
                style={{ background: '#25D366' }}
              >
                Start demo
              </button>
            </div>
          </div>
        ) : (
          <AnimatePresence initial={false}>
            {messages.map((m, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 6, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.28, ease }}
                className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`relative max-w-[82%] px-2.5 pt-1.5 pb-1 shadow-sm ${
                    m.role === 'user' ? 'rounded-l-xl rounded-br-xl rounded-tr-sm' : 'rounded-r-xl rounded-bl-xl rounded-tl-sm'
                  }`}
                  style={{ background: m.role === 'user' ? '#DCF8C6' : '#FFFFFF' }}
                >
                  <p className="text-[11px] leading-relaxed pr-6" style={{ color: '#303030' }}>{m.content}</p>
                  <div className="flex items-center justify-end gap-0.5 mt-0.5">
                    {m.time && <span className="text-[8px]" style={{ color: '#999' }}>{m.time}</span>}
                    {m.role === 'user' && (
                      <span className="text-[9px] font-medium" style={{ color: '#53bdeb' }}>✓✓</span>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}

            {isTyping && (
              <motion.div key="typing" initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} className="flex justify-start">
                <div className="rounded-r-xl rounded-bl-xl rounded-tl-sm px-3 py-2.5 shadow-sm flex items-center gap-1" style={{ background: '#FFFFFF' }}>
                  {[0, 150, 300].map((delay) => (
                    <span key={delay} className="w-1.5 h-1.5 rounded-full animate-bounce" style={{ background: '#aaa', animationDelay: `${delay}ms` }} />
                  ))}
                </div>
              </motion.div>
            )}

            {phase === 'done' && (
              <motion.div key="done" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-center">
                <span className="text-[9px] px-3 py-1 rounded-full flex items-center gap-1.5" style={{ background: 'rgba(255,255,255,0.75)', color: '#128C7E' }}>
                  <Check size={9} strokeWidth={3} />
                  Appointment confirmed
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        )}
      </div>

      {/* WhatsApp-style input bar (decorative) */}
      <div className="px-2.5 py-2 flex items-center gap-2 shrink-0" style={{ background: '#F0F0F0', borderTop: '1px solid #ddd' }}>
        <div className="flex-1 rounded-full px-3 py-1.5 text-[10px]" style={{ background: '#FFFFFF', color: '#999' }}>
          {phase === 'idle' ? 'Tap Start demo above…' : phase === 'done' ? 'Done!' : 'Processing…'}
        </div>
      </div>

    </div>
  )
}

/* ─── Try-again button (rendered outside the phone frame) ─── */

export function BookingTryAgain() {
  const { phase, reset } = useContext(Ctx)
  if (phase !== 'done') return null
  return (
    <button
      onClick={reset}
      className="flex items-center gap-1.5 text-xs text-ink-soft hover:text-ink transition-colors"
    >
      <RotateCcw size={12} strokeWidth={2} />
      Try again
    </button>
  )
}

/* ─── Calendar (for monitor/desktop frame) ─── */

const HOURS = ['9 AM', '10 AM', '11 AM', '12 PM', '1 PM', '2 PM', '3 PM', '4 PM']

const CAL_DAYS = [
  { label: 'Mon', date: 10, open: [true, false, true, false, true, false, false, true] },
  { label: 'Tue', date: 11, open: [false, true, false, true, false, true, true, false] },
  { label: 'Wed', date: 12, open: [true, false, true, false, false, true, false, false] },
  { label: 'Thu', date: 13, open: [false, true, false, true, true, false, true, false] },
  { label: 'Fri', date: 14, open: [true, false, false, false, true, false, false, true] },
]

const T_DAY = 1 // Tue
const T_HOUR = 5 // 2 PM

export function BookingCalendar() {
  const { phase, booked } = useContext(Ctx)

  return (
    <div className="flex flex-col h-full">
      {/* Dashboard header */}
      <div className="px-5 py-3 border-b border-hairline bg-canvas flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2">
          <CalendarDays size={14} className="text-violet" />
          <span className="text-[13px] font-semibold text-ink">Business Calendar</span>
        </div>
        <span className="text-[10px] text-ink-soft/50 font-medium">March 2025</span>
      </div>

      {/* Calendar grid */}
      <div className="flex-1 p-4 bg-mist/10 overflow-y-auto">
        <div className="grid grid-cols-[56px_repeat(5,1fr)] gap-[3px]">
          {/* Header row */}
          <div />
          {CAL_DAYS.map((d) => (
            <div key={d.label} className="text-center py-1.5">
              <div className="text-[11px] font-semibold text-ink">{d.label}</div>
              <div className="text-[9px] text-ink-soft/40">Mar {d.date}</div>
            </div>
          ))}

          {/* Time slots */}
          {HOURS.map((hour, hi) => (
            <>
              <div
                key={`h-${hi}`}
                className="text-[10px] text-ink-soft/50 pr-2 flex items-center justify-end font-medium"
              >
                {hour}
              </div>
              {CAL_DAYS.map((d, di) => {
                const isTarget = booked && di === T_DAY && hi === T_HOUR
                const isAnimating = phase === 'step4' && !booked && di === T_DAY && hi === T_HOUR

                return (
                  <div
                    key={`${di}-${hi}`}
                    className={`relative h-7 rounded-md transition-all duration-500 ${
                      isTarget
                        ? 'bg-gradient-bv shadow-sm ring-2 ring-violet/30'
                        : isAnimating
                        ? 'bg-violet/25 animate-pulse'
                        : d.open[hi]
                        ? 'bg-emerald-50 border border-emerald-200/50'
                        : 'bg-mist/50 border border-hairline'
                    }`}
                  >
                    {isTarget && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.4, ease, delay: 0.1 }}
                        className="absolute inset-0 flex items-center justify-center gap-1"
                      >
                        <Check size={10} strokeWidth={3} className="text-canvas" />
                        <span className="text-[8px] text-canvas font-semibold">Booked</span>
                      </motion.div>
                    )}
                    {d.open[hi] && !isTarget && !isAnimating && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-[7px] text-emerald-500/60 font-medium">Open</span>
                      </div>
                    )}
                  </div>
                )
              })}
            </>
          ))}
        </div>

        {/* Legend */}
        <div className="flex items-center gap-4 mt-4 px-1">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded bg-emerald-50 border border-emerald-200/50" />
            <span className="text-[10px] text-ink-soft/50">Available</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded bg-mist/50 border border-hairline" />
            <span className="text-[10px] text-ink-soft/50">Unavailable</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded bg-gradient-bv" />
            <span className="text-[10px] text-ink-soft/50">Just booked</span>
          </div>
        </div>
      </div>

      {/* Status bar */}
      <div className="px-5 py-2.5 border-t border-hairline bg-canvas shrink-0">
        <AnimatePresence mode="wait">
          {booked ? (
            <motion.div key="b" initial={{ opacity: 0, y: 3 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-2 text-[11px]">
              <Check size={12} strokeWidth={2.5} className="text-emerald-600" />
              <span className="text-emerald-700 font-medium">Tue Mar 11, 2:00 PM — confirmed automatically</span>
            </motion.div>
          ) : (
            <motion.div key="i" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-[10px] text-ink-soft/40">
              {phase === 'idle' ? 'Waiting for booking request…' : 'Syncing with chat…'}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
