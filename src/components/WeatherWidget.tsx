"use client";

import { useEffect, useState } from "react";

type Phase = "loading" | "ready";

type WeatherReady = {
  phase: "ready";
  temp: string;
  location: string;
  code: number;
};

type WeatherState = { phase: "loading" } | WeatherReady;

function weatherIcon(code: number): { className: string; path: string } {
  if (code === 0) {
    return {
      className: "text-yellow-400 heat-wave",
      path: "M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z",
    };
  }
  if (code >= 1 && code <= 3) {
    return {
      className: "text-gray-400",
      path: "M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z",
    };
  }
  if (code >= 51 && code <= 67) {
    return {
      className: "text-blue-400",
      path: "M20 16.2A4.5 4.5 0 0017.5 8h-1.832A4.5 4.5 0 0011.5 3.5h-.332A4.5 4.5 0 006.5 8H5a4.5 4.5 0 00-4.5 4.5c0 2.48 2.02 4.5 4.5 4.5h12.5a4.5 4.5 0 002.5-8.3zM8 21v-2m4 2v-2m4 2v-2",
    };
  }
  return {
    className: "text-gray-300",
    path: "M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z",
  };
}

export function WeatherWidget() {
  const [state, setState] = useState<WeatherState>({ phase: "loading" });

  useEffect(() => {
    if (typeof navigator === "undefined" || !navigator.geolocation) {
      setState({
        phase: "ready",
        temp: "22°C",
        location: "Default Location",
        code: 0,
      });
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          const geoRes = await fetch(
            `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
          );
          const geoData = await geoRes.json();
          const city =
            geoData.city || geoData.locality || "Unknown Location";

          const weatherRes = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`
          );
          const weatherData = await weatherRes.json();
          const temp = Math.round(weatherData.current_weather.temperature);
          const weatherCode = weatherData.current_weather.weathercode;

          setState({
            phase: "ready",
            temp: `${temp}°C`,
            location: city,
            code: weatherCode,
          });
        } catch {
          setState({
            phase: "ready",
            temp: "22°C",
            location: "Location Unavailable",
            code: 0,
          });
        }
      },
      () => {
        setState({
          phase: "ready",
          temp: "22°C",
          location: "Location Access Denied",
          code: 0,
        });
      },
      { timeout: 10000, enableHighAccuracy: false }
    );
  }, []);

  const ready = state.phase === "ready" ? state : null;
  const icon = ready ? weatherIcon(ready.code) : null;

  return (
    <div className="weather-widget flex items-center gap-4">
      {state.phase === "loading" && (
        <div className="flex items-center gap-2 text-gray-400">
          <svg
            className="h-5 w-5 animate-spin"
            fill="none"
            viewBox="0 0 24 24"
            aria-hidden
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          <span className="font-oswald text-sm">Detecting location...</span>
        </div>
      )}

      {ready && icon && (
        <div className="flex items-center gap-3">
          <svg
            className={`h-8 w-8 ${icon.className}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={icon.path}
            />
          </svg>
          <div>
            <div className="font-racing text-2xl">{ready.temp}</div>
            <div className="font-oswald text-xs text-gray-400">
              {ready.location}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
