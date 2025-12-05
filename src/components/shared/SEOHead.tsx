
import Head from "next/head";
import { Company, Job } from "@/types";

interface SEOHeadProps {
  company: Company;
  jobs: Job[];
}

export default function SEOHead({ company, jobs }: SEOHeadProps) {
  const baseUrl = process.env.NEXTAUTH_URL || "http://localhost:3000";
  const careersUrl = `${baseUrl}/${company.slug}/careers`;

 
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: company.name,
    description: company.description,
    logo: company.logo,
    url: careersUrl,
    sameAs: [],
    jobPosting: jobs.map((job) => ({
      "@type": "JobPosting",
      title: job.title,
      description: job.description || `${job.title} at ${company.name}`,
      datePosted: new Date(job.postedAt).toISOString(),
      validThrough: new Date(
        Date.now() + 30 * 24 * 60 * 60 * 1000
      ).toISOString(),
      employmentType: job.employmentType.toUpperCase().replace(/\s+/g, "_"),
      jobLocationType: job.workPolicy === "Remote" ? "TELECOMMUTE" : undefined,
      applicantLocationRequirements:
        job.workPolicy === "Remote"
          ? {
              "@type": "Country",
              name: "Worldwide",
            }
          : undefined,
      jobLocation: {
        "@type": "Place",
        address: {
          "@type": "PostalAddress",
          addressLocality: job.location.split(",")[0]?.trim(),
          addressCountry: job.location.split(",")[1]?.trim(),
        },
      },
      hiringOrganization: {
        "@type": "Organization",
        name: company.name,
        sameAs: careersUrl,
        logo: company.logo,
      },
      baseSalary: job.salaryRange
        ? {
            "@type": "MonetaryAmount",
            currency: extractCurrency(job.salaryRange),
            value: {
              "@type": "QuantitativeValue",
              value: job.salaryRange,
              unitText: "YEAR",
            },
          }
        : undefined,
    })),
  };

  return (
    <Head>
      
      <title>{`Careers at ${company.name} | Join Our Team`}</title>
      <meta
        name="description"
        content={
          company.description ||
          `Explore ${jobs.length} career opportunities at ${company.name}. Find your next role and join our team.`
        }
      />
      <meta name="robots" content="index, follow" />
      <link rel="canonical" href={careersUrl} />

      
      <meta property="og:type" content="website" />
      <meta property="og:url" content={careersUrl} />
      <meta property="og:title" content={`Careers at ${company.name}`} />
      <meta
        property="og:description"
        content={company.description || `Join the team at ${company.name}`}
      />
      {company.banner && <meta property="og:image" content={company.banner} />}

     
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={careersUrl} />
      <meta name="twitter:title" content={`Careers at ${company.name}`} />
      <meta
        name="twitter:description"
        content={company.description || `Join the team at ${company.name}`}
      />
      {company.banner && <meta name="twitter:image" content={company.banner} />}

  
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
    </Head>
  );
}

function extractCurrency(salaryRange: string): string {
  if (salaryRange.includes("USD")) return "USD";
  if (salaryRange.includes("EUR")) return "EUR";
  if (salaryRange.includes("GBP")) return "GBP";
  if (salaryRange.includes("AED")) return "AED";
  if (salaryRange.includes("SAR")) return "SAR";
  if (salaryRange.includes("INR")) return "INR";
  return "USD";
}