// src/components/ui/toast.tsx
"use client";

import * as React from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

interface ToastProps {
  message: string;
  type?: "success" | "error" | "info";
  onClose: () => void;
}

export function Toast({ message, type = "info", onClose }: ToastProps) {
  React.useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div
      className={cn(
        "fixed bottom-4 right-4 z-50 flex items-center gap-2 rounded-lg px-4 py-3 shadow-lg",
        {
          "bg-green-500 text-white": type === "success",
          "bg-red-500 text-white": type === "error",
          "bg-blue-500 text-white": type === "info",
        }
      )}
    >
      <span>{message}</span>
      <button onClick={onClose} className="hover:opacity-70">
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}