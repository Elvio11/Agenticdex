import { Link } from 'react-router-dom';
import { UserCircle } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { usePermissions } from '../../hooks/usePermissions';

export function TopBar() {
  const { user } = useAuth();
  const { permissionState } = usePermissions();

  if (!user) return null;

  return (
    <header className="h-16 bg-surface border-b border-slate-200 flex items-center justify-between px-4 md:px-8">
      <div className="flex items-center space-x-4 md:hidden">
        <h1 className="text-xl font-bold text-primary">Talvix</h1>
      </div>
      <div className="flex-1 md:flex-none" />
      <div className="flex items-center space-x-4">
        {permissionState && permissionState < 3 && (
          <Link
            to="/settings"
            className="hidden md:inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background bg-primary text-primary-foreground hover:bg-primary/90 h-9 px-4 py-2"
          >
            Upgrade to Paid
          </Link>
        )}
        <div className="flex items-center space-x-2">
          <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 bg-slate-100 text-slate-900 border-transparent">
            {user.subscription_tier === 'paid' ? 'Pro' : 'Free'}
          </span>
          <UserCircle className="w-8 h-8 text-slate-400" />
        </div>
      </div>
    </header>
  );
}
