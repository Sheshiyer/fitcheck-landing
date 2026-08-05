import { ArrowLeft } from "lucide-react";
import BookingForm from "./BookingForm";

const VIDEO_KIOSK = "https://d8j0ntlcm91z4.cloudfront.net/user_30161RVPXOghdWIXxB44wROFX8V/hf_20260622_060051_9bec51e3-d56a-4d56-9998-0eeff691c9d0.mp4";
const IMG_KIOSK = "/assets/Photos/image-3.jpeg";
const IMG_BEFORE_AFTER = "/assets/Photos/image-5.jpeg";

/* ──────────────────────────── Logo ──────────────────────────── */
function FitcheckLogo() {
  return (
    <a href="/" className="flex items-center gap-2.5 group">
      <img src="/assets/Photos/fitcheck-logo.svg" alt="Fitcheck" className="w-9 h-9 drop-shadow-sm rounded-full" />
      <span className="text-lg font-bold tracking-tight text-[#1A1A2E] group-hover:text-[#FF6B35] transition-colors">
        Fitcheck <span className="text-[#FF6B35]">Physical</span>
      </span>
    </a>
  );
}

/* ══════════════════════════════════════════════════════════════════════ */
export default function PhysicalPage() {
  return (
    <div className="min-h-screen bg-white font-sans antialiased">
      {/* ─── Navbar ─── */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-[#1A1A2E]/5">
        <div className="max-w-7xl mx-auto px-5 md:px-10 h-16 flex items-center justify-between">
          <FitcheckLogo />
          <nav className="hidden md:flex items-center gap-8 text-[13px] text-[#1A1A2E] font-medium">
            <a href="/" className="hover:text-[#FF6B35] transition-colors">← Back to Shopify</a>
            <a href="#features" className="hover:text-[#FF6B35] transition-colors">Features</a>
            <a href="#how" className="hover:text-[#FF6B35] transition-colors">How It Works</a>
            <a href="#contact" className="bg-[#FF6B35] text-white px-5 py-2.5 rounded-full font-bold hover:bg-[#e55a28] transition-colors">
              Request a Demo
            </a>
          </nav>
          <a href="/" className="md:hidden flex items-center gap-1.5 text-[12px] text-[#8E8B84] font-medium">
            <ArrowLeft className="w-3.5 h-3.5" /> Back
          </a>
        </div>
      </header>

      {/* ─── Hero ─── */}
      <section className="relative min-h-screen overflow-hidden bg-[#1A1A2E] flex items-center">
        <div className="absolute inset-0">
          <video src={VIDEO_KIOSK} autoPlay muted loop playsInline
            className="w-full h-full object-cover opacity-50" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#1A1A2E] via-[#1A1A2E]/80 to-transparent" />
        </div>
        <div className="relative max-w-7xl mx-auto px-5 md:px-10 py-24 sm:py-32 lg:py-40 w-full">
          <div className="max-w-xl">
            <span className="text-[#FF6B35] text-[11px] uppercase tracking-[0.2em] font-semibold">In-Store Hardware</span>
            <h1 className="mt-4 text-white font-serif text-4xl sm:text-5xl lg:text-6xl leading-[1.05]">
              Smart Mirror<br /><span className="text-[#FF6B35]">Kiosk</span>
            </h1>
            <p className="mt-6 text-white/80 text-sm sm:text-base leading-relaxed max-w-md">
              Android-powered smart mirror for retail floors. Customers step up, the camera captures them,
              and AI renders them wearing any garment from your catalog — zero fitting rooms, infinite outfit combinations.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <a href="#contact" className="bg-[#FF6B35] text-white font-bold text-[13px] px-7 py-3.5 rounded-full hover:bg-[#e55a28] transition-colors text-center">
                Request a Demo
              </a>
              <a href="#features" className="border border-white/30 text-white font-medium text-[13px] px-7 py-3.5 rounded-full hover:border-[#FF6B35] hover:text-[#FF6B35] transition-colors text-center">
                Learn More
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Features ─── */}
      <section id="features" className="py-20 sm:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-5 md:px-10">
          <div className="text-center mb-14">
            <span className="text-[#FF6B35] text-[11px] uppercase tracking-[0.2em] font-semibold">Why Fitcheck Physical</span>
            <h2 className="mt-3 font-serif text-3xl sm:text-4xl text-[#1A1A2E]">The Future of Fitting Rooms</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {[
              { icon: "🪞", title: "Zero Fitting Rooms", desc: "Customers try on every item in your catalog without changing — faster decisions, happier shoppers." },
              { icon: "⚡", title: "15-Second Renders", desc: "AI generates photorealistic try-ons in under 15 seconds. Customers see results in real-time on the mirror display." },
              { icon: "📈", title: "Increase Dwell Time", desc: "Interactive experiences keep customers in-store longer, increasing basket size and repeat visits." },
              { icon: "🎯", title: "Data-Driven Insights", desc: "Track which items get tried on most, identify trends, and optimize your floor displays with real data." },
              { icon: "🔌", title: "Plug & Play Setup", desc: "Android-powered hardware arrives pre-configured. Mount it, connect WiFi, sync your catalog — done." },
              { icon: "🏬", title: "Any Retail Format", desc: "Works in boutiques, department stores, pop-ups, and showrooms. Scales from 1 kiosk to 100+." },
            ].map(({ icon, title, desc }) => (
              <div key={title} className="p-6 rounded-xl border border-[#1A1A2E]/8 hover:border-[#FF6B35]/30 hover:shadow-lg transition-all group">
                <span className="text-2xl">{icon}</span>
                <h3 className="mt-3 font-bold text-[#1A1A2E] text-base">{title}</h3>
                <p className="mt-2 text-[#73716C] text-[13px] leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── How It Works ─── */}
      <section id="how" className="py-20 sm:py-28 bg-[#F8F8F6]">
        <div className="max-w-7xl mx-auto px-5 md:px-10">
          <div className="text-center mb-14">
            <span className="text-[#FF6B35] text-[11px] uppercase tracking-[0.2em] font-semibold">Simple Setup</span>
            <h2 className="mt-3 font-serif text-3xl sm:text-4xl text-[#1A1A2E]">How It Works</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div className="space-y-8">
              {[
                { step: "01", title: "Install the Mirror", desc: "Mount the pre-configured Android smart mirror on your retail floor. WiFi setup takes under 5 minutes." },
                { step: "02", title: "Sync Your Catalog", desc: "Connect your product feed — Shopify, WooCommerce, or custom API. Your garments are ready instantly." },
                { step: "03", title: "Customers Try On", desc: "Shoppers step in front of the mirror. The camera captures them and AI renders garments on their body in real-time." },
                { step: "04", title: "Convert & Learn", desc: "Track try-on analytics, popular items, and conversion data. Optimize your inventory and displays." },
              ].map(({ step, title, desc }) => (
                <div key={step} className="flex gap-4">
                  <span className="text-[#FF6B35] font-bold text-[13px] shrink-0 mt-0.5">{step}</span>
                  <div>
                    <h3 className="font-bold text-[#1A1A2E] text-[15px]">{title}</h3>
                    <p className="mt-1 text-[#73716C] text-[13px] leading-relaxed">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="relative rounded-xl overflow-hidden shadow-2xl bg-[#F8F8F6]">
              <img src={IMG_BEFORE_AFTER} alt="Before and After Try-On" className="w-full h-auto object-contain" />
            </div>
          </div>
        </div>
      </section>

      {/* ─── Lifestyle CTA ─── */}
      <section className="py-20 sm:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-5 md:px-10 grid md:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div className="relative rounded-xl overflow-hidden shadow-2xl order-2 md:order-1">
            <img src={IMG_KIOSK} alt="Fitcheck Try On Experience" className="w-full h-auto object-contain" />
          </div>
          <div className="order-1 md:order-2">
            <span className="text-[#FF6B35] text-[11px] uppercase tracking-[0.2em] font-semibold">Seamless Experience</span>
            <h2 className="mt-3 font-serif text-3xl sm:text-4xl text-[#1A1A2E]">From Mirror to<br />Checkout</h2>
            <p className="mt-4 text-[#73716C] text-sm leading-relaxed max-w-md">
              Every try-on session generates a QR code. Customers scan, get their try-on images on their phone,
              and can purchase directly from your online store — bridging the in-store/online gap.
            </p>
            <ul className="mt-6 space-y-3">
              {["Custom branding on mirror UI", "Multi-language support", "Wheelchair-accessible height", "Enterprise SLA available"].map(t => (
                <li key={t} className="flex items-center gap-3 text-[13px] text-[#1A1A2E] font-medium">
                  <span className="w-5 h-5 rounded-full bg-[#FF6B35]/10 flex items-center justify-center text-[#FF6B35] text-[10px] font-bold">✓</span>
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ─── Contact / Demo Request ─── */}
      <section id="contact" className="py-20 sm:py-28 bg-[#1A1A2E]">
        <div className="max-w-2xl mx-auto px-5 md:px-10 text-center">
          <span className="text-[#FF6B35] text-[11px] uppercase tracking-[0.2em] font-semibold">Get Started</span>
          <h2 className="mt-3 font-serif text-3xl sm:text-4xl text-white">Request a Kiosk Demo</h2>
          <p className="mt-4 text-white/70 text-sm leading-relaxed max-w-md mx-auto">
            Custom pricing based on your retail format. Book a 30-minute call and we'll set up a pilot in your space.
          </p>
          <div className="mt-8 text-left">
            <BookingForm />
          </div>
        </div>
      </section>

      {/* ─── Footer ─── */}
      <footer className="py-8 bg-[#1A1A2E] border-t border-white/5">
        <div className="max-w-7xl mx-auto px-5 md:px-10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/40 text-[12px]">© {new Date().getFullYear()} Fitcheck · All rights reserved</p>
          <div className="flex items-center gap-6 text-[12px] text-white/40">
            <a href="/" className="hover:text-[#FF6B35] transition-colors">Shopify Widget</a>
            <a href="/privacy" className="hover:text-[#FF6B35] transition-colors">Privacy</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
