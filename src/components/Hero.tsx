import { useState, type FormEvent } from "react";
import { ArrowUp, Sparkles } from "lucide-react";
import Navbar from "./Navbar";
import DashboardMockup from "./DashboardMockup";

const BG_IMAGE =
  "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260611_133301_d5f2a94a-b22e-4e4a-a6b6-eacdddf1f5b0.png&w=1280&q=85";

const GRASS_IMAGE =
  "https://res.cloudinary.com/dy5er7kv5/image/upload/q_auto/f_auto/v1781191264/grass_eam204.png";

export default function Hero() {
  const [storeUrl, setStoreUrl] = useState("");

  function handleSearch(e: FormEvent) {
    e.preventDefault();
    // Dispatch custom event so CTA form picks up the value
    window.dispatchEvent(
      new CustomEvent("fitcheck:prefill-store", { detail: storeUrl.trim() })
    );
    // Scroll to CTA section
    document.getElementById("cta")?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <section
      className="relative min-h-[100svh] overflow-hidden bg-cover bg-center flex flex-col"
      style={{ backgroundImage: `url(${BG_IMAGE})` }}
    >
      {/* Navbar */}
      <Navbar />

      {/* Spacer */}
      <div className="flex-1 min-h-8 sm:min-h-12 lg:min-h-16 shrink-0" />

      {/* Hero content */}
      <div className="relative z-10 flex flex-col items-center text-center px-5 sm:px-8">
        {/* Headline */}
        <h1 className="text-gray-900 font-normal leading-[1.05] tracking-tight text-[40px] min-[400px]:text-[44px] sm:text-6xl lg:text-7xl xl:text-[80px]">
          <span className="block animate-fade-up">Try it on.</span>
          <span className="block animate-fade-up [animation-delay:100ms]">
            Buy with confidence.
          </span>
        </h1>

        {/* Search bar */}
        <form onSubmit={handleSearch} className="animate-fade-up [animation-delay:220ms] mt-5 sm:mt-6 w-full max-w-xl">
          <div className="flex items-center gap-3 rounded-full bg-white/60 backdrop-blur-md ring-1 ring-gray-200 pl-5 pr-1.5 py-1.5">
            <input
              type="text"
              value={storeUrl}
              onChange={(e) => setStoreUrl(e.target.value)}
              placeholder="Enter your Shopify store URL\u2026"
              className="flex-1 bg-transparent text-sm sm:text-base text-gray-900 placeholder-gray-500 outline-none py-2"
            />
            <button
              type="submit"
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gray-900 text-white hover:scale-105 active:scale-95 transition-transform shrink-0 flex items-center justify-center"
              aria-label="Submit"
            >
              <ArrowUp className="w-4 h-4 sm:w-[18px] sm:h-[18px]" />
            </button>
          </div>
        </form>

        {/* Description */}
        <p className="animate-fade-up [animation-delay:340ms] mt-4 sm:mt-5 text-gray-600 text-sm sm:text-base lg:text-lg leading-relaxed max-w-md">
          Render your best-sellers on diverse, real bodies
          <br className="hidden sm:block" />
          — and let shoppers see the fit with{" "}
          <Sparkles className="inline w-4 h-4 -mt-1" /> AI try-on
        </p>

        {/* CTA Buttons */}
        <div className="animate-fade-up [animation-delay:460ms] mt-4 sm:mt-5 flex flex-wrap items-center justify-center gap-3">
          <a
            href="#cta"
            className="bg-gray-900 text-white text-sm font-medium px-6 py-2.5 rounded-full hover:bg-gray-800 hover:shadow-lg transition-all"
          >
            Try It Free
          </a>
          <a
            href="#cta"
            className="text-gray-700 text-sm font-medium px-6 py-2.5 rounded-full ring-1 ring-gray-300 hover:bg-gray-100 transition-colors"
          >
            Book a pilot
          </a>
        </div>
      </div>

      {/* Spacer */}
      <div className="flex-1 min-h-10 sm:min-h-12 lg:min-h-16 shrink-0" />

      {/* Dashboard mockup */}
      <div className="animate-hero-rise [animation-delay:620ms] relative z-0 w-[92%] sm:w-[84%] lg:w-[72%] max-w-4xl mx-auto shrink-0 -mb-10 sm:-mb-20 lg:-mb-32">
        <DashboardMockup />
      </div>

      {/* Grass overlay */}
      <img
        src={GRASS_IMAGE}
        alt=""
        className="pointer-events-none absolute bottom-0 left-0 z-10 w-full select-none"
        aria-hidden="true"
      />
    </section>
  );
}
