import { useState } from "react";
import { ChevronDown } from "lucide-react";

const FAQ_ITEMS = [
  {
    q: "How fast can we go live?",
    a: "Forty-eight hours from approved demo renders to a live pilot widget on your selected SKUs. We run the launch end to end.",
  },
  {
    q: "Do we need developers?",
    a: "No. Fitcheck is done-for-you and Shopify-first — no code to write, no manual product exports, nothing for your team to maintain.",
  },
  {
    q: "What does this do to returns?",
    a: "When shoppers can preview fit on their own body, fit-driven returns typically trend down — we target a 15–25% reduction on the styles in your pilot.",
  },
  {
    q: "What happens to shopper photos?",
    a: "Shopper photos are ephemeral by default — used to generate the try-on and not retained beyond it. Privacy is a default, not an upsell.",
  },
  {
    q: "How do the renders actually work?",
    a: "We generate try-on imagery of your real products on diverse bodies and tune it to your catalog. You approve the quality on your own SKUs before anything goes live.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="py-16 md:py-24 lg:py-32 bg-[#1A1A2E] border-t border-white/10">
      <div className="max-w-6xl mx-auto px-5 md:px-8">
        <div className="max-w-[60ch] mb-10 md:mb-14">
          <span className="text-[13px] font-medium text-[#FF6B35]">
            Straight answers
          </span>
          <h2 className="mt-3 text-3xl md:text-4xl lg:text-5xl font-normal tracking-tight leading-[1.05] text-white font-serif">
            What founders ask before they reserve
          </h2>
        </div>

        <div className="max-w-3xl space-y-3">
          {FAQ_ITEMS.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={item.q}
                className="border border-white/10 rounded-2xl bg-white/5 overflow-hidden"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="flex items-center justify-between gap-4 w-full px-6 py-5 text-left text-lg font-medium text-white hover:bg-white/5 transition-colors"
                  aria-expanded={isOpen}
                >
                  <span>{item.q}</span>
                  <ChevronDown
                    className={`w-5 h-5 shrink-0 text-white/40 transition-transform ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-6 pb-5 text-white/60 leading-relaxed">
                    {item.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
