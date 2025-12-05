
"use client";

import { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Globe, Lock, Loader2 } from "lucide-react";

interface PublishToggleProps {
  isPublished: boolean;
  companySlug: string;
  onToggle: (published: boolean) => Promise<void>;
}

export default function PublishToggle({
  isPublished,
  companySlug,
  onToggle,
}: PublishToggleProps) {
  const [loading, setLoading] = useState(false);
  const [published, setPublished] = useState(isPublished);

  const handleToggle = async (checked: boolean) => {
    setLoading(true);
    try {
      await onToggle(checked);
      setPublished(checked);
    } catch (error) {
      console.error("Error toggling publish status:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-between rounded-lg border p-4">
      <div className="flex items-center space-x-3">
        {published ? (
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
            <Globe className="h-5 w-5 text-green-600" />
          </div>
        ) : (
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100">
            <Lock className="h-5 w-5 text-gray-600" />
          </div>
        )}
        <div>
          <Label htmlFor="publish-toggle" className="text-base font-medium">
            {published ? "Page is Live" : "Page is Private"}
          </Label>
          <p className="text-sm text-gray-500">
            {published
              ? "Your careers page is visible to the public"
              : "Only you can see your careers page"}
          </p>
        </div>
      </div>
      <div className="flex items-center space-x-2">
        {loading && <Loader2 className="h-4 w-4 animate-spin text-gray-400" />}
        <Switch
          id="publish-toggle"
          checked={published}
          onCheckedChange={handleToggle}
          disabled={loading}
        />
      </div>
    </div>
  );
}