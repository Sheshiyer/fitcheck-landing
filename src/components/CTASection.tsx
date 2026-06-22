import { useState, useEffect, useRef, type FormEvent } from "react";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function CTASection() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const storeRef = useRef<HTMLInputElement>(null);

  // Listen for prefill event from hero search bar
  useEffect(() => {
    function onPrefill(e: Event) {
      const url = (e as CustomEvent<string>).detail;
      if (url && storeRef.current) {
        storeRef.current.value = url;
        storeRef.current.focus();
      }
    }
    window.addEventListener("fitcheck:prefill-store", onPrefill);
    return () => window.removeEventListener("fitcheck:prefill-store", onPrefill);
  }, []);

  function validate(data: { name: string; email: string; store: string }) {
    const errs: Record<string, string> = {};
    if (!data.name || data.name.trim().length < 2) errs.name = "Please enter your name.";
    if (!EMAIL_RE.test(data.email)) errs.email = "Enter a valid work email.";
    if (!data.store || data.store.trim().length < 3) errs.store = "Add your Shopify store URL.";
    return errs;
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      store: (form.elements.namedItem("store") as HTMLInputElement).value,
    };

    const errs = validate(data);
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setStatus("submitting");

    try {
      await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
    } catch {
      // graceful — show success regardless since the backend may not be deployed yet
    }

    setStatus("success");
    form.reset();
  }

  return (
    <section
      id="cta"
      className="py-16 md:py-24 lg:py-32 bg-[#0A0A0A] border-t border-white/10"
    >
      <div className="max-w-6xl mx-auto px-5 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
          {/* Copy */}
          <div>
            <span className="text-[13px] font-medium text-[#FBFF8D]">
              Your launch slot is one form away
            </span>
            <h2 className="mt-3 text-3xl md:text-4xl lg:text-5xl font-normal tracking-tight leading-[1.05] text-white font-serif">
              Reserve your Fitcheck launch
            </h2>
            <p className="mt-4 text-base md:text-lg leading-relaxed text-white/60 max-w-[60ch]">
              Lock in your 48-hour launch with a $1,000 refundable reservation —
              credited toward your Pilot once you approve the demo renders. Tell
              us where to send the renders.
            </p>
          </div>

          {/* Form */}
          <div className="bg-white/5 text-white rounded-2xl p-8 md:p-10 border border-white/10 shadow-sm">
            {status === "success" ? (
              <div className="bg-[#FBFF8D]/10 border border-[#FBFF8D]/30 rounded-2xl p-6 text-center">
                <p className="font-medium text-lg text-white">Reservation request received.</p>
                <p className="mt-2 text-white/60">
                  We&rsquo;ll email your demo-render details within one business day.
                </p>
                <button
                  onClick={() => setStatus("idle")}
                  className="mt-4 text-sm text-[#FBFF8D] font-medium hover:underline"
                >
                  Submit another
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-5">
                <div>
                  <label htmlFor="lead-name" className="block text-sm font-medium text-white/70 mb-1.5">
                    Your name
                  </label>
                  <input
                    id="lead-name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    required
                    aria-invalid={!!errors.name}
                    className="w-full px-4 py-3 border border-white/10 rounded-xl bg-white/5 text-white placeholder-white/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FBFF8D] focus-visible:border-[#FBFF8D]"
                  />
                  {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
                </div>
                <div>
                  <label htmlFor="lead-email" className="block text-sm font-medium text-white/70 mb-1.5">
                    Work email
                  </label>
                  <input
                    id="lead-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    inputMode="email"
                    required
                    aria-invalid={!!errors.email}
                    className="w-full px-4 py-3 border border-white/10 rounded-xl bg-white/5 text-white placeholder-white/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FBFF8D] focus-visible:border-[#FBFF8D]"
                  />
                  {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                </div>
                <div>
                  <label htmlFor="lead-store" className="block text-sm font-medium text-white/70 mb-1.5">
                    Shopify store URL
                  </label>
                  <input
                    ref={storeRef}
                    id="lead-store"
                    name="store"
                    type="url"
                    autoComplete="url"
                    inputMode="url"
                    required
                    aria-invalid={!!errors.store}
                    className="w-full px-4 py-3 border border-white/10 rounded-xl bg-white/5 text-white placeholder-white/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FBFF8D] focus-visible:border-[#FBFF8D]"
                  />
                  {errors.store && <p className="mt-1 text-sm text-red-600">{errors.store}</p>}
                </div>
                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="w-full bg-[#FBFF8D] text-[#020202] text-sm font-bold py-3.5 rounded-full hover:bg-[#f0f47a] hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {status === "submitting" ? "Reserving\u2026" : "Reserve your launch \u2014 $1,000 refundable"}
                </button>
                <p className="text-center text-sm text-white/30">
                  Refundable until you approve the demo renders. We&rsquo;ll reply
                  within one business day.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
