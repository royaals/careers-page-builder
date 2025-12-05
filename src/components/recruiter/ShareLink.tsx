
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Share2, Copy, Check, ExternalLink } from "lucide-react";

interface ShareLinkProps {
  companySlug: string;
}

export default function ShareLink({ companySlug }: ShareLinkProps) {
  const [copied, setCopied] = useState(false);
  const careersUrl = `${typeof window !== "undefined" ? window.location.origin : ""}/${companySlug}/careers`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(careersUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Failed to copy:", error);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Share2 className="mr-2 h-4 w-4" />
          Share
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Share Your Careers Page</DialogTitle>
        </DialogHeader>
        <div className="flex items-center space-x-2">
          <div className="grid flex-1 gap-2">
            <Input
              id="link"
              value={careersUrl}
              readOnly
              className="bg-gray-50"
            />
          </div>
          <Button
            type="button"
            size="icon"
            onClick={handleCopy}
            className={copied ? "bg-green-500 hover:bg-green-600" : ""}
          >
            {copied ? (
              <Check className="h-4 w-4" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
          </Button>
        </div>
        <div className="flex justify-end">
          <a
            href={careersUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-sm text-primary hover:underline"
          >
            Open in new tab
            <ExternalLink className="ml-1 h-3 w-3" />
          </a>
        </div>
      </DialogContent>
    </Dialog>
  );
}