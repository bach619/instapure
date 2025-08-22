import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface CtaSectionProps {
  title: string;
  buttonText: string;
}

export const CtaSection: React.FC<CtaSectionProps> = ({ 
  title, 
  buttonText 
}) => {
  return (
    <section className="bg-blue-600 py-16 text-white">
      <div className="container mx-auto px-4 text-center max-w-3xl">
        <h2 className="text-3xl font-bold mb-6">{title}</h2>
        <Button 
          className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-6 text-lg font-bold"
          asChild
        >
        <Link href="/">{buttonText}</Link>
        </Button>
      </div>
    </section>
  );
};
