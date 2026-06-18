import React, { useState, useEffect } from 'react';
import { X, Loader2 } from 'lucide-react';

export type Note = {
  title: string;
  content: string;
  favorite: boolean;
  encrypted: boolean;
  status: 'draft' | 'todo' | 'pending' | 'done' | 'expired';
  filename?: string;
  path?: string;
  last_modified?: number;
};

type NoteDrawerProps = {
  isOpen: boolean;
  onClose: () => void;
  noteToEdit?: Note | null;
  onSubmit: (data: Partial<Note>) => Promise<void>;
};

export const NoteDrawer = ({ isOpen, onClose, noteToEdit, onSubmit }: NoteDrawerProps) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [favorite, setFavorite] = useState(false);
  const [encrypted, setEncrypted] = useState(false);
  const [status, setStatus] = useState<'draft' | 'todo' | 'pending' | 'done' | 'expired'>('draft');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      if (noteToEdit) {
        setTitle(noteToEdit.title || '');
        setContent(noteToEdit.content || '');
        setFavorite(noteToEdit.favorite || false);
        setEncrypted(noteToEdit.encrypted || false);
        setStatus(noteToEdit.status || 'draft');
      } else {
        setTitle('');
        setContent('');
        setFavorite(false);
        setEncrypted(false);
        setStatus('draft');
      }
      setError(null);
    }
  }, [isOpen, noteToEdit]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setError('Title is required');
      return;
    }
    if (!content.trim()) {
      setError('Content is required');
      return;
    }

    setIsSubmitting(true);
    setError(null);
    try {
      await onSubmit({
        title,
        content,
        favorite,
        encrypted,
        status,
      });
      onClose();
    } catch (err: any) {
      setError(err.message || 'Failed to save note');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 w-full max-w-lg bg-background border-l border-border shadow-2xl z-50 flex flex-col transform transition-transform duration-300 ease-in-out">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-xl font-bold text-foreground">
            {noteToEdit ? 'Edit Note' : 'New Note'}
          </h2>
          <button 
            onClick={onClose}
            className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          <form id="note-form" onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="p-3 bg-red-100 dark:bg-red-900/30 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 rounded-lg text-sm">
                {error}
              </div>
            )}

            <div className="space-y-2">
              <label htmlFor="title" className="text-sm font-medium text-foreground">
                Title <span className="text-red-500">*</span>
              </label>
              <input
                id="title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Note title"
                className="w-full px-3 py-2 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-orange-500 transition-shadow"
                required
              />
            </div>

            <div className="space-y-2 flex-1 flex flex-col">
              <label htmlFor="content" className="text-sm font-medium text-foreground">
                Content <span className="text-red-500">*</span>
              </label>
              <textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Write your note here... Markdown is supported if implemented."
                rows={10}
                className="w-full px-3 py-2 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-orange-500 transition-shadow resize-y min-h-[200px]"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="status" className="text-sm font-medium text-foreground">
                  Status
                </label>
                <select
                  id="status"
                  value={status}
                  onChange={(e) => setStatus(e.target.value as any)}
                  className="w-full px-3 py-2 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-orange-500 transition-shadow"
                >
                  <option value="draft">Draft</option>
                  <option value="todo">Todo</option>
                  <option value="pending">Pending</option>
                  <option value="done">Done</option>
                  <option value="expired">Expired</option>
                </select>
              </div>
            </div>

            <div className="flex gap-6">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={favorite}
                  onChange={(e) => setFavorite(e.target.checked)}
                  className="w-4 h-4 text-orange-500 rounded border-border focus:ring-orange-500 focus:ring-offset-background bg-background"
                />
                <span className="text-sm font-medium text-foreground">Favorite</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={encrypted}
                  onChange={(e) => setEncrypted(e.target.checked)}
                  className="w-4 h-4 text-orange-500 rounded border-border focus:ring-orange-500 focus:ring-offset-background bg-background"
                />
                <span className="text-sm font-medium text-foreground">Encrypted</span>
              </label>
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
            form="note-form"
            disabled={isSubmitting}
            className="flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-white bg-orange-500 hover:bg-orange-600 rounded-lg transition-colors min-w-[100px]"
          >
            {isSubmitting ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              noteToEdit ? 'Save Changes' : 'Create Note'
            )}
          </button>
        </div>
      </div>
    </>
  );
};
