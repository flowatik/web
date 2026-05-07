import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";

const ease = [0.22, 1, 0.36, 1] as const;

const phases = [
  {
    id: "discovery",
    index: "01",
    tag: "Intake + blueprint",
    title: "Discovery & Blueprint",
    body: "We map your services, your customers, and the quiet work that is costing you time. By the end of week one you have a written scope, an agreed budget, and a shared sense of where the easy wins live. We then align on the voice, the imagery, the sitemap, and every flow before a single pixel is drawn, so no surprises appear in week six.",
  },
  {
    id: "build",
    index: "02",
    tag: "Site + automations",
    title: "Design & Build",
    body: "We craft the site and wire the automations, sharing progress in plain English at every milestone. You always know exactly what is being built on your behalf, and you see it come together in real time, not all at once at the end. Each handoff includes a brief walkthrough so feedback lands while the work is still easy to adjust.",
  },
  {
    id: "calibration",
    index: "03",
    tag: "Walkthrough + sign-off",
    title: "Testing",
    body: "We test every flow together, walk you through everything you will own day to day, and tune until it feels right. Nothing goes live without a written sign-off from you, and a fallback plan for the things that matter most. Edge cases, mobile views, slow connections - we surface them before your customers do, not after.",
  },
  {
    id: "launch",
    index: "04",
    tag: "Go-live + monitor",
    title: "Launch & Handover",
    body: "Your site goes live, the automations switch on, and the leads start landing. We stay close for the first month, watching the numbers, smoothing the rough edges, and handing over a calm, well-documented system you fully own. By the time we step back, you have the credentials, the documentation, and the confidence to run everything yourself - or lean on us for whatever comes next.",
  },
];

type Phase = (typeof phases)[number];

/** Editorial column body: eyebrow (number + tagline), display title, description. */
function StepColumn({ step }: { step: Phase }) {
  return (
    <div className="group">
      <div className="flex items-center gap-2.5 text-[10.5px] font-mono uppercase tracking-[0.22em] text-ink-soft/60">
        <span className="text-ink font-semibold tabular-nums">
          {step.index}
        </span>
        <span className="h-px w-4 bg-hairline" />
        <span className="truncate">{step.tag}</span>
      </div>
      <h3 className="mt-4 text-[24px] sm:text-[26px] md:text-[28px] lg:text-[30px] font-semibold text-ink leading-[1.05] tracking-tight group-hover:text-violet transition-colors">
        {step.title}
      </h3>
      <p className="mt-5 text-[13.5px] text-ink-soft leading-[1.65]">
        {step.body}
      </p>
    </div>
  );
}

export default function Deployment() {
  return (
    <section
      id="deployment"
      className="relative min-h-screen flex flex-col justify-center snap-start py-16 sm:py-20 md:py-24 bg-mist border-t border-hairline"
    >
      {/* Header (kept at standard width) */}
      <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 md:gap-12 items-end">
          <div className="md:col-span-9 max-w-3xl view-rise">
            <motion.h2
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, ease }}
              className="text-[28px] sm:text-[40px] md:text-[52px] lg:text-[56px] leading-[1.1] sm:leading-[1.0] font-semibold text-ink tracking-[-0.025em]"
            >
              A deliberate cycle.{" "}
              <span className="italic font-light text-ink-soft/60">
                From first call to launch day.
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, ease, delay: 0.08 }}
              className="mt-4 sm:mt-5 text-[15px] sm:text-[17px] leading-relaxed text-ink-soft max-w-[64ch]"
            >
              A guided four-stage engagement that brings Flowatik into the
              workings of your business: its frameworks, its house style, its
              workflows. By the end, the site and the automations feel less like
              a deliverable and more like a senior teammate.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease, delay: 0.12 }}
            className="md:col-span-3 md:text-right text-[11px] font-mono text-ink-soft/60 uppercase tracking-[0.18em]"
          >
            EXHIBIT 04.1 · ENGAGEMENT CYCLE
          </motion.div>
        </div>
      </div>

      {/* Steps (wider container, breaks out of the standard width) */}
      <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 md:px-8">
        {/* Desktop: hairline pipeline rail + 5-column editorial grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease, delay: 0.16 }}
          className="hidden md:block mt-12 lg:mt-16"
        >
          {/* Rail with 5 nodes */}
          <div role="presentation" className="relative grid grid-cols-4">
            {/* Hairline runs only between the first and last dot centres (10% to 90%) */}
            <div
              aria-hidden
              className="absolute top-1.5 h-px bg-hairline"
              style={{ left: "12.5%", right: "12.5%" }}
            />
            {phases.map((s) => (
              <div key={s.id} className="relative grid place-items-center">
                <span className="relative w-3.5 h-3.5 rounded-full bg-canvas ring-1 ring-ink-soft/40 grid place-items-center">
                  <span className="w-1.5 h-1.5 rounded-full bg-ink" />
                </span>
              </div>
            ))}
          </div>

          {/* Columns: hairline dividers between, no boxes - subgrid aligns rows across columns */}
          <div className="mt-7 grid grid-cols-4 grid-rows-[auto_auto_1fr] gap-y-5 divide-x divide-hairline">
            {phases.map((s) => (
              <div key={s.id} className="group px-6 lg:px-9 first:pl-0 last:pr-0 row-span-3 grid grid-rows-subgrid">
                <div className="flex items-center gap-2.5 text-[10.5px] font-mono uppercase tracking-[0.22em] text-ink-soft/60">
                  <span className="text-ink font-semibold tabular-nums">{s.index}</span>
                  <span className="h-px w-4 bg-hairline" />
                  <span className="truncate">{s.tag}</span>
                </div>
                <h3 className="text-[24px] sm:text-[26px] md:text-[28px] lg:text-[30px] font-semibold text-ink leading-[1.05] tracking-tight group-hover:text-violet transition-colors">
                  {s.title}
                </h3>
                <p className="text-[13.5px] text-ink-soft leading-[1.65]">
                  {s.body}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Mobile: vertical timeline with rail on the left */}
        <ol className="md:hidden mt-10 relative ml-3 border-l border-hairline space-y-9">
          {phases.map((s, i) => (
            <li key={s.id} className="relative pl-7">
              <span
                aria-hidden
                className="absolute -left-[7px] top-1 w-3.5 h-3.5 rounded-full bg-canvas ring-1 ring-ink-soft/40 grid place-items-center"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-ink" />
              </span>
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, ease, delay: 0.05 * i }}
              >
                <StepColumn step={s} />
              </motion.div>
            </li>
          ))}
        </ol>
      </div>

      {/* Footer strip (kept at standard width) */}
      <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease, delay: 0.2 }}
          className="mt-12 sm:mt-14 md:mt-16 flex items-center gap-3 sm:gap-5 flex-wrap pt-6 sm:pt-8 border-t border-hairline"
        >
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
          <span className="w-full sm:w-auto sm:ml-auto text-[11px] font-mono text-ink-soft/60 uppercase tracking-[0.18em]">
            Typical onboarding · 3 to 5 weeks
          </span>
        </motion.div>
      </div>
    </section>
  );
}
