import Logo from "./Logo";

export default function SupportPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200 py-5 px-5 md:px-8">
        <div className="max-w-4xl mx-auto flex items-center gap-3">
          <a href="/" className="text-gray-900 hover:opacity-70 transition-opacity">
            <Logo className="h-7 w-7" />
          </a>
          <a href="/" className="text-gray-900 font-medium text-lg tracking-tight hover:opacity-70 transition-opacity">
            Fitcheck
          </a>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-5 md:px-8 py-12 md:py-20">
        <h1 className="text-3xl md:text-4xl font-normal tracking-tight text-gray-900">Support</h1>
        <p className="mt-2 text-sm text-gray-500">We&rsquo;re here to help</p>

        <div className="mt-10 space-y-8 text-gray-700 leading-relaxed text-[15px]">
          <section>
            <h2 className="text-xl font-medium text-gray-900 mb-3">Contact Us</h2>
            <p>
              For technical support, billing questions, or general inquiries:
            </p>
            <ul className="mt-4 space-y-3">
              <li className="flex items-start gap-3">
                <span className="text-gray-400 mt-0.5">&#9993;</span>
                <span>
                  Email:{" "}
                  <a href="mailto:support@getfitcheck.space" className="text-gray-900 font-medium underline underline-offset-2">
                    support@getfitcheck.space
                  </a>
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-gray-400 mt-0.5">&#8986;</span>
                <span>Response time: Within 24 hours on business days</span>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-medium text-gray-900 mb-3">Common Issues</h2>
            <div className="space-y-4">
              <div className="border border-gray-200 rounded-lg p-5">
                <h3 className="font-medium text-gray-900">Widget not appearing on my store</h3>
                <p className="mt-2 text-sm text-gray-600">
                  Ensure the Fitcheck app embed is enabled in your Shopify theme editor under
                  App Embeds. Clear your browser cache and try in an incognito window.
                </p>
              </div>
              <div className="border border-gray-200 rounded-lg p-5">
                <h3 className="font-medium text-gray-900">Try-on results look incorrect</h3>
                <p className="mt-2 text-sm text-gray-600">
                  Best results come from clear, well-lit photos showing the full body.
                  Ensure product images have clean backgrounds and show the full garment.
                </p>
              </div>
              <div className="border border-gray-200 rounded-lg p-5">
                <h3 className="font-medium text-gray-900">Billing or subscription questions</h3>
                <p className="mt-2 text-sm text-gray-600">
                  All billing is managed through Shopify. You can view charges and cancel
                  from your Shopify admin &rarr; Settings &rarr; Billing &rarr; Subscriptions.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-medium text-gray-900 mb-3">Data Deletion Requests</h2>
            <p>
              To request deletion of your data, email{" "}
              <a href="mailto:privacy@getfitcheck.space" className="text-gray-900 font-medium underline underline-offset-2">
                privacy@getfitcheck.space
              </a>{" "}
              with your store URL. We will process your request within 30 days per our{" "}
              <a href="/privacy" className="text-gray-900 font-medium underline underline-offset-2">Privacy Policy</a>.
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}
