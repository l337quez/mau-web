import { useState, useEffect } from 'react';
import { useProject } from '../../context/ProjectContext';
import { Copy, ExternalLink, Lock, Terminal, Globe, FileText, Plus } from 'lucide-react';

export type InformationItem = {
  id: string;
  title: string;
  content: string;
  category: string;
  action: string | null;
  project_id: string;
  encrypted: boolean;
};

export const InformationView = () => {
  const { currentProject } = useProject();
  const [infoItems, setInfoItems] = useState<InformationItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!currentProject) return;

    const fetchInformation = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`http://localhost:9000/api/information/project/${currentProject.id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch information');
        }
        const data = await response.json();
        setInfoItems(data);
      } catch (err: any) {
        setError(err.message || 'Error fetching information');
      } finally {
        setLoading(false);
      }
    };

    fetchInformation();
  }, [currentProject]);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    // Podríamos añadir un toast/notificación aquí
  };

  const getCategoryIcon = (category: string) => {
    const cat = category.toLowerCase();
    if (cat.includes('url') || cat.includes('web') || cat.includes('link')) return <Globe className="w-5 h-5" />;
    if (cat.includes('terminal') || cat.includes('cmd') || cat.includes('bash')) return <Terminal className="w-5 h-5" />;
    if (cat.includes('cred') || cat.includes('pass') || cat.includes('key')) return <Lock className="w-5 h-5" />;
    return <FileText className="w-5 h-5" />;
  };

  if (!currentProject) {
    return <div className="flex-1 flex items-center justify-center">Please select a project first.</div>;
  }

  return (
    <div className="h-full flex flex-col max-w-6xl mx-auto w-full">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Information</h1>
          <p className="text-muted-foreground mt-1">Manage credentials, URLs, and commands for {currentProject.name}</p>
        </div>
        <button className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg font-medium transition-colors">
          <Plus className="w-4 h-4" />
          Add Info
        </button>
      </div>

      {loading ? (
        <div className="py-12 text-center text-muted-foreground">Loading information...</div>
      ) : error ? (
        <div className="py-12 text-center text-red-500">{error}</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {infoItems.map((item) => (
            <div key={item.id} className="bg-card border border-border rounded-xl p-5 hover:border-orange-500 hover:shadow-md transition-all flex flex-col h-48 group">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-orange-100 dark:bg-orange-500/20 text-orange-600 flex items-center justify-center">
                    {getCategoryIcon(item.category)}
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground line-clamp-1" title={item.title}>{item.title}</h3>
                    <span className="text-xs font-medium bg-slate-100 dark:bg-slate-800 text-muted-foreground px-2 py-0.5 rounded-full uppercase tracking-wider">
                      {item.category || 'General'}
                    </span>
                  </div>
                </div>
                {item.encrypted && (
                  <span title="Encrypted">
                    <Lock className="w-4 h-4 text-orange-500" />
                  </span>
                )}
              </div>

              <div className="flex-1 overflow-y-auto mb-4 bg-slate-50 dark:bg-[#0b0f19] rounded-md p-3 border border-border/50 font-mono text-sm text-foreground break-all">
                {item.encrypted ? '••••••••••••••••' : item.content}
              </div>

              <div className="flex items-center gap-2 mt-auto">
                <button 
                  onClick={() => handleCopy(item.content)}
                  className="flex-1 flex items-center justify-center gap-2 py-1.5 px-3 rounded-md bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-foreground transition-colors text-sm font-medium"
                >
                  <Copy className="w-4 h-4" />
                  Copy
                </button>
                {item.action === 'browser' && (
                  <a 
                    href={item.content.startsWith('http') ? item.content : `https://${item.content}`}
                    target="_blank" 
                    rel="noreferrer"
                    className="flex items-center justify-center py-1.5 px-3 rounded-md bg-blue-100 dark:bg-blue-900/30 hover:bg-blue-200 dark:hover:bg-blue-900/50 text-blue-600 dark:text-blue-400 transition-colors"
                    title="Open in Browser"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}
              </div>
            </div>
          ))}

          {infoItems.length === 0 && (
            <div className="col-span-full py-12 text-center border-2 border-dashed border-border rounded-xl text-muted-foreground">
              No information items found for this project.
            </div>
          )}
        </div>
      )}
    </div>
  );
};
