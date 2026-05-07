import { motion, useScroll, useTransform } from 'motion/react'
import { useRef } from 'react'
import Container from '../ui/Container'

export default function Pivot() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 85%', 'end 50%'],
  })
  const lineWidth = useTransform(scrollYProgress, [0, 0.6], [0, 1])

  return (
    <section
      ref={ref}
      className="relative py-24 sm:py-32 lg:py-40 overflow-hidden bg-ink"
    >
      <Container>
        <motion.div
          className="max-w-3xl mx-auto text-center"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="text-sm sm:text-base text-canvas/50 font-medium">
            You built the business. The website should carry its weight.
          </p>

          <h2 className="mt-6 sm:mt-8 text-2xl sm:text-3xl md:text-4xl lg:text-[2.75rem] text-canvas tracking-[-0.025em] leading-[1.2] text-balance">
            What if your site could{' '}
            <span className="relative inline-block">
              <span className="text-gradient-bv font-semibold">reply, book, and follow up</span>
              <motion.span
                aria-hidden
                className="absolute left-0 right-0 -bottom-0.5 sm:-bottom-1 h-0.5 sm:h-[3px] rounded-full origin-left bg-gradient-bv"
                style={{ scaleX: lineWidth }}
              />
            </span>{' '}
            — without you lifting a finger?
          </h2>

          {/* Separator */}
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-8 sm:mt-10 mx-auto h-px w-12 bg-canvas/20 origin-center"
            aria-hidden
          />

          <p className="mt-6 sm:mt-8 text-base sm:text-lg text-canvas/70 max-w-xl mx-auto text-pretty leading-relaxed">
            Three quiet automations turn your website from a brochure
            into a teammate that handles the busywork 24/7.
          </p>
        </motion.div>
      </Container>
    </section>
  )
}
