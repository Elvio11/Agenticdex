import { useApplications } from '../../hooks/useJobs';
import { ApplicationRow } from './ApplicationRow';
import { usePermissions } from '../../hooks/usePermissions';
import { UpgradeCTA } from '../upgrade/UpgradeCTA';
import { Target } from 'lucide-react';

export function ApplicationTracker() {
  const { data: applications, isLoading } = useApplications();
  const { canViewApplications } = usePermissions();

  if (isLoading) {
    return (
      <div className="max-w-6xl mx-auto flex justify-center py-24">
        <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const applicationsCount = applications?.length || 0;

  return (
    <div className="max-w-6xl mx-auto relative min-h-[500px]">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Applications</h1>
        <p className="text-slate-500 mt-2">Track your auto and manual job applications in real time.</p>
      </div>

      <div className={`space-y-4 ${!canViewApplications ? 'blur-sm pointer-events-none select-none overflow-hidden h-96 relative' : ''}`}>

        {applicationsCount > 0 ? (
          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200">
                    <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Role & Company</th>
                    <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Date Applied</th>
                    <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Method</th>
                    <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {applications?.map((app: any) => (
                    <ApplicationRow key={app.job_id} app={app} />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-xl border border-slate-200 p-12 flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mb-4">
              <Target className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">No applications yet</h3>
            <p className="text-slate-500 max-w-sm">When you or our AI applies to a job, it will show up here automatically.</p>
          </div>
        )}

      </div>

      {!canViewApplications && (
        <div className="absolute inset-0 top-32 flex items-center justify-center z-10">
          <div className="w-full max-w-sm">
            <UpgradeCTA />
          </div>
        </div>
      )}
    </div>
  );
}
