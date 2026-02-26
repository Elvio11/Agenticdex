import { useState } from 'react';
import { User, Briefcase, GraduationCap, RefreshCw, PenTool, BrainCircuit } from 'lucide-react';
import { api } from '../../lib/axios';
import { PersonaType } from '../../types/user';

const personas = [
  { id: 'professional', label: 'Experienced Professional', icon: Briefcase, desc: 'Tailored for senior roles and leadership positions.', class: 'bg-blue-100 text-blue-700' },
  { id: 'student', label: 'Student / New Grad', icon: GraduationCap, desc: 'Focuses on academic projects, internships, and potential.', class: 'bg-green-100 text-green-700' },
  { id: 'switcher', label: 'Career Switcher', icon: RefreshCw, desc: 'Highlights transferable skills and fast learning ability.', class: 'bg-purple-100 text-purple-700' },
  { id: 'freelancer', label: 'Freelancer', icon: PenTool, desc: 'Emphasizes self-management, diverse clients, and delivery.', class: 'bg-orange-100 text-orange-700' },
  { id: 'returning', label: 'Returning to Work', icon: User, desc: 'Frames career breaks positively and focuses on readiness.', class: 'bg-teal-100 text-teal-700' }
];

export function PersonaDisplay({ persona, onNext }: { persona?: string, onNext: () => void }) {
  const [selected, setSelected] = useState<PersonaType>((persona as PersonaType) || 'professional');
  const [saving, setSaving] = useState(false);

  const handleConfirm = async () => {
    setSaving(true);
    try {
      await api.patch('/api/users/persona', { persona: selected });
      onNext();
    } catch (error) {
      console.error('Failed to save persona', error);
      setSaving(false);
    }
  };



  return (
    <div>
      <div className="flex justify-center mb-6">
        <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center">
          <BrainCircuit className="w-8 h-8" />
        </div>
      </div>

      <h2 className="text-2xl font-bold text-slate-900 text-center mb-2">We've analysed your profile</h2>
      <p className="text-slate-500 text-center mb-8">This is the persona our AI will use when writing your cover letters and tailoring your resume.</p>

      <div className="space-y-4">
        {personas.map(p => {
          const Icon = p.icon;
          const isSelected = selected === p.id;
          return (
            <div
              key={p.id}
              onClick={() => setSelected(p.id as PersonaType)}
              className={`p-4 border rounded-xl cursor-pointer transition-all ${isSelected ? 'border-primary ring-1 ring-primary bg-primary/5' : 'border-slate-200 hover:border-slate-300'}`}
            >
              <div className="flex items-start">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-4 flex-shrink-0 ${p.class}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-medium text-slate-900">{p.label}</h4>
                  <p className="text-sm text-slate-500 mt-1">{p.desc}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-8">
        <button
          onClick={handleConfirm}
          disabled={saving}
          className="w-full bg-primary text-white font-medium py-3 rounded-lg hover:bg-primary/90 disabled:opacity-50 transition-colors"
        >
          {saving ? 'Saving...' : 'Confirm Persona'}
        </button>
      </div>
    </div>
  );
}
