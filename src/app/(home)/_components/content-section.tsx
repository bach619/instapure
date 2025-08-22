import React from "react";

interface ContentSectionProps {
  title: string;
  content: string;
  keywords: string[];
}

export const ContentSection: React.FC<ContentSectionProps> = ({ 
  title, 
  content, 
  keywords 
}) => {
  return (
    <section className="container mx-auto my-16 px-4 max-w-4xl">
      <h2 className="text-2xl font-bold mb-6">{title}</h2>
      <p className="text-lg mb-4">{content}</p>
      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-2">Related Keywords:</h3>
        <div className="flex flex-wrap gap-2">
          {keywords.map((keyword, index) => (
            <span 
              key={index} 
              className="bg-gray-100 px-3 py-1 rounded-full text-sm"
            >
              {keyword}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};
