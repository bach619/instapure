import { Hero } from "@/app/(home)/_components/hero";
import { Features } from "@/app/(home)/_components/features";
import { HowItWorks } from "@/app/(home)/_components/how-it-works";
import { Testimonials } from "@/app/(home)/_components/testimonials";
import { FrequentlyAsked } from "@/app/(home)/_components/frequently-asked";
import Adsense from "@/app/(home)/_components/adsense";
import { ContentSection } from "@/app/(home)/_components/content-section";
import { CtaSection } from "@/app/(home)/_components/cta-section";

export default function HomePage() {
  return (
    <div>
      {/* Hero Section */}
      <Hero />
          
      {/* Features Section */}
      <Features />

      {/* How It Works Section */}
      <HowItWorks />

      {/* Content Section 1 - SEO optimized */}
      <ContentSection 
        title="Download Instagram Videos in High Quality"
        content="InstaPure allows you to download Instagram videos in HD quality without any watermarks. Our tool supports all types of Instagram content including Reels, Stories, and IGTV videos. Simply paste the link and get your video instantly."
        keywords={["download instagram videos", "hd instagram download", "instagram reels download"]}
      />

      {/* AdSense Section */}
      <div className="container mx-auto my-12">
        {/* 
          IMPORTANT: Replace "1234567890" with your actual AdSense ad slot ID 
          from your AdSense dashboard under "My ads" > "Ad units" 
        */}
        <Adsense adSlot="1234567890" />
      </div>

      {/* Content Section 2 - SEO optimized */}
      <ContentSection 
        title="No Login Required - Completely Anonymous"
        content="Our Instagram downloader requires no registration or login. All downloads are completely anonymous with no tracking. We respect your privacy and never store any personal information."
        keywords={["anonymous instagram download", "no login instagram download", "private instagram download"]}
      />

      {/* Testimonials Section */}
      <Testimonials />

      {/* FAQ Section */}
      <FrequentlyAsked />

      {/* Content Section 3 - SEO optimized */}
      <ContentSection 
        title="Works on All Devices"
        content="InstaPure works seamlessly on desktop, mobile, and tablet devices. Download Instagram videos directly to your device with just one click. No apps to install, works directly in your browser."
        keywords={["instagram download mobile", "instagram download desktop", "cross-platform instagram download"]}
      />

      {/* CTA Section */}
      <CtaSection 
        title="Start Downloading Instagram Videos Today"
        buttonText="Try InstaPure Now"
      />
    </div>
  );
}
