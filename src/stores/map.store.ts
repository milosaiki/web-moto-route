import { create } from 'zustand';

type MapState = {
  zoom: number;
  center: [number, number];
  setZoom: (zoom: number) => void;
  setCenter: (center: [number, number]) => void;
};

export const useMapStore = create<MapState>((set) => ({
  zoom: 12,
  center: [0, 0],
  setZoom: (zoom) => set({ zoom }),
  setCenter: (center) => set({ center }),
}));
