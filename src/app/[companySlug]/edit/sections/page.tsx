// src/app/[companySlug]/edit/sections/page.tsx
"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Loader2,
  Palette,
  LayoutList,
  Eye,
  ExternalLink,
  Plus,
  GripVertical,
  Edit,
  Trash2,
  Eye as EyeIcon,
  EyeOff,
} from "lucide-react";

interface Section {
  id: string;
  title: string;
  content: string;
  type: string;
  order: number;
  isVisible: boolean;
}

interface SectionsPageProps {
  params: { companySlug: string };
}

export default function SectionsPage({ params }: SectionsPageProps) {
  const { companySlug } = params;
  const { data: session, status } = useSession();
  const router = useRouter();
  const [sections, setSections] = useState<Section[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSection, setEditingSection] = useState<Section | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [modalData, setModalData] = useState({
    title: "",
    content: "",
    type: "CUSTOM",
    isVisible: true,
  });

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
      return;
    }

    if (status === "authenticated") {
      fetchSections();
    }
  }, [status, companySlug]);

  const fetchSections = async () => {
    try {
      const res = await fetch(`/api/companies/${companySlug}/sections`);
      if (res.ok) {
        const data = await res.json();
        setSections(data);
      }
    } catch (error) {
      console.error("Error fetching sections:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const openCreateModal = () => {
    setEditingSection(null);
    setModalData({
      title: "",
      content: "",
      type: "CUSTOM",
      isVisible: true,
    });
    setIsModalOpen(true);
  };

  const openEditModal = (section: Section) => {
    setEditingSection(section);
    setModalData({
      title: section.title,
      content: section.content,
      type: section.type,
      isVisible: section.isVisible,
    });
    setIsModalOpen(true);
  };

  const handleSaveSection = async () => {
    if (!modalData.title.trim()) {
      setMessage({ type: "error", text: "Title is required" });
      setTimeout(() => setMessage(null), 3000);
      return;
    }

    setIsSaving(true);

    try {
      if (editingSection) {
       
        const res = await fetch(
          `/api/companies/${companySlug}/sections/${editingSection.id}`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(modalData),
          }
        );

        if (res.ok) {
          const updated = await res.json();
          setSections((prev) =>
            prev.map((s) => (s.id === updated.id ? updated : s))
          );
          setMessage({ type: "success", text: "Section updated!" });
          setIsModalOpen(false);
        } else {
          setMessage({ type: "error", text: "Failed to update section" });
        }
      } else {
        
        const res = await fetch(
          `/api/companies/${companySlug}/sections`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(modalData),
          }
        );

        if (res.ok) {
          const newSection = await res.json();
          setSections((prev) => [...prev, newSection]);
          setMessage({ type: "success", text: "Section created!" });
          setIsModalOpen(false);
        } else {
          setMessage({ type: "error", text: "Failed to create section" });
        }
      }
    } catch (error) {
      console.error("Error saving section:", error);
      setMessage({ type: "error", text: "An error occurred" });
    } finally {
      setIsSaving(false);
      setTimeout(() => setMessage(null), 3000);
    }
  };

  const handleDeleteSection = async (sectionId: string) => {
    if (!confirm("Are you sure you want to delete this section?")) return;

    try {
      const res = await fetch(
        `/api/companies/${companySlug}/sections/${sectionId}`,
        { method: "DELETE" }
      );

      if (res.ok) {
        setSections((prev) => prev.filter((s) => s.id !== sectionId));
        setMessage({ type: "success", text: "Section deleted!" });
      } else {
        setMessage({ type: "error", text: "Failed to delete section" });
      }
    } catch (error) {
      setMessage({ type: "error", text: "An error occurred" });
    }
    setTimeout(() => setMessage(null), 3000);
  };

  const handleToggleVisibility = async (section: Section) => {
    try {
      const res = await fetch(
        `/api/companies/${companySlug}/sections/${section.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...section, isVisible: !section.isVisible }),
        }
      );

      if (res.ok) {
        const updated = await res.json();
        setSections((prev) =>
          prev.map((s) => (s.id === updated.id ? updated : s))
        );
      }
    } catch (error) {
      console.error("Error toggling visibility:", error);
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
            className="flex items-center space-x-3 rounded-lg px-3 py-2 text-gray-700 hover:bg-gray-100"
          >
            <Palette className="h-5 w-5" />
            <span>Branding</span>
          </Link>
          <Link
            href={`/${companySlug}/edit/sections`}
            className="flex items-center space-x-3 rounded-lg bg-primary px-3 py-2 text-white"
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
              <h1 className="text-2xl font-bold text-gray-900">Content Sections</h1>
              <p className="mt-1 text-gray-600">Add, edit, and reorder your careers page sections</p>
            </div>
            <Button onClick={openCreateModal}>
              <Plus className="mr-2 h-4 w-4" />
              Add Section
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

          
          <div className="space-y-3">
            {sections
              .sort((a, b) => a.order - b.order)
              .map((section) => (
                <Card
                  key={section.id}
                  className={`${!section.isVisible ? "opacity-60" : ""}`}
                >
                  <CardContent className="flex items-center justify-between p-4">
                    <div className="flex items-center space-x-4">
                      <div className="cursor-grab text-gray-400 hover:text-gray-600">
                        <GripVertical className="h-5 w-5" />
                      </div>
                      <div>
                        <h4 className="font-medium">{section.title}</h4>
                        <p className="text-sm text-gray-500">
                          {section.type.replace(/_/g, " ")}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleToggleVisibility(section)}
                        title={section.isVisible ? "Hide section" : "Show section"}
                      >
                        {section.isVisible ? (
                          <EyeIcon className="h-4 w-4" />
                        ) : (
                          <EyeOff className="h-4 w-4" />
                        )}
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => openEditModal(section)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDeleteSection(section.id)}
                        className="text-red-500 hover:text-red-600 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}

            {sections.length === 0 && (
              <div className="rounded-lg border-2 border-dashed border-gray-300 p-8 text-center">
                <p className="text-gray-500">No sections yet. Add your first section!</p>
              </div>
            )}
          </div>
        </div>
      </main>

    
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>
              {editingSection ? "Edit Section" : "Add New Section"}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="modal-title">Section Title *</Label>
              <Input
                id="modal-title"
                value={modalData.title}
                onChange={(e) =>
                  setModalData((prev) => ({ ...prev, title: e.target.value }))
                }
                placeholder="Enter section title"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="modal-content">Content</Label>
              <Textarea
                id="modal-content"
                value={modalData.content}
                onChange={(e) =>
                  setModalData((prev) => ({ ...prev, content: e.target.value }))
                }
                placeholder="Write your content here..."
                rows={8}
              />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="modal-visible">Visible on Careers Page</Label>
              <Switch
                id="modal-visible"
                checked={modalData.isVisible}
                onCheckedChange={(checked) =>
                  setModalData((prev) => ({ ...prev, isVisible: checked }))
                }
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveSection} disabled={isSaving}>
              {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {editingSection ? "Save Changes" : "Add Section"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}