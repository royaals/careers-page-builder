"use client";

import { useState, useEffect } from "react";
import { Job, Company, JobFilters as JobFiltersType } from "@/types";
import JobCard from "./JobCard";
import JobFilters from "./JobFilters";
import { Briefcase, SearchX } from "lucide-react";

interface JobListProps {
  companySlug: string;
  company: Company;
  initialJobs: Job[];
}

export default function JobList({
  companySlug,
  company,
  initialJobs,
}: JobListProps) {
  const [jobs, setJobs] = useState<Job[]>(initialJobs);
  const [filters, setFilters] = useState<JobFiltersType>({});
  const [availableFilters, setAvailableFilters] = useState({
    locations: [] as string[],
    workPolicies: [] as string[],
    departments: [] as string[],
    employmentTypes: [] as string[],
    experienceLevels: [] as string[],
  });
  const [isLoading, setIsLoading] = useState(false);


  useEffect(() => {
    const fetchFilters = async () => {
      try {
        const res = await fetch(`/api/companies/${companySlug}/jobs/filters`);
        if (res.ok) {
          const data = await res.json();
          setAvailableFilters(data);
        }
      } catch (error) {
        console.error("Error fetching filters:", error);
      }
    };
    fetchFilters();
  }, [companySlug]);


  useEffect(() => {
    const fetchJobs = async () => {
      setIsLoading(true);
      try {
        const params = new URLSearchParams();
        if (filters.search) params.set("search", filters.search);
        if (filters.location) params.set("location", filters.location);
        if (filters.workPolicy) params.set("workPolicy", filters.workPolicy);
        if (filters.department) params.set("department", filters.department);
        if (filters.employmentType)
          params.set("employmentType", filters.employmentType);

        const res = await fetch(
          `/api/companies/${companySlug}/jobs?${params.toString()}`
        );
        if (res.ok) {
          const data = await res.json();
          setJobs(data);
        }
      } catch (error) {
        console.error("Error fetching jobs:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchJobs();
  }, [filters, companySlug]);

  return (
    <section id="jobs" className="py-16">
      <div className="mx-auto max-w-4xl px-4">
        
        <div className="mb-8 text-center">
          <h2
            className="text-3xl font-bold"
            style={{ color: company.primaryColor }}
          >
            Open Positions
          </h2>
          <p className="mt-2 text-gray-600">
            {initialJobs.length} {initialJobs.length === 1 ? "role" : "roles"}{" "}
            available
          </p>
        </div>

   
        <div className="mb-8">
          <JobFilters
            filters={filters}
            onFiltersChange={setFilters}
            availableFilters={availableFilters}
          />
        </div>

       
        <div className="space-y-4">
          {isLoading ? (
          
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="h-32 animate-pulse rounded-lg bg-gray-200"
                />
              ))}
            </div>
          ) : jobs.length > 0 ? (
            jobs.map((job) => (
              <JobCard key={job.id} job={job} company={company} />
            ))
          ) : (
          
            <div className="rounded-lg border-2 border-dashed border-gray-300 py-16 text-center">
              <SearchX className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-4 text-lg font-medium text-gray-900">
                No jobs found
              </h3>
              <p className="mt-2 text-gray-500">
                Try adjusting your search or filter criteria
              </p>
            </div>
          )}
        </div>

   
        {!isLoading && jobs.length > 0 && (
          <p className="mt-6 text-center text-sm text-gray-500">
            Showing {jobs.length} {jobs.length === 1 ? "position" : "positions"}
          </p>
        )}
      </div>
    </section>
  );
}