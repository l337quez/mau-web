import {
  Folder,
  FileText,
  Settings,
  Lock,
  Search,
  LayoutDashboard,
  Calendar,
  CheckSquare
} from 'lucide-react';
import logoUrl from '../assets/images/app/new_mau.png';

export const Sidebar = () => {
  return (
    <aside className="w-64 bg-background border-r border-border h-full flex flex-col">
      {/* Logo */}
      <div className="p-6 flex items-center gap-3">
        <img src={logoUrl} alt="Mau Logo" className="w-8 h-8 object-contain" />
        <span className="font-bold text-xl tracking-tight">Mau</span>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-2 flex flex-col gap-6">

        {/* Workspace Section */}
        <div>
          <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 px-2">
            Workspace
          </h3>
          <ul className="space-y-1">
            <li>
              <a href="#" className="flex items-center gap-3 px-2 py-2 rounded-md hover:bg-muted text-sm font-medium text-foreground transition-colors">
                <Folder className="w-4 h-4 text-orange-500" />
                Projects
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center gap-3 px-2 py-2 rounded-md hover:bg-muted text-sm font-medium text-foreground transition-colors">
                <FileText className="w-4 h-4 text-orange-500" />
                Documents
              </a>
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

        {/* Current Project Section */}
        <div>
          <h3 className="text-xs font-semibold text-foreground mb-3 px-2">
            gnu mau Web Design
          </h3>
          <ul className="space-y-1">
            <li>
              <a href="#" className="flex items-center gap-3 px-2 py-2 rounded-md bg-orange-100 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400 text-sm font-medium transition-colors">
                <LayoutDashboard className="w-4 h-4" />
                Board
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center gap-3 px-2 py-2 rounded-md hover:bg-muted text-sm font-medium text-foreground transition-colors">
                <Calendar className="w-4 h-4 text-orange-500" />
                Calendar
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center gap-3 px-2 py-2 rounded-md hover:bg-muted text-sm font-medium text-foreground transition-colors">
                <CheckSquare className="w-4 h-4 text-orange-500" />
                Tasks
              </a>
            </li>
          </ul>
        </div>

      </div>
    </aside>
  );
};
