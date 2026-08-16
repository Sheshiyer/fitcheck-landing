import BookingForm from "./BookingForm";

export default function CTASection() {
  return (
    <section
      id="cta"
      className="py-16 md:py-24 lg:py-32 bg-[#16213E] border-t border-white/10"
    >
      <div className="max-w-6xl mx-auto px-5 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
          {/* Copy */}
          <div>
            <span className="text-[13px] font-medium text-[#FF6B35]">
              Choose the plan that fits your store
            </span>
            <h2 className="mt-3 text-3xl md:text-4xl lg:text-5xl font-normal tracking-tight leading-[1.05] text-white font-serif">
              Bring Fitcheck to your product pages
            </h2>
            <p className="mt-4 text-base md:text-lg leading-relaxed text-white/60 max-w-[60ch]">
              Start monthly for $99 or choose yearly for $799. Book a short
              call if you would like help deciding how Fitcheck fits your store.
            </p>
          </div>

          {/* Booking form */}
          <div className="bg-white/5 text-white rounded-2xl p-8 md:p-10 border border-white/10 shadow-sm">
            <BookingForm />
          </div>
        </div>
      </div>
    </section>
  );
}
