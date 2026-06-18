import React, { useState, useEffect } from 'react';
import { X, Loader2 } from 'lucide-react';
import type { Project } from '../../../context/ProjectContext';

type ProjectDrawerProps = {
  isOpen: boolean;
  onClose: () => void;
  projectToEdit?: Project | null;
  onSubmit: (data: Partial<Project>) => Promise<void>;
};

export const ProjectDrawer = ({ isOpen, onClose, projectToEdit, onSubmit }: ProjectDrawerProps) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [iconPath, setIconPath] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      if (projectToEdit) {
        setName(projectToEdit.name || '');
        setDescription(projectToEdit.description || '');
        setIconPath(projectToEdit.icon_path || '');
      } else {
        setName('');
        setDescription('');
        setIconPath('');
      }
      setError(null);
    }
  }, [isOpen, projectToEdit]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Project name is required');
      return;
    }

    setIsSubmitting(true);
    setError(null);
    try {
      await onSubmit({
        name,
        description,
        icon_path: iconPath || 'assets/project_images/default_icon.png',
      });
      onClose();
    } catch (err: any) {
      setError(err.message || 'Failed to save project');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="fixed inset-y-0 right-0 w-full max-w-md bg-background border-l border-border shadow-2xl z-50 flex flex-col transform transition-transform duration-300 ease-in-out">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-xl font-bold text-foreground">
            {projectToEdit ? 'Edit Project' : 'New Project'}
          </h2>
          <button 
            onClick={onClose}
            className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          <form id="project-form" onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="p-3 bg-red-100 dark:bg-red-900/30 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 rounded-lg text-sm">
                {error}
              </div>
            )}

            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium text-foreground">
                Project Name <span className="text-red-500">*</span>
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g., gnu mau Web Design"
                className="w-full px-3 py-2 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-orange-500 transition-shadow"
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="description" className="text-sm font-medium text-foreground">
                Description
              </label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="A brief description of this project..."
                rows={4}
                className="w-full px-3 py-2 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-orange-500 transition-shadow resize-none"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="iconPath" className="text-sm font-medium text-foreground">
                Icon Path (Optional)
              </label>
              <input
                id="iconPath"
                type="text"
                value={iconPath}
                onChange={(e) => setIconPath(e.target.value)}
                placeholder="e.g., assets/project_images/default_icon.png"
                className="w-full px-3 py-2 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-orange-500 transition-shadow"
              />
            </div>
          </form>
        </div>

        <div className="p-6 border-t border-border bg-slate-50 dark:bg-slate-900 flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-foreground bg-background border border-border rounded-lg hover:bg-muted transition-colors"
            disabled={isSubmitting}
          >
            Cancel
          </button>
          <button
            type="submit"
            form="project-form"
            disabled={isSubmitting}
            className="flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-white bg-orange-500 hover:bg-orange-600 rounded-lg transition-colors min-w-[100px]"
          >
            {isSubmitting ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              projectToEdit ? 'Save Changes' : 'Create Project'
            )}
          </button>
        </div>
      </div>
    </>
  );
};
