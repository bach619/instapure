export const homeSections = {
  hero: "hero",
  Adsense: "adsense", // Assuming this is the section for Adsense
  features: "features",
  howItWorks: "how-it-works",
  testimonials: "testimonials",
  frequentlyAsked: "faq",
} as const;

export const homeLinks = {
  hero: "#" + homeSections.hero,
  adsense: "#" + homeSections.Adsense, // Assuming the Adsense section is also linked to the hero
  features: "#" + homeSections.features,
  howItWorks: "#" + homeSections.howItWorks,
  testimonials: "#" + homeSections.testimonials,
  frequentlyAsked: "#" + homeSections.frequentlyAsked,
} as const;
