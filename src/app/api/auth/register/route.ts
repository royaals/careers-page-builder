
import { NextRequest, NextResponse } from "next/server";
import { hash } from "bcryptjs";
import prisma from "@/lib/prisma";
import { slugify } from "@/lib/utils";

export async function POST(req: NextRequest) {
  try {
    const { email, password, name, companyName } = await req.json();

   
    if (!email || !password || !companyName) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

   
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

  
    let slug = slugify(companyName);
    const existingCompany = await prisma.company.findUnique({
      where: { slug },
    });

    if (existingCompany) {
      slug = `${slug}-${Date.now()}`;
    }

   
    const hashedPassword = await hash(password, 12);

 
    const company = await prisma.company.create({
      data: {
        name: companyName,
        slug,
        description: `Welcome to ${companyName}. We're excited to have you here!`,
        sections: {
          create: [
            {
              title: "About Us",
              content: `${companyName} is a great place to work. We value innovation, collaboration, and growth.`,
              type: "ABOUT_US",
              order: 0,
              isVisible: true,
            },
            {
              title: "Life at Company",
              content: "Discover what makes our culture unique and why our team loves working here.",
              type: "LIFE_AT_COMPANY",
              order: 1,
              isVisible: true,
            },
            {
              title: "Our Values",
              content: "Integrity, Innovation, Inclusion - these are the core values that guide everything we do.",
              type: "VALUES",
              order: 2,
              isVisible: true,
            },
            {
              title: "Benefits & Perks",
              content: "Competitive salary, health insurance, flexible work hours, and much more.",
              type: "BENEFITS",
              order: 3,
              isVisible: true,
            },
          ],
        },
      },
    });

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        companyId: company.id,
      },
    });

    return NextResponse.json({
      message: "User created successfully",
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
      company: {
        id: company.id,
        name: company.name,
        slug: company.slug,
      },
    });
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}