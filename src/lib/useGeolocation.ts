"use client";

import { useEffect, useState } from "react";

export type GeoWeather = {
  phase: "loading" | "ready";
  latitude: number | null;
  longitude: number | null;
  city: string;
  temp: string;
  weatherCode: number;
};

const DEFAULT: GeoWeather = {
  phase: "loading",
  latitude: null,
  longitude: null,
  city: "",
  temp: "",
  weatherCode: 0,
};

const FALLBACK: GeoWeather = {
  phase: "ready",
  latitude: null,
  longitude: null,
  city: "Location Unavailable",
  temp: "22°C",
  weatherCode: 0,
};

export function useGeolocation(): GeoWeather {
  const [state, setState] = useState<GeoWeather>(DEFAULT);

  useEffect(() => {
    if (typeof navigator === "undefined" || !navigator.geolocation) {
      setState({ ...FALLBACK, city: "Default Location" });
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;

          const [geoRes, weatherRes] = await Promise.all([
            fetch(
              `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
            ),
            fetch(
              `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`
            ),
          ]);

          const geoData = await geoRes.json();
          const weatherData = await weatherRes.json();

          const city =
            geoData.city || geoData.locality || "Unknown Location";
          const temp = Math.round(weatherData.current_weather.temperature);
          const weatherCode = weatherData.current_weather.weathercode;

          setState({
            phase: "ready",
            latitude,
            longitude,
            city,
            temp: `${temp}°C`,
            weatherCode,
          });
        } catch {
          setState(FALLBACK);
        }
      },
      () => {
        setState({ ...FALLBACK, city: "Location Access Denied" });
      },
      { timeout: 10000, enableHighAccuracy: false }
    );
  }, []);

  return state;
}
