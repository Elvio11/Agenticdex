import { useState } from 'react';
import { Lock } from 'lucide-react';
import { PricingModal } from './PricingModal';

export function UpgradeCTA() {
  const [showUpgrade, setShowUpgrade] = useState(false);

  return (
    <>
      <div className="bg-white/80 backdrop-blur-sm border border-slate-200 rounded-lg shadow-sm p-4 text-center">
        <div className="mx-auto w-10 h-10 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-2">
          <Lock className="w-5 h-5" />
        </div>
        <h4 className="font-semibold text-slate-900 mb-1">Unlock Pro Features</h4>
        <p className="text-sm text-slate-500 mb-3">See exactly why you're a match and use AI to tailor your resume instantly.</p>
        <button
          onClick={() => setShowUpgrade(true)}
          className="w-full bg-primary hover:bg-primary/90 text-white font-medium py-2 rounded-md transition-colors text-sm"
        >
          Upgrade for ₹499/mo
        </button>
      </div>

      {showUpgrade && <PricingModal onClose={() => setShowUpgrade(false)} />}
    </>
  );
}
