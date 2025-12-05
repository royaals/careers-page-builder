
"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Loader2,
  Palette,
  LayoutList,
  Eye,
  ExternalLink,
  Monitor,
  Tablet,
  Smartphone,
  MapPin,
  Briefcase,
  Clock,
  Building2,
} from "lucide-react";

interface Company {
  id: string;
  name: string;
  slug: string;
  description?: string | null;
  logo?: string | null;
  banner?: string | null;
  primaryColor: string;
  secondaryColor: string;
  cultureVideo?: string | null;
  isPublished: boolean;
}

interface Section {
  id: string;
  title: string;
  content: string;
  type: string;
  order: number;
  isVisible: boolean;
}

interface Job {
  id: string;
  title: string;
  slug: string;
  workPolicy: string;
  location: string;
  department: string;
  employmentType: string;
  experienceLevel: string;
  jobType: string;
  salaryRange?: string | null;
  postedAt: string;
}

type DeviceType = "desktop" | "tablet" | "mobile";

interface PreviewPageProps {
  params: { companySlug: string };
}

export default function PreviewPage({ params }: PreviewPageProps) {
  const { companySlug } = params;
  const { data: session, status } = useSession();
  const router = useRouter();
  const [company, setCompany] = useState<Company | null>(null);
  const [sections, setSections] = useState<Section[]>([]);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [device, setDevice] = useState<DeviceType>("desktop");

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
      return;
    }

    if (status === "authenticated") {
      fetchData();
    }
  }, [status, companySlug]);

  const fetchData = async () => {
    try {
      const [companyRes, sectionsRes, jobsRes] = await Promise.all([
        fetch(`/api/companies/${companySlug}`),
        fetch(`/api/companies/${companySlug}/sections`),
        fetch(`/api/companies/${companySlug}/jobs`),
      ]);

      if (companyRes.ok) {
        setCompany(await companyRes.json());
      }
      if (sectionsRes.ok) {
        setSections(await sectionsRes.json());
      }
      if (jobsRes.ok) {
        setJobs(await jobsRes.json());
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const getPreviewWidth = () => {
    switch (device) {
      case "mobile":
        return "max-w-[375px]";
      case "tablet":
        return "max-w-[768px]";
      default:
        return "max-w-full";
    }
  };

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

  if (status === "loading" || isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2">Loading preview...</span>
      </div>
    );
  }

  if (!company) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <p className="text-xl">Company not found</p>
          <Link href="/" className="text-primary hover:underline">
            Go back home
          </Link>
        </div>
      </div>
    );
  }

  const visibleSections = sections
    .filter((s) => s.isVisible)
    .sort((a, b) => a.order - b.order);

  return (
    <div className="flex min-h-screen">
     
      <aside className="fixed left-0 top-0 h-full w-64 border-r bg-white z-10">
        <div className="p-6">
          <h2 className="text-lg font-semibold">Page Editor</h2>
          <p className="text-sm text-gray-500">Customize your careers page</p>
        </div>
        <nav className="space-y-1 px-3">
          <Link
            href={`/${companySlug}/edit`}
            className="flex items-center space-x-3 rounded-lg px-3 py-2 text-gray-700 hover:bg-gray-100"
          >
            <Palette className="h-5 w-5" />
            <span>Branding</span>
          </Link>
          <Link
            href={`/${companySlug}/edit/sections`}
            className="flex items-center space-x-3 rounded-lg px-3 py-2 text-gray-700 hover:bg-gray-100"
          >
            <LayoutList className="h-5 w-5" />
            <span>Sections</span>
          </Link>
          <Link
            href={`/${companySlug}/preview`}
            className="flex items-center space-x-3 rounded-lg bg-primary px-3 py-2 text-white"
          >
            <Eye className="h-5 w-5" />
            <span>Preview</span>
          </Link>
        </nav>
        <div className="absolute bottom-0 left-0 w-64 border-t p-4">
          <Link
            href={`/${companySlug}/careers`}
            target="_blank"
            className="flex w-full items-center justify-center space-x-2 rounded-lg bg-green-500 px-4 py-2 text-sm font-medium text-white hover:bg-green-600"
          >
            <ExternalLink className="h-4 w-4" />
            <span>View Public Page</span>
          </Link>
        </div>
      </aside>

      <main className="ml-64 flex-1 bg-gray-100">
    
        <div className="sticky top-0 z-10 flex items-center justify-between border-b bg-white px-6 py-4">
          <div className="flex items-center space-x-4">
            <h1 className="text-lg font-semibold">Preview</h1>
            <div className="flex items-center rounded-lg border p-1">
              <button
                onClick={() => setDevice("desktop")}
                className={`rounded-md p-2 ${
                  device === "desktop"
                    ? "bg-primary text-white"
                    : "text-gray-500 hover:bg-gray-100"
                }`}
                title="Desktop view"
              >
                <Monitor className="h-4 w-4" />
              </button>
              <button
                onClick={() => setDevice("tablet")}
                className={`rounded-md p-2 ${
                  device === "tablet"
                    ? "bg-primary text-white"
                    : "text-gray-500 hover:bg-gray-100"
                }`}
                title="Tablet view"
              >
                <Tablet className="h-4 w-4" />
              </button>
              <button
                onClick={() => setDevice("mobile")}
                className={`rounded-md p-2 ${
                  device === "mobile"
                    ? "bg-primary text-white"
                    : "text-gray-500 hover:bg-gray-100"
                }`}
                title="Mobile view"
              >
                <Smartphone className="h-4 w-4" />
              </button>
            </div>
          </div>
          <Link href={`/${companySlug}/careers`} target="_blank">
            <Button>
              <ExternalLink className="mr-2 h-4 w-4" />
              View Live Page
            </Button>
          </Link>
        </div>

    
        <div className="flex justify-center p-6">
          <div
            className={`${getPreviewWidth()} w-full overflow-hidden rounded-lg border bg-white shadow-2xl transition-all duration-300`}
          >
         
            <div className="min-h-screen">
            
              <div
                className="relative h-64 w-full bg-cover bg-center"
                style={{
                  backgroundColor: company.primaryColor,
                  backgroundImage: company.banner
                    ? `url(${company.banner})`
                    : undefined,
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
                  <div
                    key={section.id}
                    className="rounded-lg bg-gray-50 p-8"
                  >
                    <h2
                      className="mb-4 text-2xl font-bold"
                      style={{ color: company.primaryColor }}
                    >
                      {section.title}
                    </h2>
                    <div className="prose max-w-none text-gray-600">
                      {section.content.split("\n").map((paragraph, idx) => (
                        <p key={idx} className="mb-2">{paragraph}</p>
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
                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between">
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900">
                              {job.title}
                            </h3>
                            <div className="mt-2 flex flex-wrap gap-2">
                              <Badge variant="secondary" className="text-xs">
                                <MapPin className="mr-1 h-3 w-3" />
                                {job.location}
                              </Badge>
                              <Badge variant="secondary" className="text-xs">
                                <Briefcase className="mr-1 h-3 w-3" />
                                {job.workPolicy}
                              </Badge>
                              <Badge variant="secondary" className="text-xs">
                                <Clock className="mr-1 h-3 w-3" />
                                {job.employmentType}
                              </Badge>
                              <Badge variant="secondary" className="text-xs">
                                <Building2 className="mr-1 h-3 w-3" />
                                {job.department}
                              </Badge>
                            </div>
                          </div>
                          {job.salaryRange && (
                            <span className="mt-2 text-sm font-medium text-green-600 sm:mt-0">
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
                    {jobs.length === 0 && (
                      <p className="text-center text-gray-500">
                        No open positions at the moment
                      </p>
                    )}
                  </div>
                </div>
              </div>

           
              <footer className="border-t py-8 text-center text-sm text-gray-500">
                <p>© {new Date().getFullYear()} {company.name}. All rights reserved.</p>
              </footer>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}