import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Briefcase, FileText, Target, Settings, Lock } from 'lucide-react';
import { usePermissions } from '../../hooks/usePermissions';
import { cn } from '../../lib/utils';

export function Sidebar() {
  const location = useLocation();
  const { permissionState } = usePermissions();

  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Jobs', path: '/jobs', icon: Briefcase },
    { name: 'Applications', path: '/applications', icon: FileText, locked: (permissionState || 1) < 3 },
    { name: 'Skill Gap', path: '/skill-gap', icon: Target },
    { name: 'Settings', path: '/settings', icon: Settings },
  ];

  return (
    <aside className="w-64 bg-surface border-r border-slate-200 flex flex-col items-stretch h-full">
      <div className="p-6">
        <h1 className="text-2xl font-bold text-primary">Talvix</h1>
      </div>
      <nav className="flex-1 px-4 space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.name}
              to={item.path}
              className={cn(
                "flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                isActive ? "bg-primary/10 text-primary" : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              )}
            >
              <Icon className="w-5 h-5" />
              <span className="flex-1">{item.name}</span>
              {item.locked && <Lock className="w-4 h-4 text-slate-400" />}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
