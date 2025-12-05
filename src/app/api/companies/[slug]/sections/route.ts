
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
          orderBy: { order: "asc" },
        },
      },
    });

    if (!company) {
      return NextResponse.json(
        { error: "Company not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(company.sections);
  } catch (error) {
    console.error("Error fetching sections:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}


export async function POST(
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

    const company = await prisma.company.findUnique({
      where: { slug: params.slug },
      include: { sections: true },
    });

    if (!company) {
      return NextResponse.json(
        { error: "Company not found" },
        { status: 404 }
      );
    }

    const maxOrder = company.sections.reduce(
      (max, section) => Math.max(max, section.order),
      -1
    );

    const section = await prisma.section.create({
      data: {
        title: data.title,
        content: data.content,
        type: data.type || "CUSTOM",
        order: maxOrder + 1,
        isVisible: data.isVisible ?? true,
        companyId: company.id,
      },
    });

    return NextResponse.json(section);
  } catch (error) {
    console.error("Error creating section:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}


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

    const { sections } = await req.json();

   
    await Promise.all(
      sections.map((section: { id: string; order: number }) =>
        prisma.section.update({
          where: { id: section.id },
          data: { order: section.order },
        })
      )
    );

    return NextResponse.json({ message: "Sections reordered successfully" });
  } catch (error) {
    console.error("Error reordering sections:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}