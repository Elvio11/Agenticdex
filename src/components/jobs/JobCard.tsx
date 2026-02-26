import { useState } from 'react';
import { MapPin, Briefcase } from 'lucide-react';
import { FitScoreBadge } from './FitScoreBadge';
import { JobFitScore } from '../../types/job';
import { usePermissions } from '../../hooks/usePermissions';
import { UpgradeCTA } from '../upgrade/UpgradeCTA';
import { formatDate } from '../../lib/utils';
import { JobDetail } from './JobDetail';

export function JobCard({ jobScore }: { jobScore: JobFitScore }) {
  const { job, fit_score, fit_reasons, created_at } = jobScore;
  const { canViewFitReasons } = usePermissions();
  const [showDetail, setShowDetail] = useState(false);

  return (
    <>
      <div className="bg-white rounded-xl border border-slate-200 p-6 hover:shadow-md transition-shadow relative overflow-hidden flex flex-col h-full">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-xl font-bold text-slate-900 line-clamp-1">{job.title}</h3>
            <p className="text-slate-600 font-medium">{job.company}</p>
          </div>
          <FitScoreBadge score={fit_score} />
        </div>

        <div className="flex flex-wrap gap-4 mt-2 mb-6">
          <div className="flex items-center text-slate-500 text-sm">
            <MapPin className="w-4 h-4 mr-1.5" />
            {job.location} {job.is_remote && '(Remote)'}
          </div>
          <div className="flex items-center text-slate-500 text-sm">
            <Briefcase className="w-4 h-4 mr-1.5" />
            {job.role_family}
          </div>
        </div>

        <div className="relative flex-1">
          <h4 className="text-sm font-semibold text-slate-700 mb-2">Why it's a match:</h4>

          <div className={`text-sm text-slate-600 ${!canViewFitReasons ? 'blur-sm pointer-events-none select-none h-16 overflow-hidden' : ''}`}>
            {fit_reasons || 'Based on your skills and experience profile.'}
          </div>

          {!canViewFitReasons && (
            <div className="absolute inset-0 flex items-center justify-center">
              <UpgradeCTA />
            </div>
          )}
        </div>

        <div className="flex justify-between items-center mt-6 pt-4 border-t border-slate-100">
          <span className="text-xs text-slate-400">Scored {formatDate(created_at)}</span>
          <button
            onClick={() => setShowDetail(true)}
            className="text-primary font-medium text-sm hover:underline"
          >
            View Details
          </button>
        </div>
      </div>

      {showDetail && (
        <JobDetail jobScore={jobScore} onClose={() => setShowDetail(false)} />
      )}
    </>
  );
}
