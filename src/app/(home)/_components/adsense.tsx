'use client';

import Script from "next/script";
import { useEffect, useRef } from "react";

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

export function Adsense() {
  const adClient = "ca-pub-6435811821902528"; // Ganti dengan milikmu
  // const adSlot = "1234567890";                // Ganti dengan milikmu

  const adRef = useRef<HTMLDivElement>(null);
  const pushedRef = useRef(false); // penanda bahwa .push sudah dilakukan

  useEffect(() => {
    if (!pushedRef.current && typeof window !== "undefined") {
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
        pushedRef.current = true;
      } catch (e) {
        console.error("Adsense error:", e);
      }
    }
  }, []);

  return (
    <>
      {/* Adsense Script */}
      <Script
        id="adsense-script"
        strategy="afterInteractive"
        src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6435811821902528`}
        crossOrigin="anonymous"
      />

      {/* Adsense Container */}
      <div ref={adRef} style={{ margin: "20px 0", textAlign: "center" }}>
        <ins
          className="adsbygoogle"
          style={{ display: "block" }}
          data-ad-client={adClient}
          // data-ad-slot={adSlot}
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      </div>
    </>
  );
}
