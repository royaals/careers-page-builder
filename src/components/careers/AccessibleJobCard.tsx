"use client";

import { Job, Company } from "@/types";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  MapPin,
  Briefcase,
  Clock,
  Building2,
  DollarSign,
  Calendar,
  ChevronRight,
} from "lucide-react";
import { formatDate } from "@/lib/utils";

interface AccessibleJobCardProps {
  job: Job;
  company: Company;
}

export default function AccessibleJobCard({
  job,
  company,
}: AccessibleJobCardProps) {
  return (
    <Card
      className="group cursor-pointer transition-all hover:shadow-lg focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2"
      role="article"
      aria-labelledby={`job-title-${job.id}`}
    >
      <CardContent className="p-6">
        <a
          href={`/${company.slug}/jobs/${job.slug}`}
          className="block outline-none"
          aria-describedby={`job-details-${job.id}`}
        >
          <div className="flex flex-col space-y-4 sm:flex-row sm:items-start sm:justify-between sm:space-y-0">
         
            <div className="flex-1">
              <div className="flex items-start justify-between">
                <div>
                  <h3
                    id={`job-title-${job.id}`}
                    className="text-xl font-semibold text-gray-900 group-hover:text-primary"
                  >
                    {job.title}
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    {job.department} • {job.experienceLevel}
                  </p>
                </div>
                <ChevronRight
                  className="h-5 w-5 text-gray-400 transition-transform group-hover:translate-x-1 group-hover:text-primary sm:hidden"
                  aria-hidden="true"
                />
              </div>

              <div
                id={`job-details-${job.id}`}
                className="mt-4 flex flex-wrap gap-2"
                role="list"
                aria-label="Job details"
              >
                <Badge
                  variant="secondary"
                  className="flex items-center space-x-1"
                  role="listitem"
                >
                  <MapPin className="h-3 w-3" aria-hidden="true" />
                  <span>
                    <span className="sr-only">Location: </span>
                    {job.location}
                  </span>
                </Badge>
                <Badge
                  variant="secondary"
                  className="flex items-center space-x-1"
                  role="listitem"
                >
                  <Briefcase className="h-3 w-3" aria-hidden="true" />
                  <span>
                    <span className="sr-only">Work policy: </span>
                    {job.workPolicy}
                  </span>
                </Badge>
                <Badge
                  variant="secondary"
                  className="flex items-center space-x-1"
                  role="listitem"
                >
                  <Clock className="h-3 w-3" aria-hidden="true" />
                  <span>
                    <span className="sr-only">Employment type: </span>
                    {job.employmentType}
                  </span>
                </Badge>
                <Badge
                  variant="secondary"
                  className="flex items-center space-x-1"
                  role="listitem"
                >
                  <Building2 className="h-3 w-3" aria-hidden="true" />
                  <span>
                    <span className="sr-only">Job type: </span>
                    {job.jobType}
                  </span>
                </Badge>
              </div>
            </div>

      
            <div className="flex flex-row items-center justify-between sm:flex-col sm:items-end sm:space-y-2">
              {job.salaryRange && (
                <div className="flex items-center text-sm font-medium text-green-600">
                  <DollarSign className="mr-1 h-4 w-4" aria-hidden="true" />
                  <span>
                    <span className="sr-only">Salary: </span>
                    {job.salaryRange}
                  </span>
                </div>
              )}
              <div className="flex items-center text-sm text-gray-400">
                <Calendar className="mr-1 h-4 w-4" aria-hidden="true" />
                <time dateTime={new Date(job.postedAt).toISOString()}>
                  <span className="sr-only">Posted </span>
                  {formatDate(job.postedAt)}
                </time>
              </div>
              <ChevronRight
                className="hidden h-5 w-5 text-gray-400 transition-transform group-hover:translate-x-1 group-hover:text-primary sm:block"
                aria-hidden="true"
              />
            </div>
          </div>
        </a>
      </CardContent>
    </Card>
  );
}