import { create } from 'zustand';

type RouteState = {
  startPoint: string;
  destination: string;
  routeType: string;
  setRoute: (start: string, dest: string, type: string) => void;
};

export const useRouteStore = create<RouteState>((set) => ({
  startPoint: 'San Francisco, CA',
  destination: 'Lake Tahoe, NV',
  routeType: 'Scenic & Curvy',
  setRoute: (start, dest, type) => set({ startPoint: start, destination: dest, routeType: type }),
}));
