import { motion } from 'motion/react'
import { ArrowRight } from 'lucide-react'
import Button from '../ui/Button'
import Eyebrow from '../ui/Eyebrow'
import HeroScene from '../visuals/HeroScene'

export default function Hero() {
  return (
    <section
      id="top"
      className="relative min-h-screen flex flex-col justify-center pt-20 pb-12 sm:pt-24 sm:pb-16 lg:pt-32 lg:pb-20 overflow-hidden bg-canvas"
    >
      {/* Ambient glow — purely decorative */}
      <div aria-hidden className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 right-[5%] w-[700px] h-[700px] rounded-full bg-violet/[0.05] blur-3xl" />
        <div className="absolute top-[35%] -left-40 w-[600px] h-[600px] rounded-full bg-accent/[0.04] blur-3xl" />
      </div>
      <div className="w-full mx-auto px-5 sm:px-6 lg:px-8 max-w-7xl grid lg:grid-cols-12 gap-8 sm:gap-12 lg:gap-16 items-center relative">
        <motion.div
          className="lg:col-span-7"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <Eyebrow>Websites &amp; AI Automation</Eyebrow>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl text-ink tracking-[-0.03em] leading-[1.06] mt-5 sm:mt-6 text-balance font-semibold">
            A website that{' '}
            <span className="text-gradient-bv">works</span>
            <br className="hidden sm:block" />
            <span className="sm:hidden"> </span>while you don't.
          </h1>
          <p className="mt-5 sm:mt-7 text-base sm:text-lg text-ink-soft max-w-xl leading-relaxed text-pretty">
            We design premium websites for ambitious small businesses, then quietly automate
            the follow-ups, bookings, and busywork that eat your week.
          </p>
          <div className="mt-7 sm:mt-10 flex flex-col sm:flex-row flex-wrap gap-3">
            <Button href="#cta" variant="primary">
              Book a free strategy call
              <ArrowRight size={16} strokeWidth={2} />
            </Button>
            <Button href="#work" variant="ghost">
              See how it works
            </Button>
          </div>
          <p className="mt-6 text-sm text-ink-soft/70">
            No pitch. No obligation. 20 minutes.
          </p>
        </motion.div>

        <motion.div
          className="lg:col-span-5"
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
        >
          <HeroScene />
        </motion.div>
      </div>
    </section>
  )
}
