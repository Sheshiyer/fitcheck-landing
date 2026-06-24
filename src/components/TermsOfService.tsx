import Logo from "./Logo";

export default function TermsOfService() {
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
        <h1 className="text-3xl md:text-4xl font-normal tracking-tight text-gray-900">Terms of Service</h1>
        <p className="mt-2 text-sm text-gray-500">Last updated: June 22, 2026</p>

        <div className="mt-10 space-y-8 text-gray-700 leading-relaxed text-[15px]">
          <section>
            <h2 className="text-xl font-medium text-gray-900 mb-3">1. Acceptance of Terms</h2>
            <p>
              By installing, accessing, or using the Fitcheck virtual try-on application (&ldquo;Service&rdquo;),
              you agree to be bound by these Terms of Service. If you do not agree, do not use the Service.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-medium text-gray-900 mb-3">2. Service Description</h2>
            <p>
              Fitcheck provides an AI-powered virtual try-on experience that allows end-users to visualize
              clothing items on themselves using uploaded photos. The Service is offered to Shopify merchants
              via the Shopify App Store and as an embeddable widget.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-medium text-gray-900 mb-3">3. Merchant Obligations</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>You must have a valid Shopify store to use the Service.</li>
              <li>You are responsible for ensuring your use complies with applicable laws and Shopify&rsquo;s terms.</li>
              <li>You must inform your customers that AI-generated imagery is used and obtain appropriate consent for photo uploads.</li>
              <li>You may not use the Service for any unlawful, deceptive, or harmful purpose.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-medium text-gray-900 mb-3">4. Billing &amp; Subscription</h2>
            <p>
              Billing is handled through Shopify&rsquo;s built-in billing system. Charges are based on
              the plan selected at installation. You may cancel at any time through your Shopify admin;
              cancellation takes effect at the end of your current billing cycle.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-medium text-gray-900 mb-3">5. Data Handling</h2>
            <p>
              User-uploaded photos are processed ephemerally for try-on generation and deleted within
              24 hours. We do not retain personal images beyond what is necessary to deliver results.
              See our <a href="/privacy" className="text-gray-900 font-medium underline underline-offset-2">Privacy Policy</a> for full details.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-medium text-gray-900 mb-3">6. Intellectual Property</h2>
            <p>
              The Service, including its AI models, code, and design, is the intellectual property of
              Fitcheck. Merchants retain ownership of their product images. AI-generated try-on results
              may be used by merchants for their store operations.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-medium text-gray-900 mb-3">7. Limitation of Liability</h2>
            <p>
              The Service is provided &ldquo;as is&rdquo; without warranties of any kind. Fitcheck shall not be
              liable for indirect, incidental, or consequential damages arising from use of the Service.
              Our total liability is limited to the fees paid by you in the 12 months preceding the claim.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-medium text-gray-900 mb-3">8. Termination</h2>
            <p>
              We may suspend or terminate your access if you violate these terms. Upon termination,
              all data associated with your account will be deleted per our data retention policy.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-medium text-gray-900 mb-3">9. Changes to Terms</h2>
            <p>
              We may update these terms with 30 days&rsquo; notice via email or in-app notification.
              Continued use after changes constitutes acceptance.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-medium text-gray-900 mb-3">10. Contact</h2>
            <p>
              Questions about these terms? Contact us at{" "}
              <a href="mailto:support@fitcheck.ai" className="text-gray-900 font-medium underline underline-offset-2">
                support@fitcheck.ai
              </a>
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}
