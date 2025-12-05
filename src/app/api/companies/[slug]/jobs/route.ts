
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(
  req: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const { searchParams } = new URL(req.url);
    const search = searchParams.get("search") || "";
    const location = searchParams.get("location") || "";
    const workPolicy = searchParams.get("workPolicy") || "";
    const department = searchParams.get("department") || "";
    const employmentType = searchParams.get("employmentType") || "";

    const company = await prisma.company.findUnique({
      where: { slug: params.slug },
    });

    if (!company) {
      return NextResponse.json(
        { error: "Company not found" },
        { status: 404 }
      );
    }

    const whereClause: any = {
      companyId: company.id,
      isActive: true,
    };

    if (search) {
      whereClause.title = {
        contains: search,
        mode: "insensitive",
      };
    }

    if (location) {
      whereClause.location = {
        contains: location,
        mode: "insensitive",
      };
    }

    if (workPolicy) {
      whereClause.workPolicy = workPolicy;
    }

    if (department) {
      whereClause.department = department;
    }

    if (employmentType) {
      whereClause.employmentType = employmentType;
    }

    const jobs = await prisma.job.findMany({
      where: whereClause,
      orderBy: { postedAt: "desc" },
    });

    return NextResponse.json(jobs);
  } catch (error) {
    console.error("Error fetching jobs:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}