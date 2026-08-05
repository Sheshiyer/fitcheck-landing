import Logo from "./Logo";

export default function PrivacyPolicy() {
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
        <h1 className="text-3xl md:text-4xl font-normal tracking-tight text-gray-900">Privacy Policy</h1>
        <p className="mt-2 text-sm text-gray-500">Last updated: June 22, 2026</p>

        <div className="mt-10 space-y-8 text-gray-700 leading-relaxed text-[15px]">
          <section>
            <h2 className="text-xl font-medium text-gray-900 mb-3">1. Who We Are</h2>
            <p>
              Fitcheck (&ldquo;we,&rdquo; &ldquo;us,&rdquo; &ldquo;our&rdquo;) provides an AI-powered virtual try-on
              service for fashion e-commerce. This policy explains how we collect, use, and protect information when you
              use our Shopify app, widget, or website.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-medium text-gray-900 mb-3">2. Information We Collect</h2>
            <h3 className="font-medium text-gray-900 mt-4 mb-2">From Shoppers (End Users)</h3>
            <ul className="list-disc pl-6 space-y-1.5">
              <li><strong>Photos you upload</strong> — used solely to generate your virtual try-on result.</li>
              <li><strong>Consent acknowledgement</strong> — recorded when you confirm the photo upload.</li>
              <li>We do <strong>not</strong> collect names, emails, or payment info from shoppers using the widget.</li>
            </ul>

            <h3 className="font-medium text-gray-900 mt-4 mb-2">From Merchants</h3>
            <ul className="list-disc pl-6 space-y-1.5">
              <li><strong>Store information</strong> — Shopify store URL, product catalog data (images, titles, variants).</li>
              <li><strong>Account contact</strong> — name and email for billing and support communications.</li>
            </ul>

            <h3 className="font-medium text-gray-900 mt-4 mb-2">From Website Visitors</h3>
            <ul className="list-disc pl-6 space-y-1.5">
              <li><strong>Lead form submissions</strong> — name, work email, store URL (only when you voluntarily submit).</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-medium text-gray-900 mb-3">3. How We Use Your Information</h2>
            <ul className="list-disc pl-6 space-y-1.5">
              <li>Generate AI try-on images from uploaded photos.</li>
              <li>Provide, maintain, and improve the Fitcheck service.</li>
              <li>Communicate with merchants about their account and billing.</li>
              <li>Respond to support requests.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-medium text-gray-900 mb-3">4. Data Retention</h2>
            <ul className="list-disc pl-6 space-y-1.5">
              <li><strong>Shopper photos:</strong> automatically deleted within <strong>7 days</strong> of upload.</li>
              <li><strong>Generated try-on images:</strong> deleted within <strong>7 days</strong> unless the merchant requests retention for product QA.</li>
              <li><strong>Merchant account data:</strong> retained while the subscription is active; deleted within 30 days of cancellation upon request.</li>
              <li><strong>Lead form data:</strong> retained until you request deletion.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-medium text-gray-900 mb-3">5. No AI Training</h2>
            <p>
              Shopper photos are <strong>never used to train AI models</strong>. They are processed only to generate your
              specific try-on result and then deleted per our retention schedule.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-medium text-gray-900 mb-3">6. Data Sharing</h2>
            <p>We do not sell personal data. We share information only with:</p>
            <ul className="list-disc pl-6 space-y-1.5 mt-2">
              <li><strong>AI processing providers</strong> — to generate try-on images (processed transiently, not stored by them).</li>
              <li><strong>Cloud infrastructure</strong> — AWS for secure hosting and temporary file storage.</li>
              <li><strong>Legal obligations</strong> — if required by law or to protect rights and safety.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-medium text-gray-900 mb-3">7. Security</h2>
            <p>
              We use HTTPS encryption in transit, signed upload URLs with expiration, access-controlled storage,
              and automated deletion schedules to protect your data.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-medium text-gray-900 mb-3">8. Your Rights</h2>
            <p>You can:</p>
            <ul className="list-disc pl-6 space-y-1.5 mt-2">
              <li>Request deletion of your uploaded photos at any time.</li>
              <li>Request a copy of personal data we hold about you.</li>
              <li>Withdraw consent for data processing.</li>
              <li>Lodge a complaint with your local data protection authority.</li>
            </ul>
            <p className="mt-2">
              To exercise these rights, contact us at{" "}
              <a href="mailto:privacy@getfitcheck.space" className="text-gray-900 font-medium underline underline-offset-2">
                privacy@getfitcheck.space
              </a>.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-medium text-gray-900 mb-3">9. Cookies</h2>
            <p>
              Our website uses no tracking cookies or third-party analytics. The Shopify widget does not set cookies.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-medium text-gray-900 mb-3">10. Changes to This Policy</h2>
            <p>
              We may update this policy from time to time. Changes will be posted on this page with an updated
              &ldquo;Last updated&rdquo; date. Continued use of the service after changes constitutes acceptance.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-medium text-gray-900 mb-3">11. Contact</h2>
            <p>
              Questions about this policy? Reach us at{" "}
              <a href="mailto:privacy@getfitcheck.space" className="text-gray-900 font-medium underline underline-offset-2">
                privacy@getfitcheck.space
              </a>
            </p>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 py-8 px-5 md:px-8">
        <div className="max-w-4xl mx-auto text-center text-sm text-gray-400">
          &copy; {new Date().getFullYear()} Fitcheck. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
