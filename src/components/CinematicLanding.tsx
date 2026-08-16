import { useState, useEffect, useRef, useCallback } from "react";
import { ArrowLeft, Plus, Minus } from "lucide-react";

/* ──────────────────────────── Assets ──────────────────────────── */
const VIDEO_1 = "https://d8j0ntlcm91z4.cloudfront.net/user_30161RVPXOghdWIXxB44wROFX8V/hf_20260623_122120_6b7d03b5-5cf8-4f53-9605-23934eb007a9.mp4";

const IMG_PRODUCT_CARD = "/assets/Photos/image-4.jpeg";
const IMG_ECOMMERCE = "/assets/Photos/image-2.jpeg";

const HERO_VH = 700; // Slower scroll (was 500)
const TXT_SHADOW = "0 2px 12px rgba(0,0,0,0.9), 0 0 40px rgba(0,0,0,0.6)";

/* ──────────────────────────── Helpers ──────────────────────────── */
function clamp(v: number, min: number, max: number) { return Math.min(Math.max(v, min), max); }

function getStaggerStyle(progress: number, start: number, end: number) {
  if (progress <= start) return { opacity: 1, transform: "translateY(0)", filter: "blur(0px)", textShadow: TXT_SHADOW };
  const ratio = clamp((progress - start) / (end - start), 0, 1);
  return {
    opacity: 1 - ratio, transform: `translateY(${-75 * ratio}px)`, filter: `blur(${ratio * 16}px)`,
    textShadow: TXT_SHADOW, transition: "all 0.45s cubic-bezier(0.16,1,0.3,1)", willChange: "opacity, transform, filter",
    pointerEvents: (1 - ratio < 0.15 ? "none" : "auto") as React.CSSProperties["pointerEvents"],
  };
}

/* ──────────────────────────── Brand Logo SVG ──────────────────────────── */
function FitcheckLogo({ variant = "light" }: { variant?: "light" | "dark" }) {
  const textColor = variant === "light" ? "#FFFFFF" : "#1A1A2E";
  return (
    <div className="flex items-center gap-2.5">
      <img src="/assets/Photos/fitcheck-logo.svg" alt="Fitcheck" className="w-9 h-9 sm:w-11 sm:h-11 drop-shadow-lg rounded-full" />
      <span className="text-lg sm:text-xl font-bold tracking-tight" style={{ color: textColor, textShadow: variant === "light" ? TXT_SHADOW : "none" }}>
        Fitcheck
      </span>
    </div>
  );
}

/* ──────────────────────────── Product data (Shopify only) ──────────────────────────── */
const SHOPIFY_PRODUCT = {
  category: "Shopify Integration",
  title: "Virtual Try-On Widget",
  description: "Add an AI-powered Try It On button to your Shopify product pages, so shoppers can explore a garment more personally before deciding.",
  image: IMG_ECOMMERCE,
  price: 99,
  priceLabel: "Monthly membership",
  cta: "START WITH FITCHECK",
};

/* ══════════════════════════════════════════════════════════════════════ */
export default function CinematicLanding() {
  const [progress, setProgress] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const targetScrollRef = useRef(0);
  const currentScrollRef = useRef(0);
  const rafRef = useRef(0);

  const isInHero = progress < 0.98;
  const isPanelOpen = isInHero && progress >= 0.55 && progress < 0.75;

  const onScroll = useCallback(() => {
    const heroH = window.innerHeight * (HERO_VH / 100);
    targetScrollRef.current = clamp(window.scrollY / heroH, 0, 1);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    const t = setTimeout(onScroll, 500);
    return () => { window.removeEventListener("scroll", onScroll); clearTimeout(t); };
  }, [onScroll]);

  useEffect(() => {
    function tick() {
      const diff = targetScrollRef.current - currentScrollRef.current;
      currentScrollRef.current += Math.abs(diff) < 0.0002 ? diff : diff * 0.12;
      setProgress(currentScrollRef.current);
      rafRef.current = requestAnimationFrame(tick);
    }
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  function scrollToHero(pct: number) {
    const heroH = window.innerHeight * (HERO_VH / 100);
    window.scrollTo({ top: pct * heroH, behavior: "smooth" });
  }

  return (
    <div id="top" style={{ height: `${HERO_VH}vh` }} className="relative bg-[#1A1A2E]">

      {/* ─── Fixed video stage — autoplay, no scroll scrub ─── */}
      <div className="fixed inset-0 z-0 pointer-events-none transition-opacity duration-500"
        style={{ opacity: isInHero ? 1 : 0 }}>
        <video src={VIDEO_1} autoPlay muted loop playsInline preload="auto"
          className="absolute inset-0 w-full h-full object-cover object-top opacity-80" />
        {/* Gradients */}
        <div className="absolute top-0 left-0 right-0 h-32 sm:h-44 bg-gradient-to-b from-[#1A1A2E]/95 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-48 sm:h-56 bg-gradient-to-t from-[#1A1A2E]/95 to-transparent" />
        <div className="absolute top-0 left-0 bottom-0 w-2/3 sm:w-1/2 bg-gradient-to-r from-[#1A1A2E]/70 to-transparent" />
      </div>

      {/* ─── Progress bar ─── */}
      {isInHero && (
        <div className="fixed top-0 left-0 h-[3px] bg-[#FF6B35] z-50 pointer-events-none"
          style={{ width: `${progress * 100}%`, transition: "width 100ms linear" }} />
      )}

      {/* ─── Editorial overlay ─── */}
      <div className="fixed inset-0 z-10 flex flex-col justify-between p-4 sm:p-6 md:p-10 lg:p-12"
        style={{
          pointerEvents: progress > 0.5 || !isInHero ? "none" : "auto",
          visibility: progress >= 0.5 || !isInHero ? "hidden" : "visible",
        }}>

        {/* Editorial introduction; global navigation stays available in Navbar. */}
        <div className="flex justify-between items-start gap-4 pt-14 sm:pt-16">
          <div className="flex flex-col gap-4 sm:gap-8 shrink min-w-0" style={getStaggerStyle(progress, 0.0, 0.15)}>
            <FitcheckLogo variant="light" />
            <div className="hidden sm:block" style={{ textShadow: TXT_SHADOW }}>
              <h3 className="text-white font-bold text-[14px] lg:text-[15px] tracking-[-0.02em] leading-snug">
                AI-Powered Virtual Try-On For<br />Fashion Retail & E-Commerce
              </h3>
              <p className="mt-2 text-white/80 text-[12px] lg:text-[13px] max-w-[300px] leading-relaxed">
                Photorealistic try-on technology for Shopify stores.
              </p>
            </div>
          </div>

        </div>

        {/* Hero content */}
        <div className="flex flex-col lg:grid lg:grid-cols-12 items-end gap-4 sm:gap-6 lg:gap-0">
          <div className="lg:col-span-7 w-full">
            <h1 className="text-white uppercase leading-[0.88] font-serif"
              style={{ fontSize: "clamp(2rem, 8vw, 7rem)", textShadow: "0 4px 24px rgba(0,0,0,0.7)" }}>
              <div style={getStaggerStyle(progress, 0.09, 0.22)}>
                <span className="text-[#FF6B35]">Try it</span>
              </div>
              <div style={getStaggerStyle(progress, 0.12, 0.25)}>before they</div>
              <div style={getStaggerStyle(progress, 0.15, 0.28)}><span className="text-[#FF6B35]">buy it</span></div>
            </h1>
            <div className="mt-4 sm:mt-6 flex flex-col sm:flex-row gap-3 sm:gap-6">
              <p className="text-white/80 text-[12px] sm:text-[13px] max-w-[280px] leading-relaxed font-medium"
                style={getStaggerStyle(progress, 0.2, 0.33)}>
                AI that shows shoppers exactly how clothes fit before
                they buy — powering Shopify stores and retail floors.
              </p>
              <p className="text-white/80 text-[12px] sm:text-[13px] max-w-[280px] leading-relaxed font-medium hidden sm:block"
                style={getStaggerStyle(progress, 0.23, 0.36)}>
                Every try-on is a moment of confidence. A bridge between
                browsing and buying — one garment render at a time.
              </p>
            </div>
          </div>

          {/* Right: product card */}
          <div className="hidden min-[480px]:flex lg:col-span-5 justify-start lg:justify-end w-full lg:w-auto">
            <div className="max-w-[180px] sm:max-w-[220px] lg:max-w-[240px]">
              <div style={getStaggerStyle(progress, 0.16, 0.28)}>
                <span className="text-[#FF6B35] text-[10px] sm:text-[11px] uppercase tracking-[0.12em] font-semibold"
                  style={{ textShadow: TXT_SHADOW }}>Fitcheck Platform</span>
                <h2 className="text-white font-serif text-base sm:text-lg mt-1" style={{ textShadow: TXT_SHADOW }}>AI Virtual Try-On</h2>
              </div>
              <div className="group relative aspect-[4/5] rounded-lg overflow-hidden mt-2 sm:mt-3 cursor-pointer hover:scale-[1.04] transition-transform duration-500 border border-[#FF6B35]/30"
                style={getStaggerStyle(progress, 0.2, 0.32)}>
                <img src={IMG_PRODUCT_CARD} alt="Fitcheck Virtual Try-On"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ─── Slide-in product panel (Shopify Widget only) ─── */}
      <div className="fixed top-0 left-0 h-full w-full sm:w-[440px] md:w-[540px] lg:w-[600px] z-40 overflow-y-auto"
        style={{
          backgroundColor: "#FAFAFA", color: "#1A1A2E",
          transform: isPanelOpen ? "translateX(0)" : "translateX(-100%)",
          transition: "transform 1100ms cubic-bezier(0.16,1,0.3,1)",
          boxShadow: isPanelOpen ? "12px 0 45px rgba(0,0,0,0.35)" : "none",
        }}>
        <button onClick={() => scrollToHero(0.45)}
          className="flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.16em] text-[#8E8B84] hover:text-[#1A1A2E] transition-colors p-4 sm:p-6 md:p-10">
          <ArrowLeft className="w-4 h-4" /> Back to experience
        </button>

        <div className="px-4 sm:px-6 md:px-10 pb-6">
          <div className="text-center max-w-[460px] mx-auto">
            <span className="text-[10px] sm:text-[10.5px] uppercase tracking-[0.15em] text-[#FF6B35] font-semibold">{SHOPIFY_PRODUCT.category}</span>
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl mt-2 text-[#1A1A2E]">{SHOPIFY_PRODUCT.title}</h2>
            <p className="text-[11px] sm:text-[12px] text-[#73716C] mt-3 leading-relaxed max-w-[380px] mx-auto">{SHOPIFY_PRODUCT.description}</p>
          </div>
          <div className="mt-4 sm:mt-6 max-w-[460px] mx-auto">
            <img src={SHOPIFY_PRODUCT.image} alt={SHOPIFY_PRODUCT.title} className="w-full rounded-lg object-cover" />
          </div>
        </div>

        <div className="border-t border-[#E5E5E2] px-4 sm:px-6 md:px-10 py-4 sm:py-5 mt-2 sm:mt-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
            <a href="#cta"
              className="h-[46px] sm:h-[50px] bg-[#FF6B35] text-white text-[10px] sm:text-[11px] font-medium uppercase tracking-[0.15em] px-5 sm:px-6 rounded-sm hover:bg-[#e55a28] transition-colors flex items-center w-full sm:w-auto justify-center sm:justify-start">
              {SHOPIFY_PRODUCT.cta}
            </a>
            <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
              <div className="flex items-center h-[38px] sm:h-[42px] border border-[#E5E5E2] rounded-sm bg-white">
                <button onClick={() => setQuantity((q) => Math.max(1, q - 1))} className="w-9 sm:w-10 h-full flex items-center justify-center text-[#8E8B84] hover:text-[#1A1A2E]">
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="w-7 sm:w-8 text-center text-sm font-medium">{quantity}</span>
                <button onClick={() => setQuantity((q) => q + 1)} className="w-9 sm:w-10 h-full flex items-center justify-center text-[#8E8B84] hover:text-[#1A1A2E]">
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
              <span className="font-serif text-xl sm:text-2xl text-[#1A1A2E]">${(SHOPIFY_PRODUCT.price! * quantity).toLocaleString()}</span>
            </div>
          </div>

          <div className="mt-4 sm:mt-6 grid grid-cols-2 gap-2 sm:gap-3">
            {[["One-Click Install","No code needed"],["Any Theme","All OS 2.0 themes"],["< 15s Renders","Photorealistic results"],["−30% Returns","Buy with confidence"]
            ].map(([t,d]) => (
              <div key={t} className="bg-white border border-[#E5E5E2] rounded-sm p-2.5 sm:p-3">
                <p className="text-[10px] sm:text-[11px] font-semibold text-[#1A1A2E]">{t}</p>
                <p className="text-[9px] sm:text-[10px] text-[#8E8B84] mt-0.5">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #1A1A2E; }
        ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.15); border-radius: 3px; }
        ::-webkit-scrollbar-thumb:hover { background: rgba(255,107,53,0.5); }
      `}</style>
    </div>
  );
}
