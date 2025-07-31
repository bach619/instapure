"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { ArrowDown } from "lucide-react";
import { homeLinks, homeSections } from "@/lib/constants";
import { InstagramForm } from "@/components/instagram-form";
import Script from "next/script";

export function Hero() {
  const t = useTranslations("pages.home.hero");


  const handleParticlesLoad = () => {
    if (typeof window !== "undefined" && (window as any).particlesJS) {
      (window as any).particlesJS("particles-js", {
        particles: {
          number: {
            value: 80,
            density: {
              enable: true,
              value_area: 800
            }
          },
          color: {
            value: "#3b82f6" // blue-500
          },
          shape: {
            type: "circle",
            stroke: {
              width: 0,
              color: "#000000"
            }
          },
          opacity: {
            value: 0.5,
            random: true,
            anim: {
              enable: true,
              speed: 1,
              opacity_min: 0.1,
              sync: false
            }
          },
          size: {
            value: 3,
            random: true,
            anim: {
              enable: true,
              speed: 2,
              size_min: 0.1,
              sync: false
            }
          },
          line_linked: {
            enable: true,
            distance: 150,
            color: "#3b82f6", // blue-500
            opacity: 0.4,
            width: 1
          },
          move: {
            enable: true,
            speed: 1,
            direction: "none",
            random: true,
            straight: false,
            out_mode: "out",
            bounce: false
          }
        },
        interactivity: {
          detect_on: "canvas",
          events: {
            onhover: {
              enable: true,
              mode: "grab"
            },
            onclick: {
              enable: true,
              mode: "push"
            },
            resize: true
          }
        },
        retina_detect: true
      });
    }
  };

  return (
    <section
      id={homeSections.hero}
      className="w-full scroll-mt-16 bg-gradient-to-b from-background to-blue-50 py-16 md:py-24 lg:py-32 dark:from-background dark:to-blue-900/20 relative overflow-hidden"
    >
      {/* Load particles.js with proper initialization handling */}
      <Script
        src="https://cdn.jsdelivr.net/particles.js/2.0.0/particles.min.js"
        strategy="afterInteractive"
        onLoad={handleParticlesLoad}
        onError={(e) => console.error("Failed to load particles.js", e)}
      />
      
      {/* Particle.js Background */}
      <div id="particles-js" className="absolute inset-0"></div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="flex flex-col items-center space-y-8 text-center">
          <div className="max-w-4xl space-y-4">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-teal-500">
              {t("title")}
            </h1>
            <p className="text-muted-foreground mx-auto max-w-2xl text-lg md:text-xl">
              {t("description")}
            </p>
          </div>
          
          <div className="w-full max-w-md relative">
            <div className="absolute -top-4 -right-4 bg-yellow-400 text-black text-xs font-bold px-2 py-1 rounded-full rotate-6 animate-pulse">
              {t("freeBadge")}
            </div>
            <InstagramForm />
          </div>
          
          <div className="mt-8">
            <a href={homeLinks.howItWorks} className="group inline-flex items-center">
              <span className="text-muted-foreground group-hover:text-primary transition-colors font-semibold">
                {t("learnMore")}
              </span>
              <ArrowDown className="ml-2 h-5 w-5 text-primary animate-bounce group-hover:animate-spin transition-all" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
