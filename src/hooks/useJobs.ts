import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { supabase } from '../lib/supabase';
import { useAuthStore } from '../stores/authStore';

export function useJobs() {
  const { user } = useAuthStore();

  return useInfiniteQuery({
    queryKey: ['jobs', user?.id],
    queryFn: async ({ pageParam }: { pageParam: unknown }) => {
      if (!user?.id) throw new Error('Unauthenticated');
      let query = supabase
        .from('job_fit_scores')
        .select(`
          job_id, fit_score, fit_reasons, created_at,
          job:jobs(title, company, location, role_family, is_remote)
        `)
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(20);

      if (pageParam && typeof pageParam === 'string') {
        query = query.lt('created_at', pageParam);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data as any[];
    },
    initialPageParam: null as string | null,
    getNextPageParam: (lastPage: any[]) => {
      if (lastPage && lastPage.length === 20) {
        return lastPage[lastPage.length - 1].created_at;
      }
      return undefined;
    },
    enabled: !!user?.id,
  });
}

export function useApplications() {
  const { user } = useAuthStore();

  return useQuery({
    queryKey: ['applications', user?.id],
    queryFn: async () => {
      if (!user?.id) throw new Error('Unauthenticated');
      const { data, error } = await supabase
        .from('job_applications')
        .select(`
          job_id, status, apply_tier, applied_at,
          job:jobs(title, company)
        `)
        .eq('user_id', user.id)
        .order('applied_at', { ascending: false });

      if (error) throw error;
      return data as any[];
    },
    enabled: !!user?.id,
  });
}
