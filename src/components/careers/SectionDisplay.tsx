
"use client";

import { Section, Company } from "@/types";

interface SectionDisplayProps {
  section: Section;
  company: Company;
}

export default function SectionDisplay({ section, company }: SectionDisplayProps) {
  return (
    <section className="py-16">
      <div className="mx-auto max-w-4xl px-4">
        <h2
          className="mb-8 text-center text-3xl font-bold"
          style={{ color: company.primaryColor }}
        >
          {section.title}
        </h2>
        <div className="prose prose-lg mx-auto max-w-none text-gray-600">
          {section.content.split("\n").map((paragraph, idx) => (
            <p key={idx} className="mb-4">
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}