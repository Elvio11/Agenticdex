import { useState } from 'react';
import { supabase } from '../../lib/supabase';

export function GoogleSignIn() {
  const [loading, setLoading] = useState(false);

  const handleSignIn = async () => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/dashboard`
        }
      });
      if (error) throw error;
    } catch (error) {
      console.error('Error logging in:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleSignIn}
      disabled={loading}
      className={`flex items-center justify-center w-full px-4 py-3 border border-slate-300 rounded-lg shadow-sm bg-white text-slate-700 hover:bg-slate-50 transition-colors ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
      <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-5 h-5 mr-3" />
      <span className="font-medium text-sm">
        {loading ? 'Connecting...' : 'Continue with Google'}
      </span>
    </button>
  );
}
