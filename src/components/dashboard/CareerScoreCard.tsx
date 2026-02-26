import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';
import { Target } from 'lucide-react';

export function CareerScoreCard({ scores }: { scores?: { skills: number; experience: number; demand: number; salary: number } }) {
  if (!scores) {
    return (
      <div className="bg-white rounded-xl border border-slate-200 p-6 flex flex-col min-h-[400px]">
        <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center">
          <Target className="w-5 h-5 mr-2 text-primary" />
          Career Intel
        </h3>
        <div className="flex-1 flex items-center justify-center">
          <div className="w-8 h-8 border-4 border-slate-200 border-t-primary rounded-full animate-spin" />
        </div>
      </div>
    );
  }

  const data = [
    { subject: 'Skills (30%)', A: scores.skills, fullMark: 30 },
    { subject: 'Experience (25%)', A: scores.experience, fullMark: 25 },
    { subject: 'Demand (25%)', A: scores.demand, fullMark: 25 },
    { subject: 'Salary (20%)', A: scores.salary, fullMark: 20 },
  ];

  const totalScore = Math.round(scores.skills + scores.experience + scores.demand + scores.salary);

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-6 flex flex-col h-[400px]">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-slate-900 flex items-center">
          <Target className="w-5 h-5 mr-2 text-primary" />
          Career Score
        </h3>
        <div className="px-3 py-1 bg-primary/10 text-primary font-bold rounded-lg text-lg">
          {totalScore} / 100
        </div>
      </div>

      <div className="flex-1 min-h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="70%" data={data}>
            <PolarGrid stroke="#e2e8f0" />
            <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748b', fontSize: 12 }} />
            <PolarRadiusAxis angle={30} domain={[0, 'dataMax']} tick={false} axisLine={false} />
            <Radar
              name="Score"
              dataKey="A"
              stroke="#6366f1"
              fill="#6366f1"
              fillOpacity={0.4}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
