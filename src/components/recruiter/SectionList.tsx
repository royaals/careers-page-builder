
"use client";

import { useState } from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "@hello-pangea/dnd";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { GripVertical, Edit, Trash2, Plus, Eye, EyeOff } from "lucide-react";
import { Section } from "@/types";
import SectionEditor from "./SectionEditor";

interface SectionListProps {
  sections: Section[];
  onReorder: (sections: { id: string; order: number }[]) => void;
  onUpdate: (section: Partial<Section>) => void;
  onDelete: (sectionId: string) => void;
  onCreate: (section: Partial<Section>) => void;
}

export default function SectionList({
  sections,
  onReorder,
  onUpdate,
  onDelete,
  onCreate,
}: SectionListProps) {
  const [editingSection, setEditingSection] = useState<Section | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const items = Array.from(sections);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    const reorderedSections = items.map((item, index) => ({
      id: item.id,
      order: index,
    }));

    onReorder(reorderedSections);
  };

  const handleToggleVisibility = (section: Section) => {
    onUpdate({ ...section, isVisible: !section.isVisible });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Content Sections</h3>
        <Button onClick={() => setIsCreating(true)} size="sm">
          <Plus className="mr-2 h-4 w-4" />
          Add Section
        </Button>
      </div>

      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="sections">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="space-y-2"
            >
              {sections
                .sort((a, b) => a.order - b.order)
                .map((section, index) => (
                  <Draggable
                    key={section.id}
                    draggableId={section.id}
                    index={index}
                  >
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        className={`${
                          snapshot.isDragging ? "shadow-lg" : ""
                        }`}
                      >
                        <Card
                          className={`${
                            !section.isVisible ? "opacity-60" : ""
                          }`}
                        >
                          <CardContent className="flex items-center justify-between p-4">
                            <div className="flex items-center space-x-4">
                              <div
                                {...provided.dragHandleProps}
                                className="cursor-grab text-gray-400 hover:text-gray-600"
                              >
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
                                onClick={() =>
                                  handleToggleVisibility(section)
                                }
                                title={
                                  
                                  section.isVisible ? "Hide section" : "Show section"
                                }
                              >
                                {section.isVisible ? (
                                  <Eye className="h-4 w-4" />
                                ) : (
                                  <EyeOff className="h-4 w-4" />
                                )}
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => setEditingSection(section)}
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => onDelete(section.id)}
                                className="text-red-500 hover:text-red-600"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    )}
                  </Draggable>
                ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

      {sections.length === 0 && (
        <div className="rounded-lg border-2 border-dashed border-gray-300 p-8 text-center">
          <p className="text-gray-500">No sections yet. Add your first section!</p>
        </div>
      )}

    
      {editingSection && (
        <SectionEditor
          section={editingSection}
          isOpen={!!editingSection}
          onClose={() => setEditingSection(null)}
          onSave={(data) => {
            onUpdate(data);
            setEditingSection(null);
          }}
          mode="edit"
        />
      )}

    
      <SectionEditor
        isOpen={isCreating}
        onClose={() => setIsCreating(false)}
        onSave={(data) => {
          onCreate(data);
          setIsCreating(false);
        }}
        mode="create"
      />
    </div>
  );
}