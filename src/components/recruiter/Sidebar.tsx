
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  Palette,
  LayoutList,
  Eye,
  Share2,
  Settings,
  ExternalLink,
} from "lucide-react";

interface SidebarProps {
  companySlug: string;
}

export default function Sidebar({ companySlug }: SidebarProps) {
  const pathname = usePathname();

  const links = [
    {
      href: `/${companySlug}/edit`,
      label: "Branding",
      icon: Palette,
    },
    {
      href: `/${companySlug}/edit/sections`,
      label: "Sections",
      icon: LayoutList,
    },
    {
      href: `/${companySlug}/preview`,
      label: "Preview",
      icon: Eye,
    },
  ];

  return (
    <div className="flex h-full w-64 flex-col border-r bg-white">
      <div className="p-6">
        <h2 className="text-lg font-semibold">Page Editor</h2>
        <p className="text-sm text-gray-500">Customize your careers page</p>
      </div>

      <nav className="flex-1 space-y-1 px-3">
        {links.map((link) => {
          const Icon = link.icon;
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "flex items-center space-x-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                isActive
                  ? "bg-primary text-white"
                  : "text-gray-700 hover:bg-gray-100"
              )}
            >
              <Icon className="h-5 w-5" />
              <span>{link.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="border-t p-4">
        <Link
          href={`/${companySlug}/careers`}
          target="_blank"
          className="flex items-center justify-center space-x-2 rounded-lg bg-green-500 px-4 py-2 text-sm font-medium text-white hover:bg-green-600"
        >
          <ExternalLink className="h-4 w-4" />
          <span>View Public Page</span>
        </Link>
      </div>
    </div>
  );
}