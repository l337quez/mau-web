import { useState, useEffect } from 'react';
import { useProject } from '../../context/ProjectContext';
import { Plus, Star, Edit2, FileText, Lock } from 'lucide-react';
import { NoteDrawer, type Note } from './components/NoteDrawer';

export const NotesView = () => {
  const { currentProject } = useProject();
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [noteToEdit, setNoteToEdit] = useState<Note | null>(null);

  const fetchNotes = async () => {
    if (!currentProject) return;
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`http://localhost:9000/api/projects/${currentProject.id}/notes`);
      if (!response.ok) throw new Error('Failed to fetch notes');
      const data = await response.json();
      setNotes(data);
    } catch (err: any) {
      setError(err.message || 'Error fetching notes');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, [currentProject]);

  const handleOpenCreateDrawer = () => {
    setNoteToEdit(null);
    setIsDrawerOpen(true);
  };

  const handleOpenEditDrawer = (note: Note) => {
    setNoteToEdit(note);
    setIsDrawerOpen(true);
  };

  const handleDrawerSubmit = async (data: Partial<Note>) => {
    if (!currentProject) return;
    
    const isEditing = !!noteToEdit?.filename;
    const url = isEditing 
      ? `http://localhost:9000/api/projects/${currentProject.id}/notes/${noteToEdit.filename}`
      : `http://localhost:9000/api/projects/${currentProject.id}/notes`;
      
    const method = isEditing ? 'PUT' : 'POST';

    const response = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errData = await response.json().catch(() => ({}));
      throw new Error(errData.detail || `Failed to ${isEditing ? 'update' : 'create'} note`);
    }

    // Refresh the list after successful submit
    await fetchNotes();
  };

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'todo': return 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400';
      case 'pending': return 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400';
      case 'done': return 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400';
      case 'expired': return 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400';
      default: return 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400'; // draft
    }
  };

  if (!currentProject) {
    return <div className="flex-1 flex items-center justify-center">Please select a project first.</div>;
  }

  return (
    <div className="h-full flex flex-col max-w-6xl mx-auto w-full">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Personal Notes</h1>
          <p className="text-muted-foreground mt-1">Manage notes for {currentProject.name}</p>
        </div>
        <button 
          onClick={handleOpenCreateDrawer}
          className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg font-medium transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Note
        </button>
      </div>

      {loading ? (
        <div className="py-12 text-center text-muted-foreground">Loading notes...</div>
      ) : error ? (
        <div className="py-12 text-center text-red-500">{error}</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {notes.map((note) => (
            <div key={note.filename} className="bg-card border border-border rounded-xl p-5 hover:border-orange-500 hover:shadow-md transition-all flex flex-col h-64 group relative">
              {note.favorite && (
                <div className="absolute -top-2 -right-2 bg-yellow-400 text-yellow-900 p-1.5 rounded-full shadow-sm">
                  <Star className="w-4 h-4 fill-current" />
                </div>
              )}
              
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-orange-100 dark:bg-orange-500/20 text-orange-600 flex items-center justify-center">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground line-clamp-1 pr-4" title={note.title}>{note.title}</h3>
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full uppercase tracking-wider ${getStatusColor(note.status)}`}>
                      {note.status}
                    </span>
                  </div>
                </div>
                <button 
                  onClick={() => handleOpenEditDrawer(note)}
                  className="text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md hover:text-orange-500 flex items-center gap-2"
                  title="Edit Note"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto mb-4 bg-slate-50 dark:bg-[#0b0f19] rounded-md p-4 text-sm text-foreground whitespace-pre-wrap">
                {note.encrypted ? (
                  <div className="flex items-center justify-center h-full text-muted-foreground gap-2">
                    <Lock className="w-5 h-5" />
                    <span>Encrypted Content</span>
                  </div>
                ) : (
                  note.content
                )}
              </div>

              {note.last_modified && (
                <div className="text-xs text-muted-foreground mt-auto">
                  Last modified: {new Date(note.last_modified * 1000).toLocaleString()}
                </div>
              )}
            </div>
          ))}

          {notes.length === 0 && (
            <div className="col-span-full py-12 text-center border-2 border-dashed border-border rounded-xl text-muted-foreground">
              No notes found for this project.
            </div>
          )}
        </div>
      )}

      <NoteDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        noteToEdit={noteToEdit}
        onSubmit={handleDrawerSubmit}
      />
    </div>
  );
};
