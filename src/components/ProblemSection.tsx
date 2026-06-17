const PROBLEM_CARDS = [
  {
    title: "Basic try-on apps",
    desc: "Look cheap and break trust at the exact moment the shopper is deciding to buy.",
  },
  {
    title: "Enterprise solutions",
    desc: "Slow to deploy and priced for brands far larger than yours.",
  },
  {
    title: "API-only tools",
    desc: "Hand you a toolkit and a backlog — you still need developers to ship anything.",
  },
];

export default function ProblemSection() {
  return (
    <section id="problem" className="py-16 md:py-24 lg:py-32 bg-white border-t border-gray-200">
      <div className="max-w-6xl mx-auto px-5 md:px-8">
        <div className="max-w-[60ch] mb-10 md:mb-14">
          <span className="text-[13px] font-medium text-gray-500">
            The product page is where fashion sales are won or lost
          </span>
          <h2 className="mt-3 text-3xl md:text-4xl lg:text-5xl font-normal tracking-tight leading-[1.05] text-gray-900">
            Shoppers can&rsquo;t picture the fit on their own body
          </h2>
          <p className="mt-4 text-base md:text-lg leading-relaxed text-gray-500 max-w-[60ch]">
            A flat photo on a single model leaves most shoppers guessing.
            Guessing means hesitation, abandoned carts, and returns that quietly
            erase your margin. The options on the market each fall short:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {PROBLEM_CARDS.map((card) => (
            <article
              key={card.title}
              className="bg-gray-50 border border-gray-200 rounded-2xl p-8"
            >
              <h3 className="text-xl font-normal tracking-tight text-gray-900 mb-2">
                {card.title}
              </h3>
              <p className="text-gray-500 leading-relaxed">{card.desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
