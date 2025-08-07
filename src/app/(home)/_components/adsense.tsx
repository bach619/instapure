'use client';

import Script from "next/script";
import { useEffect, useRef } from "react";

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

const Adsense = ({ 
  format = "autorelaxed", 
  adSlot,
  minContentLength = 500 
}: { 
  format?: string; 
  adSlot?: string;
  minContentLength?: number;
}) => {
  const adClient = "ca-pub-6435811821902528";
  const pushedRef = useRef(false);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!adSlot) {
      console.warn("AdSense adSlot not provided. Ads will not load.");
      return;
    }

    // Check if page has sufficient content
    const contentElement = contentRef.current?.closest('main, [role="main"]') || document.body;
    const textContent = contentElement.textContent || '';
    const wordCount = textContent.split(/\s+/).length;

    if (wordCount < minContentLength) {
      console.warn(`AdSense not loaded: Page has only ${wordCount} words (minimum ${minContentLength} required)`);
      return;
    }

    if (!pushedRef.current && typeof window !== "undefined") {
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
        pushedRef.current = true;
      } catch (e) {
        console.error("AdSense initialization error:", e);
      }
    }
  }, [adSlot, minContentLength]);

  return (
    <div className="my-6 text-center">
      <Script 
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6435811821902528"
        crossOrigin="anonymous"
      />
      
      {adSlot && (
        <div ref={contentRef}>
          <ins
            className="adsbygoogle"
            style={{ display: "block" }}
            data-ad-client={adClient}
            data-ad-slot={adSlot}
            data-ad-format={format}
            data-full-width-responsive="true"
          ></ins>
        </div>
      )}
    </div>
  );
};

export default Adsense;
