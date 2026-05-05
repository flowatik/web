import type { ReactNode } from 'react'

export default function PhoneFrame({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto w-[280px] max-w-full">
      {/* Outer bezel */}
      <div className="rounded-[2.2rem] border-[6px] border-ink/90 bg-ink/90 p-[3px] shadow-lift">
        {/* Inner screen */}
        <div className="rounded-[1.8rem] overflow-hidden bg-canvas relative">
          {/* Notch / dynamic island */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 z-20">
            <div className="w-[90px] h-[22px] bg-ink/90 rounded-b-2xl flex items-center justify-center gap-2">
              <span className="w-[6px] h-[6px] rounded-full bg-ink-soft/40 ring-1 ring-ink-soft/20" />
            </div>
          </div>
          {/* Screen content */}
          <div className="h-[520px] overflow-hidden flex flex-col">
            {children}
          </div>
          {/* Home indicator */}
          <div className="flex justify-center pb-1.5 pt-1 bg-canvas">
            <div className="w-[100px] h-[4px] rounded-full bg-ink/15" />
          </div>
        </div>
      </div>
    </div>
  )
}
