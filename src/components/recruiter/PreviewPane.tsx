
"use client";

import { Company, Section, Job } from "@/types";
import { Badge } from "@/components/ui/badge";
import { MapPin, Briefcase, Clock, Building2 } from "lucide-react";

interface PreviewPaneProps {
  company: Company;
  sections: Section[];
  jobs: Job[];
}

export default function PreviewPane({
  company,
  sections,
  jobs,
}: PreviewPaneProps) {
  const visibleSections = sections
    .filter((s) => s.isVisible)
    .sort((a, b) => a.order - b.order);

  return (
    <div className="min-h-screen bg-gray-50">
     
      <div
        className="relative h-64 w-full bg-cover bg-center"
        style={{
          backgroundColor: company.primaryColor,
          backgroundImage: company.banner ? `url(${company.banner})` : undefined,
        }}
      >
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
          {company.logo && (
            <img
              src={company.logo}
              alt={company.name}
              className="mb-4 h-20 w-20 rounded-full border-4 border-white object-cover shadow-lg"
            />
          )}
          <h1 className="text-4xl font-bold">{company.name}</h1>
          <p className="mt-2 text-lg opacity-90">Join Our Team</p>
        </div>
      </div>

    
      {company.description && (
        <div className="mx-auto max-w-4xl px-4 py-12">
          <p className="text-center text-lg text-gray-600">
            {company.description}
          </p>
        </div>
      )}

      
      <div className="mx-auto max-w-4xl space-y-12 px-4 py-8">
        {visibleSections.map((section) => (
          <div key={section.id} className="rounded-lg bg-white p-8 shadow-sm">
            <h2
              className="mb-4 text-2xl font-bold"
              style={{ color: company.primaryColor }}
            >
              {section.title}
            </h2>
            <div className="prose max-w-none text-gray-600">
              {section.content.split("\n").map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>
          </div>
        ))}
      </div>

      {company.cultureVideo && (
        <div className="mx-auto max-w-4xl px-4 py-8">
          <h2
            className="mb-6 text-center text-2xl font-bold"
            style={{ color: company.primaryColor }}
          >
            Life at {company.name}
          </h2>
          <div className="aspect-video overflow-hidden rounded-lg shadow-lg">
            <iframe
              src={getEmbedUrl(company.cultureVideo)}
              className="h-full w-full"
              allowFullScreen
            />
          </div>
        </div>
      )}

     
      <div
        className="py-12"
        style={{ backgroundColor: `${company.primaryColor}10` }}
      >
        <div className="mx-auto max-w-4xl px-4">
          <h2
            className="mb-8 text-center text-3xl font-bold"
            style={{ color: company.primaryColor }}
          >
            Open Positions ({jobs.length})
          </h2>
          <div className="space-y-4">
            {jobs.slice(0, 5).map((job) => (
              <div
                key={job.id}
                className="rounded-lg bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {job.title}
                    </h3>
                    <div className="mt-2 flex flex-wrap gap-2">
                      <Badge variant="secondary">
                        <MapPin className="mr-1 h-3 w-3" />
                        {job.location}
                      </Badge>
                      <Badge variant="secondary">
                        <Briefcase className="mr-1 h-3 w-3" />
                        {job.workPolicy}
                      </Badge>
                      <Badge variant="secondary">
                        <Clock className="mr-1 h-3 w-3" />
                        {job.employmentType}
                      </Badge>
                      <Badge variant="secondary">
                        <Building2 className="mr-1 h-3 w-3" />
                        {job.department}
                      </Badge>
                    </div>
                  </div>
                  {job.salaryRange && (
                    <span className="text-sm font-medium text-gray-600">
                      {job.salaryRange}
                    </span>
                  )}
                </div>
              </div>
            ))}
            {jobs.length > 5 && (
              <p className="text-center text-gray-500">
                +{jobs.length - 5} more positions
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function getEmbedUrl(url: string): string {
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
}