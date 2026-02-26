import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Briefcase, FileText, Target, Settings, Lock } from 'lucide-react';
import { usePermissions } from '../../hooks/usePermissions';
import { cn } from '../../lib/utils';

export function BottomTabBar() {
  const location = useLocation();
  const { permissionState } = usePermissions();

  const navItems = [
    { name: 'Home', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Jobs', path: '/jobs', icon: Briefcase },
    { name: 'Applied', path: '/applications', icon: FileText, locked: (permissionState || 1) < 3 },
    { name: 'Skills', path: '/skill-gap', icon: Target },
    { name: 'Settings', path: '/settings', icon: Settings },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-surface border-t border-slate-200 pb-safe">
      <div className="flex items-center justify-around h-16 px-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.name}
              to={item.path}
              className={cn(
                "flex flex-col items-center justify-center w-16 h-11 min-w-[44px] space-y-1 transition-colors relative",
                isActive ? "text-primary" : "text-slate-500 hover:text-slate-900"
              )}
            >
              <Icon className="w-5 h-5" />
              <span className="text-[10px] font-medium">{item.name}</span>
              {item.locked && (
                <div className="absolute top-0 right-2 w-3 h-3 bg-slate-100 rounded-full flex flex-col items-center justify-center">
                  <Lock className="w-2 h-2 text-slate-400" />
                </div>
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
