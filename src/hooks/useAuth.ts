import { useEffect, useState } from 'react';
import { Session } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';
import { useAuthStore } from '../stores/authStore';
import { User } from '../types/user';

export function useAuth() {
  const { user, session, setUser, setSession, permissionState } = useAuthStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(async ({ data: { session } }: { data: { session: Session | null } }) => {
      setSession(session);
      if (session?.user) {
        await fetchUser(session.user.id);
      } else {
        setLoading(false);
      }
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event: string, session: Session | null) => {
      setSession(session);
      if (session?.user) {
        await fetchUser(session.user.id);
      } else {
        setUser(null);
        setLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchUser = async (userId: string) => {
    const { data: userData, error } = await supabase
      .from('users')
      .select('id, subscription_tier, wa_connected, onboarding_complete, persona, dashboard_ready, parse_status')
      .eq('id', userId)
      .single();

    if (!error && userData) {
      setUser(userData as User);
    }
    setLoading(false);
  };

  return { user, session, loading, permissionState, fetchUser };
}
