import React from "react";

import { Header } from "./_components/header";
import { Footer } from "./_components/footer";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex min-h-screen flex-col">
      <Header />
      <meta name="google-adsense-account" content="ca-pub-6435811821902528"></meta>
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
