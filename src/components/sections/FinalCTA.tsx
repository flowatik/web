import { useState, useRef } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import {
  ArrowRight,
  Check,
  CheckCircle2,
  XCircle,
  X,
  Lock,
  Globe,
  Wand,
  Layers,
  Code,
  type LucideIcon,
} from 'lucide-react'
import Container from '../ui/Container'

type FormState = {
  firstName: string
  lastName: string
  email: string
  phone: string
  goal: string
  description: string
}

const initial: FormState = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  goal: '',
  description: '',
}

type GoalOption = {
  id: string
  Icon: LucideIcon
  label: string
  hint: string
}

const goalOptions: GoalOption[] = [
  { id: 'website', Icon: Globe, label: 'A new website', hint: 'Brand-new build' },
  { id: 'automation', Icon: Wand, label: 'AI automation', hint: 'On an existing site' },
  { id: 'both', Icon: Layers, label: 'Both', hint: 'A complete rebuild' },
  { id: 'tech', Icon: Code, label: 'Other', hint: 'Tech related' },
]

const trustPoints = [
  {
    stat: '5 sec',
    label: 'To earn trust online',
    body: 'We design every page to signal credibility before a single word is read.',
  },
  {
    stat: '3–5 weeks',
    label: 'From first call to live site',
    body: 'Clear milestones, real progress — no delays, no surprises.',
  },
  {
    stat: '24/7',
    label: 'Automations that never sleep',
    body: 'Bookings, follow-ups, and replies handled around the clock.',
  },
]

type NotificationState = { type: 'success' | 'error'; message: string } | null

export default function FinalCTA() {
  const [form, setForm] = useState<FormState>(initial)
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [notification, setNotification] = useState<NotificationState>(null)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((f) => ({ ...f, [key]: value }))
  }

  function showNotification(type: 'success' | 'error', message: string) {
    if (timerRef.current) clearTimeout(timerRef.current)
    setNotification({ type, message })
    timerRef.current = setTimeout(() => setNotification(null), 5000)
  }

  async function onSubmit(e: { preventDefault: () => void }) {
    e.preventDefault()
    if (!form.goal) return
    setLoading(true)

    const goalLabel = goalOptions.find((o) => o.id === form.goal)?.label ?? form.goal

    try {
      const res = await fetch('https://formsubmit.co/ajax/info@flowatik.com', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          'First Name': form.firstName,
          'Last Name': form.lastName,
          Email: form.email,
          Phone: form.phone || '—',
          Goal: goalLabel,
          Message: form.description || '—',
          _subject: `New Request – ${[form.firstName, form.lastName].filter(Boolean).join(' ')}`,
          _template: 'table',
          _captcha: 'false',
        }),
      })
      const data = await res.json()
      if (data.success === 'true' || data.success === true) {
        setSubmitted(true)
        showNotification('success', 'Your message was sent successfully!')
      } else {
        showNotification('error', 'Something went wrong. Please try again.')
      }
    } catch {
      showNotification('error', 'Network error. Please check your connection and try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      {/* Notification */}
      <AnimatePresence>
        {notification && (
          <motion.div
            key="notification"
            initial={{ opacity: 0, y: -16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className={`fixed top-5 right-5 z-[200] flex items-center gap-3 px-4 py-3.5 rounded-2xl shadow-lift border max-w-sm backdrop-blur-md ${
              notification.type === 'success'
                ? 'bg-emerald-50/95 border-emerald-200 text-emerald-800'
                : 'bg-red-50/95 border-red-200 text-red-700'
            }`}
          >
            {notification.type === 'success' ? (
              <CheckCircle2 size={18} className="shrink-0 text-emerald-600" />
            ) : (
              <XCircle size={18} className="shrink-0 text-red-500" />
            )}
            <p className="text-sm font-medium">{notification.message}</p>
            <button
              type="button"
              onClick={() => setNotification(null)}
              className="ml-1 shrink-0 opacity-50 hover:opacity-100 transition-opacity"
              aria-label="Dismiss"
            >
              <X size={14} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <section
        id="cta"
        className="relative min-h-screen flex flex-col justify-center bg-white py-16 lg:py-20 overflow-hidden"
      >

        <Container>
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">

            {/* ── Left: pitch ── */}
            <motion.div
              className="lg:col-span-5"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Eyebrow pill — blue-tinted */}
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="inline-flex items-center gap-2.5 rounded-full border border-accent/20 bg-accent/[0.06] px-4 py-2 mb-7"
              >
                <span className="relative flex h-1.5 w-1.5 shrink-0">
                  <span className="absolute inset-0 rounded-full bg-emerald-500 animate-ping opacity-70" />
                  <span className="relative rounded-full h-1.5 w-1.5 bg-emerald-500" />
                </span>
                <span className="text-[11px] font-mono uppercase tracking-[0.22em] text-accent/70">
                  Start a project · Flowatik
                </span>
              </motion.div>

              <h2 className="text-4xl sm:text-5xl lg:text-[3.25rem] font-semibold text-ink tracking-[-0.035em] leading-[1.05] text-balance">
                Let's build something{' '}
                <span className="text-gradient-bv">that works</span>{' '}
                for you.
              </h2>

              <p className="mt-5 text-base text-ink-soft max-w-sm leading-relaxed text-pretty">
                Tell us what you do and what's eating your week. We'll come back with
                a clear, honest plan — no pitch, no pressure.
              </p>

              {/* Trust stat cards */}
              <div className="mt-10 space-y-3">
                {trustPoints.map((t, i) => (
                  <motion.div
                    key={t.stat}
                    initial={{ opacity: 0, x: -14 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: 0.1 + i * 0.08 }}
                    className="flex items-center gap-4 rounded-2xl border border-hairline bg-white px-5 py-4 shadow-card hover:border-accent/25 hover:shadow-lift hover:-translate-y-0.5 transition-all duration-300"
                  >
                    <div className="shrink-0 w-16 text-right">
                      <span className="text-[1.45rem] font-bold text-gradient-bv tabular-nums leading-none">
                        {t.stat}
                      </span>
                    </div>
                    <div className="w-px self-stretch bg-hairline" />
                    <div>
                      <div className="text-[13px] font-semibold text-ink leading-tight">{t.label}</div>
                      <div className="mt-0.5 text-[11px] text-ink-soft/70 leading-relaxed">{t.body}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* ── Right: form ── */}
            <motion.div
              className="lg:col-span-7"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.12 }}
            >
              {/* Gradient border — blue-dominant (65% blue, 35% purple) */}
              <div
                className="rounded-3xl p-px"
                style={{
                  background: 'linear-gradient(135deg, rgba(23,71,255,0.45) 0%, rgba(124,58,255,0.25) 65%, rgba(23,71,255,0.3) 100%)',
                }}
              >
                <div className="relative rounded-[23px] bg-white p-6 lg:p-8 overflow-hidden">

                  {/* Form header */}
                  <div className="relative mb-6">
                    <p className="text-[10px] font-mono uppercase tracking-[0.22em] text-ink-soft/45 mb-1.5">
                      Your project brief
                    </p>
                    <h3 className="text-xl font-semibold text-ink tracking-[-0.02em]">
                      Tell us about your project
                    </h3>
                  </div>

                  {submitted ? (
                    <SuccessState firstName={form.firstName} />
                  ) : (
                    <form onSubmit={onSubmit} className="relative space-y-5">
                      <div className="grid sm:grid-cols-2 gap-4">
                        <LightField label="First name" id="firstName" required value={form.firstName} onChange={(v) => update('firstName', v)} placeholder="Karim" autoComplete="given-name" />
                        <LightField label="Last name" id="lastName" required value={form.lastName} onChange={(v) => update('lastName', v)} placeholder="Doueik" autoComplete="family-name" />
                      </div>

                      <div className="grid sm:grid-cols-2 gap-4">
                        <LightField label="Email" id="email" type="email" required value={form.email} onChange={(v) => update('email', v)} placeholder="youremail@example.com" autoComplete="email" />
                        <LightField label="Phone" id="phone" type="tel" value={form.phone} onChange={(v) => update('phone', v)} placeholder="+961 71 234 567" autoComplete="tel" />
                      </div>

                      <LightChipSelector
                        label="What would you like to do?"
                        value={form.goal}
                        onChange={(v) => update('goal', v)}
                        options={goalOptions}
                        required
                      />

                      <div>
                        <label htmlFor="description" className="block text-[11px] font-semibold uppercase tracking-[0.1em] text-ink-soft/60 mb-2">
                          Your goals
                        </label>
                        <textarea
                          id="description"
                          name="description"
                          rows={3}
                          value={form.description}
                          onChange={(e) => update('description', e.target.value)}
                          placeholder="More bookings, less time replying to emails, a site that finally looks the part…"
                          className="w-full rounded-xl border border-hairline bg-white px-4 py-3 text-sm text-ink placeholder:text-ink-soft/35 focus:border-accent/50 focus:outline-none focus:ring-4 focus:ring-accent/[0.08] transition-all resize-none leading-relaxed"
                        />
                      </div>

                      <div className="flex flex-wrap items-center justify-between gap-4 pt-1">
                        <p className="flex items-center gap-1.5 text-xs text-ink-soft/45">
                          <Lock size={11} strokeWidth={2} />
                          Confidential and never shared.
                        </p>
                        <button
                          type="submit"
                          disabled={!form.goal || loading}
                          className="group relative overflow-hidden inline-flex items-center gap-2 rounded-full bg-gradient-bv text-canvas px-7 py-3 font-semibold text-sm shadow-[0_4px_24px_rgba(23,71,255,0.35)] hover:shadow-[0_4px_32px_rgba(23,71,255,0.5)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed disabled:shadow-none"
                        >
                          <span
                            aria-hidden
                            className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/15 to-transparent"
                          />
                          {loading ? (
                            <>
                              <span>Sending…</span>
                              <motion.span
                                animate={{ rotate: 360 }}
                                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                                className="inline-block w-4 h-4 border-2 border-canvas/30 border-t-canvas rounded-full"
                              />
                            </>
                          ) : (
                            <>
                              <span>Send request</span>
                              <ArrowRight size={14} strokeWidth={2.5} className="transition-transform group-hover:translate-x-0.5" />
                            </>
                          )}
                        </button>
                      </div>
                    </form>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        </Container>
      </section>
    </>
  )
}

/* ── Light-themed form primitives ── */

type FieldProps = {
  label: string
  id: string
  type?: string
  required?: boolean
  value: string
  onChange: (value: string) => void
  placeholder?: string
  autoComplete?: string
}

function LightField({ label, id, type = 'text', required, value, onChange, placeholder, autoComplete }: FieldProps) {
  return (
    <div>
      <label htmlFor={id} className="block text-[11px] font-semibold uppercase tracking-[0.1em] text-ink-soft/60 mb-2">
        {label}
        {required && <span className="text-accent ml-1">*</span>}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        autoComplete={autoComplete}
        className="w-full rounded-xl border border-hairline bg-white px-4 py-3 text-sm text-ink placeholder:text-ink-soft/35 focus:border-accent/50 focus:outline-none focus:ring-4 focus:ring-accent/[0.08] transition-all"
      />
    </div>
  )
}

type ChipSelectorProps = {
  label: string
  value: string
  onChange: (value: string) => void
  options: GoalOption[]
  required?: boolean
}

function LightChipSelector({ label, value, onChange, options, required }: ChipSelectorProps) {
  return (
    <fieldset>
      <legend className="block text-[11px] font-semibold uppercase tracking-[0.1em] text-ink-soft/60 mb-3">
        {label}
        {required && <span className="text-accent ml-1">*</span>}
      </legend>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5">
        {options.map((o) => {
          const selected = value === o.id
          return (
            <button
              key={o.id}
              type="button"
              role="radio"
              aria-checked={selected}
              onClick={() => onChange(o.id)}
              className={`group relative text-left rounded-2xl border p-4 transition-all duration-200 focus:outline-none focus-visible:ring-4 focus-visible:ring-accent/20 ${
                selected
                  ? 'border-accent/30 bg-gradient-to-b from-accent/[0.08] to-violet/[0.03] shadow-[0_2px_20px_rgba(23,71,255,0.1)]'
                  : 'border-hairline bg-white hover:border-accent/20 hover:bg-mist'
              }`}
            >
              <span
                aria-hidden
                className={`absolute top-3 right-3 w-4 h-4 rounded-full grid place-items-center transition-all duration-200 ${
                  selected ? 'bg-gradient-bv scale-100 opacity-100' : 'scale-75 opacity-0'
                }`}
              >
                <Check size={9} strokeWidth={3} className="text-canvas" />
              </span>

              <span className={`inline-flex w-9 h-9 rounded-xl items-center justify-center transition-all duration-200 ${
                selected
                  ? 'bg-gradient-bv shadow-[0_2px_12px_rgba(23,71,255,0.35)]'
                  : 'bg-mist group-hover:bg-hairline'
              }`}>
                <o.Icon size={16} strokeWidth={1.75} className={selected ? 'text-canvas' : 'text-ink-soft'} />
              </span>

              <div className="mt-3">
                <div className={`text-xs font-semibold leading-tight ${selected ? 'text-gradient-bv' : 'text-ink'}`}>
                  {o.label}
                </div>
                <div className="mt-0.5 text-[10px] text-ink-soft/55 leading-tight">{o.hint}</div>
              </div>
            </button>
          )
        })}
      </div>
    </fieldset>
  )
}

function SuccessState({ firstName }: { firstName: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.94 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="text-center py-12"
    >
      <div className="relative mx-auto w-20 h-20 flex items-center justify-center">
        <motion.span
          initial={{ scale: 0.7, opacity: 0.5 }}
          animate={{ scale: 1.6, opacity: 0 }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeOut' }}
          className="absolute inset-0 rounded-full bg-gradient-bv"
        />
        <motion.span
          initial={{ scale: 0.7, opacity: 0.5 }}
          animate={{ scale: 1.6, opacity: 0 }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeOut', delay: 0.5 }}
          className="absolute inset-0 rounded-full bg-gradient-bv"
        />
        <div className="relative w-16 h-16 rounded-full bg-gradient-bv grid place-items-center shadow-[0_4px_28px_rgba(23,71,255,0.4)]">
          <Check size={28} strokeWidth={2.5} className="text-canvas" />
        </div>
      </div>

      <h3 className="mt-7 text-2xl text-ink font-semibold tracking-[-0.02em]">
        Thanks{firstName ? `, ${firstName}` : ''}!
      </h3>
      <p className="mt-3 text-ink-soft max-w-xs mx-auto text-sm leading-relaxed">
        We'll read what you've shared and get back to you within one working day with a clear, honest plan.
      </p>

      <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-hairline bg-mist px-4 py-2">
        <span className="relative flex h-1.5 w-1.5 shrink-0">
          <span className="absolute inset-0 rounded-full bg-emerald-500 animate-ping opacity-60" />
          <span className="relative rounded-full h-1.5 w-1.5 bg-emerald-500" />
        </span>
        <span className="text-[11px] text-ink-soft/55">We reply within one business day</span>
      </div>
    </motion.div>
  )
}
