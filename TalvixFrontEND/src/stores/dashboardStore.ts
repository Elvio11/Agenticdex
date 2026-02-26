import { create } from 'zustand';

interface DashboardState {
  dashboard_ready: boolean;
  setReady: (v: boolean) => void;
}

export const useDashboardStore = create<DashboardState>((set) => ({
  dashboard_ready: false,
  setReady: (v: boolean) => set({ dashboard_ready: v }),
}));
