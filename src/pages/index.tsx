import { DashboardHome } from '../components/dashboard/DashboardHome';
import { OnboardingFlow } from '../components/onboarding/OnboardingFlow';
import { JobFeed } from '../components/jobs/JobFeed';
import { ApplicationTracker } from '../components/applications/ApplicationTracker';
import { SkillGapPanel } from '../components/skill-gap/SkillGapPanel';
import { SettingsPage as SettingsPanel } from '../components/settings/SettingsPage';

export function Dashboard() { return <DashboardHome />; }
export function Onboarding() { return <OnboardingFlow />; }
export function Jobs() { return <JobFeed />; }
export function Applications() { return <ApplicationTracker />; }
export function SkillGap() { return <SkillGapPanel />; }
export function Settings() { return <SettingsPanel />; }

export function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center">
      <h1 className="text-6xl font-extrabold text-slate-900 mb-4">404</h1>
      <h2 className="text-2xl font-bold text-slate-700 mb-2">Page not found</h2>
      <p className="text-slate-500 mb-6">The page you're looking for doesn't exist or has been moved.</p>
      <a href="/dashboard" className="px-6 py-2 bg-primary text-white font-medium rounded-lg hover:bg-primary/90 transition-colors">
        Return to Dashboard
      </a>
    </div>
  );
}
