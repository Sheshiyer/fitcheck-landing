import { Check } from "lucide-react";
import { useState } from "react";

interface Plan {
  name: string;
  price: string;
  cadence: string;
  summary: string;
  cta: string;
  features: string[];
}

const PLANS: Plan[] = [
  {
    name: "Monthly",
    price: "$99",
    cadence: "/ month",
    summary: "A flexible start for stores ready to make fit feel personal.",
    cta: "Start monthly",
    features: [
      "AI virtual try-on for your storefront",
      "Guided onboarding and setup",
      "Conversion-ready product experience",
      "Cancel anytime",
    ],
  },
  {
    name: "Yearly",
    price: "$799",
    cadence: "/ year",
    summary: "The full Fitcheck experience, with the best value built in.",
    cta: "Choose yearly",
    features: [
      "Everything in Monthly",
      "Priority launch support",
      "Annual planning and optimization",
      "Save $389 versus monthly",
    ],
  },
];

export default function PricingSection() {
  const [selectedPlan, setSelectedPlan] = useState<"Monthly" | "Yearly">("Yearly");
  const activePlan = PLANS.find((plan) => plan.name === selectedPlan)!;

  return (
    <section id="pricing" className="py-16 md:py-24 lg:py-32 bg-[#16213E] border-t border-white/10">
      <div className="max-w-6xl mx-auto px-5 md:px-8">
        <div className="max-w-[60ch] mb-10 md:mb-14">
          <span className="text-[13px] font-medium text-[#FF6B35]">
            Simple pricing, built for momentum
          </span>
          <h2 className="mt-3 text-3xl md:text-4xl lg:text-5xl font-normal tracking-tight leading-[1.05] text-white font-serif">
            Choose the pace that fits your brand
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/60 md:text-lg">
            Start when you are ready. Stay flexible month to month, or make the year yours and keep more of your launch budget.
          </p>
        </div>

        <div className="mb-8 inline-flex rounded-full border border-white/15 bg-white/5 p-1" role="group" aria-label="Billing cadence">
          {PLANS.map((plan) => {
            const active = plan.name === selectedPlan;
            return (
              <button
                key={plan.name}
                type="button"
                onClick={() => setSelectedPlan(plan.name as "Monthly" | "Yearly")}
                aria-pressed={active}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${active ? "bg-white text-[#1A1A2E] shadow-sm" : "text-white/65 hover:text-white"}`}
              >
                {plan.name}
                {plan.name === "Yearly" && <span className="ml-2 text-xs text-[#FF6B35]">Save 33%</span>}
              </button>
            );
          })}
        </div>

        <div className="grid max-w-4xl grid-cols-1 gap-5 md:grid-cols-2">
          {PLANS.map((plan) => {
            const selected = plan.name === selectedPlan;
            const yearly = plan.name === "Yearly";
            return (
            <article
              key={plan.name}
              className={`relative flex flex-col rounded-2xl border p-8 transition-colors ${
                selected ? "border-[#FF6B35] bg-white/10 shadow-lg shadow-[#FF6B35]/10" : "border-white/10 bg-white/5"
              }`}
            >
              {yearly && (
                <span className="absolute -top-3 left-8 rounded-full bg-[#FF6B35] px-3 py-1 text-xs font-bold text-white">
                  Best value · Save $389
                </span>
              )}
              <h3 className="text-xl font-medium tracking-tight text-white">
                {plan.name}
              </h3>
              <p className="mt-3 flex items-baseline gap-2 font-normal tracking-tight text-white tabular-nums">
                <span className="text-4xl md:text-5xl">{plan.price}</span>
                <span className="text-sm text-white/55">{plan.cadence}</span>
              </p>
              <p className="mt-1 mb-6 text-white/50">{plan.summary}</p>
              {yearly && <p className="mb-6 text-sm font-semibold text-[#FF6B35]">That is $389 back in your budget each year.</p>}
              <ul className="space-y-3 mb-8 flex-1">
                {plan.features.map((f) => (
                  <li key={f} className="flex gap-3 text-white">
                    <span className="shrink-0 w-5 h-5 rounded-full bg-[#FF6B35] text-white flex items-center justify-center">
                      <Check className="w-3 h-3" strokeWidth={3} />
                    </span>
                    <span className="text-sm leading-relaxed text-white/60">{f}</span>
                  </li>
                ))}
              </ul>
              <a
                href="#cta"
                className={`block rounded-full px-6 py-3 text-center text-sm font-bold transition-all ${
                  selected
                    ? "bg-[#FF6B35] text-white hover:bg-[#e55a28] hover:shadow-lg"
                    : "text-white/80 ring-1 ring-white/20 hover:bg-white/10"
                }`}
              >
                {plan.cta}
              </a>
            </article>
          )})}
        </div>

        <p className="mt-8 max-w-2xl text-white/50">
          {activePlan.name === "Yearly" ? "Annual billing is $799 today — 33% less than twelve monthly payments." : "Monthly billing is $99, with the freedom to change course when your needs do."}
        </p>
      </div>
    </section>
  );
}
