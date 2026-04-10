export const WeatherService = {
  getWeatherAtRoute: async (coordinates: any[]) => {
    return { temperature: 72, condition: 'Sunny' };
  },
};
