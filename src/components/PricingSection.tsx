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
    <section id="pricing" className="py-16 md:py-24 lg:py-32 bg-gray-50 border-t border-gray-200">
      <div className="max-w-6xl mx-auto px-5 md:px-8">
        <div className="max-w-[60ch] mb-10 md:mb-14">
          <span className="text-[13px] font-medium text-gray-500">
            Pricing built around your launch
          </span>
          <h2 className="mt-3 text-3xl md:text-4xl lg:text-5xl font-normal tracking-tight leading-[1.05] text-gray-900">
            Pick the launch that fits your catalog
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-stretch">
          {TIERS.map((tier) => (
            <article
              key={tier.name}
              className={`relative flex flex-col bg-white border rounded-2xl p-8 ${
                tier.featured
                  ? "border-gray-900 shadow-lg"
                  : "border-gray-200"
              }`}
            >
              {tier.badge && (
                <span className="absolute -top-3 left-8 bg-gray-900 text-white text-xs font-medium px-3 py-1 rounded-full">
                  {tier.badge}
                </span>
              )}
              <h3 className="text-xl font-medium tracking-tight text-gray-900">
                {tier.name}
              </h3>
              <p className="mt-3 text-3xl md:text-4xl font-normal tracking-tight text-gray-900 tabular-nums">
                {tier.price}
              </p>
              <p className="mt-1 mb-6 text-gray-500">{tier.summary}</p>
              <ul className="space-y-3 mb-8 flex-1">
                {tier.features.map((f) => (
                  <li key={f} className="flex gap-3 text-gray-900">
                    <span className="shrink-0 w-5 h-5 rounded-full bg-gray-900 text-white flex items-center justify-center">
                      <Check className="w-3 h-3" strokeWidth={3} />
                    </span>
                    <span className="text-sm leading-relaxed text-gray-600">{f}</span>
                  </li>
                ))}
              </ul>
              <a
                href="#cta"
                className={`block text-center text-sm font-medium px-6 py-3 rounded-full transition-all ${
                  tier.featured
                    ? "bg-gray-900 text-white hover:bg-gray-800 hover:shadow-lg"
                    : "text-gray-700 ring-1 ring-gray-300 hover:bg-gray-100"
                }`}
              >
                {tier.cta}
              </a>
            </article>
          ))}
        </div>

        <p className="mt-8 text-center text-gray-500">
          Start with a{" "}
          <strong className="text-gray-900 font-medium">
            $1,000 refundable reservation
          </strong>{" "}
          — credited toward your Pilot once you approve the demo renders.
        </p>
      </div>
    </section>
  );
}
