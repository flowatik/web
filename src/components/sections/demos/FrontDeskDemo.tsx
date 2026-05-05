import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Phone, Video, MoreVertical } from 'lucide-react'

const ease = [0.22, 1, 0.36, 1] as const

type Message = { role: 'user' | 'assistant'; content: string; time: string }

const QUESTIONS = [
  {
    label: "What are your operating hours?",
    reply: "We're open Monday–Friday, 9 AM to 6 PM 🕘 Reach out on weekends and we'll get back to you first thing Monday!",
  },
  {
    label: "Can I get a custom quote?",
    reply: "Of course! Share a few details about what you need and we'll send a tailored quote within the hour 👌",
  },
  {
    label: "How quickly can you start?",
    reply: "Most projects kick off within a week. We'll walk you through the timeline during your free consultation 🚀",
  },
]

function now() {
  return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}

const GREETING: Message = {
  role: 'assistant',
  content: "Hi there! 👋 How can I help you today?",
  time: now(),
}

export default function FrontDeskDemo({ onAllAnswered }: { onAllAnswered?: () => void } = {}) {
  const [messages, setMessages] = useState<Message[]>([GREETING])
  const [loading, setLoading] = useState(false)
  const [used, setUsed] = useState<Set<number>>(new Set())
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' })
  }, [messages, loading])

  const allAnswered = !loading && used.size === QUESTIONS.length
  useEffect(() => {
    if (allAnswered) onAllAnswered?.()
  }, [allAnswered]) // eslint-disable-line

  async function ask(i: number) {
    if (loading) return
    const q = QUESTIONS[i]
    setMessages((p) => [...p, { role: 'user', content: q.label, time: now() }])
    setUsed((p) => new Set(p).add(i))
    setLoading(true)
    await new Promise((r) => setTimeout(r, 1100))
    setMessages((p) => [...p, { role: 'assistant', content: q.reply, time: now() }])
    setLoading(false)
  }

  function reset() {
    setMessages([GREETING])
    setUsed(new Set())
    setLoading(false)
  }

  const remaining = QUESTIONS.map((_, i) => i).filter((i) => !used.has(i))

  return (
    <div className="flex flex-col h-full">

      {/* WhatsApp header */}
      <div
        className="pt-7 px-3 pb-2.5 flex items-center justify-between shrink-0"
        style={{ background: '#075E54' }}
      >
        <div className="flex items-center gap-2.5">
          {/* Avatar */}
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center text-white text-[11px] font-bold shrink-0"
            style={{ background: '#25D366' }}
          >
            FD
          </div>
          <div>
            <div className="text-[12px] font-semibold text-white leading-tight">Front Desk</div>
            <div className="text-[9px]" style={{ color: 'rgba(255,255,255,0.7)' }}>online</div>
          </div>
        </div>

        <div className="flex items-center gap-3.5">
          <Video size={17} strokeWidth={1.75} style={{ color: 'rgba(255,255,255,0.85)' }} />
          <Phone size={15} strokeWidth={1.75} style={{ color: 'rgba(255,255,255,0.85)' }} />
          <MoreVertical size={17} strokeWidth={1.75} style={{ color: 'rgba(255,255,255,0.85)' }} />
        </div>
      </div>

      {/* Chat background */}
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
          <span
            className="text-[9px] px-2.5 py-0.5 rounded-full"
            style={{ background: 'rgba(255,255,255,0.65)', color: '#5a5a5a' }}
          >
            TODAY
          </span>
        </div>

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
                <p className="text-[11px] leading-relaxed pr-7" style={{ color: '#303030' }}>
                  {m.content}
                </p>
                <div className="flex items-center justify-end gap-0.5 mt-0.5">
                  <span className="text-[8px]" style={{ color: '#999' }}>{m.time}</span>
                  {m.role === 'user' && (
                    <span className="text-[9px] font-medium" style={{ color: '#53bdeb' }}>✓✓</span>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Typing indicator */}
        {loading && (
          <motion.div
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-start"
          >
            <div
              className="rounded-r-xl rounded-bl-xl rounded-tl-sm px-3 py-2.5 shadow-sm flex items-center gap-1"
              style={{ background: '#FFFFFF' }}
            >
              {[0, 150, 300].map((delay) => (
                <span
                  key={delay}
                  className="w-1.5 h-1.5 rounded-full animate-bounce"
                  style={{ background: '#aaa', animationDelay: `${delay}ms` }}
                />
              ))}
            </div>
          </motion.div>
        )}
      </div>

      {/* Quick reply area — hidden once all answered */}
      {remaining.length > 0 && (
        <div
          className="p-2.5 shrink-0"
          style={{ background: '#F0F0F0', borderTop: '1px solid #ddd' }}
        >
          <div className="flex flex-col gap-1.5">
            {remaining.map((qi) => (
              <button
                key={qi}
                onClick={() => ask(qi)}
                disabled={loading}
                className="text-left rounded-full px-3 py-1.5 text-[10px] transition-all disabled:opacity-40 hover:brightness-95"
                style={{ background: '#FFFFFF', border: '1px solid #ddd', color: '#128C7E' }}
              >
                {QUESTIONS[qi].label}
              </button>
            ))}
          </div>
        </div>
      )}

    </div>
  )
}
