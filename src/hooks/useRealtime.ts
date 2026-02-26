import { useEffect, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { supabase } from '../lib/supabase';
import { useAuthStore } from '../stores/authStore';

export function useRealtime() {
  const queryClient = useQueryClient();
  const { user } = useAuthStore();

  useEffect(() => {
    if (!user?.id) return;

    const dashboardChannel = supabase
      .channel('dashboard-ready')
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'users',
          filter: `id=eq.${user.id}`,
        },
        (payload: any) => {
          if (payload.new.dashboard_ready) {
            queryClient.invalidateQueries({ queryKey: ['dashboard'] });
          }
        }
      )
      .subscribe();

    const jobsChannel = supabase
      .channel('new-fit-scores')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'job_fit_scores',
          filter: `user_id=eq.${user.id}`,
        },
        (payload: any) => {
          queryClient.invalidateQueries({ queryKey: ['jobs', user.id] });
          if (payload.new.fit_score >= 80) {
            // Toast notification can be dispatched here (using sonner/react-hot-toast)
          }
        }
      )
      .subscribe();

    const appsChannel = supabase
      .channel('application-updates')
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'job_applications',
          filter: `user_id=eq.${user.id}`,
        },
        () => {
          queryClient.invalidateQueries({ queryKey: ['applications', user.id] });
          queryClient.invalidateQueries({ queryKey: ['dashboard'] });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(dashboardChannel);
      supabase.removeChannel(jobsChannel);
      supabase.removeChannel(appsChannel);
    };
  }, [user?.id, queryClient]);
}

const MAX_POLLS = 40;
const POLL_INTERVAL = 3000;

export function usePolling(
  pollFn: () => Promise<boolean>,
  onSuccess: () => void,
  errorMessage: string
) {
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let polls = 0;
    let timer: NodeJS.Timeout;

    const runPoll = async () => {
      polls++;
      if (polls > MAX_POLLS) {
        setError(errorMessage);
        return;
      }

      try {
        const success = await pollFn();
        if (success) {
          onSuccess();
          return;
        }
      } catch (err) {
        console.error('Polling error', err);
      }

      timer = setTimeout(runPoll, POLL_INTERVAL);
    };

    runPoll();

    return () => clearTimeout(timer);
  }, []);

  return { error };
}
