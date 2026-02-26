import { useState } from 'react';
import { ResumeUpload } from './ResumeUpload';
import { PersonaDisplay } from './PersonaDisplay';
import { WhatsAppConnect } from './WhatsAppConnect';
import { useAuth } from '../../hooks/useAuth';

export function OnboardingFlow() {
  const [step, setStep] = useState(1);
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-surface-muted flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* Progress Bar */}
        <div className="h-2 bg-slate-100 w-full">
          <div
            className="h-full bg-primary transition-all duration-500 ease-out"
            style={{ width: `${(step / 3) * 100}%` }}
          />
        </div>

        <div className="p-8">
          {step === 1 && (
            <ResumeUpload onNext={() => setStep(2)} />
          )}
          {step === 2 && (
            <PersonaDisplay persona={user?.persona} onNext={() => setStep(3)} />
          )}
          {step === 3 && (
            <WhatsAppConnect />
          )}
        </div>
      </div>
    </div>
  );
}
