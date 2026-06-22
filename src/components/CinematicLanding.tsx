import { useState, useEffect, useRef, useCallback } from "react";
import { User, ShoppingBag, ArrowLeft, Plus, Minus } from "lucide-react";

/* ──────────────────────────── Asset URLs ──────────────────────────── */
const VIDEO_1 =
  "https://d8j0ntlcm91z4.cloudfront.net/user_30161RVPXOghdWIXxB44wROFX8V/hf_20260622_055122_205d22c2-1636-4b85-a8fd-18ca3d7cdde7.mp4";
const VIDEO_2 =
  "https://d8j0ntlcm91z4.cloudfront.net/user_30161RVPXOghdWIXxB44wROFX8V/hf_20260622_060051_9bec51e3-d56a-4d56-9998-0eeff691c9d0.mp4";
const HERO_IMG =
  "https://d8j0ntlcm91z4.cloudfront.net/user_30161RVPXOghdWIXxB44wROFX8V/hf_20260622_060740_200db1d7-6059-4e10-8078-fd7176aa84b0.png";
const PANEL_IMG_1 =
  "https://d8j0ntlcm91z4.cloudfront.net/user_30161RVPXOghdWIXxB44wROFX8V/hf_20260622_054554_78317d08-36ae-4d9b-878e-714f1209cdd5.png";
const PANEL_IMG_2 =
  "https://d8j0ntlcm91z4.cloudfront.net/user_30161RVPXOghdWIXxB44wROFX8V/hf_20260622_054835_f30885de-e838-4105-8702-0e24728975f0.png";

/* ──────────────────────────── Helpers ──────────────────────────── */
function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function clamp(v: number, min: number, max: number) {
  return Math.min(Math.max(v, min), max);
}

/** Stagger-fade: element melts upward + blurs as progress enters [start, end]. */
function getStaggerStyle(progress: number, start: number, end: number) {
  if (progress <= start) return { opacity: 1, transform: "translateY(0)", filter: "blur(0px)" };
  const ratio = clamp((progress - start) / (end - start), 0, 1);
  return {
    opacity: 1 - ratio,
    transform: `translateY(${-75 * ratio}px)`,
    filter: `blur(${ratio * 16}px)`,
    transition: "all 0.35s cubic-bezier(0.16,1,0.3,1)",
    willChange: "opacity, transform, filter",
    pointerEvents: (1 - ratio < 0.15 ? "none" : "auto") as React.CSSProperties["pointerEvents"],
  };
}

/* ──────────────────────────── Product data ──────────────────────────── */
interface Product {
  category: string;
  title: string;
  description: string;
  image: string;
  price: number | null;
  priceLabel: string;
  cta: string;
}

const PRODUCTS: [Product, Product] = [
  {
    category: "Shopify Integration",
    title: "Virtual Try-On Widget",
    description:
      "One-click Shopify integration. Add an AI-powered \u2018Try It On\u2019 button to any product page. Shoppers upload a full-body photo and see themselves wearing your garments in photorealistic detail \u2014 boosting confidence, increasing conversions, and reducing returns by up to 30%.",
    image: PANEL_IMG_1,
    price: 3000,
    priceLabel: "Pilot launch from",
    cta: "RESERVE YOUR LAUNCH",
  },
  {
    category: "In-Store Hardware",
    title: "Smart Mirror Kiosk",
    description:
      "Android-powered smart mirror for retail floors. Customers step up, the camera captures them, and AI renders them wearing any garment from your catalog \u2014 zero fitting rooms, infinite outfit combinations, memorable in-store experiences that drive traffic and loyalty.",
    image: PANEL_IMG_2,
    price: null,
    priceLabel: "Custom pricing",
    cta: "REQUEST A DEMO",
  },
];

/* ──────────────────────────── Brand crest SVG ──────────────────────────── */
function BrandCrest() {
  return (
    <svg viewBox="0 0 256 256" fill="currentColor" className="w-12 h-12">
      <path d="M 144 256 L 27.598 256 L 144 139.598 Z M 256 207.5 L 200 256 L 200 56 L 0 56 L 48 0 L 256 0 Z M 0 204.402 L 0 112 L 92.402 112 Z" />
    </svg>
  );
}

/* ══════════════════════════════════════════════════════════════════════
   Main Component
   ══════════════════════════════════════════════════════════════════════ */
export default function CinematicLanding() {
  /* ── State ── */
  const [progress, setProgress] = useState(0);
  const [quantity, setQuantity] = useState(1);

  /* ── Refs (avoid re-renders for animation values) ── */
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

  /* ── Derived ── */
  const isPanelOpen = (progress >= 0.4 && progress < 0.5) || progress >= 0.9;
  const isSecondCard = progress >= 0.9;
  const product = isSecondCard ? PRODUCTS[1] : PRODUCTS[0];

  // Reset quantity when product changes
  if (product.title !== prevProductRef.current) {
    prevProductRef.current = product.title;
    if (quantity !== 1) setQuantity(1);
  }

  /* ── Scroll handler ── */
  const onScroll = useCallback(() => {
    const el = document.documentElement;
    const raw = el.scrollTop / (el.scrollHeight - el.clientHeight);
    targetScrollRef.current = clamp(raw, 0, 1);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    const t = setTimeout(onScroll, 500);
    return () => {
      window.removeEventListener("scroll", onScroll);
      clearTimeout(t);
    };
  }, [onScroll]);

  /* ── Animation loop ── */
  useEffect(() => {
    function smoothUpdate() {
      // 1. Lerp scroll fraction
      const diff = targetScrollRef.current - currentScrollRef.current;
      if (Math.abs(diff) < 0.0002) {
        currentScrollRef.current = targetScrollRef.current;
      } else {
        currentScrollRef.current += diff * 0.05;
      }
      const p = currentScrollRef.current;
      setProgress(p);

      // 2. Map to phases
      let v1Ratio = 0, v2Ratio = 0, frame = 1;
      if (p <= 0.4) {
        const r = p / 0.4;
        v1Ratio = r; v2Ratio = 0; frame = 1 + r * 239;
      } else if (p <= 0.5) {
        v1Ratio = 1; v2Ratio = 0; frame = 240;
      } else if (p <= 0.9) {
        const r = (p - 0.5) / 0.4;
        v1Ratio = 1; v2Ratio = r; frame = 241 + r * 239;
      } else {
        v1Ratio = 1; v2Ratio = 1; frame = TOTAL_FRAMES;
      }
      targetV1Ref.current = v1Ratio;
      targetV2Ref.current = v2Ratio;
      targetFrameRef.current = frame;

      // 3. Scrub video 1
      const v1 = video1Ref.current;
      if (v1 && v1.duration) {
        const target = targetV1Ref.current * v1.duration;
        currentV1Ref.current = lerp(currentV1Ref.current, target, 0.08);
        if (!v1.seeking) v1.currentTime = currentV1Ref.current;
      }

      // 4. Scrub video 2
      const v2 = video2Ref.current;
      if (v2 && v2.duration) {
        const target = targetV2Ref.current * v2.duration;
        currentV2Ref.current = lerp(currentV2Ref.current, target, 0.08);
        if (!v2.seeking) v2.currentTime = currentV2Ref.current;
      }

      // 5. Lerp frame counter
      currentFrameRef.current = clamp(
        lerp(currentFrameRef.current, targetFrameRef.current, 0.08),
        1,
        TOTAL_FRAMES
      );

      rafRef.current = requestAnimationFrame(smoothUpdate);
    }
    rafRef.current = requestAnimationFrame(smoothUpdate);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  /* ── Helpers ── */
  function scrollTo(pct: number) {
    const el = document.documentElement;
    const target = pct * (el.scrollHeight - el.clientHeight);
    window.scrollTo({ top: target, behavior: "smooth" });
  }

  /* ══════════════════════════════════════════════════════════════════
     Render
     ══════════════════════════════════════════════════════════════════ */
  return (
    <div className="h-[650vh] bg-[#020202] overflow-x-hidden antialiased font-sans relative">
      {/* ─── 1. Fixed video stage ─── */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <video
          ref={video1Ref}
          src={VIDEO_1}
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-in-out"
          style={{ opacity: progress < 0.48 ? 0.85 : 0 }}
        />
        <video
          ref={video2Ref}
          src={VIDEO_2}
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-in-out"
          style={{ opacity: progress >= 0.48 ? 0.85 : 0 }}
        />
        <canvas className="hidden" />
        {/* Gradient overlays */}
        <div className="absolute top-0 left-0 right-0 h-44 bg-gradient-to-b from-black/85 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-56 bg-gradient-to-t from-black/90 to-transparent" />
        <div className="absolute top-0 left-0 bottom-0 w-1/2 bg-gradient-to-r from-black/40 to-transparent hidden lg:block" />
      </div>

      {/* ─── 2. Progress bar ─── */}
      <div
        className="fixed top-0 left-0 h-[2.5px] bg-[#FBFF8D] z-50 pointer-events-none"
        style={{ width: `${progress * 100}%`, transition: "width 75ms linear" }}
      />

      {/* ─── 3. Editorial overlay ─── */}
      <div
        className="fixed inset-0 z-10 flex flex-col justify-between p-6 md:p-10 lg:p-12"
        style={{
          pointerEvents: progress > 0.45 ? "none" : "auto",
          visibility: progress >= 0.45 ? "hidden" : "visible",
        }}
      >
        {/* Header */}
        <div className="flex justify-between items-start">
          {/* Left: brand + sub-header */}
          <div className="flex flex-col gap-10" style={getStaggerStyle(progress, 0.0, 0.12)}>
            <BrandCrest />
            <div>
              <h3 className="text-white font-semibold text-[12.5px] tracking-[-0.03em] leading-snug">
                AI-Powered Virtual Try-On For
                <br />
                Fashion Retail & E-Commerce
              </h3>
              <p className="mt-2 text-white/50 text-[11px] max-w-[260px] leading-relaxed">
                Photorealistic try-on technology for Shopify stores and in-store
                kiosks. See any garment on any body in seconds — online and on
                the retail floor.
              </p>
            </div>
          </div>

          {/* Right: nav */}
          <nav
            className="hidden md:flex items-center gap-6 lg:gap-8 text-[13px] text-white/70"
            style={getStaggerStyle(progress, 0.03, 0.15)}
          >
            {["Solutions", "How It Works", "Pricing", "Contact"].map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase().replace(/\s+/g, "-")}`}
                className="relative hover:text-white hover:scale-105 transition-all after:absolute after:left-0 after:-bottom-0.5 after:h-[1px] after:bg-white after:w-0 hover:after:w-full after:transition-all"
              >
                {link}
              </a>
            ))}
            <div className="w-px h-4 bg-white/20" />
            <a href="#" className="hover:text-white transition-colors">
              <User className="w-[18px] h-[18px]" />
            </a>
            <button
              onClick={() => scrollTo(0.92)}
              className="relative hover:text-white transition-colors"
            >
              <ShoppingBag className="w-[18px] h-[18px]" />
              <span className="absolute -top-1 -right-1 w-[6.5px] h-[6.5px] rounded-full bg-[#FBFF8D] animate-pulse" />
            </button>
          </nav>
        </div>

        {/* Hero main grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 items-end gap-8 lg:gap-0">
          {/* Left: headline + manifesto */}
          <div className="lg:col-span-7">
            <h1
              id="sculpted-title"
              className="text-[#FBFF8D] uppercase leading-[0.88] font-serif"
              style={{ fontSize: "clamp(2.5rem, 5.6vw, 7.5rem)" }}
            >
              <div style={getStaggerStyle(progress, 0.09, 0.2)}>
                &nbsp;&nbsp;&nbsp;&nbsp;<em>TRY IT</em>
              </div>
              <div style={getStaggerStyle(progress, 0.12, 0.23)}>
                ON. SELL WITH
              </div>
              <div style={getStaggerStyle(progress, 0.15, 0.26)}>
                <em>CONFIDENCE</em>
              </div>
            </h1>
            <div className="mt-6 flex flex-col sm:flex-row gap-4 sm:gap-6">
              <p
                className="text-white/50 text-[11px] max-w-[260px] leading-relaxed"
                style={getStaggerStyle(progress, 0.18, 0.29)}
              >
                We build AI that shows shoppers exactly how clothes fit before
                they buy — from online storefronts to physical retail floors.
                Technology that eliminates guesswork and returns.
              </p>
              <p
                className="text-white/50 text-[11px] max-w-[260px] leading-relaxed"
                style={getStaggerStyle(progress, 0.21, 0.32)}
              >
                Every try-on is a moment of confidence. A bridge between
                browsing and buying. Fitcheck serves both the shopper and the
                brand — one garment render at a time.
              </p>
            </div>
          </div>

          {/* Right: product caption + card */}
          <div className="lg:col-span-5 flex justify-end">
            <div className="max-w-[240px]">
              <div style={getStaggerStyle(progress, 0.14, 0.25)}>
                <span className="text-white/50 text-[10.5px] uppercase tracking-[0.12em]">
                  Fitcheck Platform
                </span>
                <h2 className="text-white font-serif text-lg mt-1">
                  AI Virtual Try-On
                </h2>
                <p className="text-white/40 text-[10.5px] mt-1 leading-relaxed">
                  Photorealistic garment renders on any body — in under 15
                  seconds
                </p>
              </div>
              <div
                className="group relative aspect-[4/5] rounded-lg overflow-hidden mt-3 cursor-pointer hover:scale-[1.04] transition-transform duration-500"
                id="product-image-card"
                style={getStaggerStyle(progress, 0.18, 0.29)}
              >
                <img
                  src={HERO_IMG}
                  alt="Fitcheck Virtual Try-On"
                  className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <p
                className="text-center font-serif text-white text-lg mt-2 group-hover:text-[#FBFF8D] transition-colors"
                style={getStaggerStyle(progress, 0.2, 0.31)}
              >
                Explore →
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ─── 4. Slide-in product panel ─── */}
      <div
        className="fixed top-0 left-0 h-full w-full sm:w-[600px] lg:w-[648px] z-30 overflow-y-auto"
        style={{
          backgroundColor: "#FAF9F5",
          color: "#121212",
          transform: isPanelOpen ? "translateX(0)" : "translateX(-100%)",
          transition: "transform 1100ms cubic-bezier(0.16,1,0.3,1)",
          boxShadow: isPanelOpen ? "12px 0 45px rgba(0,0,0,0.22)" : "none",
        }}
      >
        {/* Back button */}
        <button
          onClick={() => scrollTo(progress >= 0.9 ? 0.82 : 0.35)}
          className="flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.16em] text-[#8E8B84] hover:text-[#121212] transition-colors p-6 md:p-10"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to experience
        </button>

        {/* Product info */}
        <div className="px-6 md:px-10 pb-6">
          <div className="text-center max-w-[460px] mx-auto">
            <span className="text-[10.5px] uppercase tracking-[0.15em] text-[#8E8B84]">
              {product.category}
            </span>
            <h2 className="font-serif text-3xl md:text-4xl mt-2 text-[#121212]">
              {product.title}
            </h2>
            <p className="text-[12px] text-[#73716C] mt-3 leading-relaxed max-w-[380px] mx-auto">
              {product.description}
            </p>
          </div>

          {/* Product image */}
          <div className="mt-6 max-w-[460px] mx-auto">
            <img
              src={product.image}
              alt={product.title}
              className="w-full rounded-lg object-cover"
            />
          </div>
        </div>

        {/* Footer transaction row */}
        <div className="border-t border-[#E5E5E2] mx-0 px-6 md:px-10 py-5 mt-4">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <button
              onClick={() => scrollTo(1)}
              className="h-[50px] bg-[#121212] text-white text-[11px] font-medium uppercase tracking-[0.15em] px-6 rounded-sm hover:bg-[#2a2a2a] transition-colors flex-shrink-0"
            >
              {product.cta}
            </button>

            {product.price !== null && (
              <div className="flex items-center gap-3">
                <div className="flex items-center h-[42px] border border-[#E5E5E2] rounded-sm bg-white">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="w-10 h-full flex items-center justify-center text-[#8E8B84] hover:text-[#121212] transition-colors"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="w-8 text-center text-sm font-medium">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="w-10 h-full flex items-center justify-center text-[#8E8B84] hover:text-[#121212] transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
                <span className="font-serif text-2xl text-[#121212]">
                  ${(product.price * quantity).toLocaleString()}
                </span>
              </div>
            )}

            {product.price === null && (
              <span className="font-serif text-xl text-[#8E8B84]">
                {product.priceLabel}
              </span>
            )}
          </div>

          {/* Kiosk features (second card only) */}
          {isSecondCard && (
            <div className="mt-6 grid grid-cols-2 gap-3">
              {[
                ["42\u2033 Touch Display", "Full HD Android-powered screen"],
                ["Camera Built-In", "Auto-capture shopper silhouette"],
                ["Offline Mode", "Works without internet via local cache"],
                ["Fleet Dashboard", "Manage all kiosks from one portal"],
              ].map(([title, desc]) => (
                <div key={title} className="bg-[#FAF9F5] border border-[#E5E5E2] rounded-sm p-3">
                  <p className="text-[11px] font-semibold text-[#121212]">{title}</p>
                  <p className="text-[10px] text-[#8E8B84] mt-0.5">{desc}</p>
                </div>
              ))}
            </div>
          )}

          {/* Shopify features (first card only) */}
          {!isSecondCard && isPanelOpen && (
            <div className="mt-6 grid grid-cols-2 gap-3">
              {[
                ["One-Click Install", "Theme app block — no code needed"],
                ["Any Theme", "Works with Dawn and all OS 2.0 themes"],
                ["< 15s Renders", "Photorealistic AI try-on results"],
                ["\u221230% Returns", "Shoppers buy with confidence"],
              ].map(([title, desc]) => (
                <div key={title} className="bg-[#FAF9F5] border border-[#E5E5E2] rounded-sm p-3">
                  <p className="text-[11px] font-semibold text-[#121212]">{title}</p>
                  <p className="text-[10px] text-[#8E8B84] mt-0.5">{desc}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ─── Inline styles ─── */}
      <style>{`
        @keyframes scrollLine {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #020202; }
        ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.15); border-radius: 3px; }
        ::-webkit-scrollbar-thumb:hover { background: rgba(251,255,141,0.4); }
        @media (max-height: 780px) and (min-width: 1024px) {
          #sculpted-title { margin-bottom: -0.5rem; }
          #product-image-card { padding: 0.25rem; }
        }
      `}</style>
    </div>
  );
}
