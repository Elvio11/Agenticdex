import { Users, FileText, CheckCircle, Search } from 'lucide-react';

export function QuickStats({ appsCount }: { appsCount: number }) {
  const stats = [
    { label: 'Platform Jobs', value: '150K+', icon: Search, bg: 'bg-blue-100', text: 'text-blue-700' },
    { label: 'Jobs Analysed', value: '300+', icon: Users, bg: 'bg-purple-100', text: 'text-purple-700' },
    { label: 'Applications', value: appsCount, icon: FileText, bg: 'bg-green-100', text: 'text-green-700' },
    { label: 'Callbacks', value: '0', icon: CheckCircle, bg: 'bg-orange-100', text: 'text-orange-700' },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {stats.map((s, idx) => {
        const Icon = s.icon;
        return (
          <div key={idx} className="bg-white rounded-xl border border-slate-200 p-4 flex items-center">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center mr-4 ${s.bg} ${s.text}`}>
              <Icon className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">{s.label}</p>
              <h4 className="text-2xl font-bold text-slate-900">{s.value}</h4>
            </div>
          </div>
        );
      })}
    </div>
  );
}
