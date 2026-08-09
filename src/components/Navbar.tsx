import { useState } from "react";
import { Menu, X } from "lucide-react";
const NAV_LINKS = [
  { label: "How It Works", href: "#how-it-works" },
  { label: "Pricing", href: "#pricing" },
  { label: "Fitcheck Physical", href: "/physical" },
  { label: "FAQ", href: "#faq" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="animate-fade-down fixed inset-x-0 top-0 z-[70] border-b border-white/10 bg-[#1A1A2E]/90 backdrop-blur-xl">
      <div className="flex items-center justify-between px-5 sm:px-8 lg:px-10 py-3 sm:py-4">
        {/* Logo */}
        <a href="#top" className="flex items-center gap-2.5 text-white" aria-label="Fitcheck home">
          <img src="/assets/Photos/fitcheck-logo.svg" alt="" className="h-8 w-8 rounded-full" />
          <span className="text-base font-bold tracking-tight">Fitcheck</span>
        </a>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="flex items-center gap-1 text-[13px] text-white/75 hover:text-[#FF6B35] transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Right side */}
        <div className="flex items-center gap-3">
          <a
            href="#cta"
            className="bg-[#FF6B35] text-white text-[13px] font-bold px-4 sm:px-5 py-2 rounded-full hover:bg-[#e55a28] transition-colors"
          >
            Reserve Launch
          </a>
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden w-9 h-9 flex items-center justify-center rounded-full text-white hover:bg-white/10 transition-colors"
            aria-label={open ? "Close menu" : "Open menu"}
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {open && (
        <div className="absolute left-4 right-4 top-full rounded-2xl bg-[#1A1A2E]/95 backdrop-blur-xl ring-1 ring-white/10 px-5 py-3 animate-fade-up md:hidden">
          {NAV_LINKS.map((link, i) => (
            <a
              key={link.label}
              href={link.href}
              className={`block py-3 text-[15px] text-white/80 hover:text-[#FF6B35] transition-colors ${
                i < NAV_LINKS.length - 1 ? "border-b border-white/10" : ""
              }`}
              onClick={() => setOpen(false)}
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}
