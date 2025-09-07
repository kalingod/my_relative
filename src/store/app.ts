import { create } from 'zustand';

interface AppState {
  isPublicIdentity: boolean;
  displayName: string;
  setPublicIdentity: (v: boolean) => void;
  setDisplayName: (v: string) => void;
}

export const useAppStore = create<AppState>((set) => ({
  isPublicIdentity: true,
  displayName: '未设置',
  setPublicIdentity: (v) => set({ isPublicIdentity: v }),
  setDisplayName: (v) => set({ displayName: v }),
}));
