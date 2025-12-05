
"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload, X, Image as ImageIcon, Video } from "lucide-react";
import { Company } from "@/types";

interface BrandingFormProps {
  company: Company;
  onUpdate: (data: Partial<Company>) => void;
}

export default function BrandingForm({ company, onUpdate }: BrandingFormProps) {
  const [formData, setFormData] = useState({
    name: company.name,
    description: company.description || "",
    primaryColor: company.primaryColor,
    secondaryColor: company.secondaryColor,
    logo: company.logo || "",
    banner: company.banner || "",
    cultureVideo: company.cultureVideo || "",
  });
  const [uploading, setUploading] = useState(false);

  const logoInputRef = useRef<HTMLInputElement>(null);
  const bannerInputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "logo" | "banner"
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const formDataUpload = new FormData();
      formDataUpload.append("file", file);
      formDataUpload.append("type", type);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formDataUpload,
      });

      if (res.ok) {
        const { url } = await res.json();
        setFormData((prev) => ({ ...prev, [type]: url }));
      }
    } catch (error) {
      console.error("Upload error:", error);
    } finally {
      setUploading(false);
    }
  };

  const handleSave = () => {
    onUpdate(formData);
  };

  const removeImage = (type: "logo" | "banner") => {
    setFormData((prev) => ({ ...prev, [type]: "" }));
  };

  return (
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
              className="h-20 w-32 rounded-lg shadow-sm"
              style={{ backgroundColor: formData.primaryColor }}
            />
            <div
              className="h-20 w-32 rounded-lg shadow-sm"
              style={{ backgroundColor: formData.secondaryColor }}
            />
          </div>
        </CardContent>
      </Card>

      
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Company Logo</CardTitle>
        </CardHeader>
        <CardContent>
          <input
            type="file"
            ref={logoInputRef}
            onChange={(e) => handleFileUpload(e, "logo")}
            accept="image/*"
            className="hidden"
          />
          {formData.logo ? (
            <div className="relative inline-block">
              <img
                src={formData.logo}
                alt="Company logo"
                className="h-24 w-24 rounded-lg object-cover"
              />
              <button
                onClick={() => removeImage("logo")}
                className="absolute -right-2 -top-2 rounded-full bg-red-500 p-1 text-white hover:bg-red-600"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <Button
              variant="outline"
              onClick={() => logoInputRef.current?.click()}
              disabled={uploading}
            >
              <Upload className="mr-2 h-4 w-4" />
              Upload Logo
            </Button>
          )}
          <p className="mt-2 text-sm text-gray-500">
            Recommended: 200x200px, PNG or JPG
          </p>
        </CardContent>
      </Card>

     
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Banner Image</CardTitle>
        </CardHeader>
        <CardContent>
          <input
            type="file"
            ref={bannerInputRef}
            onChange={(e) => handleFileUpload(e, "banner")}
            accept="image/*"
            className="hidden"
          />
          {formData.banner ? (
            <div className="relative">
              <img
                src={formData.banner}
                alt="Banner"
                className="h-48 w-full rounded-lg object-cover"
              />
              <button
                onClick={() => removeImage("banner")}
                className="absolute right-2 top-2 rounded-full bg-red-500 p-1 text-white hover:bg-red-600"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <div
              onClick={() => bannerInputRef.current?.click()}
              className="flex h-48 cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 hover:border-gray-400"
            >
              <ImageIcon className="h-12 w-12 text-gray-400" />
              <p className="mt-2 text-sm text-gray-500">Click to upload banner</p>
            </div>
          )}
          <p className="mt-2 text-sm text-gray-500">
            Recommended: 1920x400px, PNG or JPG
          </p>
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
          {formData.cultureVideo && (
            <div className="aspect-video w-full">
              <iframe
                src={getEmbedUrl(formData.cultureVideo)}
                className="h-full w-full rounded-lg"
                allowFullScreen
              />
            </div>
          )}
        </CardContent>
      </Card>

     
      <div className="flex justify-end">
        <Button onClick={handleSave} size="lg">
          Save Changes
        </Button>
      </div>
    </div>
  );
}

function getEmbedUrl(url: string): string {

  const youtubeMatch = url.match(
    /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\s]+)/
  );
  if (youtubeMatch) {
    return `https://www.youtube.com/embed/${youtubeMatch[1]}`;
  }

  
  const vimeoMatch = url.match(/vimeo\.com\/(\d+)/);
  if (vimeoMatch) {
    return `https://player.vimeo.com/video/${vimeoMatch[1]}`;
  }

  return url;
}