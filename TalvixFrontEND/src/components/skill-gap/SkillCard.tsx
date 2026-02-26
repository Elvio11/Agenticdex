import { SkillGap } from '../../types/agent';
import { TrendingUp } from 'lucide-react';

export function SkillCard({ gap }: { gap: SkillGap }) {
  // Mocking fields that might be present in full API response but not typed explicitly in top_gaps JSONB snippet.
  const importancePct = (gap as any).importance_pct || Math.round(gap.frequency_rank * 10);
  const courses = (gap as any).courses || [];

  return (
    <div className="border border-slate-200 rounded-xl p-5 hover:border-slate-300 transition-colors bg-white">
      <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-4">
        <div>
          <h3 className="text-xl font-bold text-slate-900">{gap.skill}</h3>
          <p className="text-sm text-slate-500 mt-1 flex items-center">
            <TrendingUp className="w-4 h-4 mr-1 text-primary" />
            ROI Rank #{gap.roi_score || gap.frequency_rank}
          </p>
        </div>

        <div className="mt-4 sm:mt-0">
          <div className="text-sm font-medium text-slate-700 text-right mb-1">Market Demand</div>
          <div className="w-full sm:w-48 h-2 bg-slate-100 rounded-full overflow-hidden flex">
            <div
              className="bg-primary h-full"
              style={{ width: `${importancePct}%` }}
            />
          </div>
          <div className="text-xs text-slate-400 text-right mt-1">{importancePct}% of JDs</div>
        </div>
      </div>

      {(courses && courses.length > 0) ? (
        <div className="mt-6 pt-4 border-t border-slate-100">
          <h4 className="text-sm font-semibold text-slate-900 mb-3">Recommended Resources</h4>
          <ul className="space-y-2">
            {courses.map((course: string, idx: number) => (
              <li key={idx} className="text-sm text-slate-600 flex items-start">
                <span className="w-1.5 h-1.5 rounded-full bg-slate-300 mt-1.5 mr-2 flex-shrink-0" />
                {course}
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
}
