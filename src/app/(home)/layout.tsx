import React from "react";
import { Header } from "./_components/header";
import { Footer } from "./_components/footer";
import AdSense from "./_components/adsense";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex min-h-screen flex-col">
      <Header />
<div className="flex flex-1">
  {/* Sidebar kiri untuk desktop */}
  <aside className="hidden lg:block w-72 p-4">
    <AdSense adSlot="3697731459" />
  </aside>

  <main className="flex-1 container mx-auto px-4">{children}</main>
  
  {/* Sidebar kanan untuk desktop */}
  <aside className="hidden lg:block w-72 p-4">
    <AdSense adSlot="3697731459" />
  </aside>
</div>
      
      
      <Footer />
    </div>
  );
}
