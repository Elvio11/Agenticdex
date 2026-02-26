export type PersonaType = 'student' | 'professional' | 'switcher' | 'returning' | 'freelancer';

export interface User {
  id: string;
  subscription_tier: 'free' | 'paid';
  wa_connected: boolean;
  onboarding_complete: boolean;
  persona: PersonaType;
  dashboard_ready: boolean;
  parse_status?: string;
}
