"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Loader2,
  Palette,
  LayoutList,
  Eye,
  ExternalLink,
  Save,
} from "lucide-react";

interface Company {
  id: string;
  name: string;
  slug: string;
  description?: string | null;
  logo?: string | null;
  banner?: string | null;
  primaryColor: string;
  secondaryColor: string;
  cultureVideo?: string | null;
  isPublished: boolean;
}

interface EditPageProps {
  params: { companySlug: string };
}

export default function EditPage({ params }: EditPageProps) {
  const { companySlug } = params;
  const { data: session, status } = useSession();
  const router = useRouter();
  const [company, setCompany] = useState<Company | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    primaryColor: "#3B82F6",
    secondaryColor: "#1E40AF",
    logo: "",
    banner: "",
    cultureVideo: "",
  });

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
      return;
    }

    if (status === "authenticated") {
      fetchCompany();
    }
  }, [status, companySlug]);

  const fetchCompany = async () => {
    try {
      const res = await fetch(`/api/companies/${companySlug}`);
      if (res.ok) {
        const data = await res.json();
        setCompany(data);
        setFormData({
          name: data.name || "",
          description: data.description || "",
          primaryColor: data.primaryColor || "#3B82F6",
          secondaryColor: data.secondaryColor || "#1E40AF",
          logo: data.logo || "",
          banner: data.banner || "",
          cultureVideo: data.cultureVideo || "",
        });
      } else {
        console.error("Company not found");
      }
    } catch (error) {
      console.error("Error fetching company:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    setMessage(null);

    try {
      const res = await fetch(`/api/companies/${companySlug}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        const updatedCompany = await res.json();
        setCompany(updatedCompany);
        setMessage({ type: "success", text: "Changes saved successfully!" });
      } else {
        setMessage({ type: "error", text: "Failed to save changes" });
      }
    } catch (error) {
      setMessage({ type: "error", text: "An error occurred" });
    } finally {
      setIsSaving(false);
      setTimeout(() => setMessage(null), 3000);
    }
  };

  if (status === "loading" || isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2">Loading...</span>
      </div>
    );
  }

  if (!company) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <p className="text-xl">Company not found</p>
          <Link href="/" className="text-primary hover:underline">
            Go back home
          </Link>
        </div>
      </div>
    );
  }


  return (
    <div className="flex min-h-screen">
   
      <aside className="fixed left-0 top-0 h-full w-64 border-r bg-white">
        <div className="p-6">
          <h2 className="text-lg font-semibold">Page Editor</h2>
          <p className="text-sm text-gray-500">Customize your careers page</p>
        </div>
        <nav className="space-y-1 px-3">
          <Link
            href={`/${companySlug}/edit`}
            className="flex items-center space-x-3 rounded-lg bg-primary px-3 py-2 text-white"
          >
            <Palette className="h-5 w-5" />
            <span>Branding</span>
          </Link>
          <Link
            href={`/${companySlug}/edit/sections`}
            className="flex items-center space-x-3 rounded-lg px-3 py-2 text-gray-700 hover:bg-gray-100"
          >
            <LayoutList className="h-5 w-5" />
            <span>Sections</span>
          </Link>
          <Link
            href={`/${companySlug}/preview`}
            className="flex items-center space-x-3 rounded-lg px-3 py-2 text-gray-700 hover:bg-gray-100"
          >
            <Eye className="h-5 w-5" />
            <span>Preview</span>
          </Link>
        </nav>
        <div className="absolute bottom-0 left-0 w-64 border-t p-4">
          <Link
            href={`/${companySlug}/careers`}
            target="_blank"
            className="flex w-full items-center justify-center space-x-2 rounded-lg bg-green-500 px-4 py-2 text-sm font-medium text-white hover:bg-green-600"
          >
            <ExternalLink className="h-4 w-4" />
            <span>View Public Page</span>
          </Link>
        </div>
      </aside>

   
      <main className="ml-64 flex-1 bg-gray-50 p-8">
        <div className="mx-auto max-w-3xl">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Branding & Design</h1>
              <p className="mt-1 text-gray-600">Customize your careers page appearance</p>
            </div>
            <Button onClick={handleSave} disabled={isSaving}>
              {isSaving ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Save className="mr-2 h-4 w-4" />
              )}
              Save Changes
            </Button>
          </div>

      
          {message && (
            <div
              className={`mb-6 rounded-lg p-4 ${
                message.type === "success"
                  ? "bg-green-100 text-green-800"
                  : "bg-red-100 text-red-800"
              }`}
            >
              {message.text}
            </div>
          )}

          <div className="space-y-6">
    
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Company Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Company Name</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter company name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Company Description</Label>
                  <Textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Tell candidates about your company..."
                    rows={4}
                  />
                </div>
              </CardContent>
            </Card>

      
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Brand Colors</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="primaryColor">Primary Color</Label>
                    <div className="flex items-center space-x-2">
                      <input
                        type="color"
                        id="primaryColor"
                        name="primaryColor"
                        value={formData.primaryColor}
                        onChange={handleInputChange}
                        className="h-10 w-14 cursor-pointer rounded border p-1"
                      />
                      <Input
                        value={formData.primaryColor}
                        name="primaryColor"
                        onChange={handleInputChange}
                        className="flex-1"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="secondaryColor">Secondary Color</Label>
                    <div className="flex items-center space-x-2">
                      <input
                        type="color"
                        id="secondaryColor"
                        name="secondaryColor"
                        value={formData.secondaryColor}
                        onChange={handleInputChange}
                        className="h-10 w-14 cursor-pointer rounded border p-1"
                      />
                      <Input
                        value={formData.secondaryColor}
                        name="secondaryColor"
                        onChange={handleInputChange}
                        className="flex-1"
                      />
                    </div>
                  </div>
                </div>
              
                <div className="mt-4 flex items-center space-x-4">
                  <div
                    className="h-20 w-32 rounded-lg shadow-sm flex items-center justify-center text-white text-sm"
                    style={{ backgroundColor: formData.primaryColor }}
                  >
                    Primary
                  </div>
                  <div
                    className="h-20 w-32 rounded-lg shadow-sm flex items-center justify-center text-white text-sm"
                    style={{ backgroundColor: formData.secondaryColor }}
                  >
                    Secondary
                  </div>
                </div>
              </CardContent>
            </Card>

            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Company Logo</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="logo">Logo URL</Label>
                  <Input
                    id="logo"
                    name="logo"
                    value={formData.logo}
                    onChange={handleInputChange}
                    placeholder="https://example.com/logo.png"
                  />
                </div>
                {formData.logo && (
                  <div className="mt-4">
                    <p className="mb-2 text-sm text-gray-500">Preview:</p>
                    <img
                      src={formData.logo}
                      alt="Logo preview"
                      className="h-24 w-24 rounded-lg object-cover border"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = "none";
                      }}
                    />
                  </div>
                )}
              </CardContent>
            </Card>

          
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Banner Image</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="banner">Banner URL</Label>
                  <Input
                    id="banner"
                    name="banner"
                    value={formData.banner}
                    onChange={handleInputChange}
                    placeholder="https://example.com/banner.jpg"
                  />
                </div>
                {formData.banner && (
                  <div className="mt-4">
                    <p className="mb-2 text-sm text-gray-500">Preview:</p>
                    <img
                      src={formData.banner}
                      alt="Banner preview"
                      className="h-32 w-full rounded-lg object-cover border"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = "none";
                      }}
                    />
                  </div>
                )}
              </CardContent>
            </Card>

    
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Culture Video</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="cultureVideo">YouTube or Vimeo URL</Label>
                  <Input
                    id="cultureVideo"
                    name="cultureVideo"
                    value={formData.cultureVideo}
                    onChange={handleInputChange}
                    placeholder="https://www.youtube.com/watch?v=..."
                  />
                </div>
                <p className="text-sm text-gray-500">
                  Paste a YouTube or Vimeo video URL to embed on your careers page
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}