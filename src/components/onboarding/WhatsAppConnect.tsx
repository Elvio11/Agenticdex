import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { QrCode, MessageCircle, AlertCircle, CheckCircle2 } from 'lucide-react';
import { api } from '../../lib/axios';
import { usePolling } from '../../hooks/useRealtime';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../hooks/useAuth';

export function WhatsAppConnect() {
  const [qrCodeData, setQrCodeData] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [skipping, setSkipping] = useState(false);
  const { user, fetchUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetchQrCode();
  }, []);

  const fetchQrCode = async () => {
    try {
      setLoading(true);
      const res = await api.get('/api/wa/qr');
      setQrCodeData(res.data.qr);
    } catch (error) {
      console.error('Failed to get QR code', error);
    } finally {
      setLoading(false);
    }
  };

  const pollWaStatus = async () => {
    if (!user?.id) return false;
    const { data } = await supabase
      .from('users')
      .select('wa_connected')
      .eq('id', user.id)
      .single();

    return !!(data as any)?.wa_connected;
  };

  const { error: pollError } = usePolling(
    pollWaStatus,
    () => {
      // Success!
      fetchUser(user!.id).then(() => {
        navigate('/dashboard');
      });
    },
    'QR code expired. Click to regenerate.'
  );

  const handleSkip = async () => {
    setSkipping(true);
    try {
      if (user?.id) {
        await (supabase
          .from('users') as any)
          .update({ onboarding_complete: true })
          .eq('id', user.id);

        await fetchUser(user.id);
        navigate('/dashboard');
      }
    } catch (error) {
      console.error('Failed to skip', error);
      setSkipping(false);
    }
  };

  if (user?.wa_connected) {
    return (
      <div className="text-center py-8">
        <div className="mx-auto w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-4">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <h3 className="text-xl font-bold text-slate-900 mb-2">Connected!</h3>
        <p className="text-slate-500 mb-8">Your WhatsApp is successfully linked to Talvix.</p>
        <button
          onClick={handleSkip}
          className="w-full bg-primary text-white font-medium py-3 rounded-lg hover:bg-primary/90 transition-colors"
        >
          Go to Dashboard
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-center mb-6">
        <div className="w-16 h-16 bg-[#25D366]/10 text-[#25D366] rounded-full flex items-center justify-center">
          <MessageCircle className="w-8 h-8" />
        </div>
      </div>

      <h2 className="text-2xl font-bold text-slate-900 text-center mb-2">Connect WhatsApp</h2>
      <p className="text-slate-500 text-center mb-8">Receive daily coaching, application updates, and quick alerts right on your phone.</p>

      <div className="bg-slate-50 border border-slate-200 rounded-xl p-8 flex flex-col items-center justify-center min-h-[240px]">
        {loading ? (
          <div className="w-8 h-8 border-4 border-[#25D366] border-t-transparent rounded-full animate-spin" />
        ) : qrCodeData ? (
          <div className="bg-white p-4 rounded-xl shadow-sm">
            {/* Displaying raw block QR or base64 based on API response format. For now assume base64 image */}
            <img src={qrCodeData} alt="WhatsApp QR Code" className="w-48 h-48" />
          </div>
        ) : (
          <div className="text-center text-slate-500 flex flex-col items-center">
            <QrCode className="w-8 h-8 mb-2 opacity-50" />
            <p>Could not load QR code.</p>
            <button onClick={fetchQrCode} className="text-primary mt-2 font-medium hover:underline text-sm">Try Again</button>
          </div>
        )}
      </div>

      {pollError && (
        <div className="mt-4 p-3 bg-red-50 text-red-700 rounded-lg flex flex-col items-center text-sm text-center">
          <div className="flex items-center mb-2">
            <AlertCircle className="w-4 h-4 mr-2" />
            <span className="font-medium">QR Code Expired</span>
          </div>
          <button
            onClick={fetchQrCode}
            className="px-4 py-2 bg-red-100 hover:bg-red-200 text-red-800 rounded-md font-medium transition-colors"
          >
            Regenerate QR
          </button>
        </div>
      )}

      <div className="mt-8 flex flex-col space-y-3">
        <div className="text-center">
          <p className="text-sm text-slate-500">Scan this QR code with your WhatsApp app.</p>
          <p className="text-xs text-slate-400 mt-1">Open WhatsApp {'>'} Settings {'>'} Linked Devices</p>
        </div>

        <button
          onClick={handleSkip}
          disabled={skipping}
          className="w-full bg-slate-100 text-slate-700 font-medium py-3 rounded-lg hover:bg-slate-200 disabled:opacity-50 transition-colors mt-4"
        >
          {skipping ? 'Skipping...' : 'Skip for now'}
        </button>
      </div>
    </div>
  );
}
