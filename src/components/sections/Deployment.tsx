import { useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight } from "lucide-react";
import Eyebrow from "../ui/Eyebrow";

const ease = [0.22, 1, 0.36, 1] as const;

type Phase = {
  id: string;
  index: string;
  title: string;
  short: string;
  week: string;
  line: string;
  /** angle in degrees on the cycle ring, 0 = 12 o'clock, clockwise */
  angle: number;
};

const phases: Phase[] = [
  {
    id: "discovery",
    index: "01",
    title: "Discovery",
    short: "Discovery & Blueprint",
    week: "Week 1",
    line: "Scope, sitemap, and voice agreed before design starts.",
    angle: 0,
  },
  {
    id: "build",
    index: "02",
    title: "Design & Build",
    short: "Design & Build",
    week: "Weeks 2 – 4",
    line: "Progress shared in plain English at every milestone.",
    angle: 90,
  },
  {
    id: "calibration",
    index: "03",
    title: "Testing",
    short: "Testing & Calibration",
    week: "Week 5",
    line: "Every flow tested across devices before written sign-off.",
    angle: 180,
  },
  {
    id: "launch",
    index: "04",
    title: "Launch",
    short: "Launch & Handover",
    week: "Week 6 +",
    line: "We stay close for the first month after go-live.",
    angle: 270,
  },
];

/** Convert (angle in degrees, 0 = top, clockwise) + radius → {x, y} relative to ring centre. */
function polarToXY(angleDeg: number, radius: number) {
  const rad = ((angleDeg - 90) * Math.PI) / 180; // -90 so 0deg points up
  return { x: Math.cos(rad) * radius, y: Math.sin(rad) * radius };
}

/** SVG circle dimensions. Single source of truth for the diagram. */
const SVG_SIZE = 480;
const RING_R = 150;
const TRACER_DURATION = 14; // seconds per revolution

/** Per-quadrant transform: places each label OUTSIDE the ring on the correct side. */
const LABEL_TRANSFORM: Record<number, string> = {
  0: "translate(-50%, -100%)", // top: label sits above anchor
  90: "translate(0, -50%)", // right: label sits to the right of anchor
  180: "translate(-50%, 0)", // bottom: label sits below anchor
  270: "translate(-100%, -50%)", // left: label sits to the left of anchor
};

export default function Deployment() {
  return (
    <section
      id="deployment"
      className="relative min-h-screen flex flex-col justify-center snap-start py-16 sm:py-20 md:py-24 bg-mist border-t border-hairline overflow-hidden"
    >
      <div className="relative max-w-7xl w-full mx-auto px-4 sm:px-6 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-12 items-center">
          {/* ── LEFT: Header + CTA ── */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.65, ease }}
            className="lg:col-span-5 view-rise"
          >
            <div className="flex items-center justify-between gap-3">
              <Eyebrow>The Engagement</Eyebrow>
              <span className="text-[10px] font-mono uppercase tracking-[0.22em] text-ink-soft/55 whitespace-nowrap">
                EXHIBIT 04.1
              </span>
            </div>

            <h2 className="mt-4 sm:mt-5 text-[26px] sm:text-[36px] md:text-[44px] lg:text-[48px] leading-[1.08] sm:leading-[1.05] font-semibold text-ink tracking-[-0.025em] text-balance">
              A deliberate cycle.{" "}
              <span className="italic font-light text-ink-soft/60">
                From first call to launch day.
              </span>
            </h2>

            <p className="mt-4 sm:mt-5 text-[14.5px] sm:text-[16px] leading-relaxed text-ink-soft max-w-[46ch] text-pretty">
              Six weeks, four phases, one schedule everyone shares. Plain English at
              every milestone — nothing skipped, nothing hidden.
            </p>

            <div className="mt-6 sm:mt-8 flex flex-wrap items-center gap-3">
              <a
                href="#cta"
                className="group inline-flex items-center gap-2 bg-ink hover:bg-ink/90 text-canvas px-5 py-3 rounded-xl text-[13.5px] font-semibold transition-colors"
              >
                <span>Start an engagement</span>
                <ArrowRight
                  size={16}
                  strokeWidth={2}
                  className="transition-transform group-hover:translate-x-0.5"
                />
              </a>
              <span className="flex items-center gap-2 text-[11px] font-mono text-ink-soft/65 uppercase tracking-[0.18em]">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inset-0 rounded-full bg-emerald-500 animate-ping opacity-60" />
                  <span className="relative rounded-full h-1.5 w-1.5 bg-emerald-500" />
                </span>
                Booking projects ·{" "}
                {new Date().toLocaleString("en", { month: "short" })}{" "}
                {new Date().getFullYear()}
              </span>
            </div>

            <p className="mt-4 sm:mt-5 text-[10.5px] sm:text-[11px] font-mono text-ink-soft/55 uppercase tracking-[0.18em]">
              Typical onboarding · 3 – 5 weeks
            </p>
          </motion.div>

          {/* ── RIGHT: Cycle (desktop) / compact ring + vertical list (mobile + tablet) ── */}
          <div className="lg:col-span-7 relative">
            <CycleDiagram />
            <MobileCircle />
            <MobileCycleList />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────────────────────── */
/*  Cycle diagram (desktop)                                         */
/* ──────────────────────────────────────────────────────────────── */

function CycleDiagram() {
  const labelOffset = RING_R + 32;
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  // Tracer-driven auto activation. Updated only when the proximity window changes,
  // so the component doesn't re-render every animation frame.
  const [autoActiveId, setAutoActiveId] = useState<string | null>(null);
  const autoActiveRef = useRef<string | null>(null);
  // Manual hover wins over the auto activation from the orbiting tracer.
  const activeId = hoveredId ?? autoActiveId;

  /** Degrees of "near a phase" on either side. 22° → ~1.7 s visible per phase
   *  at TRACER_DURATION = 14 s, with rest time in between. */
  const PROXIMITY = 22;

  function handleTracerUpdate(latest: { rotate?: number | string }) {
    const raw = typeof latest.rotate === "number" ? latest.rotate : 0;
    const angle = ((raw % 360) + 360) % 360;
    let near: string | null = null;
    for (const p of phases) {
      const diff = Math.min(
        Math.abs(p.angle - angle),
        360 - Math.abs(p.angle - angle)
      );
      if (diff < PROXIMITY) {
        near = p.id;
        break;
      }
    }
    if (near !== autoActiveRef.current) {
      autoActiveRef.current = near;
      setAutoActiveId(near);
    }
  }

  return (
    <div className="hidden lg:block relative mx-auto w-full max-w-[clamp(380px,46vw,560px)] aspect-square">
      {/* The SVG ring */}
      <svg
        viewBox={`0 0 ${SVG_SIZE} ${SVG_SIZE}`}
        width="100%"
        height="100%"
        className="absolute inset-0"
        aria-hidden
      >
        <defs>
          <linearGradient
            id="cycle-gradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="var(--color-accent)" />
            <stop offset="100%" stopColor="var(--color-violet)" />
          </linearGradient>
          <radialGradient id="centre-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="var(--color-violet)" stopOpacity="0.18" />
            <stop offset="60%" stopColor="var(--color-accent)" stopOpacity="0.06" />
            <stop offset="100%" stopColor="var(--color-violet)" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Soft centre glow */}
        <circle
          cx={SVG_SIZE / 2}
          cy={SVG_SIZE / 2}
          r={RING_R - 30}
          fill="url(#centre-glow)"
        />

        {/* Outer hairline halo — adds quiet depth */}
        <circle
          cx={SVG_SIZE / 2}
          cy={SVG_SIZE / 2}
          r={RING_R + 14}
          fill="none"
          stroke="var(--color-hairline)"
          strokeWidth={0.75}
          strokeDasharray="2 4"
          opacity={0.55}
        />

        {/* Static hairline ring */}
        <circle
          cx={SVG_SIZE / 2}
          cy={SVG_SIZE / 2}
          r={RING_R}
          fill="none"
          stroke="var(--color-hairline)"
          strokeWidth={1}
        />

        {/* Animated gradient arc — strokes clockwise from 12 o'clock */}
        <motion.circle
          cx={SVG_SIZE / 2}
          cy={SVG_SIZE / 2}
          r={RING_R}
          fill="none"
          stroke="url(#cycle-gradient)"
          strokeWidth={1.75}
          strokeLinecap="round"
          pathLength={1}
          transform={`rotate(-90 ${SVG_SIZE / 2} ${SVG_SIZE / 2})`}
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1.6, ease }}
        />

        {/* Clockwise direction chevrons sit on the ring midway between phases */}
        {[45, 135, 225, 315].map((theta) => {
          const { x, y } = polarToXY(theta, RING_R);
          const cx = SVG_SIZE / 2 + x;
          const cy = SVG_SIZE / 2 + y;
          return (
            <motion.path
              key={`chev-${theta}`}
              d="M -3.5 -4 L 3 0 L -3.5 4"
              fill="none"
              stroke="url(#cycle-gradient)"
              strokeWidth={1.5}
              strokeLinecap="round"
              strokeLinejoin="round"
              transform={`translate(${cx} ${cy}) rotate(${theta})`}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 0.85 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: 1.0 + (theta / 360) * 0.6, ease }}
            />
          );
        })}

        {/* Continuous tracer — a small gradient dot orbiting the ring.
            onUpdate fires every animation frame; handleTracerUpdate only
            commits state when the proximity window actually changes. */}
        <motion.g
          style={{
            transformOrigin: `${SVG_SIZE / 2}px ${SVG_SIZE / 2}px`,
            transformBox: "view-box",
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: TRACER_DURATION, ease: "linear", repeat: Infinity }}
          onUpdate={handleTracerUpdate}
        >
          <circle
            cx={SVG_SIZE / 2}
            cy={SVG_SIZE / 2 - RING_R}
            r={9}
            fill="url(#cycle-gradient)"
            opacity={0.18}
          />
          <circle
            cx={SVG_SIZE / 2}
            cy={SVG_SIZE / 2 - RING_R}
            r={4.5}
            fill="url(#cycle-gradient)"
          />
        </motion.g>
      </svg>

      {/* Phase node dots — positioning div wraps motion so framer-motion's */}
      {/* scale animation doesn't override the translate(-50%, -50%) centring. */}
      {phases.map((p, i) => {
        const { x, y } = polarToXY(p.angle, RING_R);
        const leftPct = 50 + (x / SVG_SIZE) * 100;
        const topPct = 50 + (y / SVG_SIZE) * 100;
        const isLast = i === phases.length - 1;
        return (
          <div
            key={`node-${p.id}`}
            className="absolute"
            style={{
              left: `${leftPct}%`,
              top: `${topPct}%`,
              transform: "translate(-50%, -50%)",
            }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{
                duration: 0.55,
                ease: [0.34, 1.56, 0.64, 1],
                delay: 0.4 + (p.angle / 360) * 1.2,
              }}
              className="relative w-4 h-4 grid place-items-center"
            >
              {isLast && (
                <span className="absolute inset-0 rounded-full bg-violet/30 animate-ping" />
              )}
              <span className="relative w-4 h-4 rounded-full bg-canvas ring-1 ring-ink-soft/30 grid place-items-center">
                <span className="w-2.5 h-2.5 rounded-full bg-gradient-bv" />
              </span>
            </motion.div>
          </div>
        );
      })}

      {/* Phase labels — positioning div wraps motion so framer-motion's */}
      {/* y animation doesn't override the per-quadrant LABEL_TRANSFORM. */}
      {phases.map((p) => {
        const { x, y } = polarToXY(p.angle, labelOffset);
        const leftPct = 50 + (x / SVG_SIZE) * 100;
        const topPct = 50 + (y / SVG_SIZE) * 100;
        const textAlign =
          p.angle === 90
            ? "text-left items-start"
            : p.angle === 270
            ? "text-right items-end"
            : "text-center items-center";
        const isActive = activeId === p.id;
        return (
          <div
            key={`label-${p.id}`}
            className="absolute"
            style={{
              left: `${leftPct}%`,
              top: `${topPct}%`,
              transform: LABEL_TRANSFORM[p.angle],
            }}
          >
            <div
              className="relative"
              onMouseEnter={() => setHoveredId(p.id)}
              onMouseLeave={() => setHoveredId(null)}
              onFocus={() => setHoveredId(p.id)}
              onBlur={() => setHoveredId(null)}
              tabIndex={0}
              role="button"
              aria-describedby={isActive ? `phase-tip-${p.id}` : undefined}
            >
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{
                  duration: 0.5,
                  ease,
                  delay: 0.55 + (p.angle / 360) * 1.2,
                }}
                className={`w-[130px] flex flex-col gap-0.5 cursor-default outline-none rounded-md focus-visible:ring-2 focus-visible:ring-violet/30 ${textAlign}`}
              >
                <span className="text-[11px] font-mono tabular-nums text-gradient-bv font-semibold tracking-[0.06em]">
                  {p.index}
                </span>
                <span
                  className={`text-[15px] font-semibold leading-tight tracking-[-0.01em] transition-colors duration-200 ${
                    isActive ? "text-violet" : "text-ink"
                  }`}
                >
                  {p.title}.
                </span>
                <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-ink-soft/65">
                  {p.week}
                </span>
              </motion.div>

              <AnimatePresence>
                {isActive && (
                  <PhaseTooltip key={`tip-${p.id}`} phase={p} />
                )}
              </AnimatePresence>
            </div>
          </div>
        );
      })}

      {/* Centre chip */}
      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, ease, delay: 0.25 }}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none"
      >
        <div className="inline-flex flex-col items-center gap-1.5 px-5 py-3 rounded-2xl bg-canvas/70 backdrop-blur-[2px] border border-hairline shadow-[0_2px_18px_-8px_rgba(10,15,31,0.12)]">
          <div className="flex items-center gap-2 text-[9.5px] font-mono uppercase tracking-[0.28em] text-ink-soft/55">
            <span className="h-px w-3 bg-hairline" />
            Cycle · 04.1
            <span className="h-px w-3 bg-hairline" />
          </div>
          <div className="text-[17px] italic font-light text-ink leading-none tracking-[-0.01em]">
            a deliberate cycle.
          </div>
          <div className="flex items-center gap-1.5 text-[9.5px] font-mono uppercase tracking-[0.22em] text-gradient-bv">
            <span className="w-1 h-1 rounded-full bg-gradient-bv" />
            6 weeks · 4 phases
          </div>
        </div>
      </motion.div>

      {/* Reduced-motion fallback: kill the tracer rotation via CSS */}
      <style>{`
        @media (prefers-reduced-motion: reduce) {
          svg motion-g, svg g { animation: none !important; }
        }
      `}</style>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────── */
/*  Hover tooltip — pops above a phase label                        */
/* ──────────────────────────────────────────────────────────────── */

function PhaseTooltip({ phase }: { phase: Phase }) {
  return (
    <motion.div
      id={`phase-tip-${phase.id}`}
      role="tooltip"
      // x kept static at -50% to centre on the label; framer-motion combines
      // it with the animated y so the inline transform isn't clobbered.
      style={{ x: "-50%" }}
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 6 }}
      transition={{ duration: 0.2, ease }}
      // bottom-full sits the box just above the label; pb-3 leaves a 12px
      // bridge so moving the cursor up doesn't drop the hover.
      className="absolute bottom-full left-1/2 pb-3 z-30 pointer-events-auto"
    >
      <div className="relative w-[240px] rounded-2xl border border-hairline bg-canvas shadow-lift p-4">
        <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-[0.18em]">
          <span className="text-gradient-bv font-semibold tabular-nums">
            {phase.index}
          </span>
          <span className="text-ink-soft/60">{phase.week}</span>
        </div>
        <h4 className="mt-1.5 text-[15px] font-semibold text-ink leading-tight tracking-[-0.01em] text-left">
          {phase.short}.
        </h4>
        <div className="my-2.5 h-px bg-hairline" />
        <p className="text-[12.5px] text-ink-soft leading-[1.55] text-left">
          {phase.line}
        </p>
        {/* Downward-pointing arrow notch */}
        <span
          aria-hidden
          className="absolute left-1/2 -translate-x-1/2 -bottom-1.5 w-3 h-3 rotate-45 bg-canvas border-r border-b border-hairline"
        />
      </div>
    </motion.div>
  );
}

/* ──────────────────────────────────────────────────────────────── */
/*  Compact circular cycle — shown on mobile/tablet (< lg)          */
/*  Mirrors the desktop diagram visually but with no labels/tooltips.*/
/* ──────────────────────────────────────────────────────────────── */

function MobileCircle() {
  const SVG = 200;
  const R = 70;
  const TRACER_DUR = 12;

  return (
    <div className="lg:hidden relative mx-auto mb-8 sm:mb-10 w-[180px] sm:w-[210px] aspect-square">
      <svg
        viewBox={`0 0 ${SVG} ${SVG}`}
        width="100%"
        height="100%"
        className="absolute inset-0"
        aria-hidden
      >
        <defs>
          <linearGradient
            id="mcycle-gradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="var(--color-accent)" />
            <stop offset="100%" stopColor="var(--color-violet)" />
          </linearGradient>
          <radialGradient id="mcentre-glow" cx="50%" cy="50%" r="50%">
            <stop
              offset="0%"
              stopColor="var(--color-violet)"
              stopOpacity="0.18"
            />
            <stop
              offset="60%"
              stopColor="var(--color-accent)"
              stopOpacity="0.06"
            />
            <stop
              offset="100%"
              stopColor="var(--color-violet)"
              stopOpacity="0"
            />
          </radialGradient>
        </defs>

        {/* Centre glow */}
        <circle
          cx={SVG / 2}
          cy={SVG / 2}
          r={R - 12}
          fill="url(#mcentre-glow)"
        />

        {/* Dashed outer halo */}
        <circle
          cx={SVG / 2}
          cy={SVG / 2}
          r={R + 8}
          fill="none"
          stroke="var(--color-hairline)"
          strokeWidth={0.6}
          strokeDasharray="1.5 3"
          opacity={0.55}
        />

        {/* Base hairline ring */}
        <circle
          cx={SVG / 2}
          cy={SVG / 2}
          r={R}
          fill="none"
          stroke="var(--color-hairline)"
          strokeWidth={1}
        />

        {/* Animated gradient arc — strokes clockwise from 12 o'clock */}
        <motion.circle
          cx={SVG / 2}
          cy={SVG / 2}
          r={R}
          fill="none"
          stroke="url(#mcycle-gradient)"
          strokeWidth={1.5}
          strokeLinecap="round"
          pathLength={1}
          transform={`rotate(-90 ${SVG / 2} ${SVG / 2})`}
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1.2, ease }}
        />

        {/* Direction chevrons at midpoints */}
        {[45, 135, 225, 315].map((theta) => {
          const rad = ((theta - 90) * Math.PI) / 180;
          const cx = SVG / 2 + Math.cos(rad) * R;
          const cy = SVG / 2 + Math.sin(rad) * R;
          return (
            <motion.path
              key={`mchev-${theta}`}
              d="M -2.5 -3 L 2.5 0 L -2.5 3"
              fill="none"
              stroke="url(#mcycle-gradient)"
              strokeWidth={1.25}
              strokeLinecap="round"
              strokeLinejoin="round"
              transform={`translate(${cx} ${cy}) rotate(${theta})`}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 0.85 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: 0.85 + (theta / 360) * 0.4, ease }}
            />
          );
        })}

        {/* Continuous tracer */}
        <motion.g
          style={{
            transformOrigin: `${SVG / 2}px ${SVG / 2}px`,
            transformBox: "view-box",
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: TRACER_DUR, ease: "linear", repeat: Infinity }}
        >
          <circle
            cx={SVG / 2}
            cy={SVG / 2 - R}
            r={5.5}
            fill="url(#mcycle-gradient)"
            opacity={0.2}
          />
          <circle
            cx={SVG / 2}
            cy={SVG / 2 - R}
            r={2.75}
            fill="url(#mcycle-gradient)"
          />
        </motion.g>

        {/* Phase dots */}
        {phases.map((p, i) => {
          const rad = ((p.angle - 90) * Math.PI) / 180;
          const cx = SVG / 2 + Math.cos(rad) * R;
          const cy = SVG / 2 + Math.sin(rad) * R;
          const isLast = i === phases.length - 1;
          return (
            <g key={`mdot-${p.id}`}>
              {isLast && (
                <circle cx={cx} cy={cy} r={6} fill="var(--color-violet)" opacity={0.25}>
                  <animate
                    attributeName="r"
                    values="5;10;5"
                    dur="2s"
                    repeatCount="indefinite"
                  />
                  <animate
                    attributeName="opacity"
                    values="0.4;0;0.4"
                    dur="2s"
                    repeatCount="indefinite"
                  />
                </circle>
              )}
              <circle
                cx={cx}
                cy={cy}
                r={4.5}
                fill="var(--color-canvas)"
                stroke="var(--color-ink-soft)"
                strokeOpacity={0.3}
                strokeWidth={0.75}
              />
              <circle cx={cx} cy={cy} r={3} fill="url(#mcycle-gradient)" />
            </g>
          );
        })}
      </svg>

      {/* Centre chip */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5, delay: 0.25, ease }}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none"
      >
        <div className="text-[8.5px] font-mono uppercase tracking-[0.28em] text-ink-soft/55 leading-none">
          Cycle
        </div>
        <div className="mt-1 text-[12px] italic font-light text-ink leading-none tracking-[-0.01em]">
          04.1
        </div>
      </motion.div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────── */
/*  Mobile cycle list                                               */
/* ──────────────────────────────────────────────────────────────── */

function MobileCycleList() {
  return (
    <ol className="lg:hidden relative ml-2 sm:ml-3 border-l border-hairline space-y-6 sm:space-y-7">
      {phases.map((p, i) => {
        const isLast = i === phases.length - 1;
        return (
          <li key={p.id} className="relative pl-5 sm:pl-6">
            <span
              aria-hidden
              className="absolute -left-[7px] top-1 w-3.5 h-3.5 grid place-items-center"
            >
              {isLast && (
                <span className="absolute inset-0 rounded-full bg-violet/30 animate-ping" />
              )}
              <span className="relative w-3.5 h-3.5 rounded-full bg-canvas ring-1 ring-ink-soft/30 grid place-items-center">
                <span className="w-2 h-2 rounded-full bg-gradient-bv" />
              </span>
            </span>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, ease, delay: 0.05 * i }}
            >
              <div className="flex items-baseline justify-between gap-2">
                <span className="text-[11px] font-mono tabular-nums text-gradient-bv font-semibold tracking-[0.04em]">
                  {p.index}
                </span>
                <span className="text-[9.5px] sm:text-[10px] font-mono uppercase tracking-[0.18em] text-ink-soft/60 whitespace-nowrap">
                  {p.week}
                </span>
              </div>
              <h3 className="mt-1.5 text-[17px] sm:text-[18px] font-semibold text-ink leading-tight tracking-[-0.01em]">
                {p.short}.
              </h3>
              <p className="mt-1.5 text-[12.5px] sm:text-[13px] text-ink-soft leading-[1.55] text-pretty">
                {p.line}
              </p>
            </motion.div>
          </li>
        );
      })}

    </ol>
  );
}
