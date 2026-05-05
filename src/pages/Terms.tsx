import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import logoUrl from '../assets/logo.png'

const sections = [
  {
    title: '1. Overview',
    body: `These Terms of Service govern the relationship between Flowatik ("we", "us", "our") and any client ("you", "your") who engages our services. By submitting an inquiry, signing a proposal, or making a payment, you agree to these terms in full. Flowatik is based in Beirut, Lebanon and operates as a professional services studio.`,
  },
  {
    title: '2. Services',
    body: `Flowatik offers the following services to businesses:

• Website Design & Development — Custom-built websites tailored to your brand and business goals, including responsive design, copywriting direction, and performance optimisation.

• AI Automation — Intelligent automations built on top of your existing systems or as new integrations: front-desk bots, follow-up sequences, scheduling assistants, and other AI-powered workflows.

• Deployment & Maintenance — Hosting setup, domain configuration, ongoing maintenance, and monitoring of delivered products.

The exact scope, deliverables, timeline, and pricing of each engagement are agreed upon in writing before work begins.`,
  },
  {
    title: '3. Engagement Process',
    body: `Every engagement follows this process:

1. Discovery call — A free 20-minute conversation to understand your goals.
2. Proposal — A written plan detailing the scope, timeline, and fixed price.
3. Agreement — Your acceptance of the proposal (via email or signature) constitutes a binding agreement.
4. Deposit — Work begins only after the deposit is received.
5. Delivery — Milestones are delivered and reviewed in stages.
6. Handoff — Final files, access credentials, and documentation are handed over upon final payment.`,
  },
  {
    title: '4. Payment Terms',
    body: `• A deposit of 50% of the total project fee is required before work begins.
• The remaining 50% is due upon project completion, before final handoff.
• For larger projects, milestone-based payment schedules may be agreed upon in writing.
• All fees are quoted in USD or Lebanese Pounds (LBP) as agreed, and are due within 7 days of invoice.
• Late payments may result in a pause of work until the outstanding balance is settled.
• We do not offer refunds on deposits once work has commenced, except in cases of our own failure to deliver.`,
  },
  {
    title: '5. Revisions & Scope',
    body: `Each project proposal includes a defined number of revision rounds. Revisions within scope are included in the agreed price. Changes that materially alter the agreed scope — including new features, new pages, or significant design direction changes — are treated as scope additions and quoted separately. We will notify you in writing before proceeding with any out-of-scope work.`,
  },
  {
    title: '6. Client Responsibilities',
    body: `To deliver your project on time, we depend on you to:

• Provide all required content (text, images, brand assets) by agreed deadlines.
• Give timely feedback — typically within 5 business days of each delivery.
• Designate a single point of contact to consolidate feedback.
• Ensure that any third-party assets (images, fonts, software) you provide are properly licensed.

Delays caused by late content or feedback may extend the agreed timeline without penalty to Flowatik.`,
  },
  {
    title: '7. Intellectual Property',
    body: `Upon receipt of full payment, you own all final deliverables created specifically for your project — including website code, design files, and automation configurations.

Flowatik retains ownership of:
• Proprietary tools, frameworks, libraries, and internal processes used in delivery.
• Any work product that has not been fully paid for.

We reserve the right to display completed work in our portfolio unless you request otherwise in writing.`,
  },
  {
    title: '8. Confidentiality',
    body: `Both parties agree to treat each other's business information, technical details, pricing, and strategic plans as confidential. We will not disclose your confidential information to any third party without your written consent, except as required by law. This obligation remains in effect for two years after the end of our engagement.`,
  },
  {
    title: '9. Warranties & Liability',
    body: `We warrant that our work will be delivered with reasonable skill and care, and will function as described in the agreed proposal.

We are not liable for:
• Any indirect, consequential, or lost-profit damages arising from use of our deliverables.
• Third-party service outages (hosting providers, API services, automation platforms).
• Issues arising from your modification of delivered work without our involvement.

Our total liability in any engagement is capped at the total fees paid for that project.`,
  },
  {
    title: '10. Termination',
    body: `Either party may terminate an engagement with 14 days' written notice. Upon termination:

• You pay for all work completed up to the termination date, prorated fairly.
• We deliver all completed work and assets to you.
• If you have already paid more than the value of work completed, we will refund the difference.

We reserve the right to terminate immediately if payment obligations are not met after reasonable notice.`,
  },
  {
    title: '11. Governing Law',
    body: `These Terms are governed by the laws of the Republic of Lebanon. Any disputes arising from or related to these Terms shall be subject to the exclusive jurisdiction of the courts of Beirut, Lebanon. We will always attempt to resolve disputes amicably before any legal action.`,
  },
  {
    title: '12. Changes to These Terms',
    body: `We may update these Terms from time to time. The date at the top of this page reflects the most recent revision. For active engagements, we will notify you of any material changes. Continued use of our services after changes constitutes acceptance.`,
  },
  {
    title: '13. Contact',
    body: `For any questions about these Terms, please reach us at:

Email: info@flowatik.com
Phone: +961 78 896 067
Location: Beirut, Lebanon`,
  },
]

export default function Terms() {
  return (
    <div className="min-h-screen bg-canvas">

      {/* Header */}
      <header className="fixed top-0 inset-x-0 z-50 bg-canvas border-b border-hairline">
        <div className="w-full mx-auto px-5 sm:px-6 lg:px-8 max-w-7xl flex items-center justify-between h-14 sm:h-16">
          <Link to="/">
            <img src={logoUrl} alt="Flowatik" className="h-14 w-auto object-contain" />
          </Link>
          <Link
            to="/"
            className="flex items-center gap-2 text-sm text-ink-soft hover:text-ink transition-colors"
          >
            <ArrowLeft size={14} strokeWidth={2} />
            <span>Back to home</span>
          </Link>
        </div>
      </header>

      {/* Content */}
      <main className="pt-28 pb-24">
        <div className="w-full mx-auto px-6 lg:px-8 max-w-2xl">

          {/* Page header */}
          <div className="mb-12 pb-10 border-b border-hairline">
            <p className="text-[11px] uppercase tracking-[0.22em] text-ink-soft/60 font-mono mb-4">
              Legal
            </p>
            <h1 className="text-4xl font-semibold text-ink tracking-[-0.025em] leading-tight">
              Terms of Service
            </h1>
            <p className="mt-3 text-sm text-ink-soft">
              Last updated: May 5, 2026
            </p>
          </div>

          {/* Intro */}
          <p className="text-ink-soft leading-relaxed mb-12">
            Please read these terms carefully before engaging our services. They are written to be
            clear and fair to both sides. If you have any questions, reach out before we begin work.
          </p>

          {/* Sections */}
          <div className="space-y-10">
            {sections.map((s) => (
              <section key={s.title}>
                <h2 className="text-base font-semibold text-ink mb-3">{s.title}</h2>
                <p className="text-ink-soft leading-relaxed whitespace-pre-line text-[15px]">
                  {s.body}
                </p>
              </section>
            ))}
          </div>

          {/* Back link */}
          <div className="mt-16 pt-10 border-t border-hairline">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-sm font-medium text-ink hover:text-ink-soft transition-colors"
            >
              <ArrowLeft size={14} strokeWidth={2} />
              Back to home
            </Link>
          </div>

        </div>
      </main>

    </div>
  )
}
