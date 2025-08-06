import React from "react";

export default function PrivacyPolicy() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-3xl">
      <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
      
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3">1. Introduction</h2>
        <p className="mb-4">
          We are committed to protecting your privacy. This policy explains how we handle information.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3">2. No Data Collection</h2>
        <p className="mb-4">
          We do not collect, store, or process any personal data from our users. 
          Our service operates without tracking or storing any user information.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3">3. Anonymous Usage</h2>
        <p className="mb-4">
          Since we don&#39;t collect any personal data, your usage of our service is completely anonymous. 
          We have no way to identify users or track their activities.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-3">4. Policy Changes</h2>
        <p>
          Any changes to this privacy policy will be posted on this page. We encourage you to review this policy periodically.
        </p>
      </section>
    </div>
  );
}
