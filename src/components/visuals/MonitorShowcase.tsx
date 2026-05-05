import { motion } from 'motion/react'
import { ArrowUpRight } from 'lucide-react'

type Props = {
  /** Compact variant scales smaller for side-by-side layouts */
  compact?: boolean
}

export default function MonitorShowcase({ compact = false }: Props) {
  return (
    <div
      className={`relative w-full mx-auto ${compact ? 'max-w-[520px]' : 'max-w-[920px]'} pb-12`}
    >
      {/* Monitor */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="relative"
      >
        <div className="relative rounded-[18px] bg-gradient-to-b from-[#1a1f2e] to-[#0a0f1f] p-2 shadow-lift">
          <div className="relative rounded-[10px] overflow-hidden bg-canvas aspect-[16/10]">
            <SiteMockup />
          </div>
        </div>
        <div className="relative mx-auto -mt-[1px] w-24 h-4 bg-gradient-to-b from-[#1a1f2e] to-[#0a0f1f]" />
        <div className="relative mx-auto w-44 h-2 rounded-b-2xl bg-[#0a0f1f]" />
      </motion.div>

      {/* Phone */}
      <motion.div
        initial={{ opacity: 0, y: 30, x: 10 }}
        whileInView={{ opacity: 1, y: 0, x: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.25 }}
        className="absolute -bottom-4 -right-2 w-[26%] max-w-[140px]"
      >
        <PhoneMockup />
      </motion.div>

      {/* Live counter pill — above phone, bottom-right area */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.5 }}
        className="absolute -bottom-2 right-[18%] sm:right-0 sm:-bottom-0 md:right-[4%]"
      >
        <div className="flex items-center gap-2 rounded-full border border-hairline bg-canvas/95 backdrop-blur px-3 py-1.5 shadow-card">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[11px] text-ink font-medium">+38% conversions</span>
        </div>
      </motion.div>
    </div>
  )
}

function SiteMockup() {
  return (
    <div className="h-full w-full flex flex-col">
      <div className="flex items-center justify-between px-5 py-2.5 border-b border-hairline">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-gradient-bv" />
          <span className="text-[9px] font-semibold text-ink tracking-tight">verde &amp; stone</span>
        </div>
        <div className="flex items-center gap-4 text-[7px] text-ink-soft">
          <span>Work</span>
          <span>Process</span>
          <span>About</span>
          <span className="px-2 py-0.5 rounded-full bg-ink text-canvas">Book</span>
        </div>
      </div>

      <div className="flex-1 grid grid-cols-12 gap-4 p-5">
        <div className="col-span-7 flex flex-col justify-center space-y-2.5">
          <div className="text-[7px] uppercase tracking-[0.2em] text-gradient-bv font-medium">
            Interior Design
          </div>
          <div className="space-y-1">
            <div className="h-2.5 w-full rounded-full bg-ink/85" />
            <div className="h-2.5 w-4/5 rounded-full bg-ink/85" />
          </div>
          <div className="space-y-0.5 pt-1">
            <div className="h-0.5 w-full rounded-full bg-hairline" />
            <div className="h-0.5 w-4/5 rounded-full bg-hairline" />
            <div className="h-0.5 w-3/4 rounded-full bg-hairline" />
          </div>
          <div className="flex gap-1.5 pt-1.5">
            <div className="h-5 px-2.5 rounded-full bg-gradient-bv flex items-center gap-1">
              <span className="text-[7px] text-canvas font-medium">Book a consult</span>
              <ArrowUpRight size={7} className="text-canvas" strokeWidth={2.5} />
            </div>
            <div className="h-5 px-2.5 rounded-full border border-hairline flex items-center">
              <span className="text-[7px] text-ink-soft">Our work</span>
            </div>
          </div>
        </div>
        <div className="col-span-5 flex">
          <div className="flex-1 rounded-lg bg-gradient-to-br from-mist via-mist-warm to-mist relative overflow-hidden">
            <div
              className="absolute inset-0"
              style={{
                background:
                  'radial-gradient(circle at 35% 30%, rgba(23,71,255,0.2) 0%, transparent 60%), radial-gradient(circle at 70% 75%, rgba(124,58,255,0.25) 0%, transparent 60%)',
              }}
            />
            <div className="absolute inset-2 rounded-md border border-canvas/40 backdrop-blur-sm" />
          </div>
        </div>
      </div>
    </div>
  )
}

function PhoneMockup() {
  return (
    <div className="rounded-[22px] bg-gradient-to-b from-[#1a1f2e] to-[#0a0f1f] p-1 shadow-lift">
      <div className="rounded-[18px] overflow-hidden bg-canvas aspect-[9/19]">
        <div className="px-2 pt-1.5 pb-0.5 flex justify-between items-center">
          <span className="text-[5px] font-semibold text-ink">9:41</span>
          <div className="w-6 h-1.5 rounded-full bg-ink" />
          <div className="w-1.5 h-0.5 rounded-sm bg-ink" />
        </div>
        <div className="px-2 pt-1 space-y-1.5">
          <div className="text-[5px] uppercase tracking-wider text-gradient-bv font-medium">
            verde
          </div>
          <div className="space-y-0.5">
            <div className="h-0.5 w-full rounded-full bg-ink/80" />
            <div className="h-0.5 w-4/5 rounded-full bg-ink/80" />
          </div>
          <div className="aspect-[4/3] rounded bg-gradient-to-br from-mist to-mist-warm relative">
            <div
              className="absolute inset-0 rounded"
              style={{
                background:
                  'radial-gradient(circle at 40% 50%, rgba(124,58,255,0.25) 0%, transparent 70%)',
              }}
            />
          </div>
          <div className="space-y-0.5">
            <div className="h-0.5 w-full rounded-full bg-hairline" />
            <div className="h-0.5 w-3/4 rounded-full bg-hairline" />
          </div>
          <div className="h-2 rounded-full bg-gradient-bv mt-0.5" />
        </div>
      </div>
    </div>
  )
}
