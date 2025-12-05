
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Section, SectionType } from "@/types";

interface SectionEditorProps {
  section?: Section;
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: Partial<Section>) => void;
  mode: "create" | "edit";
}

const sectionTypes: { value: SectionType; label: string }[] = [
  { value: "ABOUT_US", label: "About Us" },
  { value: "LIFE_AT_COMPANY", label: "Life at Company" },
  { value: "VALUES", label: "Our Values" },
  { value: "BENEFITS", label: "Benefits & Perks" },
  { value: "CUSTOM", label: "Custom Section" },
];

export default function SectionEditor({
  section,
  isOpen,
  onClose,
  onSave,
  mode,
}: SectionEditorProps) {
  const [formData, setFormData] = useState({
    title: section?.title || "",
    content: section?.content || "",
    type: section?.type || "CUSTOM",
    isVisible: section?.isVisible ?? true,
  });

  const handleSave = () => {
    onSave({
      ...formData,
      id: section?.id,
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>
            {mode === "create" ? "Add New Section" : "Edit Section"}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="type">Section Type</Label>
            <Select
              value={formData.type}
              onValueChange={(value) =>
                setFormData((prev) => ({ ...prev, type: value as SectionType }))
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select section type" />
              </SelectTrigger>
              <SelectContent>
                {sectionTypes.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="title">Section Title</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, title: e.target.value }))
              }
              placeholder="Enter section title"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="content">Content</Label>
            <Textarea
              id="content"
              value={formData.content}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, content: e.target.value }))
              }
              placeholder="Write your content here..."
              rows={8}
            />
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="isVisible">Visible on Careers Page</Label>
            <Switch
              id="isVisible"
              checked={formData.isVisible}
              onCheckedChange={(checked) =>
                setFormData((prev) => ({ ...prev, isVisible: checked }))
              }
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSave}>
            {mode === "create" ? "Add Section" : "Save Changes"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}