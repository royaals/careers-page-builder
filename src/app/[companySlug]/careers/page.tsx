import { Metadata } from "next";
import { notFound } from "next/navigation";
import prisma from "@/lib/prisma";
import Hero from "@/components/careers/Hero";
import SectionDisplay from "@/components/careers/SectionDisplay";
import VideoSection from "@/components/careers/VideoSection";
import JobList from "@/components/careers/JobList";
import Footer from "@/components/shared/Footer";
import { Company, Section, Job } from "@/types";

interface CareersPageProps {
  params: { companySlug: string };
}


export async function generateMetadata({
  params,
}: CareersPageProps): Promise<Metadata> {
  const company = await prisma.company.findUnique({
    where: { slug: params.companySlug },
  });

  if (!company) {
    return {
      title: "Company Not Found",
    };
  }

  return {
    title: `Careers at ${company.name} | Join Our Team`,
    description:
      company.description ||
      `Explore career opportunities at ${company.name}. Find your next role and join our team.`,
    openGraph: {
      title: `Careers at ${company.name}`,
      description:
        company.description || `Join the team at ${company.name}`,
      images: company.banner ? [company.banner] : [],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `Careers at ${company.name}`,
      description:
        company.description || `Join the team at ${company.name}`,
      images: company.banner ? [company.banner] : [],
    },
  };
}


function generateStructuredData(company: Company, jobs: Job[]) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: company.name,
    description: company.description,
    logo: company.logo,
    url: `${process.env.NEXTAUTH_URL}/${company.slug}/careers`,
    jobPosting: jobs.map((job) => ({
      "@type": "JobPosting",
      title: job.title,
      description: job.description,
      datePosted: job.postedAt,
      employmentType: job.employmentType.toUpperCase().replace(" ", "_"),
      jobLocation: {
        "@type": "Place",
        address: {
          "@type": "PostalAddress",
          addressLocality: job.location,
        },
      },
      hiringOrganization: {
        "@type": "Organization",
        name: company.name,
        logo: company.logo,
      },
      baseSalary: job.salaryRange
        ? {
            "@type": "MonetaryAmount",
            currency: "USD",
            value: {
              "@type": "QuantitativeValue",
              value: job.salaryRange,
            },
          }
        : undefined,
    })),
  };
}

export default async function CareersPage({ params }: CareersPageProps) {

  const company = await prisma.company.findUnique({
    where: { slug: params.companySlug },
    include: {
      sections: {
        where: { isVisible: true },
        orderBy: { order: "asc" },
      },
      jobs: {
        where: { isActive: true },
        orderBy: { postedAt: "desc" },
      },
    },
  });

  if (!company) {
    notFound();
  }

  const structuredData = generateStructuredData(
    company as Company,
    company.jobs as Job[]
  );

  return (
    <>
     
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <main className="min-h-screen">
       
        <Hero company={company as Company} />

       
        {company.sections.map((section) => (
          <SectionDisplay
            key={section.id}
            section={section as Section}
            company={company as Company}
          />
        ))}

     
        <VideoSection company={company as Company} />

        
        <div
          className="py-16"
          style={{ backgroundColor: `${company.primaryColor}08` }}
        >
          <JobList
            companySlug={params.companySlug}
            company={company as Company}
            initialJobs={company.jobs as Job[]}
          />
        </div>

     
        <footer className="border-t bg-white py-8">
          <div className="mx-auto max-w-4xl px-4 text-center">
            <p className="text-sm text-gray-500">
              © {new Date().getFullYear()} {company.name}. All rights reserved.
            </p>
            <p className="mt-2 text-xs text-gray-400">
              Powered by{" "}
              <a href="/" className="text-primary hover:underline">
                CareerHub
              </a>
            </p>
          </div>
        </footer>
      </main>
    </>
  );
}