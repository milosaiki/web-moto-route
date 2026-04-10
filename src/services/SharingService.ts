export const SharingService = {
  generateShareLink: async (routeId: string) => {
    return `https://moto-route.ai/share/${routeId}`;
  },
};
