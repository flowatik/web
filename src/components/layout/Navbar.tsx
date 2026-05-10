import { useEffect, useState } from 'react'
import { Menu, X, Phone, Mail } from 'lucide-react'
import logoUrl from '../../assets/logo.png'

const links = [
  { href: '#work', label: 'Website' },
  { href: '#automation', label: 'Automation' },
  { href: '#deployment', label: 'Deployment' },
  { href: '#about', label: 'About' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
      return () => { document.body.style.overflow = '' }
    }
  }, [open])

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-canvas border-b border-hairline">
      {/* Main nav */}
      <div className="w-full mx-auto px-5 sm:px-6 lg:px-8 max-w-7xl flex items-center justify-between h-14 sm:h-16">
        {/* Logo */}
        <a href="#top" className="relative z-50">
          <img src={logoUrl} alt="Flowatik" className="h-12 sm:h-14 w-auto object-contain" fetchPriority="high" />
        </a>

        {/* Desktop nav links */}
        <nav className="hidden md:flex items-center gap-9">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="group relative text-sm text-ink-soft hover:text-ink transition-colors"
            >
              {link.label}
              <span
                aria-hidden
                className="absolute left-0 right-0 -bottom-1 h-px bg-ink origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"
              />
            </a>
          ))}
        </nav>

        {/* Desktop CTA */}
        <a
          href="#cta"
          className="hidden md:flex text-sm text-ink font-medium hover:text-ink-soft transition-colors items-center gap-1.5"
        >
          <span>Book a call</span>
          <span aria-hidden className="transition-transform group-hover:translate-x-0.5">→</span>
        </a>

        {/* Mobile hamburger */}
        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="md:hidden relative z-50 w-9 h-9 grid place-items-center rounded-lg hover:bg-mist transition-colors"
          aria-label={open ? 'Close menu' : 'Open menu'}
        >
          {open ? (
            <X size={20} strokeWidth={1.75} className="text-ink" />
          ) : (
            <Menu size={20} strokeWidth={1.75} className="text-ink" />
          )}
        </button>
      </div>

      {/* Mobile drawer — top accounts for contact bar (36px) + nav (56px/64px) */}
      <div
        className={`md:hidden fixed inset-0 top-14 sm:top-16 z-40 transition-all duration-300 ${
          open ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
        }`}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-ink/30 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        />

        {/* Panel */}
        <div
          className={`relative bg-canvas border-b border-hairline shadow-lift transition-transform duration-300 ${
            open ? 'translate-y-0' : '-translate-y-4'
          }`}
        >
          <nav className="px-6 py-6 space-y-1">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="block px-4 py-3 rounded-xl text-base text-ink font-medium hover:bg-mist transition-colors"
              >
                {link.label}
              </a>
            ))}
            <div className="pt-3 mt-3 border-t border-hairline">
              <a
                href="#cta"
                onClick={() => setOpen(false)}
                className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-ink text-canvas font-medium text-sm hover:bg-ink/90 transition-colors"
              >
                Book a call
                <span aria-hidden>→</span>
              </a>
            </div>
            <div className="pt-3 mt-1 border-t border-hairline flex flex-col gap-2.5 px-4">
              <a
                href="tel:+96178999508"
                className="flex items-center gap-2 text-sm text-ink-soft hover:text-ink transition-colors"
              >
                <Phone size={14} strokeWidth={2} />
                <span>+961 78 999 508</span>
              </a>
              <a
                href="mailto:info@flowatik.com"
                className="flex items-center gap-2 text-sm text-ink-soft hover:text-ink transition-colors"
              >
                <Mail size={14} strokeWidth={2} />
                <span>info@flowatik.com</span>
              </a>
            </div>
          </nav>
        </div>
      </div>
    </header>
  )
}
