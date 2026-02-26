import { useQuery } from '@tanstack/react-query';
import { supabase } from '../lib/supabase';
import { useAuthStore } from '../stores/authStore';

export function useDashboardData() {
  const { user } = useAuthStore();

  return useQuery({
    queryKey: ['dashboard', user?.id],
    queryFn: async () => {
      if (!user?.id) throw new Error('Unauthenticated');

      const [skillGap, careerIntel, apps] = await Promise.all([
        supabase
          .from('skill_gap_results')
          .select('top_gaps, updated_at')
          .eq('user_id', user.id)
          .single(),
        supabase
          .from('career_intelligence')
          .select('scores, updated_at')
          .eq('user_id', user.id)
          .single(),
        supabase
          .from('job_applications')
          .select('id', { count: 'exact', head: true })
          .eq('user_id', user.id),
      ]);

      return {
        skillGap: skillGap.data as any,
        careerIntel: careerIntel.data as any,
        applicationsCount: apps.count || 0,
      };
    },
    enabled: !!user?.id,
  });
}
