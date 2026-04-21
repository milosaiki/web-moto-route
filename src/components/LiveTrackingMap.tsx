"use client";

import { useCallback, useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

type LiveTrackingMapProps = {
  latitude: number;
  longitude: number;
};

function fixLeafletDefaultIcons() {
  delete (L.Icon.Default.prototype as unknown as { _getIconUrl?: unknown })._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl:
      "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
    iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
    shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
  });
}

export function LiveTrackingMap({ latitude, longitude }: LiveTrackingMapProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<L.Map | null>(null);
  const markerRef = useRef<L.Marker | null>(null);
  const followUserRef = useRef(true);

  useEffect(() => {
    if (!containerRef.current) return;

    fixLeafletDefaultIcons();

    const map = L.map(containerRef.current, { zoomControl: false }).setView(
      [latitude, longitude],
      15,
    );

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(map);

    const marker = L.marker([latitude, longitude], {
      icon: L.divIcon({
        className: "live-tracking-user-marker",
        html: `<div class="live-tracking-pulse"><span class="live-tracking-dot"></span></div>`,
        iconSize: [24, 24],
        iconAnchor: [12, 12],
      }),
    }).addTo(map);

    mapRef.current = map;
    markerRef.current = marker;

    const stopFollow = () => {
      followUserRef.current = false;
    };
    map.on("dragstart", stopFollow);

    return () => {
      map.off("dragstart", stopFollow);
      map.remove();
      mapRef.current = null;
      markerRef.current = null;
    };
    // Map is created once; position updates are handled in the following effect.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const map = mapRef.current;
    const marker = markerRef.current;
    if (!map || !marker) return;

    marker.setLatLng([latitude, longitude]);
    if (followUserRef.current) {
      map.setView([latitude, longitude], map.getZoom(), { animate: true });
    }
  }, [latitude, longitude]);

  const zoomIn = useCallback(() => {
    mapRef.current?.zoomIn();
  }, []);

  const zoomOut = useCallback(() => {
    mapRef.current?.zoomOut();
  }, []);

  const latStr = latitude.toFixed(5);
  const lngStr = longitude.toFixed(5);

  return (
    <>
      <div ref={containerRef} className="absolute inset-0 z-10 h-full w-full" />

      <div className="pointer-events-none absolute inset-0 z-5">
        <div className="scanner-line" aria-hidden />
      </div>

      <div className="absolute left-4 top-4 z-20 flex flex-col gap-2">
        <button
          type="button"
          onClick={zoomIn}
          className="pointer-events-auto flex h-10 w-10 items-center justify-center rounded-lg border border-gray-600 bg-gray-800 hover:bg-gray-700"
          aria-label="Zoom in"
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
        </button>
        <button
          type="button"
          onClick={zoomOut}
          className="pointer-events-auto flex h-10 w-10 items-center justify-center rounded-lg border border-gray-600 bg-gray-800 hover:bg-gray-700"
          aria-label="Zoom out"
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
          </svg>
        </button>
      </div>

      <div className="absolute right-4 top-4 z-20 max-w-[min(100%-2rem,280px)] rounded-lg border border-gray-600 bg-black/85 px-3 py-2 font-oswald text-xs text-gray-200 backdrop-blur-md">
        <div className="text-[0.65rem] font-bold tracking-wider text-gray-500">YOUR POSITION</div>
        <div className="mt-1 font-mono text-[0.8rem] leading-snug text-orange-400">
          {latStr}°, {lngStr}°
        </div>
      </div>
    </>
  );
}
