import { useState } from 'react';
import { Check, X, CreditCard } from 'lucide-react';
import { api } from '../../lib/axios';
import { useQueryClient } from '@tanstack/react-query';

export function PricingModal({ onClose }: { onClose: () => void }) {
  const [loading, setLoading] = useState(false);
  const queryClient = useQueryClient();

  const handleUpgrade = async () => {
    setLoading(true);
    try {
      const { data } = await api.post('/api/payments/create-order', { plan: 'monthly' });

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: data.amount,
        currency: "INR",
        name: "Talvix",
        description: "Talvix Pro Monthly Subscription",
        order_id: data.order_id,
        handler: async function (response: any) {
          try {
            await api.post('/api/payments/verify', {
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_signature: response.razorpay_signature
            });
            // Instant unlock
            queryClient.invalidateQueries({ queryKey: ['user'] });
            onClose();
          } catch (err) {
            console.error('Payment verification failed', err);
          }
        },
        theme: {
          color: "#6366f1"
        }
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.on('payment.failed', function (response: any){
        console.error(response.error.description);
      });
      rzp.open();
    } catch (error) {
      console.error('Failed to initialize payment', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 bg-slate-100 rounded-full p-2"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-8 pb-6 border-b border-slate-100/50">
          <div className="inline-block px-3 py-1 bg-primary/10 text-primary font-bold rounded-full text-xs uppercase tracking-wider mb-4">
            Talvix Pro
          </div>
          <h2 className="text-3xl font-bold text-slate-900 mb-2">₹499<span className="text-lg text-slate-500 font-normal">/month</span></h2>
          <p className="text-slate-500">Master the job market with AI automation.</p>
        </div>

        <div className="p-8 bg-slate-50">
          <ul className="space-y-4 mb-8">
            {[
              'View exact match reasons for every job',
              'Auto-apply to Indeed and LinkedIn Easy Apply',
              'Instant AI-tailored resumes perfectly aligned to JDs',
              'Personalized cover letter generation',
              'Daily proactive WhatsApp career coaching',
              'Advanced skill gap ROI reports'
            ].map((feature, idx) => (
              <li key={idx} className="flex items-start text-sm text-slate-700">
                <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>

          <button
            onClick={handleUpgrade}
            disabled={loading}
            className="w-full flex items-center justify-center bg-primary hover:bg-primary/90 text-white font-medium py-3 rounded-lg transition-colors shadow-sm disabled:opacity-50"
          >
            <CreditCard className="w-5 h-5 mr-2" />
            {loading ? 'Processing...' : 'Subscribe Now'}
          </button>

          <p className="text-xs text-center text-slate-400 mt-4">
            Secure payments via Razorpay. Cancel anytime.
          </p>
        </div>
      </div>
    </div>
  );
}
