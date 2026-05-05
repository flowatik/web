import type { ReactNode } from 'react'

export default function DesktopFrame({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto w-full">
      <div className="rounded-xl border border-hairline bg-canvas shadow-lift overflow-hidden">
        {/* Title bar */}
        <div className="flex items-center gap-2 px-4 py-2.5 bg-mist/40 border-b border-hairline">
          <div className="flex items-center gap-1.5">
            <span className="w-[10px] h-[10px] rounded-full bg-[#ff5f57]" />
            <span className="w-[10px] h-[10px] rounded-full bg-[#febc2e]" />
            <span className="w-[10px] h-[10px] rounded-full bg-[#28c840]" />
          </div>
          <div className="flex-1 flex justify-center">
            <div className="px-6 py-1 rounded-lg bg-canvas border border-hairline text-[10px] text-ink-soft/50 font-medium tracking-wide text-center">
              business-dashboard.app
            </div>
          </div>
          <div className="w-[42px]" />
        </div>
        {/* Content */}
        <div className="min-h-[380px] max-h-[460px] overflow-hidden">
          {children}
        </div>
      </div>
    </div>
  )
}
