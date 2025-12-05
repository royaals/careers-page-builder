
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import {
  Building2,
  Palette,
  LayoutList,
  Eye,
  Search,
  Smartphone,
  Zap,
} from "lucide-react";

export default function HomePage() {
  const features = [
    {
      icon: Palette,
      title: "Brand Customization",
      description:
        "Set your colors, upload your logo, and add a banner to match your brand identity.",
    },
    {
      icon: LayoutList,
      title: "Flexible Sections",
      description:
        "Add, remove, and reorder content sections like About Us, Values, and Benefits.",
    },
    {
      icon: Eye,
      title: "Live Preview",
      description:
        "See exactly how your careers page will look before publishing it.",
    },
    {
      icon: Search,
      title: "Job Search & Filters",
      description:
        "Candidates can easily search and filter jobs by location, type, and more.",
    },
    {
      icon: Smartphone,
      title: "Mobile Friendly",
      description:
        "Fully responsive design that looks great on all devices.",
    },
    {
      icon: Zap,
      title: "SEO Optimized",
      description:
        "Built-in SEO features to help candidates find your jobs on search engines.",
    },
  ];

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-blue-800 py-20 text-white">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            Build Beautiful
            <br />
            <span className="text-blue-200">Careers Pages</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-blue-100">
            Create branded careers pages that tell your company story and help
            candidates discover and apply to open roles — especially on mobile.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
            <Link href="/register">
              <Button size="lg" variant="secondary" className="text-blue-600">
                Get Started Free
              </Button>
            </Link>
            <Link href="/demo/careers">
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white/10"
              >
                View Demo
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900">
              Everything You Need
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              All the tools to create an amazing careers page experience
            </p>
          </div>

          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="rounded-xl border bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100">
                    <Icon className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-gray-900">
                    {feature.title}
                  </h3>
                  <p className="mt-2 text-gray-600">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gray-50 py-20">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900">
            Ready to Build Your Careers Page?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
            Join hundreds of companies already using CareerHub to attract top
            talent.
          </p>
          <div className="mt-8">
            <Link href="/register">
              <Button size="lg">Create Your Free Account</Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}