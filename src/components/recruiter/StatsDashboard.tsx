
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Briefcase, MapPin, Users, Eye } from "lucide-react";

interface StatsDashboardProps {
  totalJobs: number;
  activeJobs: number;
  locations: number;
  departments: number;
}

export default function StatsDashboard({
  totalJobs,
  activeJobs,
  locations,
  departments,
}: StatsDashboardProps) {
  const stats = [
    {
      title: "Total Jobs",
      value: totalJobs,
      icon: Briefcase,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      title: "Active Jobs",
      value: activeJobs,
      icon: Eye,
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      title: "Locations",
      value: locations,
      icon: MapPin,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
    },
    {
      title: "Departments",
      value: departments,
      icon: Users,
      color: "text-orange-600",
      bgColor: "bg-orange-100",
    },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">
                {stat.title}
              </CardTitle>
              <div className={`rounded-full p-2 ${stat.bgColor}`}>
                <Icon className={`h-4 w-4 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}