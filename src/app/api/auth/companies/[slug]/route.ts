
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import prisma from "@/lib/prisma";
import { authOptions } from "@/lib/auth";


export async function GET(
  req: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const company = await prisma.company.findUnique({
      where: { slug: params.slug },
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
      return NextResponse.json(
        { error: "Company not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(company);
  } catch (error) {
    console.error("Error fetching company:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// UPDATE company settings
export async function PUT(
  req: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const data = await req.json();

    // Verify user has access to this company
    const user = await prisma.user.findUnique({
      where: { email: session.user.email! },
      include: { company: true },
    });

    if (user?.company?.slug !== params.slug) {
      return NextResponse.json(
        { error: "Forbidden" },
        { status: 403 }
      );
    }

    const company = await prisma.company.update({
      where: { slug: params.slug },
      data: {
        name: data.name,
        description: data.description,
        logo: data.logo,
        banner: data.banner,
        primaryColor: data.primaryColor,
        secondaryColor: data.secondaryColor,
        cultureVideo: data.cultureVideo,
        isPublished: data.isPublished,
      },
      include: {
        sections: {
          orderBy: { order: "asc" },
        },
      },
    });

    return NextResponse.json(company);
  } catch (error) {
    console.error("Error updating company:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}