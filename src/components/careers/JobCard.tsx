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

interface JobCardProps {
  job: Job;
  company: Company;
}

export default function JobCard({ job, company }: JobCardProps) {
  return (
    <Card className="group cursor-pointer transition-all hover:shadow-lg">
      <CardContent className="p-6">
        <div className="flex flex-col space-y-4 sm:flex-row sm:items-start sm:justify-between sm:space-y-0">
         
          <div className="flex-1">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 group-hover:text-primary">
                  {job.title}
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  {job.department} • {job.experienceLevel}
                </p>
              </div>
              <ChevronRight className="h-5 w-5 text-gray-400 transition-transform group-hover:translate-x-1 group-hover:text-primary sm:hidden" />
            </div>

            
            <div className="mt-4 flex flex-wrap gap-2">
              <Badge
                variant="secondary"
                className="flex items-center space-x-1"
              >
                <MapPin className="h-3 w-3" />
                <span>{job.location}</span>
              </Badge>
              <Badge
                variant="secondary"
                className="flex items-center space-x-1"
              >
                <Briefcase className="h-3 w-3" />
                <span>{job.workPolicy}</span>
              </Badge>
              <Badge
                variant="secondary"
                className="flex items-center space-x-1"
              >
                <Clock className="h-3 w-3" />
                <span>{job.employmentType}</span>
              </Badge>
              <Badge
                variant="secondary"
                className="flex items-center space-x-1"
              >
                <Building2 className="h-3 w-3" />
                <span>{job.jobType}</span>
              </Badge>
            </div>
          </div>

          <div className="flex flex-row items-center justify-between sm:flex-col sm:items-end sm:space-y-2">
            {job.salaryRange && (
              <div className="flex items-center text-sm font-medium text-green-600">
                <DollarSign className="mr-1 h-4 w-4" />
                {job.salaryRange}
              </div>
            )}
            <div className="flex items-center text-sm text-gray-400">
              <Calendar className="mr-1 h-4 w-4" />
              {formatDate(job.postedAt)}
            </div>
            <ChevronRight className="hidden h-5 w-5 text-gray-400 transition-transform group-hover:translate-x-1 group-hover:text-primary sm:block" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}