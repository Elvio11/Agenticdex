import { Bot, CheckCircle2, CircleDashed } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

export function ReadinessCard() {
  const { user } = useAuth();

  // Basic derived state inference for progress steps
  const isParsing = user?.parse_status !== 'done';
  const isScored = user?.dashboard_ready;

  const steps = [
    { label: 'Parsing resume...', completed: !isParsing, active: isParsing },
    { label: 'Analysing gaps...', completed: isScored, active: !isParsing && !isScored },
    { label: 'Scoring jobs...', completed: isScored, active: !isParsing && !isScored },
    { label: 'Almost ready...', completed: isScored, active: false }
  ];

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-8 flex flex-col justify-center items-center min-h-[400px] text-center w-full max-w-2xl mx-auto mt-8">
      <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-6 relative">
        <Bot className="w-10 h-10 text-primary" />
        {!isScored && (
          <div className="absolute inset-0 border-4 border-primary border-t-transparent rounded-full animate-spin" />
        )}
      </div>

      <h2 className="text-2xl font-bold text-slate-900 mb-2">Preparing your workspace</h2>
      <p className="text-slate-500 mb-10 max-w-md">Our AI agents are currently analysing your profile against the active job pool and building your personalized dashboard.</p>

      <div className="w-full max-w-sm flex flex-col space-y-4">
        {steps.map((step, idx) => (
          <div key={idx} className={`flex items-center p-4 rounded-xl border ${step.completed ? 'bg-green-50 border-green-200' : step.active ? 'bg-primary/5 border-primary/20' : 'bg-slate-50 border-slate-100'}`}>
            <div className="mr-4">
              {step.completed ? (
                <CheckCircle2 className="w-6 h-6 text-green-600" />
              ) : step.active ? (
                <div className="w-6 h-6 rounded-full border-2 border-primary border-t-transparent animate-spin" />
              ) : (
                <CircleDashed className="w-6 h-6 text-slate-300" />
              )}
            </div>
            <span className={`font-medium ${step.completed ? 'text-green-800' : step.active ? 'text-primary' : 'text-slate-400'}`}>
              {step.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
