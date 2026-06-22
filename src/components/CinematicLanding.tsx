import { useState, useEffect, useRef, useCallback } from "react";
import { ArrowLeft, Plus, Minus, Menu, X } from "lucide-react";

/* ──────────────────────────── Assets ──────────────────────────── */
const VIDEO_1 = "https://d8j0ntlcm91z4.cloudfront.net/user_30161RVPXOghdWIXxB44wROFX8V/hf_20260622_055122_205d22c2-1636-4b85-a8fd-18ca3d7cdde7.mp4";
const VIDEO_2 = "https://d8j0ntlcm91z4.cloudfront.net/user_30161RVPXOghdWIXxB44wROFX8V/hf_20260622_060051_9bec51e3-d56a-4d56-9998-0eeff691c9d0.mp4";
const HERO_IMG = "https://d8j0ntlcm91z4.cloudfront.net/user_30161RVPXOghdWIXxB44wROFX8V/hf_20260622_060740_200db1d7-6059-4e10-8078-fd7176aa84b0.png";
const PANEL_IMG_1 = "https://d8j0ntlcm91z4.cloudfront.net/user_30161RVPXOghdWIXxB44wROFX8V/hf_20260622_054554_78317d08-36ae-4d9b-878e-714f1209cdd5.png";
const PANEL_IMG_2 = "https://d8j0ntlcm91z4.cloudfront.net/user_30161RVPXOghdWIXxB44wROFX8V/hf_20260622_054835_f30885de-e838-4105-8702-0e24728975f0.png";

const HERO_VH = 500;
const TXT_SHADOW = "0 2px 12px rgba(0,0,0,0.9), 0 0 40px rgba(0,0,0,0.6)";

/* ──────────────────────────── Helpers ──────────────────────────── */
function lerp(a: number, b: number, t: number) { return a + (b - a) * t; }
function clamp(v: number, min: number, max: number) { return Math.min(Math.max(v, min), max); }

function getStaggerStyle(progress: number, start: number, end: number) {
  if (progress <= start) return { opacity: 1, transform: "translateY(0)", filter: "blur(0px)", textShadow: TXT_SHADOW };
  const ratio = clamp((progress - start) / (end - start), 0, 1);
  return {
    opacity: 1 - ratio, transform: `translateY(${-75 * ratio}px)`, filter: `blur(${ratio * 16}px)`,
    textShadow: TXT_SHADOW, transition: "all 0.35s cubic-bezier(0.16,1,0.3,1)", willChange: "opacity, transform, filter",
    pointerEvents: (1 - ratio < 0.15 ? "none" : "auto") as React.CSSProperties["pointerEvents"],
  };
}

/* ──────────────────────────── Product data ──────────────────────────── */
interface Product { category: string; title: string; description: string; image: string; price: number | null; priceLabel: string; cta: string; }
const PRODUCTS: [Product, Product] = [
  { category: "Shopify Integration", title: "Virtual Try-On Widget",
    description: "One-click Shopify integration. Add an AI-powered \u2018Try It On\u2019 button to any product page. Shoppers upload a photo and see themselves wearing your garments \u2014 boosting confidence, conversions, and reducing returns by up to 30%.",
    image: PANEL_IMG_1, price: 3000, priceLabel: "Pilot launch from", cta: "RESERVE YOUR LAUNCH" },
  { category: "In-Store Hardware", title: "Smart Mirror Kiosk",
    description: "Android-powered smart mirror for retail floors. Customers step up, the camera captures them, and AI renders them wearing any garment from your catalog \u2014 zero fitting rooms, infinite outfit combinations.",
    image: PANEL_IMG_2, price: null, priceLabel: "Custom pricing", cta: "REQUEST A DEMO" },
];

function BrandCrest() {
  return (<svg viewBox="0 0 256 256" fill="currentColor" className="w-10 h-10 sm:w-12 sm:h-12 drop-shadow-lg">
    <path d="M 144 256 L 27.598 256 L 144 139.598 Z M 256 207.5 L 200 256 L 200 56 L 0 56 L 48 0 L 256 0 Z M 0 204.402 L 0 112 L 92.402 112 Z" />
  </svg>);
}

const NAV_LINKS = [
  { label: "How It Works", href: "#how-it-works" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
];

/* ══════════════════════════════════════════════════════════════════════ */
export default function CinematicLanding() {
  const [progress, setProgress] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [mobileNav, setMobileNav] = useState(false);

  const targetScrollRef = useRef(0);
  const currentScrollRef = useRef(0);
  const targetV1Ref = useRef(0);
  const currentV1Ref = useRef(0);
  const targetV2Ref = useRef(0);
  const currentV2Ref = useRef(0);
  const targetFrameRef = useRef(1);
  const currentFrameRef = useRef(1);
  const video1Ref = useRef<HTMLVideoElement>(null);
  const video2Ref = useRef<HTMLVideoElement>(null);
  const rafRef = useRef(0);
  const prevProductRef = useRef("");
  const TOTAL_FRAMES = 480;

  const isInHero = progress < 0.98;
  const isPanelOpen = isInHero && ((progress >= 0.4 && progress < 0.5) || progress >= 0.9);
  const isSecondCard = progress >= 0.9;
  const product = isSecondCard ? PRODUCTS[1] : PRODUCTS[0];

  if (product.title !== prevProductRef.current) {
    prevProductRef.current = product.title;
    if (quantity !== 1) setQuantity(1);
  }

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
      currentScrollRef.current += Math.abs(diff) < 0.0002 ? diff : diff * 0.05;
      const p = currentScrollRef.current;
      setProgress(p);
      let v1 = 0, v2 = 0, fr = 1;
      if (p <= 0.4) { const r = p / 0.4; v1 = r; fr = 1 + r * 239; }
      else if (p <= 0.5) { v1 = 1; fr = 240; }
      else if (p <= 0.9) { const r = (p - 0.5) / 0.4; v1 = 1; v2 = r; fr = 241 + r * 239; }
      else { v1 = 1; v2 = 1; fr = TOTAL_FRAMES; }
      targetV1Ref.current = v1; targetV2Ref.current = v2; targetFrameRef.current = fr;
      const ve1 = video1Ref.current;
      if (ve1?.duration) { currentV1Ref.current = lerp(currentV1Ref.current, v1 * ve1.duration, 0.08); if (!ve1.seeking) ve1.currentTime = currentV1Ref.current; }
      const ve2 = video2Ref.current;
      if (ve2?.duration) { currentV2Ref.current = lerp(currentV2Ref.current, v2 * ve2.duration, 0.08); if (!ve2.seeking) ve2.currentTime = currentV2Ref.current; }
      currentFrameRef.current = clamp(lerp(currentFrameRef.current, targetFrameRef.current, 0.08), 1, TOTAL_FRAMES);
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
    <div style={{ height: `${HERO_VH}vh` }} className="relative bg-[#020202]">

      {/* ─── Fixed video stage ─── */}
      <div className="fixed inset-0 z-0 pointer-events-none transition-opacity duration-500"
        style={{ opacity: isInHero ? 1 : 0 }}>
        <video ref={video1Ref} src={VIDEO_1} muted playsInline preload="auto"
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700"
          style={{ opacity: progress < 0.48 ? 0.85 : 0 }} />
        <video ref={video2Ref} src={VIDEO_2} muted playsInline preload="auto"
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700"
          style={{ opacity: progress >= 0.48 ? 0.85 : 0 }} />
        <canvas className="hidden" />
        {/* Gradients — stronger on mobile for text contrast */}
        <div className="absolute top-0 left-0 right-0 h-32 sm:h-44 bg-gradient-to-b from-black/90 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-48 sm:h-56 bg-gradient-to-t from-black/95 to-transparent" />
        <div className="absolute top-0 left-0 bottom-0 w-2/3 sm:w-1/2 bg-gradient-to-r from-black/60 sm:from-black/50 to-transparent" />
      </div>

      {/* ─── Progress bar ─── */}
      {isInHero && (
        <div className="fixed top-0 left-0 h-[2.5px] bg-[#FBFF8D] z-50 pointer-events-none"
          style={{ width: `${progress * 100}%`, transition: "width 75ms linear" }} />
      )}

      {/* ─── Editorial overlay ─── */}
      <div className="fixed inset-0 z-10 flex flex-col justify-between p-4 sm:p-6 md:p-10 lg:p-12"
        style={{
          pointerEvents: progress > 0.45 || !isInHero ? "none" : "auto",
          visibility: progress >= 0.45 || !isInHero ? "hidden" : "visible",
        }}>

        {/* Header */}
        <div className="flex justify-between items-start gap-4">
          {/* Brand + sub-header */}
          <div className="flex flex-col gap-4 sm:gap-8 shrink min-w-0" style={getStaggerStyle(progress, 0.0, 0.12)}>
            <BrandCrest />
            <div className="hidden sm:block" style={{ textShadow: TXT_SHADOW }}>
              <h3 className="text-white font-bold text-[14px] lg:text-[15px] tracking-[-0.02em] leading-snug">
                AI-Powered Virtual Try-On For<br />Fashion Retail & E-Commerce
              </h3>
              <p className="mt-2 text-white/80 text-[12px] lg:text-[13px] max-w-[300px] leading-relaxed">
                Photorealistic try-on technology for Shopify stores and in-store kiosks.
              </p>
            </div>
          </div>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-5 lg:gap-8 text-[13px] text-white font-medium shrink-0"
            style={{ ...getStaggerStyle(progress, 0.03, 0.15), textShadow: TXT_SHADOW }}>
            {NAV_LINKS.map(({ label, href }) => (
              <a key={label} href={href}
                className="relative hover:text-[#FBFF8D] hover:scale-105 transition-all after:absolute after:left-0 after:-bottom-0.5 after:h-[1px] after:bg-[#FBFF8D] after:w-0 hover:after:w-full after:transition-all">
                {label}
              </a>
            ))}
            <a href="#cta"
              className="bg-[#FBFF8D] text-[#020202] text-[12px] font-bold px-5 py-2.5 rounded-full hover:bg-[#f0f47a] transition-colors shadow-lg">
              Request Demo
            </a>
          </nav>

          {/* Mobile hamburger */}
          <button className="md:hidden text-white p-1 shrink-0" onClick={() => setMobileNav(!mobileNav)}
            style={{ textShadow: TXT_SHADOW }}>
            {mobileNav ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile nav dropdown */}
        {mobileNav && (
          <div className="md:hidden absolute top-14 right-4 left-4 bg-black/80 backdrop-blur-xl rounded-2xl border border-white/10 p-5 z-40 animate-fade-up"
            style={{ pointerEvents: "auto" }}>
            <div className="flex flex-col gap-4">
              {NAV_LINKS.map(({ label, href }) => (
                <a key={label} href={href} onClick={() => setMobileNav(false)}
                  className="text-white text-[15px] font-medium hover:text-[#FBFF8D] transition-colors">{label}</a>
              ))}
              <a href="#cta" onClick={() => setMobileNav(false)}
                className="bg-[#FBFF8D] text-[#020202] text-[13px] font-bold px-5 py-3 rounded-full text-center hover:bg-[#f0f47a] transition-colors mt-1">
                Request Demo
              </a>
            </div>
          </div>
        )}

        {/* Hero content */}
        <div className="flex flex-col lg:grid lg:grid-cols-12 items-end gap-4 sm:gap-6 lg:gap-0">
          {/* Left: headline + manifesto */}
          <div className="lg:col-span-7 w-full">
            <h1 id="sculpted-title" className="text-[#FBFF8D] uppercase leading-[0.88] font-serif"
              style={{ fontSize: "clamp(2rem, 8vw, 7.5rem)", textShadow: "0 4px 24px rgba(0,0,0,0.7)" }}>
              <div style={getStaggerStyle(progress, 0.09, 0.2)}>
                <span className="hidden sm:inline">&nbsp;&nbsp;&nbsp;&nbsp;</span><em>TRY IT</em>
              </div>
              <div style={getStaggerStyle(progress, 0.12, 0.23)}>ON. SELL WITH</div>
              <div style={getStaggerStyle(progress, 0.15, 0.26)}><em>CONFIDENCE</em></div>
            </h1>
            <div className="mt-4 sm:mt-6 flex flex-col sm:flex-row gap-3 sm:gap-6">
              <p className="text-white/80 text-[12px] sm:text-[13px] max-w-[280px] leading-relaxed font-medium"
                style={getStaggerStyle(progress, 0.18, 0.29)}>
                We build AI that shows shoppers exactly how clothes fit before
                they buy — from storefronts to retail floors.
              </p>
              <p className="text-white/80 text-[12px] sm:text-[13px] max-w-[280px] leading-relaxed font-medium hidden sm:block"
                style={getStaggerStyle(progress, 0.21, 0.32)}>
                Every try-on is a moment of confidence. A bridge between
                browsing and buying — one garment render at a time.
              </p>
            </div>
          </div>

          {/* Right: product card — hidden on small mobile */}
          <div className="hidden min-[480px]:flex lg:col-span-5 justify-start lg:justify-end w-full lg:w-auto">
            <div className="max-w-[180px] sm:max-w-[220px] lg:max-w-[240px]">
              <div style={getStaggerStyle(progress, 0.14, 0.25)}>
                <span className="text-white/80 text-[10px] sm:text-[11px] uppercase tracking-[0.12em] font-semibold"
                  style={{ textShadow: TXT_SHADOW }}>Fitcheck Platform</span>
                <h2 className="text-white font-serif text-base sm:text-lg mt-1" style={{ textShadow: TXT_SHADOW }}>AI Virtual Try-On</h2>
                <p className="text-white/70 text-[10px] sm:text-[11px] mt-1 leading-relaxed hidden sm:block"
                  style={{ textShadow: TXT_SHADOW }}>
                  Photorealistic garment renders on any body — in under 15 seconds
                </p>
              </div>
              <div className="group relative aspect-[4/5] rounded-lg overflow-hidden mt-2 sm:mt-3 cursor-pointer hover:scale-[1.04] transition-transform duration-500"
                id="product-image-card" style={getStaggerStyle(progress, 0.18, 0.29)}>
                <img src={HERO_IMG} alt="Fitcheck Virtual Try-On"
                  className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-700" />
              </div>
              <p className="text-center font-serif text-white text-base sm:text-lg mt-2 transition-colors hidden sm:block"
                style={getStaggerStyle(progress, 0.2, 0.31)}>Explore →</p>
            </div>
          </div>
        </div>
      </div>

      {/* ─── Slide-in product panel (z-40 to be above editorial z-10) ─── */}
      <div className="fixed top-0 left-0 h-full w-full sm:w-[440px] md:w-[540px] lg:w-[648px] z-40 overflow-y-auto"
        style={{
          backgroundColor: "#FAF9F5", color: "#121212",
          transform: isPanelOpen ? "translateX(0)" : "translateX(-100%)",
          transition: "transform 1100ms cubic-bezier(0.16,1,0.3,1)",
          boxShadow: isPanelOpen ? "12px 0 45px rgba(0,0,0,0.35)" : "none",
        }}>
        <button onClick={() => scrollToHero(progress >= 0.9 ? 0.82 : 0.35)}
          className="flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.16em] text-[#8E8B84] hover:text-[#121212] transition-colors p-4 sm:p-6 md:p-10">
          <ArrowLeft className="w-4 h-4" /> Back to experience
        </button>

        <div className="px-4 sm:px-6 md:px-10 pb-6">
          <div className="text-center max-w-[460px] mx-auto">
            <span className="text-[10px] sm:text-[10.5px] uppercase tracking-[0.15em] text-[#8E8B84]">{product.category}</span>
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl mt-2 text-[#121212]">{product.title}</h2>
            <p className="text-[11px] sm:text-[12px] text-[#73716C] mt-3 leading-relaxed max-w-[380px] mx-auto">{product.description}</p>
          </div>
          <div className="mt-4 sm:mt-6 max-w-[460px] mx-auto">
            <img src={product.image} alt={product.title} className="w-full rounded-lg object-cover" />
          </div>
        </div>

        <div className="border-t border-[#E5E5E2] px-4 sm:px-6 md:px-10 py-4 sm:py-5 mt-2 sm:mt-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
            <a href="#cta"
              className="h-[46px] sm:h-[50px] bg-[#121212] text-white text-[10px] sm:text-[11px] font-medium uppercase tracking-[0.15em] px-5 sm:px-6 rounded-sm hover:bg-[#2a2a2a] transition-colors flex items-center w-full sm:w-auto justify-center sm:justify-start">
              {product.cta}
            </a>
            {product.price !== null && (
              <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
                <div className="flex items-center h-[38px] sm:h-[42px] border border-[#E5E5E2] rounded-sm bg-white">
                  <button onClick={() => setQuantity((q) => Math.max(1, q - 1))} className="w-9 sm:w-10 h-full flex items-center justify-center text-[#8E8B84] hover:text-[#121212]">
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="w-7 sm:w-8 text-center text-sm font-medium">{quantity}</span>
                  <button onClick={() => setQuantity((q) => q + 1)} className="w-9 sm:w-10 h-full flex items-center justify-center text-[#8E8B84] hover:text-[#121212]">
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
                <span className="font-serif text-xl sm:text-2xl text-[#121212]">${(product.price * quantity).toLocaleString()}</span>
              </div>
            )}
            {product.price === null && <span className="font-serif text-lg sm:text-xl text-[#8E8B84]">{product.priceLabel}</span>}
          </div>

          {/* Feature grid */}
          {(isSecondCard || (!isSecondCard && isPanelOpen)) && (
            <div className="mt-4 sm:mt-6 grid grid-cols-2 gap-2 sm:gap-3">
              {(isSecondCard
                ? [["42\u2033 Touch Display","Full HD Android screen"],["Camera Built-In","Auto-capture silhouette"],["Offline Mode","Works without internet"],["Fleet Dashboard","Manage all kiosks"]]
                : [["One-Click Install","No code needed"],["Any Theme","All OS 2.0 themes"],["< 15s Renders","Photorealistic results"],["\u221230% Returns","Buy with confidence"]]
              ).map(([t,d]) => (
                <div key={t} className="bg-[#FAF9F5] border border-[#E5E5E2] rounded-sm p-2.5 sm:p-3">
                  <p className="text-[10px] sm:text-[11px] font-semibold text-[#121212]">{t}</p>
                  <p className="text-[9px] sm:text-[10px] text-[#8E8B84] mt-0.5">{d}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <style>{`
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #020202; }
        ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.15); border-radius: 3px; }
        ::-webkit-scrollbar-thumb:hover { background: rgba(251,255,141,0.4); }
      `}</style>
    </div>
  );
}
