import { Check } from "lucide-react";

const POINTS = [
  "Personalized demo renders of your real catalog, so you see the quality before you commit.",
  "A pilot widget on your best-sellers — the styles where confidence moves the most revenue.",
  "A 48-hour launch, fully managed, with everything framed in add-to-cart and return-rate terms.",
];

export default function SolutionSection() {
  return (
    <section id="solution" className="py-16 md:py-24 lg:py-32 bg-[#16213E] border-t border-white/10">
      <div className="max-w-6xl mx-auto px-5 md:px-8">
        <div className="max-w-[60ch] mb-10 md:mb-14">
          <span className="text-[13px] font-medium text-[#FF6B35]">
            One done-for-you launch, framed around revenue
          </span>
          <h2 className="mt-3 text-3xl md:text-4xl lg:text-5xl font-normal tracking-tight leading-[1.05] text-white font-serif">
            We launch virtual try-on for you — outcomes first, novelty never
          </h2>
          <p className="mt-4 text-base md:text-lg leading-relaxed text-white/60 max-w-[60ch]">
            Fitcheck is a managed launch service, not another plugin you have to
            figure out. We start with personalized demo renders of your own
            products as the hook, stand up a pilot widget on your best-selling
            SKUs, and go live in 48&nbsp;hours — Shopify-first, so there&rsquo;s
            no manual export and nothing for your team to maintain.
          </p>
        </div>

        <ul className="space-y-5 max-w-2xl">
          {POINTS.map((point) => (
            <li key={point} className="flex gap-4 items-start text-lg">
              <span className="shrink-0 w-7 h-7 rounded-full bg-[#FF6B35] text-white flex items-center justify-center">
                <Check className="w-4 h-4" strokeWidth={3} />
              </span>
              <span className="text-white/70 leading-relaxed">{point}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
