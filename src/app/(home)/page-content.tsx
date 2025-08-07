import { Hero } from "./_components/hero";
import { Features } from "./_components/features";
import { HowItWorks } from "./_components/how-it-works";
import { Testimonials } from "./_components/testimonials";
import { FrequentlyAsked } from "./_components/frequently-asked";
import Adsense from "@/app/(home)/_components/adsense";

export default function HomePage() {
  return (
    <div>
      {/* Hero Section */}
      <Hero />
      
      <Adsense adSlot="YOUR_AD_SLOT_ID" />
      
      {/* Features Section */}
      <Features />

      {/* How It Works Section */}
      <HowItWorks />


      {/* Testimonials Section */}
      <Testimonials />

      {/* FAQ Section */}
      <FrequentlyAsked />

      {/* AdSense Section */}
      {/* 
        IMPORTANT: Replace YOUR_AD_SLOT_ID with your actual AdSense ad slot ID
        You can find this in your AdSense dashboard under "My ads" > "Ad units"
        Example: <Adsense adSlot="1234567890" /> 
      */}
    </div>
  );
}
