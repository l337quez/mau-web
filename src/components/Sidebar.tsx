import {
  Folder,
  FileText,
  Settings,
  Search,
  LayoutDashboard,
  Info,
  Lock
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import logoUrl from '../assets/images/app/new_mau.png';
import { useProject } from '../context/ProjectContext';

export const Sidebar = () => {
  const { currentProject } = useProject();
  const location = useLocation();

  return (
    <aside className="w-64 bg-background border-r border-border h-full flex flex-col">
      {/* Logo */}
      <div className="p-6 flex items-center gap-3">
        <img src={logoUrl} alt="Mau Logo" className="w-8 h-8 object-contain" />
        <span className="font-bold text-xl tracking-tight line-clamp-1" title={currentProject?.name || 'Mau'}>
          {currentProject?.name || 'Mau'}
        </span>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-2 flex flex-col gap-6">

        {/* Workspace Section */}
        <div>
          <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 px-2">
            Workspace
          </h3>
          <ul className="space-y-1">
            <li>
              <Link
                to="/projects"
                className={`flex items-center gap-3 px-2 py-2 rounded-md text-sm font-medium transition-colors ${location.pathname === '/projects'
                  ? 'bg-orange-100 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400'
                  : 'text-foreground hover:bg-muted'
                  }`}
              >
                <Folder className={`w-4 h-4 ${location.pathname === '/projects' ? '' : 'text-orange-500'}`} />
                Projects
              </Link>
            </li>
            <li>
              <Link
                to="/board"
                className={`flex items-center justify-between px-2 py-2 rounded-md text-sm font-medium transition-colors ${location.pathname === '/board'
                  ? 'bg-orange-100 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400'
                  : 'text-foreground hover:bg-muted'
                  }`}
              >
                <div className="flex items-center gap-3">
                  <LayoutDashboard className={`w-4 h-4 ${location.pathname === '/board' ? '' : 'text-orange-500'}`} />
                  <span>Tasks board</span>
                </div>
              </Link>
            </li>
            <li>
              <Link
                to="/info"
                className={`flex items-center justify-between px-2 py-2 rounded-md text-sm font-medium transition-colors ${location.pathname === '/info'
                  ? 'bg-orange-100 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400'
                  : 'text-foreground hover:bg-muted'
                  }`}
              >
                <div className="flex items-center gap-3">
                  <Info className={`w-4 h-4 ${location.pathname === '/info' ? '' : 'text-orange-500'}`} />
                  <span>Info</span>
                </div>
              </Link>
            </li>
            <li>
              <Link
                to="/notes"
                className={`flex items-center justify-between px-2 py-2 rounded-md text-sm font-medium transition-colors ${location.pathname === '/notes'
                  ? 'bg-orange-100 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400'
                  : 'text-foreground hover:bg-muted'
                  }`}
              >
                <div className="flex items-center gap-3">
                  <FileText className={`w-4 h-4 ${location.pathname === '/notes' ? '' : 'text-orange-500'}`} />
                  <span>Notes</span>
                </div>
              </Link>
            </li>
            <li>
              <a href="#" className="flex items-center gap-3 px-2 py-2 rounded-md hover:bg-muted text-sm font-medium text-foreground transition-colors">
                <Settings className="w-4 h-4 text-orange-500" />
                Settings
              </a>
            </li>
          </ul>
        </div>

        {/* Private Section */}
        <div>
          <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 px-2">
            Private
          </h3>
          <ul className="space-y-1">
            <li>
              <a href="#" className="flex items-center gap-3 px-2 py-2 rounded-md hover:bg-muted text-sm font-medium text-foreground transition-colors">
                <Lock className="w-4 h-4 text-orange-500" />
                Personal Notes
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center gap-3 px-2 py-2 rounded-md hover:bg-muted text-sm font-medium text-foreground transition-colors">
                <Search className="w-4 h-4 text-orange-500" />
                Research
              </a>
            </li>
          </ul>
        </div>

      </div>
    </aside>
  );
};
