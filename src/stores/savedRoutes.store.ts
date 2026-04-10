import { create } from 'zustand';

type SavedRoutesState = {
  routes: any[];
  addRoute: (route: any) => void;
};

export const useSavedRoutesStore = create<SavedRoutesState>((set) => ({
  routes: [],
  addRoute: (route) => set((state) => ({ routes: [...state.routes, route] })),
}));
