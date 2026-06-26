import { useState, useEffect, useRef, type FormEvent } from "react";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const BOOKING_URL = "https://cal.com/thoughtseedlabs/30min";

export default function BookingForm() {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const storeRef = useRef<HTMLInputElement>(null);

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

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value.trim(),
      email: (form.elements.namedItem("email") as HTMLInputElement).value.trim(),
      store: (form.elements.namedItem("store") as HTMLInputElement).value.trim(),
    };

    const errs = validate(data);
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    const params = new URLSearchParams({
      name: data.name,
      email: data.email,
      "Shopify-store-URL": data.store,
    });

    window.open(`${BOOKING_URL}?${params.toString()}`, "_blank", "noopener,noreferrer");
    form.reset();
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      <div>
        <label htmlFor="booking-name" className="block text-sm font-medium text-white/70 mb-1.5">
          Your name
        </label>
        <input
          id="booking-name"
          name="name"
          type="text"
          autoComplete="name"
          required
          aria-invalid={!!errors.name}
          className="w-full px-4 py-3 border border-white/10 rounded-xl bg-white/5 text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6B35] focus-visible:border-[#FF6B35]"
        />
        {errors.name && <p className="mt-1 text-sm text-red-400">{errors.name}</p>}
      </div>
      <div>
        <label htmlFor="booking-email" className="block text-sm font-medium text-white/70 mb-1.5">
          Work email
        </label>
        <input
          id="booking-email"
          name="email"
          type="email"
          autoComplete="email"
          inputMode="email"
          required
          aria-invalid={!!errors.email}
          className="w-full px-4 py-3 border border-white/10 rounded-xl bg-white/5 text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6B35] focus-visible:border-[#FF6B35]"
        />
        {errors.email && <p className="mt-1 text-sm text-red-400">{errors.email}</p>}
      </div>
      <div>
        <label htmlFor="booking-store" className="block text-sm font-medium text-white/70 mb-1.5">
          Shopify store URL
        </label>
        <input
          ref={storeRef}
          id="booking-store"
          name="store"
          type="url"
          autoComplete="url"
          inputMode="url"
          required
          aria-invalid={!!errors.store}
          className="w-full px-4 py-3 border border-white/10 rounded-xl bg-white/5 text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6B35] focus-visible:border-[#FF6B35]"
        />
        {errors.store && <p className="mt-1 text-sm text-red-400">{errors.store}</p>}
      </div>
      <button
        type="submit"
        className="w-full bg-[#FF6B35] text-white text-sm font-bold py-3.5 rounded-full hover:bg-[#e55a28] hover:shadow-lg transition-all"
      >
        Reserve your launch
      </button>
      <p className="text-center text-sm text-white/30">
        Refundable until you approve the demo renders.
      </p>
    </form>
  );
}
