
"use client";

import { Company } from "@/types";
import { getContrastColor } from "@/lib/utils";

interface HeroProps {
  company: Company;
}

export default function Hero({ company }: HeroProps) {
  const textColor = company.banner ? "#FFFFFF" : getContrastColor(company.primaryColor);

  return (
    <div
      className="relative min-h-[400px] w-full bg-cover bg-center"
      style={{
        backgroundColor: company.primaryColor,
        backgroundImage: company.banner ? `url(${company.banner})` : undefined,
      }}
    >
     
      <div className="absolute inset-0 bg-black/30" />
      
   
      <div className="relative flex min-h-[400px] flex-col items-center justify-center px-4 text-center">
        {company.logo && (
          <img
            src={company.logo}
            alt={`${company.name} logo`}
            className="mb-6 h-24 w-24 rounded-full border-4 border-white object-cover shadow-xl"
          />
        )}
        <h1
          className="text-4xl font-bold md:text-5xl lg:text-6xl"
          style={{ color: textColor }}
        >
          {company.name}
        </h1>
        <p
          className="mt-4 max-w-2xl text-lg md:text-xl"
          style={{ color: textColor, opacity: 0.9 }}
        >
          {company.description || `Join the team at ${company.name}`}
        </p>
        <div className="mt-8">
          <a
            href="#jobs"
            className="inline-flex items-center rounded-full bg-white px-8 py-3 text-lg font-semibold shadow-lg transition-transform hover:scale-105"
            style={{ color: company.primaryColor }}
          >
            View Open Positions
          </a>
        </div>
      </div>
    </div>
  );
}