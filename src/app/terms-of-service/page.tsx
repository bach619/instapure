import React from "react";

export default function TermsOfService() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-3xl">
      <h1 className="text-3xl font-bold mb-6">Terms of Service</h1>
      
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3">1. Acceptance of Terms</h2>
        <p className="mb-4">
          By accessing or using our service, you agree to be bound by these Terms of Service.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3">2. No Data Collection</h2>
        <p className="mb-4">
          We do not collect, store, or process any personal data from our users. 
          Your use of our service is completely anonymous.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3">3. Service Usage</h2>
        <p className="mb-4">
          You agree to use our service only for lawful purposes and in a way that does not 
          infringe the rights of others or restrict their use of the service.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-3">4. Changes to Terms</h2>
        <p>
          We reserve the right to modify these terms at any time. Your continued use of the 
          service after changes constitutes acceptance of the new terms.
        </p>
      </section>
    </div>
  );
}
