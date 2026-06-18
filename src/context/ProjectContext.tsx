import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';

export type InfoItem = {
  value: string;
  action?: string;
  category?: string;
  encrypted?: boolean;
};

export type Project = {
  id: string;
  name: string;
  description: string;
  icon_path: string;
  info: Record<string, InfoItem>;
};

type ProjectContextType = {
  projects: Project[];
  currentProject: Project | null;
  setCurrentProject: (project: Project) => void;
  createProject: (projectData: Partial<Project>) => Promise<Project>;
  updateProject: (id: string, projectData: Partial<Project>) => Promise<Project>;
  loading: boolean;
  error: string | null;
};

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

export const ProjectProvider = ({ children }: { children: ReactNode }) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [currentProject, setCurrentProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch('http://localhost:9000/api/projects/');
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        const data = await response.json();
        setProjects(data);
        
        // Auto-select the first project if none is selected and data exists
        if (data.length > 0 && !currentProject) {
          setCurrentProject(data[0]);
        }
      } catch (err: any) {
        setError(err.message || 'Error fetching projects');
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const createProject = async (projectData: Partial<Project>): Promise<Project> => {
    const response = await fetch('http://localhost:9000/api/projects/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(projectData),
    });
    if (!response.ok) {
      throw new Error('Failed to create project');
    }
    const newProject = await response.json();
    setProjects(prev => [...prev, newProject]);
    return newProject;
  };

  const updateProject = async (id: string, projectData: Partial<Project>): Promise<Project> => {
    const response = await fetch(`http://localhost:9000/api/projects/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(projectData),
    });
    if (!response.ok) {
      throw new Error('Failed to update project');
    }
    const updatedProject = await response.json();
    setProjects(prev => prev.map(p => (p.id === id ? updatedProject : p)));
    if (currentProject?.id === id) {
      setCurrentProject(updatedProject);
    }
    return updatedProject;
  };

  return (
    <ProjectContext.Provider value={{ 
      projects, currentProject, setCurrentProject, createProject, updateProject, loading, error 
    }}>
      {children}
    </ProjectContext.Provider>
  );
};

export const useProject = () => {
  const context = useContext(ProjectContext);
  if (context === undefined) {
    throw new Error('useProject must be used within a ProjectProvider');
  }
  return context;
};
