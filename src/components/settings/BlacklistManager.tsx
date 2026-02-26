import { useState } from 'react';
import { ShieldAlert, X } from 'lucide-react';

export function BlacklistManager() {
  const [companies, setCompanies] = useState<string[]>(['Infosys', 'TCS']);
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
    <div className="bg-white rounded-xl border border-slate-200 p-6 flex flex-col h-full">
      <div className="flex items-center mb-2">
        <ShieldAlert className="w-5 h-5 mr-2 text-red-500" />
        <h2 className="text-xl font-bold text-slate-900">Blacklisted Companies</h2>
      </div>
      <p className="text-sm text-slate-500 mb-6">Talvix will never show you jobs or apply to these companies.</p>

      <input
        type="text"
        value={input}
        onChange={e => setInput(e.target.value)}
        onKeyDown={handleAdd}
        placeholder="Type company name & press Enter"
        className="w-full border border-slate-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none mb-4"
      />

      <div className="flex flex-wrap gap-2 mt-auto">
        {companies.map(c => (
          <span key={c} className="inline-flex items-center pl-3 pr-2 py-1.5 rounded-md text-sm font-medium bg-red-50 text-red-700 border border-red-100">
            {c}
            <button onClick={() => remove(c)} className="ml-1.5 p-0.5 hover:bg-red-100 rounded text-red-400 hover:text-red-900 transition-colors">
              <X className="w-3.5 h-3.5" />
            </button>
          </span>
        ))}
      </div>
    </div>
  );
}
