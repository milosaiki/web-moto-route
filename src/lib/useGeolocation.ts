"use client";

import { useEffect, useState } from "react";

export type GeoPhase = "loading" | "ready" | "denied" | "unavailable";

export type GeoWeather = {
  phase: GeoPhase;
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

function formatPlace(geoData: {
  locality?: string;
  city?: string;
  principalSubdivision?: string;
  countryName?: string;
}): string {
  const line1 = geoData.locality || geoData.city || "";
  const line2 = geoData.principalSubdivision || "";
  const combined = [line1, line2].filter(Boolean).join(", ");
  if (combined) return combined;
  return geoData.countryName || "Unknown location";
}

export function useGeolocation(): GeoWeather {
  const [state, setState] = useState<GeoWeather>(DEFAULT);

  useEffect(() => {
    if (typeof navigator === "undefined" || !navigator.geolocation) {
      setState({
        phase: "unavailable",
        latitude: null,
        longitude: null,
        city: "Geolocation not supported",
        temp: "",
        weatherCode: 0,
      });
      return;
    }

    let cancelled = false;
    let watchId: number | null = null;

    const clearWatch = () => {
      if (watchId != null) {
        navigator.geolocation.clearWatch(watchId);
        watchId = null;
      }
    };

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        if (cancelled) return;
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

          const city = formatPlace(geoData);
          const temp = Math.round(weatherData.current_weather.temperature);
          const weatherCode = weatherData.current_weather.weathercode;

          if (cancelled) return;

          setState({
            phase: "ready",
            latitude,
            longitude,
            city,
            temp: `${temp}°C`,
            weatherCode,
          });

          if (cancelled) return;

          watchId = navigator.geolocation.watchPosition(
            (pos) => {
              if (cancelled) return;
              setState((prev) =>
                prev.phase === "ready"
                  ? {
                      ...prev,
                      latitude: pos.coords.latitude,
                      longitude: pos.coords.longitude,
                    }
                  : prev
              );
            },
            undefined,
            { enableHighAccuracy: true, maximumAge: 2000, timeout: 15000 }
          );
        } catch {
          if (cancelled) return;
          setState({
            phase: "unavailable",
            latitude: null,
            longitude: null,
            city: "Could not load weather or place",
            temp: "",
            weatherCode: 0,
          });
        }
      },
      () => {
        if (cancelled) return;
        setState({
          phase: "denied",
          latitude: null,
          longitude: null,
          city: "Location access denied",
          temp: "",
          weatherCode: 0,
        });
      },
      { timeout: 10000, enableHighAccuracy: false, maximumAge: 300_000 }
    );

    return () => {
      cancelled = true;
      clearWatch();
    };
  }, []);

  return state;
}
