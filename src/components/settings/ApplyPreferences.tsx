import { useState } from 'react';
import { usePermissions } from '../../hooks/usePermissions';
import { UpgradeCTA } from '../upgrade/UpgradeCTA';
import { Bot, Save } from 'lucide-react';


export function ApplyPreferences() {
  const { canAutoApply } = usePermissions();
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [autoApplyEnabled, setAutoApplyEnabled] = useState(false);

  // In a real implementation, we would query `users` table or `user_preferences` table for these.
  const [roles, setRoles] = useState('Software Engineer, Backend Developer');
  const [locations, setLocations] = useState('Bangalore, Remote');
  const [minSalary, setMinSalary] = useState(12);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSuccess(false);
    try {
      // Mock API call
      await new Promise(r => setTimeout(r, 600));
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-6">
      <h2 className="text-xl font-bold text-slate-900 mb-6 border-b border-slate-100 pb-2">Apply Preferences</h2>

      <form onSubmit={handleSave} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Target Roles</label>
            <input
              type="text"
              className="w-full border border-slate-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary focus:border-primary outline-none"
              value={roles}
              onChange={e => setRoles(e.target.value)}
              placeholder="e.g. Product Manager, Data Scientist"
            />
            <p className="text-xs text-slate-500 mt-1">Comma separated</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Target Locations</label>
            <input
              type="text"
              className="w-full border border-slate-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary focus:border-primary outline-none"
              value={locations}
              onChange={e => setLocations(e.target.value)}
              placeholder="e.g. Bangalore, Mumbai, Remote"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Minimum Salary Expectation (LPA)</label>
          <div className="flex items-center">
            <input
              type="range"
              min="0" max="100" step="1"
              value={minSalary}
              onChange={(e) => setMinSalary(parseInt(e.target.value))}
              className="w-full mr-4 accent-primary"
            />
            <span className="font-semibold text-slate-900 w-16 text-right">₹{minSalary}L</span>
          </div>
        </div>

        <div className="pt-4 border-t border-slate-100 relative">
          <div className={`flex items-center justify-between p-4 rounded-xl border ${autoApplyEnabled ? 'bg-primary/5 border-primary/30' : 'bg-slate-50 border-slate-200'} ${!canAutoApply ? 'blur-[2px] pointer-events-none select-none' : ''}`}>
            <div>
              <h4 className="font-bold text-slate-900 flex items-center"><Bot className="w-5 h-5 mr-2 text-primary" /> Auto-Apply to Tier 1 Jobs</h4>
              <p className="text-sm text-slate-500 mt-1 max-w-lg">When enabled, Talvix will automatically tailor your resume, write a cover letter, and submit applications to high-fit Indeed and LinkedIn Easy Apply jobs every night.</p>
            </div>

            <label className="relative inline-flex items-center cursor-pointer ml-4">
              <input type="checkbox" className="sr-only peer" checked={autoApplyEnabled} onChange={() => setAutoApplyEnabled(!autoApplyEnabled)} disabled={!canAutoApply} />
              <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
            </label>
          </div>

          {!canAutoApply && (
            <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 px-12">
              <UpgradeCTA />
            </div>
          )}
        </div>

        <div className="flex justify-end pt-4 border-t border-slate-100">
          {success && <span className="text-green-600 font-medium mr-4 flex items-center">Saved successfully!</span>}
          <button
            type="submit"
            disabled={saving}
            className="flex items-center bg-slate-900 hover:bg-slate-800 text-white px-6 py-2 rounded-lg font-medium transition-colors disabled:opacity-50"
          >
            <Save className="w-4 h-4 mr-2" />
            {saving ? 'Saving...' : 'Save Preferences'}
          </button>
        </div>
      </form>
    </div>
  );
}
