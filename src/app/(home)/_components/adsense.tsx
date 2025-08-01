'use client';

import Script from "next/script";
import { useEffect, useRef } from "react";

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

const Adsense = ({ format = "autorelaxed", adSlot }: { format?: string; adSlot?: string }) => {
  const adClient = "ca-pub-6435811821902528";
  const pushedRef = useRef(false);

  useEffect(() => {
    if (!pushedRef.current && typeof window !== "undefined" && adSlot) {
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
        pushedRef.current = true;
      } catch (e) {
        console.error("AdSense initialization error:", e);
      }
    } else if (!adSlot) {
      console.warn("AdSense adSlot not provided. Ads will not load.");
    }
  }, [adSlot]);

  return (
    <div className="my-6 text-center">
      <Script 
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6435811821902528"
        crossOrigin="anonymous"
      />
      
      {adSlot ? (
        <ins
          className="adsbygoogle"
          style={{ display: "block" }}
          data-ad-client={adClient}
          data-ad-slot={adSlot}
          data-ad-format={format}
          data-full-width-responsive="true"
        ></ins>
      ) : (
        <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded text-center">
          AdSense slot not configured. Please provide an ad slot ID.
        </div>
      )}
    </div>
  );
};

export default Adsense;
