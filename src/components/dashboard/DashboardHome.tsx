import { ReadinessCard } from './ReadinessCard';
import { CareerScoreCard } from './CareerScoreCard';
import { QuickStats } from './QuickStats';
import { JobCard } from '../jobs/JobCard';
import { useAuth } from '../../hooks/useAuth';
import { useDashboardData } from '../../hooks/useAgents';
import { useJobs } from '../../hooks/useJobs';
import { useRealtime } from '../../hooks/useRealtime';

export function DashboardHome() {
  const { user } = useAuth();
  useRealtime();

  const { data: dashboardData, isLoading: loadingDash } = useDashboardData();
  const { data: jobsData, isLoading: loadingJobs } = useJobs();

  if (!user?.dashboard_ready || loadingDash) {
    return <ReadinessCard />;
  }

  const topJobs = jobsData?.pages[0]?.slice(0, 5) || [];

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Welcome back!</h1>
        <p className="text-slate-500 mt-2">Here is a summary of your career progress and new job matches.</p>
      </div>

      <QuickStats appsCount={dashboardData?.applicationsCount || 0} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <CareerScoreCard scores={(dashboardData?.careerIntel as any)?.scores} />
        </div>

        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold text-slate-900">Top Matches</h3>
          </div>

          <div className="space-y-4">
            {loadingJobs ? (
              <div className="flex justify-center py-12">
                <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
              </div>
            ) : topJobs.length > 0 ? (
              topJobs.map((jobScore: any) => (
                <JobCard key={jobScore.job_id} jobScore={jobScore} />
              ))
            ) : (
              <p className="text-slate-500 text-center py-12">No jobs matched yet. Check back soon.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
