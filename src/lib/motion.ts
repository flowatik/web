import type { Variants } from 'motion/react'

export const ease = [0.22, 1, 0.36, 1] as const

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease } },
}

export const stagger = (delay = 0.08): Variants => ({
  hidden: {},
  visible: {
    transition: {
      staggerChildren: delay,
    },
  },
})

export const viewportOnce = { once: true, margin: '-80px' } as const
