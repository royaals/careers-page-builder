
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(
  req: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const company = await prisma.company.findUnique({
      where: { slug: params.slug },
    });

    if (!company) {
      return NextResponse.json(
        { error: "Company not found" },
        { status: 404 }
      );
    }

    const jobs = await prisma.job.findMany({
      where: {
        companyId: company.id,
        isActive: true,
      },
      select: {
        location: true,
        workPolicy: true,
        department: true,
        employmentType: true,
        experienceLevel: true,
      },
    });

   
    const filters = {
      locations: [...new Set(jobs.map((job) => job.location))].sort(),
      workPolicies: [...new Set(jobs.map((job) => job.workPolicy))].sort(),
      departments: [...new Set(jobs.map((job) => job.department))].sort(),
      employmentTypes: [...new Set(jobs.map((job) => job.employmentType))].sort(),
      experienceLevels: [...new Set(jobs.map((job) => job.experienceLevel))].sort(),
    };

    return NextResponse.json(filters);
  } catch (error) {
    console.error("Error fetching job filters:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}