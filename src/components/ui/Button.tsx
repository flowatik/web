import type { ReactNode } from 'react'

type Variant = 'primary' | 'ghost'
type Size = 'md' | 'lg'

type Props = {
  children: ReactNode
  href?: string
  variant?: Variant
  size?: Size
  className?: string
  onClick?: () => void
}

const base =
  'inline-flex items-center justify-center gap-2 rounded-full font-medium transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2'

const variants: Record<Variant, string> = {
  primary: 'bg-ink text-canvas hover:bg-ink/90',
  ghost: 'bg-transparent text-ink border border-hairline hover:border-ink',
}

const sizes: Record<Size, string> = {
  md: 'px-6 py-3 text-sm',
  lg: 'px-8 py-4 text-base',
}

export default function Button({
  children,
  href,
  variant = 'primary',
  size = 'md',
  className = '',
  onClick,
}: Props) {
  const cls = `${base} ${variants[variant]} ${sizes[size]} ${className}`
  if (href) {
    return (
      <a href={href} className={cls} onClick={onClick}>
        {children}
      </a>
    )
  }
  return (
    <button type="button" className={cls} onClick={onClick}>
      {children}
    </button>
  )
}
