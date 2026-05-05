import type { ReactNode } from 'react'

type Props = {
  children: ReactNode
  className?: string
}

export default function Eyebrow({ children, className = '' }: Props) {
  return (
    <span
      className={`inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-medium ${className}`}
    >
      <span className="w-6 h-px bg-gradient-bv" aria-hidden />
      <span className="text-gradient-bv">{children}</span>
    </span>
  )
}
