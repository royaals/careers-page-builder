
"use client";

import { Company } from "@/types";

interface VideoSectionProps {
  company: Company;
}

export default function VideoSection({ company }: VideoSectionProps) {
  if (!company.cultureVideo) return null;

  const getEmbedUrl = (url: string): string => {
    const youtubeMatch = url.match(
      /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\s]+)/
    );
    if (youtubeMatch) {
      return `https://www.youtube.com/embed/${youtubeMatch[1]}`;
    }
    const vimeoMatch = url.match(/vimeo\.com\/(\d+)/);
    if (vimeoMatch) {
      return `https://player.vimeo.com/video/${vimeoMatch[1]}`;
    }
    return url;
  };

  return (
    <section className="bg-gray-50 py-16">
      <div className="mx-auto max-w-4xl px-4">
        <h2
          className="mb-8 text-center text-3xl font-bold"
          style={{ color: company.primaryColor }}
        >
          Life at {company.name}
        </h2>
        <div className="aspect-video overflow-hidden rounded-xl shadow-2xl">
          <iframe
            src={getEmbedUrl(company.cultureVideo)}
            title={`${company.name} culture video`}
            className="h-full w-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div>
    </section>
  );
}