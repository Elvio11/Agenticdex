import { Navigate } from 'react-router-dom';
import { Target } from 'lucide-react';
import { GoogleSignIn } from '../components/auth/GoogleSignIn';
import { useAuth } from '../hooks/useAuth';

export function Login() {
  const { session } = useAuth();

  if (session) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="min-h-screen bg-surface-muted flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl border border-slate-100 flex flex-col items-center">
        <Target className="w-12 h-12 text-primary mb-4" />
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Welcome back to Talvix</h2>
        <p className="text-slate-500 text-center mb-8">Sign in to review your latest matches and application updates.</p>

        <div className="w-full">
          <GoogleSignIn />
        </div>
      </div>
    </div>
  );
}
