import { useDashboardData } from '../../hooks/useAgents';
import { SkillCard } from './SkillCard';
import { Award } from 'lucide-react';

export function SkillGapPanel() {
  const { data: dashboardData, isLoading } = useDashboardData();

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto flex justify-center py-24">
        <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const gaps = (dashboardData?.skillGap as any)?.top_gaps || [];

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Skill Gap Analysis</h1>
        <p className="text-slate-500 mt-2">Maximum ROI skills to learn based on current market demand for your target roles.</p>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="bg-slate-50 border-b border-slate-200 p-6">
          <div className="flex items-center text-amber-600 font-semibold mb-2">
            <Award className="w-5 h-5 mr-2" /> Top Missing Skills
          </div>
          <p className="text-sm text-slate-600">
            Our AI analysed the requirements of active jobs in your target roles in your city and compared them against your parsed resume.
          </p>
        </div>

        <div className="p-6">
          {gaps.length > 0 ? (
            <div className="space-y-4">
              {gaps.map((gap: any, idx: number) => (
                <SkillCard key={idx} gap={gap} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-slate-500">
              No skill gaps detected. You perfectly match market expectations.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
