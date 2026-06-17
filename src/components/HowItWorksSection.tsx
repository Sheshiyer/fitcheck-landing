const STEPS = [
  {
    num: 1,
    title: "We render your best-sellers",
    desc: "Send us your top styles. We generate try-on renders across diverse body types, so every shopper sees someone like them in the fit.",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-11 h-11" aria-hidden="true">
        <rect x="5" y="6" width="32" height="36" rx="7" stroke="#B9BCD0" strokeWidth="2.5" />
        <circle cx="21" cy="19" r="5" fill="#111827" />
        <path d="M12 36c0-5 4-8 9-8s9 3 9 8" stroke="#111827" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M40 8l1.4 3 3 1.4-3 1.4L40 18l-1.4-3-3-1.4 3-1.4z" fill="#111827" />
      </svg>
    ),
  },
  {
    num: 2,
    title: "The pilot widget goes live",
    desc: "We install a clean try-on widget on your selected SKUs — Shopify-first, no developer time, no manual product exports.",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-11 h-11" aria-hidden="true">
        <rect x="5" y="9" width="38" height="30" rx="5" stroke="#B9BCD0" strokeWidth="2.5" />
        <path d="M5 17h38" stroke="#B9BCD0" strokeWidth="2.5" />
        <circle cx="10.5" cy="13" r="1.3" fill="#B9BCD0" />
        <circle cx="15" cy="13" r="1.3" fill="#B9BCD0" />
        <rect x="13" y="24" width="22" height="9" rx="4.5" fill="#111827" />
      </svg>
    ),
  },
  {
    num: 3,
    title: "Shoppers try on and buy",
    desc: "Shoppers preview the fit on their own body, gain confidence, and add to cart — with fit-driven returns trending down.",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-11 h-11" aria-hidden="true">
        <path d="M11 16h26l-2 24H13z" stroke="#B9BCD0" strokeWidth="2.5" strokeLinejoin="round" />
        <path d="M18 18v-4a6 6 0 0 1 12 0v4" stroke="#B9BCD0" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M18 28l4 4 8-9" stroke="#111827" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];

export default function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-16 md:py-24 lg:py-32 bg-white border-t border-gray-200">
      <div className="max-w-6xl mx-auto px-5 md:px-8">
        <div className="max-w-[60ch] mb-10 md:mb-14">
          <span className="text-[13px] font-medium text-gray-500">
            Three steps. Live in 48&nbsp;hours.
          </span>
          <h2 className="mt-3 text-3xl md:text-4xl lg:text-5xl font-normal tracking-tight leading-[1.05] text-gray-900">
            From catalog to confident shoppers — without lifting a finger
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {STEPS.map((step) => (
            <article
              key={step.num}
              className="border border-gray-200 rounded-2xl bg-gray-50 p-8"
            >
              <div className="mb-4">{step.icon}</div>
              <span className="inline-flex items-center justify-center w-10 h-10 rounded-full border-2 border-gray-900 text-gray-900 font-medium text-lg mb-4">
                {step.num}
              </span>
              <h3 className="text-xl font-normal tracking-tight text-gray-900 mb-2">{step.title}</h3>
              <p className="text-gray-500 leading-relaxed">{step.desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
