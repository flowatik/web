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
import Eyebrow from '../ui/Eyebrow'

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

const bullets = [
  'A free, 20-minute conversation',
  'A tailored plan in writing',
  'No slides. No pitch. No obligation.',
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
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
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
      {/* Notification center */}
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
        className="relative min-h-screen flex flex-col justify-center py-20 lg:py-24 overflow-hidden bg-canvas"
      >

        <Container>
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-start">
            {/* Left: pitch */}
            <motion.div
              className="lg:col-span-5"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <Eyebrow>Ready when you are</Eyebrow>
              <h2 className="mt-6 text-4xl lg:text-5xl text-ink tracking-[-0.025em] leading-[1.05] text-balance font-semibold">
                Ready to <span className="text-gradient-bv">upgrade</span>
                <br />
                your business?
              </h2>
              <p className="mt-6 text-lg text-ink-soft text-pretty max-w-md">
                Tell us a little about what you do, and we'll come back with a clear, honest plan
                for what a new site and a few smart automations could look like for you.
              </p>

              <ul className="mt-8 space-y-3.5">
                {bullets.map((b) => (
                  <li key={b} className="flex items-center gap-3">
                    <span className="w-5 h-5 rounded-full bg-gradient-bv grid place-items-center shrink-0">
                      <Check size={11} strokeWidth={2.5} className="text-canvas" />
                    </span>
                    <span className="text-ink">{b}</span>
                  </li>
                ))}
              </ul>

              {/* Talk-to card */}
              <div className="mt-10 rounded-2xl border border-hairline bg-canvas p-4 flex items-center gap-4 shadow-card max-w-sm">
                <div className="flex -space-x-2 shrink-0">
                  <span className="w-9 h-9 rounded-full bg-gradient-bv grid place-items-center text-canvas text-xs font-semibold border-2 border-canvas">
                    A
                  </span>
                  <span className="w-9 h-9 rounded-full bg-accent grid place-items-center text-canvas text-xs font-semibold border-2 border-canvas">
                    M
                  </span>
                  <span className="w-9 h-9 rounded-full bg-ink grid place-items-center text-canvas text-xs font-semibold border-2 border-canvas">
                    R
                  </span>
                </div>
                <div className="min-w-0">
                  <div className="text-sm font-semibold text-ink leading-tight">
                    Talk to a real person
                  </div>
                  <div className="text-xs text-ink-soft mt-0.5">
                    Typical reply in under 24 hours.
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right: form */}
            <motion.div
              className="lg:col-span-7"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            >
              <div className="relative rounded-3xl border border-hairline bg-canvas p-6 lg:p-8 shadow-card">
                <div
                  aria-hidden
                  className="absolute -top-px left-12 right-12 h-px bg-gradient-bv opacity-60"
                />

                {submitted ? (
                  <SuccessState firstName={form.firstName} />
                ) : (
                  <form onSubmit={onSubmit} className="space-y-5">
                    <div className="grid sm:grid-cols-2 gap-5">
                      <Field
                        label="First name"
                        id="firstName"
                        required
                        value={form.firstName}
                        onChange={(v) => update('firstName', v)}
                        placeholder="Karim"
                        autoComplete="given-name"
                      />
                      <Field
                        label="Last name"
                        id="lastName"
                        required
                        value={form.lastName}
                        onChange={(v) => update('lastName', v)}
                        placeholder="Doueik"
                        autoComplete="family-name"
                      />
                    </div>

                    <div className="grid sm:grid-cols-2 gap-5">
                      <Field
                        label="Email"
                        id="email"
                        type="email"
                        required
                        value={form.email}
                        onChange={(v) => update('email', v)}
                        placeholder="youremail@example.com"
                        autoComplete="email"
                      />
                      <Field
                        label="Phone"
                        id="phone"
                        type="tel"
                        value={form.phone}
                        onChange={(v) => update('phone', v)}
                        placeholder="+961 71 234 567"
                        autoComplete="tel"
                      />
                    </div>

                    <ChipSelector
                      label="What would you like to do?"
                      value={form.goal}
                      onChange={(v) => update('goal', v)}
                      options={goalOptions}
                      required
                    />

                    <div>
                      <label
                        htmlFor="description"
                        className="block text-sm font-medium text-ink mb-2"
                      >
                        What would you like to achieve?
                      </label>
                      <textarea
                        id="description"
                        name="description"
                        rows={3}
                        value={form.description}
                        onChange={(e) => update('description', e.target.value)}
                        placeholder="More bookings, less time replying to emails, a site that finally looks the part…"
                        className="w-full rounded-xl border border-hairline bg-mist/30 px-4 py-3 text-ink placeholder:text-ink-soft/50 focus:bg-canvas focus:border-violet focus:outline-none focus:ring-4 focus:ring-violet/10 transition-all resize-none"
                      />
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                      <p className="flex items-center gap-1.5 text-xs text-ink-soft/80">
                        <Lock size={12} strokeWidth={2} />
                        <span>Your information is confidential and never shared.</span>
                      </p>
                      <button
                        type="submit"
                        disabled={!form.goal || loading}
                        className="group inline-flex items-center gap-2 rounded-full bg-gradient-bv text-canvas px-6 py-3 font-medium text-sm shadow-card hover:opacity-95 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {loading ? (
                          <>
                            <span>Sending…</span>
                            <motion.span
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                              className="inline-block w-[15px] h-[15px] border-2 border-canvas/30 border-t-canvas rounded-full"
                            />
                          </>
                        ) : (
                          <>
                            <span>Send request</span>
                            <ArrowRight
                              size={15}
                              strokeWidth={2}
                              className="transition-transform group-hover:translate-x-0.5"
                            />
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        </Container>
      </section>
    </>
  )
}

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

function Field({
  label,
  id,
  type = 'text',
  required,
  value,
  onChange,
  placeholder,
  autoComplete,
}: FieldProps) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-ink mb-2">
        {label}
        {required && <span className="text-violet ml-1">*</span>}
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
        className="w-full rounded-xl border border-hairline bg-mist/30 px-4 py-3 text-ink placeholder:text-ink-soft/50 focus:bg-canvas focus:border-violet focus:outline-none focus:ring-4 focus:ring-violet/10 transition-all"
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

function ChipSelector({ label, value, onChange, options, required }: ChipSelectorProps) {
  return (
    <fieldset>
      <legend className="block text-sm font-medium text-ink mb-3">
        {label}
        {required && <span className="text-violet ml-1">*</span>}
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
              className={`group relative text-left rounded-2xl border p-3.5 transition-all duration-200 focus:outline-none focus-visible:ring-4 focus-visible:ring-violet/15 ${
                selected
                  ? 'border-violet/60 bg-gradient-bv-soft shadow-card'
                  : 'border-hairline bg-canvas hover:border-ink-soft/30'
              }`}
            >
              {/* Selection check mark */}
              <span
                aria-hidden
                className={`absolute top-3 right-3 w-4 h-4 rounded-full grid place-items-center transition-all ${
                  selected
                    ? 'bg-gradient-bv scale-100 opacity-100'
                    : 'bg-hairline scale-90 opacity-0 group-hover:opacity-50'
                }`}
              >
                <Check size={9} strokeWidth={3} className="text-canvas" />
              </span>

              <span
                className={`inline-flex w-9 h-9 rounded-xl items-center justify-center transition-colors ${
                  selected ? 'bg-gradient-bv' : 'bg-mist'
                }`}
              >
                <o.Icon
                  size={16}
                  strokeWidth={1.75}
                  className={selected ? 'text-canvas' : 'text-ink-soft'}
                />
              </span>

              <div className="mt-3">
                <div
                  className={`text-sm font-semibold leading-tight ${
                    selected ? 'text-gradient-bv' : 'text-ink'
                  }`}
                >
                  {o.label}
                </div>
                <div className="mt-0.5 text-[11px] text-ink-soft">{o.hint}</div>
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
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="text-center py-8"
    >
      <div className="mx-auto w-16 h-16 rounded-full bg-gradient-bv grid place-items-center shadow-card">
        <Check size={28} strokeWidth={2.5} className="text-canvas" />
      </div>
      <h3 className="mt-6 text-2xl text-ink font-semibold tracking-[-0.01em]">
        Thanks{firstName ? `, ${firstName}` : ''}.
      </h3>
      <p className="mt-3 text-ink-soft max-w-sm mx-auto">
        We'll read what you've sent and come back to you within one working day with a clear,
        honest plan.
      </p>
    </motion.div>
  )
}
