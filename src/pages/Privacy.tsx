import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import logoUrl from '../assets/logo.png'

const sections = [
  {
    title: '1. Who We Are',
    body: `Flowatik is a web design and AI automation studio based in Beirut, Lebanon. We build premium websites and intelligent automations for ambitious small businesses. This Privacy Policy explains how we collect, use, and protect your personal information when you visit our website or contact us through our contact form.`,
  },
  {
    title: '2. Information We Collect',
    body: `When you submit our contact form, we collect the following information you provide voluntarily:

• First and last name
• Business email address
• Phone number (optional)
• Your project goal and description

We do not collect payment information directly. We do not use analytics platforms, third-party trackers, or advertising cookies. We collect only what is necessary to respond to your inquiry.`,
  },
  {
    title: '3. How We Use Your Information',
    body: `The information you provide is used solely to:

• Respond to your inquiry and assess your project needs
• Prepare a tailored proposal for your business
• Communicate with you throughout an engagement
• Send project-related updates or follow-ups you have requested

We will never use your information for unsolicited marketing, cold outreach, or any purpose other than the one you initiated.`,
  },
  {
    title: '4. How Your Data Is Transmitted',
    body: `Contact form submissions are delivered to us via FormSubmit (formsubmit.co), a third-party email delivery service. By submitting the form, your data passes through FormSubmit's servers for the purpose of email delivery. FormSubmit does not store or use your data beyond the delivery of that message. Please review FormSubmit's privacy policy at formsubmit.co for details on their data handling.`,
  },
  {
    title: '5. Data Sharing',
    body: `We do not sell, rent, or trade your personal information to any third party. We do not share your data with advertisers, data brokers, or marketing platforms. Your information may only be shared if required by Lebanese law or a valid legal obligation.`,
  },
  {
    title: '6. Data Retention',
    body: `We retain your inquiry information for as long as necessary to manage our business relationship with you. If no engagement follows your initial inquiry, we typically delete contact data within 12 months. You may request earlier deletion at any time by emailing us.`,
  },
  {
    title: '7. Cookies',
    body: `Our website does not use tracking cookies, advertising cookies, or third-party analytics. We may use strictly necessary session data to ensure the site functions correctly. No cookie consent banner is required because we do not place non-essential cookies.`,
  },
  {
    title: '8. Your Rights',
    body: `You have the right to:

• Access the personal information we hold about you
• Request correction of inaccurate data
• Request deletion of your data
• Withdraw consent for any ongoing communication

To exercise any of these rights, contact us at info@flowatik.com. We will respond within 14 business days.`,
  },
  {
    title: '9. Security',
    body: `We take reasonable precautions to protect your information. Our website is served over HTTPS. We do not store contact form submissions in a database — they are delivered directly to our inbox. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.`,
  },
  {
    title: '10. Changes to This Policy',
    body: `We may update this Privacy Policy from time to time. The date at the top of this page reflects the most recent revision. Continued use of our website after changes constitutes acceptance of the updated policy.`,
  },
  {
    title: '11. Contact',
    body: `For any privacy-related questions or requests, please reach us at:

Email: info@flowatik.com
Phone: +961 78 896 067
Location: Beirut, Lebanon`,
  },
]

export default function Privacy() {
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
              Privacy Policy
            </h1>
            <p className="mt-3 text-sm text-ink-soft">
              Last updated: May 5, 2026
            </p>
          </div>

          {/* Intro */}
          <p className="text-ink-soft leading-relaxed mb-12">
            At Flowatik, we respect your privacy. This policy outlines what personal data we collect,
            why we collect it, and how we handle it. We keep this simple — because we don't do
            anything complicated with your data.
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
