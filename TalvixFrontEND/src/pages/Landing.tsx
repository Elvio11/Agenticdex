import { Link, Navigate } from 'react-router-dom';
import { Target, Zap, Shield, Bot } from 'lucide-react';
import { GoogleSignIn } from '../components/auth/GoogleSignIn';
import { useAuth } from '../hooks/useAuth';

export function Landing() {
  const { session } = useAuth();

  if (session) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="min-h-screen bg-slate-50 relative overflow-hidden flex flex-col items-center">
      {/* Background decorations */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-primary/20 rounded-full blur-3xl pointer-events-none" />

      <header className="w-full max-w-7xl mx-auto px-6 py-8 flex items-center justify-between z-10">
        <h1 className="text-2xl font-bold text-primary flex items-center">
          <Target className="w-8 h-8 mr-2" /> Talvix
        </h1>
        <Link to="/login" className="text-sm font-medium text-slate-700 hover:text-slate-900 transition-colors">Log In</Link>
      </header>

      <main className="flex-1 w-full max-w-7xl mx-auto px-6 flex flex-col items-center justify-center text-center z-10 pt-12 pb-24">

        <div className="inline-block px-4 py-1.5 bg-primary/10 text-primary font-semibold rounded-full text-sm mb-6 border border-primary/20">
          Career OS Phase 5 Live
        </div>

        <h2 className="text-5xl md:text-7xl font-extrabold text-slate-900 tracking-tight leading-tight mb-8 max-w-4xl">
          AI that applies to jobs <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-600">while you sleep.</span>
        </h2>

        <p className="text-xl text-slate-600 mb-12 max-w-2xl leading-relaxed">
          The ultimate intelligent career operating system. Upload your resume once. Talvix automatically finds high-fit jobs, tailors your resume, and applies 10x faster.
        </p>

        <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl border border-slate-100 mb-16 relative">
          <div className="absolute -top-6 -right-6 w-12 h-12 bg-green-100 border border-green-200 text-green-600 rounded-full flex items-center justify-center animate-bounce shadow-sm">
            <Bot className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-slate-900 mb-6 border-b border-slate-100 pb-2">Start your journey</h3>
          <GoogleSignIn />
          <p className="text-xs text-slate-400 mt-4 text-center">No credit card required for Free Plan.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto w-full text-left">
          <div className="bg-white/60 backdrop-blur border border-slate-200 p-6 rounded-2xl">
            <Zap className="w-8 h-8 text-amber-500 mb-4" />
            <h4 className="text-lg font-bold text-slate-900 mb-2">Automated Tier-1 Applications</h4>
            <p className="text-slate-600 text-sm">We handle Indeed and LinkedIn Easy Apply completely automatically 24/7 without risking your account.</p>
          </div>
          <div className="bg-white/60 backdrop-blur border border-slate-200 p-6 rounded-2xl">
            <Target className="w-8 h-8 text-primary mb-4" />
            <h4 className="text-lg font-bold text-slate-900 mb-2">Dynamic Resume Tailoring</h4>
            <p className="text-slate-600 text-sm">Every application gets a perfectly tailored resume variant targeting specific JD keywords.</p>
          </div>
          <div className="bg-white/60 backdrop-blur border border-slate-200 p-6 rounded-2xl">
            <Shield className="w-8 h-8 text-green-500 mb-4" />
            <h4 className="text-lg font-bold text-slate-900 mb-2">Bank-Grade Session Security</h4>
            <p className="text-slate-600 text-sm">Your connection cookies are AES-256 encrypted and never exposed to the frontend.</p>
          </div>
        </div>
      </main>
    </div>
  );
}
