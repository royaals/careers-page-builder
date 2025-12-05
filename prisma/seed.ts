
import { PrismaClient } from "@prisma/client";
import { hash } from "bcryptjs";

const prisma = new PrismaClient();

const sampleJobs = [
  {
    title: "Full Stack Engineer",
    workPolicy: "Remote",
    location: "Berlin, Germany",
    department: "Product",
    employmentType: "Full time",
    experienceLevel: "Senior",
    jobType: "Temporary",
    salaryRange: "AED 8K–12K / month",
    slug: "full-stack-engineer-berlin",
    daysAgo: 40,
  },
  {
    title: "Business Analyst",
    workPolicy: "Hybrid",
    location: "Riyadh, Saudi Arabia",
    department: "Customer Success",
    employmentType: "Part time",
    experienceLevel: "Mid-level",
    jobType: "Permanent",
    salaryRange: "USD 4K–6K / month",
    slug: "business-analyst-riyadh",
    daysAgo: 5,
  },
  {
    title: "Software Engineer",
    workPolicy: "Remote",
    location: "Berlin, Germany",
    department: "Sales",
    employmentType: "Contract",
    experienceLevel: "Senior",
    jobType: "Permanent",
    salaryRange: "SAR 10K–18K / month",
    slug: "software-engineer-berlin",
    daysAgo: 32,
  },
  {
    title: "Marketing Manager",
    workPolicy: "Hybrid",
    location: "Boston, United States",
    department: "Engineering",
    employmentType: "Part time",
    experienceLevel: "Mid-level",
    jobType: "Temporary",
    salaryRange: "AED 8K–12K / month",
    slug: "marketing-manager-boston",
    daysAgo: 22,
  },
  {
    title: "UX Researcher",
    workPolicy: "Hybrid",
    location: "Boston, United States",
    department: "Engineering",
    employmentType: "Full time",
    experienceLevel: "Senior",
    jobType: "Permanent",
    salaryRange: "USD 4K–6K / month",
    slug: "ux-researcher-boston",
    daysAgo: 31,
  },
  {
    title: "AI Product Manager",
    workPolicy: "On-site",
    location: "Athens, Greece",
    department: "Operations",
    employmentType: "Full time",
    experienceLevel: "Junior",
    jobType: "Internship",
    salaryRange: "INR 8L–15L / year",
    slug: "ai-product-manager-athens",
    daysAgo: 37,
  },
  {
    title: "Sales Development Representative",
    workPolicy: "Remote",
    location: "Berlin, Germany",
    department: "Marketing",
    employmentType: "Full time",
    experienceLevel: "Mid-level",
    jobType: "Temporary",
    salaryRange: "INR 8L–15L / year",
    slug: "sales-development-representative-berlin",
    daysAgo: 27,
  },
  {
    title: "Frontend Engineer",
    workPolicy: "Hybrid",
    location: "Athens, Greece",
    department: "Engineering",
    employmentType: "Part time",
    experienceLevel: "Junior",
    jobType: "Temporary",
    salaryRange: "USD 80K–120K / year",
    slug: "frontend-engineer-athens",
    daysAgo: 59,
  },
  {
    title: "Data Analyst",
    workPolicy: "On-site",
    location: "Dubai, United Arab Emirates",
    department: "Customer Success",
    employmentType: "Full time",
    experienceLevel: "Mid-level",
    jobType: "Permanent",
    salaryRange: "AED 8K–12K / month",
    slug: "data-analyst-dubai",
    daysAgo: 53,
  },
  {
    title: "Solutions Consultant",
    workPolicy: "Hybrid",
    location: "Hyderabad, India",
    department: "Engineering",
    employmentType: "Contract",
    experienceLevel: "Junior",
    jobType: "Internship",
    salaryRange: "AED 8K–12K / month",
    slug: "solutions-consultant-hyderabad",
    daysAgo: 41,
  },
  {
    title: "Mobile Developer (Flutter)",
    workPolicy: "Hybrid",
    location: "Athens, Greece",
    department: "Operations",
    employmentType: "Part time",
    experienceLevel: "Senior",
    jobType: "Permanent",
    salaryRange: "USD 80K–120K / year",
    slug: "mobile-developer-flutter-athens",
    daysAgo: 43,
  },
  {
    title: "Operations Associate",
    workPolicy: "Hybrid",
    location: "Bangalore, India",
    department: "Analytics",
    employmentType: "Contract",
    experienceLevel: "Junior",
    jobType: "Internship",
    salaryRange: "SAR 10K–18K / month",
    slug: "operations-associate-bangalore",
    daysAgo: 16,
  },
  {
    title: "QA Engineer",
    workPolicy: "Hybrid",
    location: "Berlin, Germany",
    department: "Marketing",
    employmentType: "Contract",
    experienceLevel: "Junior",
    jobType: "Temporary",
    salaryRange: "INR 8L–15L / year",
    slug: "qa-engineer-berlin",
    daysAgo: 48,
  },
  {
    title: "Product Designer",
    workPolicy: "On-site",
    location: "Boston, United States",
    department: "Operations",
    employmentType: "Part time",
    experienceLevel: "Mid-level",
    jobType: "Permanent",
    salaryRange: "AED 12K–18K / month",
    slug: "product-designer-boston",
    daysAgo: 52,
  },
  {
    title: "DevOps Engineer",
    workPolicy: "Hybrid",
    location: "Dubai, United Arab Emirates",
    department: "Customer Success",
    employmentType: "Contract",
    experienceLevel: "Junior",
    jobType: "Internship",
    salaryRange: "USD 80K–120K / year",
    slug: "devops-engineer-dubai",
    daysAgo: 37,
  },
  {
    title: "Customer Success Executive",
    workPolicy: "Hybrid",
    location: "Istanbul, Turkey",
    department: "Customer Success",
    employmentType: "Full time",
    experienceLevel: "Junior",
    jobType: "Temporary",
    salaryRange: "SAR 10K–18K / month",
    slug: "customer-success-executive-istanbul",
    daysAgo: 25,
  },
// prisma/seed.ts (continued)
  {
    title: "Technical Writer",
    workPolicy: "On-site",
    location: "Berlin, Germany",
    department: "Sales",
    employmentType: "Full time",
    experienceLevel: "Junior",
    jobType: "Permanent",
    salaryRange: "SAR 10K–18K / month",
    slug: "technical-writer-berlin",
    daysAgo: 13,
  },
  {
    title: "Backend Developer",
    workPolicy: "Hybrid",
    location: "Bangalore, India",
    department: "Product",
    employmentType: "Part time",
    experienceLevel: "Senior",
    jobType: "Temporary",
    salaryRange: "USD 80K–120K / year",
    slug: "backend-developer-bangalore",
    daysAgo: 21,
  },
  {
    title: "Product Designer",
    workPolicy: "Remote",
    location: "Istanbul, Turkey",
    department: "Customer Success",
    employmentType: "Full time",
    experienceLevel: "Mid-level",
    jobType: "Temporary",
    salaryRange: "SAR 10K–18K / month",
    slug: "product-designer-istanbul",
    daysAgo: 17,
  },
  {
    title: "AI Product Manager",
    workPolicy: "Hybrid",
    location: "Cairo, Egypt",
    department: "Analytics",
    employmentType: "Full time",
    experienceLevel: "Junior",
    jobType: "Permanent",
    salaryRange: "AED 12K–18K / month",
    slug: "ai-product-manager-cairo",
    daysAgo: 17,
  },
  {
    title: "Sales Development Representative",
    workPolicy: "Hybrid",
    location: "Hyderabad, India",
    department: "Marketing",
    employmentType: "Full time",
    experienceLevel: "Senior",
    jobType: "Permanent",
    salaryRange: "AED 12K–18K / month",
    slug: "sales-development-representative-hyderabad",
    daysAgo: 43,
  },
  {
    title: "UX Researcher",
    workPolicy: "Remote",
    location: "Hyderabad, India",
    department: "R&D",
    employmentType: "Full time",
    experienceLevel: "Senior",
    jobType: "Permanent",
    salaryRange: "AED 8K–12K / month",
    slug: "ux-researcher-hyderabad",
    daysAgo: 5,
  },
  {
    title: "Backend Developer",
    workPolicy: "On-site",
    location: "Riyadh, Saudi Arabia",
    department: "IT Support",
    employmentType: "Contract",
    experienceLevel: "Junior",
    jobType: "Permanent",
    salaryRange: "USD 4K–6K / month",
    slug: "backend-developer-riyadh",
    daysAgo: 59,
  },
  {
    title: "Software Engineer",
    workPolicy: "On-site",
    location: "Cairo, Egypt",
    department: "Product",
    employmentType: "Part time",
    experienceLevel: "Senior",
    jobType: "Internship",
    salaryRange: "USD 4K–6K / month",
    slug: "software-engineer-cairo",
    daysAgo: 22,
  },
  {
    title: "QA Engineer",
    workPolicy: "Remote",
    location: "Riyadh, Saudi Arabia",
    department: "R&D",
    employmentType: "Full time",
    experienceLevel: "Senior",
    jobType: "Temporary",
    salaryRange: "AED 8K–12K / month",
    slug: "qa-engineer-riyadh",
    daysAgo: 41,
  },
];

async function main() {
  console.log("🌱 Starting database seed...");

  // Clean existing data
  console.log("🧹 Cleaning existing data...");
  await prisma.job.deleteMany();
  await prisma.section.deleteMany();
  await prisma.user.deleteMany();
  await prisma.company.deleteMany();

  // Create demo company
  console.log("🏢 Creating demo company...");
  const hashedPassword = await hash("password123", 12);

  const company = await prisma.company.create({
    data: {
      name: "TechCorp Inc.",
      slug: "techcorp",
      description:
        "TechCorp is a leading technology company building innovative solutions that transform how businesses operate. We believe in the power of technology to make the world a better place.",
      logo: "https://api.dicebear.com/7.x/shapes/svg?seed=techcorp",
      banner:
        "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920&h=400&fit=crop",
      primaryColor: "#2563EB",
      secondaryColor: "#1E40AF",
      cultureVideo: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      isPublished: true,
      users: {
        create: {
          name: "John Recruiter",
          email: "recruiter@techcorp.com",
          password: hashedPassword,
          role: "recruiter",
        },
      },
      sections: {
        create: [
          {
            title: "About Us",
            content: `TechCorp was founded in 2010 with a simple mission: to build technology that matters. 

Over the past decade, we've grown from a small startup to a global company with offices in 10 countries and over 1,000 employees.

Our products are used by millions of people around the world, and we're just getting started. We're looking for talented individuals who share our passion for innovation and want to make a real impact.`,
            type: "ABOUT_US",
            order: 0,
            isVisible: true,
          },
          {
            title: "Life at TechCorp",
            content: `At TechCorp, we believe that great work happens when people feel supported, challenged, and inspired.

🎯 Mission-Driven: Every project we work on has a clear purpose and measurable impact.

🤝 Collaborative Culture: We work in cross-functional teams where everyone's voice is heard.

📚 Continuous Learning: We invest in our people with training budgets, conference attendance, and mentorship programs.

🎉 Fun & Inclusive: From team outings to hackathons, we make sure work is enjoyable.`,
            type: "LIFE_AT_COMPANY",
            order: 1,
            isVisible: true,
          },
          {
            title: "Our Values",
            content: `🚀 Innovation First: We're not afraid to try new things and push boundaries.

💎 Quality Matters: We take pride in our craft and never cut corners.

🤝 Customer Obsession: Our customers are at the heart of everything we do.

🌱 Growth Mindset: We embrace challenges as opportunities to learn and improve.

🌍 Global Impact: We build for the world, considering diverse perspectives and needs.`,
            type: "VALUES",
            order: 2,
            isVisible: true,
          },
          {
            title: "Benefits & Perks",
            content: `💰 Competitive Compensation: Top-of-market salaries with equity options.

🏥 Health & Wellness: Comprehensive health, dental, and vision insurance.

🏖️ Flexible Time Off: Unlimited PTO policy with minimum required days off.

🏠 Remote-Friendly: Work from anywhere with flexible hours.

📚 Learning Budget: $2,000 annual budget for courses, books, and conferences.

💪 Fitness Allowance: Monthly gym membership or fitness class reimbursement.

🍼 Parental Leave: 16 weeks paid leave for all new parents.

💻 Equipment: Top-of-the-line MacBook Pro and accessories.`,
            type: "BENEFITS",
            order: 3,
            isVisible: true,
          },
        ],
      },
    },
  });

  console.log(`✅ Created company: ${company.name} (${company.slug})`);

  // Create jobs
  console.log("💼 Creating jobs...");
  for (const job of sampleJobs) {
    const postedAt = new Date();
    postedAt.setDate(postedAt.getDate() - job.daysAgo);

    await prisma.job.create({
      data: {
        title: job.title,
        slug: job.slug,
        description: `We are looking for a talented ${job.title} to join our ${job.department} team in ${job.location}. This is a ${job.employmentType.toLowerCase()} ${job.workPolicy.toLowerCase()} position.

## About the Role
As a ${job.title}, you will be responsible for driving key initiatives and contributing to our company's growth. You'll work with a talented team of professionals who are passionate about what they do.

## Requirements
- ${job.experienceLevel} level experience in a similar role
- Strong communication and collaboration skills
- Passion for learning and continuous improvement
- Ability to work in a ${job.workPolicy.toLowerCase()} environment

## What We Offer
- ${job.salaryRange}
- ${job.jobType} position
- Great team and culture
- Growth opportunities`,
        workPolicy: job.workPolicy,
        location: job.location,
        department: job.department,
        employmentType: job.employmentType,
        experienceLevel: job.experienceLevel,
        jobType: job.jobType,
        salaryRange: job.salaryRange,
        postedAt: postedAt,
        isActive: true,
        companyId: company.id,
      },
    });
  }

  console.log(`✅ Created ${sampleJobs.length} jobs`);

  // Create second demo company
  console.log("🏢 Creating second demo company...");
  const company2 = await prisma.company.create({
    data: {
      name: "GreenLeaf Startup",
      slug: "greenleaf",
      description:
        "GreenLeaf is an eco-friendly startup focused on sustainable technology solutions. We're on a mission to make the world greener, one innovation at a time.",
      logo: "https://api.dicebear.com/7.x/shapes/svg?seed=greenleaf",
      banner:
        "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1920&h=400&fit=crop",
      primaryColor: "#059669",
      secondaryColor: "#047857",
      isPublished: true,
      users: {
        create: {
          name: "Jane HR",
          email: "hr@greenleaf.com",
          password: hashedPassword,
          role: "recruiter",
        },
      },
      sections: {
        create: [
          {
            title: "Our Mission",
            content: `GreenLeaf was born from a simple idea: technology should help heal our planet, not harm it.

We're building sustainable solutions that help businesses reduce their carbon footprint while improving their bottom line.

Join us in creating a greener future for generations to come.`,
            type: "ABOUT_US",
            order: 0,
            isVisible: true,
          },
          {
            title: "Why Join Us",
            content: `🌱 Make an Impact: Every line of code you write helps save the planet.

🌍 Global Team: Work with passionate people from around the world.

💚 Green Office: Our offices are powered by 100% renewable energy.

🚴 Eco-Friendly Perks: Electric vehicle subsidies and bike-to-work programs.`,
            type: "BENEFITS",
            order: 1,
            isVisible: true,
          },
        ],
      },
    },
  });

  // Add some jobs to second company
  const greenleafJobs = [
    {
      title: "Sustainability Engineer",
      workPolicy: "Remote",
      location: "San Francisco, USA",
      department: "Engineering",
      employmentType: "Full time",
      experienceLevel: "Senior",
      jobType: "Permanent",
      salaryRange: "USD 120K–180K / year",
      slug: "sustainability-engineer-sf",
      daysAgo: 5,
    },
    {
      title: "Environmental Data Scientist",
      workPolicy: "Hybrid",
      location: "London, UK",
      department: "Data Science",
      employmentType: "Full time",
      experienceLevel: "Mid-level",
      jobType: "Permanent",
      salaryRange: "GBP 60K–90K / year",
      slug: "environmental-data-scientist-london",
      daysAgo: 12,
    },
    {
      title: "Green Product Manager",
      workPolicy: "On-site",
      location: "Berlin, Germany",
      department: "Product",
      employmentType: "Full time",
      experienceLevel: "Senior",
      jobType: "Permanent",
      salaryRange: "EUR 80K–120K / year",
      slug: "green-product-manager-berlin",
      daysAgo: 8,
    },
  ];

  for (const job of greenleafJobs) {
    const postedAt = new Date();
    postedAt.setDate(postedAt.getDate() - job.daysAgo);

    await prisma.job.create({
      data: {
        title: job.title,
        slug: job.slug,
        description: `Join GreenLeaf as a ${job.title} and help us build a sustainable future.`,
        workPolicy: job.workPolicy,
        location: job.location,
        department: job.department,
        employmentType: job.employmentType,
        experienceLevel: job.experienceLevel,
        jobType: job.jobType,
        salaryRange: job.salaryRange,
        postedAt: postedAt,
        isActive: true,
        companyId: company2.id,
      },
    });
  }

  console.log(`✅ Created company: ${company2.name} (${company2.slug})`);
  console.log(`✅ Created ${greenleafJobs.length} jobs for GreenLeaf`);

  console.log("\n🎉 Seed completed successfully!");
  console.log("\n📋 Demo Accounts:");
  console.log("──────────────────────────────────────");
  console.log("Company 1: TechCorp");
  console.log("  Email: recruiter@techcorp.com");
  console.log("  Password: password123");
  console.log("  Careers Page: /techcorp/careers");
  console.log("──────────────────────────────────────");
  console.log("Company 2: GreenLeaf");
  console.log("  Email: hr@greenleaf.com");
  console.log("  Password: password123");
  console.log("  Careers Page: /greenleaf/careers");
  console.log("──────────────────────────────────────");
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });