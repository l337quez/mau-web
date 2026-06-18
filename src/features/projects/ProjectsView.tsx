import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProject, type Project } from '../../context/ProjectContext';
import { Folder, Edit2 } from 'lucide-react';
import { ProjectDrawer } from './components/ProjectDrawer';

export const ProjectsView = () => {
  const { projects, setCurrentProject, createProject, updateProject, loading, error } = useProject();
  const navigate = useNavigate();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [projectToEdit, setProjectToEdit] = useState<Project | null>(null);

  const handleSelectProject = (project: Project) => {
    setCurrentProject(project);
    navigate('/board');
  };

  const handleOpenCreateDrawer = () => {
    setProjectToEdit(null);
    setIsDrawerOpen(true);
  };

  const handleOpenEditDrawer = (e: React.MouseEvent, project: Project) => {
    e.stopPropagation();
    setProjectToEdit(project);
    setIsDrawerOpen(true);
  };

  const handleDrawerSubmit = async (data: Partial<Project>) => {
    if (projectToEdit) {
      await updateProject(projectToEdit.id, data);
    } else {
      await createProject(data);
    }
  };

  if (loading) {
    return <div className="h-full flex items-center justify-center">Loading projects...</div>;
  }

  if (error) {
    return <div className="h-full flex items-center justify-center text-red-500">Error: {error}</div>;
  }

  return (
    <div className="h-full flex flex-col max-w-6xl mx-auto w-full">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-foreground">Projects</h1>
        <button 
          onClick={handleOpenCreateDrawer}
          className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg font-medium transition-colors"
        >
          New Project
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {projects.map((project) => (
          <div
            key={project.id}
            onClick={() => handleSelectProject(project)}
            className="bg-card border border-border rounded-xl p-5 hover:border-orange-500 hover:shadow-md transition-all cursor-pointer group flex flex-col h-48"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 rounded-lg bg-orange-100 dark:bg-orange-500/20 text-orange-600 flex items-center justify-center">
                <Folder className="w-6 h-6" />
              </div>
              <div className="relative group/menu">
                <button 
                  onClick={(e) => handleOpenEditDrawer(e, project)}
                  className="text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md hover:text-orange-500 flex items-center gap-2"
                  title="Edit Project"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
              </div>
            </div>
            
            <h3 className="font-semibold text-lg text-foreground mb-2 line-clamp-1">
              {project.name}
            </h3>
            
            <p className="text-muted-foreground text-sm line-clamp-2 flex-1">
              {project.description || "No description provided."}
            </p>
          </div>
        ))}

        {projects.length === 0 && (
          <div className="col-span-full py-12 text-center border-2 border-dashed border-border rounded-xl text-muted-foreground">
            No projects found. Create one to get started!
          </div>
        )}
      </div>

      <ProjectDrawer 
        isOpen={isDrawerOpen} 
        onClose={() => setIsDrawerOpen(false)} 
        projectToEdit={projectToEdit}
        onSubmit={handleDrawerSubmit}
      />
    </div>
  );
};
