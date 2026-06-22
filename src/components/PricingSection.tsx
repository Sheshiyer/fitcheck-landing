import { Check } from "lucide-react";

interface Tier {
  name: string;
  price: string;
  summary: string;
  featured: boolean;
  badge?: string;
  cta: string;
  features: string[];
}

const TIERS: Tier[] = [
  {
    name: "Pilot",
    price: "$3,000",
    summary: "Prove the lift on your best-sellers.",
    featured: false,
    cta: "Start a Pilot",
    features: [
      "Personalized demo renders of your catalog",
      "Try-on widget on selected SKUs",
      "500 try-on credits",
      "Basic conversion analytics",
      "48-hour launch",
    ],
  },
  {
    name: "Premium",
    price: "$7,500",
    summary: "Scale try-on and capture the demand.",
    featured: true,
    badge: "Most popular",
    cta: "Choose Premium",
    features: [
      "Everything in Pilot",
      "2,000 try-on credits",
      "Lead capture on try-on",
      "A/B testing",
      "Klaviyo integration",
      "Priority support",
    ],
  },
  {
    name: "Enterprise",
    price: "$10,000–$15,000",
    summary: "Multi-store and bespoke, with a team behind you.",
    featured: false,
    cta: "Talk to us",
    features: [
      "Everything in Premium",
      "Unlimited try-on credits",
      "Multi-store support",
      "Custom integrations",
      "Dedicated success manager",
    ],
  },
];

export default function PricingSection() {
  return (
    <section id="pricing" className="py-16 md:py-24 lg:py-32 bg-[#0A0A0A] border-t border-white/10">
      <div className="max-w-6xl mx-auto px-5 md:px-8">
        <div className="max-w-[60ch] mb-10 md:mb-14">
          <span className="text-[13px] font-medium text-[#FBFF8D]">
            Pricing built around your launch
          </span>
          <h2 className="mt-3 text-3xl md:text-4xl lg:text-5xl font-normal tracking-tight leading-[1.05] text-white font-serif">
            Pick the launch that fits your catalog
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-stretch">
          {TIERS.map((tier) => (
            <article
              key={tier.name}
              className={`relative flex flex-col bg-white/5 border rounded-2xl p-8 ${
                tier.featured
                  ? "border-[#FBFF8D] shadow-lg shadow-[#FBFF8D]/10"
                  : "border-white/10"
              }`}
            >
              {tier.badge && (
                <span className="absolute -top-3 left-8 bg-[#FBFF8D] text-[#020202] text-xs font-medium px-3 py-1 rounded-full">
                  {tier.badge}
                </span>
              )}
              <h3 className="text-xl font-medium tracking-tight text-white">
                {tier.name}
              </h3>
              <p className="mt-3 text-3xl md:text-4xl font-normal tracking-tight text-white tabular-nums">
                {tier.price}
              </p>
              <p className="mt-1 mb-6 text-white/50">{tier.summary}</p>
              <ul className="space-y-3 mb-8 flex-1">
                {tier.features.map((f) => (
                  <li key={f} className="flex gap-3 text-white">
                    <span className="shrink-0 w-5 h-5 rounded-full bg-[#FBFF8D] text-[#020202] flex items-center justify-center">
                      <Check className="w-3 h-3" strokeWidth={3} />
                    </span>
                    <span className="text-sm leading-relaxed text-white/60">{f}</span>
                  </li>
                ))}
              </ul>
              <a
                href="#cta"
                className={`block text-center text-sm font-medium px-6 py-3 rounded-full transition-all ${
                  tier.featured
                    ? "bg-[#FBFF8D] text-[#020202] hover:bg-[#f0f47a] hover:shadow-lg"
                    : "text-white/70 ring-1 ring-white/20 hover:bg-white/10"
                }`}
              >
                {tier.cta}
              </a>
            </article>
          ))}
        </div>

        <p className="mt-8 text-center text-white/50">
          Start with a{" "}
          <strong className="text-[#FBFF8D] font-medium">
            $1,000 refundable reservation
          </strong>{" "}
          — credited toward your Pilot once you approve the demo renders.
        </p>
      </div>
    </section>
  );
}
