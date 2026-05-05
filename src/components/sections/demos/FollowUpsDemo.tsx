import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Mail, MessageSquare, Bell, Check, Clock, Send, Zap } from 'lucide-react'

const ease = [0.22, 1, 0.36, 1] as const

type Entry = {
  id: number
  channel: 'sms' | 'email' | 'push'
  to: string
  avatar: string
  subject: string
  body: string
  delay: string
}

const ENTRIES: Entry[] = [
  {
    id: 1,
    channel: 'email',
    to: 'Sarah Mitchell',
    avatar: 'SM',
    subject: 'Re: Your proposal',
    body: 'Hi Sarah, just checking in — did you have any questions about the proposal? Happy to hop on a quick call whenever suits you.',
    delay: 'Sent instantly',
  },
  {
    id: 2,
    channel: 'sms',
    to: 'James Wilson',
    avatar: 'JW',
    subject: 'Appointment reminder',
    body: 'Hi James! Friendly reminder about your consultation tomorrow at 10 AM. Looking forward to it!',
    delay: 'Sent 24h before',
  },
  {
    id: 3,
    channel: 'push',
    to: 'Nadia Kassem',
    avatar: 'NK',
    subject: 'Project brief ready',
    body: 'Hey Nadia, your project brief is ready for review. Take a look when you get a chance — no rush!',
    delay: 'Sent on completion',
  },
  {
    id: 4,
    channel: 'email',
    to: 'Omar Rahal',
    avatar: 'OR',
    subject: 'Welcome aboard',
    body: 'Hi Omar, thanks for choosing Flowatik! Your onboarding package is ready — check your inbox for next steps.',
    delay: 'Sent on sign-up',
  },
  {
    id: 5,
    channel: 'sms',
    to: 'Lara Boutros',
    avatar: 'LB',
    subject: 'Follow-up',
    body: 'Hi Lara, it has been a week since our last chat. Would you like to schedule a follow-up to go over the final details?',
    delay: 'Sent after 7 days',
  },
]

const channelMeta = {
  sms: { Icon: MessageSquare, label: 'SMS', gradient: 'from-emerald-500 to-teal-600' },
  email: { Icon: Mail, label: 'Email', gradient: 'from-accent to-accent-deep' },
  push: { Icon: Bell, label: 'Push', gradient: 'from-violet to-violet-deep' },
}

export default function FollowUpsDemo() {
  const [visible, setVisible] = useState<number[]>([])
  const [delivered, setDelivered] = useState<Set<number>>(new Set())

  useEffect(() => {
    setVisible([])
    setDelivered(new Set())

    const timers: ReturnType<typeof setTimeout>[] = []
    ENTRIES.forEach((e, i) => {
      // Appear
      timers.push(
        setTimeout(() => setVisible((p) => [...p, e.id]), 400 + i * 650)
      )
      // Mark delivered after appearing
      timers.push(
        setTimeout(() => setDelivered((p) => new Set(p).add(e.id)), 900 + i * 650)
      )
    })
    return () => timers.forEach(clearTimeout)
  }, [])

  const total = ENTRIES.length
  const sentCount = delivered.size

  return (
    <div className="flex flex-col h-full rounded-2xl border border-hairline bg-canvas overflow-hidden max-h-[540px]">
      {/* Dashboard header */}
      <div className="px-5 py-3.5 border-b border-hairline bg-canvas flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-gradient-bv grid place-items-center">
            <Zap size={14} strokeWidth={2} className="text-canvas" />
          </div>
          <div>
            <div className="text-[13px] font-semibold text-ink leading-tight">Outbound Queue</div>
            <div className="text-[10px] text-ink-soft/60">Automated follow-ups</div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200/50">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[10px] text-emerald-700 font-semibold tabular-nums">
              {sentCount}/{total} delivered
            </span>
          </div>
        </div>
      </div>

      {/* Column headers */}
      <div className="grid grid-cols-[1fr_80px_100px] gap-3 px-5 py-2 border-b border-hairline bg-mist/30 text-[9px] uppercase tracking-[0.15em] text-ink-soft/50 font-semibold shrink-0">
        <span>Recipient</span>
        <span>Channel</span>
        <span className="text-right">Status</span>
      </div>

      {/* Entries */}
      <div className="flex-1 overflow-y-auto">
        <AnimatePresence initial={false}>
          {ENTRIES.filter((e) => visible.includes(e.id)).map((e) => {
            const ch = channelMeta[e.channel]
            const isDone = delivered.has(e.id)
            return (
              <motion.div
                key={e.id}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                transition={{ duration: 0.4, ease }}
                className="border-b border-hairline last:border-b-0"
              >
                <div className="grid grid-cols-[1fr_80px_100px] gap-3 px-5 py-3.5 items-start">
                  {/* Recipient + message */}
                  <div className="flex items-start gap-3 min-w-0">
                    <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${ch.gradient} grid place-items-center shrink-0 text-[10px] font-bold text-white`}>
                      {e.avatar}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-[12px] font-semibold text-ink">{e.to}</span>
                        <span className="text-[9px] text-ink-soft/40">·</span>
                        <span className="text-[9px] text-ink-soft/40">{e.delay}</span>
                      </div>
                      <div className="text-[11px] text-ink-soft/70 font-medium mt-0.5">{e.subject}</div>
                      <div className="text-[10px] text-ink-soft/50 leading-relaxed mt-0.5 line-clamp-2">{e.body}</div>
                    </div>
                  </div>

                  {/* Channel badge */}
                  <div className="pt-0.5">
                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-semibold uppercase tracking-wider bg-gradient-to-r ${ch.gradient} text-white`}>
                      <ch.Icon size={9} strokeWidth={2} />
                      {ch.label}
                    </span>
                  </div>

                  {/* Status */}
                  <div className="flex items-center justify-end pt-0.5">
                    {isDone ? (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="flex items-center gap-1 text-emerald-600"
                      >
                        <Check size={11} strokeWidth={2.5} />
                        <span className="text-[10px] font-semibold">Delivered</span>
                      </motion.div>
                    ) : (
                      <div className="flex items-center gap-1 text-amber-500">
                        <Clock size={10} strokeWidth={2} className="animate-spin" style={{ animationDuration: '2s' }} />
                        <span className="text-[10px] font-medium">Sending…</span>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            )
          })}
        </AnimatePresence>

        {/* Empty state while loading */}
        {visible.length === 0 && (
          <div className="flex items-center justify-center py-12 text-[11px] text-ink-soft/40">
            <Send size={14} className="mr-2 animate-pulse" />
            Initializing queue…
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="px-5 py-2.5 border-t border-hairline bg-mist/20 shrink-0">
        <div className="flex items-center justify-between">
          <span className="text-[9px] text-ink-soft/40">
            All messages are sent automatically — zero manual effort
          </span>
          {sentCount === total && (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-[9px] text-emerald-600 font-semibold flex items-center gap-1"
            >
              <Check size={10} strokeWidth={2.5} />
              Queue complete
            </motion.span>
          )}
        </div>
      </div>
    </div>
  )
}
