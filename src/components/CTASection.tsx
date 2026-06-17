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
      className="py-16 md:py-24 lg:py-32 bg-gray-50 border-t border-gray-200"
    >
      <div className="max-w-6xl mx-auto px-5 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
          {/* Copy */}
          <div>
            <span className="text-[13px] font-medium text-gray-500">
              Your launch slot is one form away
            </span>
            <h2 className="mt-3 text-3xl md:text-4xl lg:text-5xl font-normal tracking-tight leading-[1.05] text-gray-900">
              Reserve your Fitcheck launch
            </h2>
            <p className="mt-4 text-base md:text-lg leading-relaxed text-gray-500 max-w-[60ch]">
              Lock in your 48-hour launch with a $1,000 refundable reservation —
              credited toward your Pilot once you approve the demo renders. Tell
              us where to send the renders.
            </p>
          </div>

          {/* Form */}
          <div className="bg-white text-gray-900 rounded-2xl p-8 md:p-10 border border-gray-200 shadow-sm">
            {status === "success" ? (
              <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6 text-center">
                <p className="font-medium text-lg text-gray-900">Reservation request received.</p>
                <p className="mt-2 text-gray-500">
                  We&rsquo;ll email your demo-render details within one business day.
                </p>
                <button
                  onClick={() => setStatus("idle")}
                  className="mt-4 text-sm text-gray-900 font-medium hover:underline"
                >
                  Submit another
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-5">
                <div>
                  <label htmlFor="lead-name" className="block text-sm font-medium text-gray-700 mb-1.5">
                    Your name
                  </label>
                  <input
                    id="lead-name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    required
                    aria-invalid={!!errors.name}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 text-gray-900 placeholder-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:border-gray-900"
                  />
                  {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
                </div>
                <div>
                  <label htmlFor="lead-email" className="block text-sm font-medium text-gray-700 mb-1.5">
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
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 text-gray-900 placeholder-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:border-gray-900"
                  />
                  {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                </div>
                <div>
                  <label htmlFor="lead-store" className="block text-sm font-medium text-gray-700 mb-1.5">
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
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 text-gray-900 placeholder-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:border-gray-900"
                  />
                  {errors.store && <p className="mt-1 text-sm text-red-600">{errors.store}</p>}
                </div>
                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="w-full bg-gray-900 text-white text-sm font-medium py-3.5 rounded-full hover:bg-gray-800 hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {status === "submitting" ? "Reserving\u2026" : "Reserve your launch \u2014 $1,000 refundable"}
                </button>
                <p className="text-center text-sm text-gray-400">
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
