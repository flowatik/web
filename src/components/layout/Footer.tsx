import { Link } from 'react-router-dom'
import { ArrowUpRight, Mail, Phone } from 'lucide-react'

const connectItems = [
  {
    label: 'info@flowatik.com',
    href: 'mailto:info@flowatik.com',
    icon: <Mail size={12} strokeWidth={1.75} />,
  },
  {
    label: '+961 78 999 508',
    href: 'tel:+96178999508',
    icon: <Phone size={12} strokeWidth={1.75} />,
  },
  {
    label: '@flowatik.ai',
    href: 'https://instagram.com/flowatik.ai',
    icon: (
      <svg width="12" height="12" viewBox="0 0 24 24" aria-hidden>
        <rect x="3" y="3" width="18" height="18" rx="5" fill="none" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="17.5" cy="6.5" r="0.75" fill="currentColor" />
      </svg>
    ),
  },
  {
    label: '+961 78 999 508',
    href: 'https://wa.me/96178999508',
    icon: (
      <svg width="12" height="12" viewBox="0 0 24 24" aria-hidden>
        <path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.832-1.438A9.955 9.955 0 0 0 12 22c5.523 0 10-4.477 10-10S17.523 2 12 2Z" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M8.5 9.5c.2.8.8 2.2 2 3.4 1.2 1.2 2.6 1.8 3.4 2 .4.1.7 0 .9-.2l.7-.7c.2-.2.5-.2.7 0l1.4 1.4c.2.2.2.5 0 .7l-.6.6c-.6.6-1.5.8-2.3.5-1.3-.5-3.1-1.5-4.5-2.9S8.1 11.3 7.6 10c-.3-.8-.1-1.7.5-2.3l.6-.6c.2-.2.5-.2.7 0l1.4 1.4c.2.2.2.5 0 .7l-.7.7c-.2.2-.3.5-.2.9Z" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
]

export default function Footer() {
  return (
    <footer className="relative bg-canvas overflow-hidden">
      {/* Top border */}
      <div
        aria-hidden
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent 0%, transparent 25%, #0a0f1f 45%, #0a0f1f 55%, transparent 75%, transparent 100%)' }}
      />


      <div className="w-full mx-auto px-6 lg:px-8 max-w-7xl">

        {/* Top: CTA strip */}
        <div className="relative pt-16 lg:pt-20 pb-14 flex flex-col sm:flex-row sm:items-end justify-between gap-8 border-b border-hairline">
          <div>
            {/* Brand mark + name */}
            <div className="flex items-center gap-2 mb-6">
              <span className="relative inline-flex w-7 h-7">
                <span className="absolute inset-0 rounded-full bg-gradient-bv opacity-20" />
                <span className="absolute inset-1 rounded-full bg-gradient-bv" />
                <span className="absolute inset-[7px] rounded-full bg-canvas" />
              </span>
              <span className="text-sm font-semibold text-ink tracking-tight">Flowatik</span>
            </div>

            <h4 className="text-3xl lg:text-4xl font-semibold text-ink tracking-[-0.03em] leading-[1.1] max-w-xs">
              Ready to build<br />something great?
            </h4>
          </div>

          <div className="flex flex-col sm:items-end gap-4 shrink-0">
            <div className="flex items-center gap-2 text-xs text-ink-soft/55">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-60 animate-ping" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" />
              </span>
              <span>Available for one new project this month</span>
            </div>
            <a
              href="#cta"
              className="group relative overflow-hidden inline-flex items-center gap-2 rounded-full bg-gradient-bv text-canvas px-6 py-2.5 text-sm font-semibold shadow-[0_4px_20px_rgba(124,58,255,0.3)] hover:shadow-[0_4px_28px_rgba(124,58,255,0.45)] hover:-translate-y-0.5 transition-all duration-200"
            >
              <span
                aria-hidden
                className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/15 to-transparent"
              />
              <span>Start a conversation</span>
              <ArrowUpRight size={14} strokeWidth={2} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>
        </div>

        {/* Middle: nav + connect grid */}
        <div className="py-12 grid grid-cols-2 md:grid-cols-3 gap-y-10 gap-x-8">

          <div>
            <p className="text-[10px] uppercase tracking-[0.22em] text-ink-soft/45 font-mono mb-4">Solutions</p>
            <ul className="space-y-2.5">
              {[
                ['The Website', '#work'],
                ['The Automation', '#automation'],
                ['Deployment', '#deployment'],
              ].map(([label, href]) => (
                <li key={label}>
                  <a
                    href={href}
                    className="group inline-flex items-center gap-1 text-sm text-ink-soft hover:text-ink transition-colors duration-200"
                  >
                    <span className="relative after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-ink after:transition-all after:duration-200 group-hover:after:w-full">
                      {label}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-[10px] uppercase tracking-[0.22em] text-ink-soft/45 font-mono mb-4">Company</p>
            <ul className="space-y-2.5">
              {[
                ['About', '#about'],
                ['Book a call', '#cta'],
              ].map(([label, href]) => (
                <li key={label}>
                  <a
                    href={href}
                    className="group inline-flex items-center gap-1 text-sm text-ink-soft hover:text-ink transition-colors duration-200"
                  >
                    <span className="relative after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-ink after:transition-all after:duration-200 group-hover:after:w-full">
                      {label}
                    </span>
                  </a>
                </li>
              ))}
              <li>
                <Link
                  to="/privacy"
                  className="group inline-flex items-center gap-1 text-sm text-ink-soft hover:text-ink transition-colors duration-200"
                >
                  <span className="relative after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-ink after:transition-all after:duration-200 group-hover:after:w-full">
                    Privacy
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  to="/terms"
                  className="group inline-flex items-center gap-1 text-sm text-ink-soft hover:text-ink transition-colors duration-200"
                >
                  <span className="relative after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-ink after:transition-all after:duration-200 group-hover:after:w-full">
                    Terms
                  </span>
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="text-[10px] uppercase tracking-[0.22em] text-ink-soft/45 font-mono mb-4">Connect</p>
            <ul className="space-y-3">
              {connectItems.map((item) => (
                <li key={item.label + item.href}>
                  <a
                    href={item.href}
                    target={item.href.startsWith('http') ? '_blank' : undefined}
                    rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="group flex items-center gap-2.5 text-sm text-ink-soft hover:text-ink transition-colors duration-200"
                  >
                    <span className="flex-shrink-0 w-7 h-7 rounded-lg border border-hairline bg-mist grid place-items-center group-hover:border-ink/20 group-hover:bg-mist-warm transition-colors duration-200">
                      {item.icon}
                    </span>
                    <span>{item.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Bottom strip */}
        <div className="border-t border-hairline py-6 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="relative inline-flex w-3.5 h-3.5">
              <span className="absolute inset-0 rounded-full bg-gradient-bv opacity-25" />
              <span className="absolute inset-0.5 rounded-full bg-gradient-bv" />
              <span className="absolute inset-[5px] rounded-full bg-canvas" />
            </span>
            <p className="text-[11px] uppercase tracking-[0.18em] text-ink-soft/40 font-mono">
              © {new Date().getFullYear()} Flowatik. All rights reserved.
            </p>
          </div>
          <p className="text-[11px] uppercase tracking-[0.18em] text-ink-soft/40 font-mono">
            Designed and built in-house.
          </p>
        </div>

      </div>
    </footer>
  )
}
