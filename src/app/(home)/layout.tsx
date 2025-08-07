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
<div className="flex flex-1">
  {/* Sidebar kiri untuk desktop */}
   <main className="flex-1 container mx-auto px-4">{children}</main>
   {/* Sidebar kanan untuk desktop */}
 
</div>
      
      
      <Footer />
    </div>
  );
}
