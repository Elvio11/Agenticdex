import { useState } from 'react';
import { Star, X } from 'lucide-react';
import { usePermissions } from '../../hooks/usePermissions';
import { UpgradeCTA } from '../upgrade/UpgradeCTA';

export function DreamCompanies() {
  const { canViewDreamCompanies } = usePermissions();
  const [companies, setCompanies] = useState<string[]>(['Google', 'Stripe']);
  const [input, setInput] = useState('');

  const handleAdd = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && input.trim()) {
      e.preventDefault();
      if (!companies.includes(input.trim())) {
        setCompanies([...companies, input.trim()]);
      }
      setInput('');
    }
  };

  const remove = (comp: string) => {
    setCompanies(companies.filter(c => c !== comp));
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-6 flex flex-col h-full relative">
      <div className="flex items-center mb-2">
        <Star className="w-5 h-5 mr-2 text-amber-500 fill-amber-500" />
        <h2 className="text-xl font-bold text-slate-900">Dream Companies</h2>
      </div>
      <p className="text-sm text-slate-500 mb-6 max-w-xs">These companies get a 25% higher weight in your job scoring algorithms.</p>

      <div className={`flex flex-col flex-1 ${!canViewDreamCompanies ? 'blur-[2px] pointer-events-none select-none' : ''}`}>
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleAdd}
          disabled={!canViewDreamCompanies}
          placeholder="Type company name & press Enter"
          className="w-full border border-slate-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none mb-4"
        />

        <div className="flex flex-wrap gap-2 mt-auto">
          {companies.map(c => (
            <span key={c} className="inline-flex items-center pl-3 pr-2 py-1.5 rounded-md text-sm font-medium bg-amber-50 text-amber-700 border border-amber-200/60">
              {c}
              <button onClick={() => remove(c)} className="ml-1.5 p-0.5 hover:bg-amber-100/50 rounded text-amber-500 hover:text-amber-900 transition-colors">
                <X className="w-3.5 h-3.5" />
              </button>
            </span>
          ))}
        </div>
      </div>

      {!canViewDreamCompanies && (
        <div className="absolute inset-0 flex items-center justify-center p-8 z-10">
          <div className="w-full h-full pt-16 mt-4 opacity-100 flex items-center">
             <UpgradeCTA />
          </div>
        </div>
      )}
    </div>
  );
}
