import { create } from 'zustand';

type RidersState = {
  riders: any[];
  addRider: (rider: any) => void;
};

export const useRidersStore = create<RidersState>((set) => ({
  riders: [],
  addRider: (rider) => set((state) => ({ riders: [...state.riders, rider] })),
}));
