import Logo from "./Logo";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-white border-t border-gray-200 py-8">
      <div className="max-w-6xl mx-auto px-5 md:px-8 flex flex-wrap gap-4 justify-between items-center">
        <div className="flex items-center gap-3">
          <Logo className="w-5 h-5 text-gray-400" />
          <span className="text-sm text-gray-400">
            &copy; {year} Fitcheck — virtual try-on launch for Shopify fashion
            brands.
          </span>
        </div>
        <a
          href="#cta"
          className="text-gray-900 text-sm font-medium hover:underline transition-colors"
        >
          Reserve your launch
        </a>
      </div>
    </footer>
  );
}
