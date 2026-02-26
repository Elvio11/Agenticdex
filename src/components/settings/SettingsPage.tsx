import { useAuth } from '../../hooks/useAuth';
import { ApplyPreferences } from './ApplyPreferences';
import { BlacklistManager } from './BlacklistManager';
import { DreamCompanies } from './DreamCompanies';
import { Settings as SettingsIcon } from 'lucide-react';

export function SettingsPage() {
  const { user } = useAuth();

  return (
    <div className="max-w-4xl mx-auto pb-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 flex items-center">
          <SettingsIcon className="w-8 h-8 mr-3 text-slate-400" /> Settings
        </h1>
        <p className="text-slate-500 mt-2">Manage your career preferences, auto-apply settings, and company targeting.</p>
      </div>

      <div className="space-y-8">
        {/* Profile Summary */}
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <h2 className="text-xl font-bold text-slate-900 mb-4 border-b border-slate-100 pb-2">Profile Status</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="text-sm font-medium text-slate-500 mb-1">Subscription Tier</p>
              <div className="flex items-center">
                <span className={`inline-flex px-2.5 py-0.5 rounded-full text-sm font-semibold border ${user?.subscription_tier === 'paid' ? 'bg-primary/10 text-primary border-primary/20' : 'bg-slate-100 text-slate-700 border-slate-200'}`}>
                  {user?.subscription_tier === 'paid' ? 'Talvix Pro' : 'Free Plan'}
                </span>
                {user?.subscription_tier === 'free' && (
                  <button className="ml-3 text-sm text-primary font-medium hover:underline">Upgrade</button>
                )}
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500 mb-1">WhatsApp Coaching</p>
              <div className="flex items-center">
                <span className={`inline-flex px-2.5 py-0.5 rounded-full text-sm font-semibold border ${user?.wa_connected ? 'bg-green-100 text-green-700 border-green-200' : 'bg-slate-100 text-slate-700 border-slate-200'}`}>
                  {user?.wa_connected ? 'Connected' : 'Not Connected'}
                </span>
              </div>
            </div>
          </div>
        </div>

        <ApplyPreferences />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <DreamCompanies />
          <BlacklistManager />
        </div>
      </div>
    </div>
  );
}
