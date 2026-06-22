import Logo from "./Logo";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-[#020202] border-t border-white/10 py-8">
      <div className="max-w-6xl mx-auto px-5 md:px-8 flex flex-wrap gap-4 justify-between items-center">
        <div className="flex items-center gap-3">
          <Logo className="w-5 h-5 text-white/30" />
          <span className="text-sm text-white/30">
            &copy; {year} Fitcheck — virtual try-on launch for Shopify fashion
            brands.
          </span>
        </div>
        <div className="flex items-center gap-4">
          <a
            href="/privacy"
            className="text-white/50 text-sm hover:text-[#FBFF8D] transition-colors"
          >
            Privacy Policy
          </a>
          <a
            href="#cta"
            className="text-[#FBFF8D] text-sm font-medium hover:underline transition-colors"
          >
            Reserve your launch
          </a>
        </div>
      </div>
    </footer>
  );
}
