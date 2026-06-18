import { Search, Bell, Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useProject } from '../context/ProjectContext';
import { useLocation } from 'react-router-dom';

export const Topbar = () => {
  const { theme, setTheme } = useTheme();
  const { currentProject } = useProject();
  const location = useLocation();

  const getViewTitle = () => {
    if (location.pathname === '/board') return 'Tasks board view';
    if (location.pathname === '/info') return 'Information view';
    if (location.pathname === '/projects') return 'Projects overview';
    if (location.pathname === '/notes') return 'Personal Notes';
    return '';
  };

  return (
    <header className="h-20 border-b border-border bg-background flex items-center justify-between px-8">
      <div className="flex flex-col">
        <h2 className="text-xl font-bold text-foreground line-clamp-1">{currentProject?.name || 'Loading...'}</h2>
        <span className="text-sm text-muted-foreground">{getViewTitle()}</span>
      </div>

      <div className="flex items-center gap-6">
        <button className="text-muted-foreground hover:text-foreground transition-colors">
          <Search className="w-5 h-5" />
        </button>

        <button className="text-muted-foreground hover:text-foreground transition-colors relative">
          <Bell className="w-5 h-5" />
          <span className="absolute top-0 right-0 w-2 h-2 bg-orange-500 rounded-full border border-background"></span>
        </button>

        <button
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          className="text-muted-foreground hover:text-foreground transition-colors"
        >
          {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>

        <div className="w-9 h-9 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center font-semibold text-sm text-foreground cursor-pointer">
          GM
        </div>
      </div>
    </header>
  );
};
