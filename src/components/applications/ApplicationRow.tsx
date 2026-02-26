import { JobApplication } from '../../types/job';
import { formatDate } from '../../lib/utils';
import { Bot, User } from 'lucide-react';

export function ApplicationRow({ app }: { app: JobApplication }) {

  const statusColors = {
    queued: 'bg-slate-100 text-slate-700 border-slate-200',
    submitted: 'bg-blue-100 text-blue-700 border-blue-200',
    callback: 'bg-green-100 text-green-700 border-green-200',
    rejected: 'bg-red-100 text-red-700 border-red-200',
    expired: 'bg-slate-100 text-slate-500 border-slate-200'
  };

  const statusLabels = {
    queued: 'Queued',
    submitted: 'Submitted',
    callback: 'Callback Received',
    rejected: 'Rejected',
    expired: 'Expired'
  };

  const colorClass = statusColors[app.status] || statusColors.queued;
  const label = statusLabels[app.status] || app.status;

  return (
    <tr className="hover:bg-slate-50 transition-colors">
      <td className="px-6 py-4">
        <div className="font-semibold text-slate-900 line-clamp-1">{app.job.title}</div>
        <div className="text-sm text-slate-500">{app.job.company}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600 font-medium">
        {formatDate(app.applied_at)}
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        {app.apply_tier === 1 ? (
          <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-primary/10 text-primary">
            <Bot className="w-3.5 h-3.5 mr-1" /> Auto
          </span>
        ) : (
          <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-slate-100 text-slate-700 border border-slate-200">
            <User className="w-3 h-3 mr-1" /> Manual
          </span>
        )}
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${colorClass}`}>
          {label}
        </span>
      </td>
    </tr>
  );
}
