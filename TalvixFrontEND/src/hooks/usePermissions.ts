import { useAuthStore } from '../stores/authStore';

export function usePermissions() {
  const { permissionState } = useAuthStore();

  const state = permissionState || 1;

  return {
    canViewFitReasons: state >= 3,
    canAutoApply: state >= 3,
    canViewCoaching: state === 2 || state === 4,
    canViewApplications: state >= 3,
    canViewDreamCompanies: state >= 3,
    permissionState,
  };
}
