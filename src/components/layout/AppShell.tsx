import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { TopBar } from './TopBar';
import { BottomTabBar } from './BottomTabBar';

export function AppShell() {
  return (
    <div className="min-h-screen flex bg-surface-muted text-slate-900">
      {/* Desktop Sidebar */}
      <div className="hidden md:flex">
        <Sidebar />
      </div>

      <div className="flex-1 flex flex-col min-w-0">
        <TopBar />
        <main className="flex-1 overflow-auto p-4 md:p-8 pb-24 md:pb-8">
          <Outlet />
        </main>
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="md:hidden">
        <BottomTabBar />
      </div>
    </div>
  );
}
