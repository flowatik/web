import { motion } from 'motion/react'
import Eyebrow from './Eyebrow'

type Props = {
  eyebrow: string
  title: string
  lede?: string
  align?: 'left' | 'center'
  className?: string
}

export default function SectionHeader({
  eyebrow,
  title,
  lede,
  align = 'center',
  className = '',
}: Props) {
  const isCenter = align === 'center'
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`${isCenter ? 'text-center mx-auto max-w-2xl' : ''} ${className}`}
    >
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 className="mt-6 font-serif text-4xl lg:text-5xl text-ink tracking-[-0.02em] leading-[1.1] text-balance">
        {title}
      </h2>
      {lede && (
        <p
          className={`mt-6 text-lg text-ink-soft text-pretty ${
            isCenter ? 'max-w-xl mx-auto' : 'max-w-xl'
          }`}
        >
          {lede}
        </p>
      )}
    </motion.div>
  )
}
