import { Search, Bell, Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export const Topbar = () => {
  const { theme, setTheme } = useTheme();

  return (
    <header className="h-20 border-b border-border bg-background flex items-center justify-between px-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">gnu mau Web Design</h1>
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
