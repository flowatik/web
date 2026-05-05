import { Link } from 'react-router-dom'
import { ArrowUpRight, Mail, Phone } from 'lucide-react'

const socials = [
  {
    label: 'LinkedIn',
    href: '#',
    path: (
      <>
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6Z" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <rect x="2" y="9" width="4" height="12" rx="0.5" fill="none" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="4" cy="4" r="2" fill="none" stroke="currentColor" strokeWidth="1.5" />
      </>
    ),
  },
  {
    label: 'Instagram',
    href: '#',
    path: (
      <>
        <rect x="3" y="3" width="18" height="18" rx="5" fill="none" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="17.5" cy="6.5" r="0.75" fill="currentColor" />
      </>
    ),
  },
  {
    label: 'X',
    href: '#',
    path: (
      <path d="M4 4l16 16M20 4 4 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    ),
  },
]

export default function Footer() {
  return (
    <footer className="relative bg-canvas border-t border-hairline">
      <div className="w-full mx-auto px-6 lg:px-8 max-w-7xl">

        {/* Top: CTA strip */}
        <div className="pt-16 lg:pt-20 pb-14 flex flex-col sm:flex-row sm:items-end justify-between gap-8 border-b border-hairline">
          <div>
            <span className="relative inline-flex w-8 h-8 grid place-items-center">
              <span className="absolute inset-0 rounded-full bg-gradient-bv opacity-20" />
              <span className="absolute inset-1 rounded-full bg-gradient-bv" />
              <span className="absolute inset-[9px] rounded-full bg-canvas" />
            </span>
            <h4 className="mt-6 text-3xl lg:text-4xl font-semibold text-ink tracking-[-0.025em] leading-[1.1] max-w-xs">
              Ready to build<br />something great?
            </h4>
          </div>

          <div className="flex flex-col sm:items-end gap-4 shrink-0">
            <div className="flex items-center gap-2 text-xs text-ink-soft/60">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-60 animate-ping" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" />
              </span>
              <span>Available for one new project this month</span>
            </div>
            <a
              href="#cta"
              className="group inline-flex items-center gap-2 rounded-full bg-ink text-canvas px-5 py-2.5 text-sm font-medium hover:bg-ink/80 transition-colors duration-200"
            >
              <span>Start a conversation</span>
              <ArrowUpRight size={14} strokeWidth={2} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>
        </div>

        {/* Middle: nav + contact grid */}
        <div className="py-12 grid grid-cols-2 md:grid-cols-4 gap-y-10 gap-x-8">

          <div>
            <p className="text-[10px] uppercase tracking-[0.22em] text-ink-soft/50 font-mono mb-4">Solutions</p>
            <ul className="space-y-2.5">
              {[
                ['The Website', '#work'],
                ['The Automation', '#automation'],
                ['Deployment', '#deployment'],
              ].map(([label, href]) => (
                <li key={label}>
                  <a href={href} className="text-sm text-ink-soft hover:text-ink transition-colors">{label}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-[10px] uppercase tracking-[0.22em] text-ink-soft/50 font-mono mb-4">Company</p>
            <ul className="space-y-2.5">
              {[
                ['About', '#about'],
                ['Book a call', '#cta'],
              ].map(([label, href]) => (
                <li key={label}>
                  <a href={href} className="text-sm text-ink-soft hover:text-ink transition-colors">{label}</a>
                </li>
              ))}
              <li>
                <Link to="/privacy" className="text-sm text-ink-soft hover:text-ink transition-colors">Privacy</Link>
              </li>
              <li>
                <Link to="/terms" className="text-sm text-ink-soft hover:text-ink transition-colors">Terms</Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="text-[10px] uppercase tracking-[0.22em] text-ink-soft/50 font-mono mb-4">Contact</p>
            <ul className="space-y-3">
              <li>
                <a href="mailto:info@flowatik.com" className="flex items-center gap-2 text-sm text-ink-soft hover:text-ink transition-colors">
                  <Mail size={13} strokeWidth={1.75} className="shrink-0" />
                  <span>info@flowatik.com</span>
                </a>
              </li>
              <li>
                <a href="tel:+96178896067" className="flex items-center gap-2 text-sm text-ink-soft hover:text-ink transition-colors">
                  <Phone size={13} strokeWidth={1.75} className="shrink-0" />
                  <span>+961 78 896 067</span>
                </a>
              </li>
            </ul>
          </div>

          <div>
            <p className="text-[10px] uppercase tracking-[0.22em] text-ink-soft/50 font-mono mb-4">Follow</p>
            <div className="flex gap-2.5">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="w-9 h-9 grid place-items-center rounded-full border border-hairline text-ink-soft hover:border-ink hover:text-ink transition-colors"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" aria-hidden>{s.path}</svg>
                </a>
              ))}
            </div>
          </div>

        </div>

        {/* Bottom strip */}
        <div className="border-t border-hairline py-6 flex flex-wrap items-center justify-between gap-3">
          <p className="text-[11px] uppercase tracking-[0.18em] text-ink-soft/40 font-mono">
            © {new Date().getFullYear()} Flowatik. All rights reserved.
          </p>
          <p className="text-[11px] uppercase tracking-[0.18em] text-ink-soft/40 font-mono">
            Designed and built in-house.
          </p>
        </div>

      </div>
    </footer>
  )
}
