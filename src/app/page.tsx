"use client";

import { useCallback, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { WeatherWidget } from "@motoroute/components/WeatherWidget";
import { useGeolocation } from "@motoroute/lib/useGeolocation";
import { SiteFooter } from "@motoroute/components/SiteFooter";
import { CommunitySection } from "@motoroute/components/CommunitySection";
import { SafetySection } from "@motoroute/components/SafetySection";
import { CtaSection } from "@motoroute/components/CtaSection";

const LiveTrackingMap = dynamic(
  () =>
    import("@motoroute/components/LiveTrackingMap").then((m) => ({
      default: m.LiveTrackingMap,
    })),
  { ssr: false },
);
import { cdn } from "@motoroute/lib/cdn";
import { useDesktopNav } from "@motoroute/lib/useDesktopNav";

type RideMode = "curvy" | "fast" | "dirt";

export default function HomePage() {
  const desktopNav = useDesktopNav();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [rideMode, setRideMode] = useState<RideMode>("curvy");
  const [calcLoading, setCalcLoading] = useState(false);
  const [routeVisible, setRouteVisible] = useState(false);
  const [routeAnimKey, setRouteAnimKey] = useState(0);
  const [calcLabel, setCalcLabel] = useState("CALCULATE ROUTE");
  const geo = useGeolocation();
  const [departure, setDeparture] = useState("");
  const [destination, setDestination] = useState("");
  const [decorativeMapZoom, setDecorativeMapZoom] = useState(1);

  const showLiveMap =
    geo.phase === "ready" && geo.latitude != null && geo.longitude != null;

  // Fill departure from reverse-geocode when permission is granted (never touch destination).
  useEffect(() => {
    if (geo.phase !== "ready" || !geo.city) return;
    setDeparture((prev) => (prev.trim() === "" ? geo.city : prev));
  }, [geo.phase, geo.city]);

  const scrollToId = useCallback((id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileMenuOpen(false);
  }, []);

  const calculateRoute = useCallback(() => {
    if (calcLoading) return;
    setCalcLoading(true);
    setCalcLabel("CALCULATING...");
    setRouteVisible(false);

    window.setTimeout(() => {
      setCalcLoading(false);
      setCalcLabel("ROUTE READY");
      setRouteAnimKey((k) => k + 1);
      setRouteVisible(true);
      window.setTimeout(() => {
        setCalcLabel("CALCULATE ROUTE");
      }, 3000);
    }, 2000);
  }, [calcLoading]);

  useEffect(() => {
    if (desktopNav) setMobileMenuOpen(false);
  }, [desktopNav]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      // Hero parallax — background moves slower than scroll
      gsap.to(".hero-parallax", {
        yPercent: 20,
        ease: "none",
        scrollTrigger: {
          trigger: ".hero-parallax",
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      gsap.fromTo(
        "#features .feature-card",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.75,
          stagger: 0.06,
          ease: "power2.out",
          clearProps: "transform,opacity",
          scrollTrigger: { trigger: "#features", start: "top 85%", once: true },
        },
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <>
      {/* ── Navigation ── */}
      <nav className="fixed top-0 z-50 w-full border-b border-gray-800/80 bg-black/95 backdrop-blur-md">
        <div className="mx-auto flex h-20  items-center justify-between px-6 sm:px-8 md:px-10 lg:px-12">
          {/* Logo */}
          <a
            href="#"
            className="flex h-20 min-w-0 flex-shrink-0 cursor-pointer items-center gap-3 self-stretch pr-2 sm:pr-4"
          >
            <span className="block shrink-0 overflow-hidden rounded-2xl md:rounded-3xl">
              <Image
                src={cdn("/logo.png")}
                alt=""
                width={556}
                height={572}
                priority
                aria-hidden
                className="block h-10 w-auto max-h-11 max-w-[min(120px,28vw)] object-contain object-center md:h-11 md:max-h-12 md:max-w-[140px]"
              />
            </span>
            <div className="min-w-0 leading-none">
              <div className="flex items-baseline">
                <span className="font-racing text-3xl tracking-wide text-white">MOTO</span>
                <span className="font-racing text-3xl tracking-wide text-orange-500">ROUTE</span>
              </div>
            </div>
          </a>

          {/* Desktop bar only for wide + fine pointer; touch Chrome stays on the drawer. */}
          {desktopNav ? (
            <div className="flex items-center gap-10">
              {(
                [
                  ["#features", "FEATURES"],
                  ["#planner", "PLANNER"],
                  ["#map", "MAP"],
                  ["#community", "COMMUNITY"],
                  ["#safety", "SAFETY"],
                ] as const
              ).map(([href, label]) => (
                <a
                  key={href}
                  href={href}
                  className="nav-link py-2 font-oswald text-base font-semibold tracking-wide text-gray-300 transition-colors hover:text-orange-400"
                >
                  {label}
                </a>
              ))}
              <button
                type="button"
                className="btn-primary rounded-full px-7 py-2.5 font-oswald text-base font-bold tracking-[0.15em] text-white shadow-lg transition-transform hover:scale-105"
              >
                START ENGINE
              </button>
            </div>
          ) : (
            <button
              type="button"
              className="p-2 text-gray-300 hover:text-white"
              aria-label="Open menu"
              onClick={() => setMobileMenuOpen((o) => !o)}
            >
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          )}
        </div>

        {/* Mobile menu drawer */}
        {mobileMenuOpen && !desktopNav && (
          <div className="border-t border-gray-800 bg-black/95 px-6 py-4">
            <div className="flex flex-col gap-1 font-oswald text-base tracking-widest">
              {(
                [
                  ["features", "FEATURES"],
                  ["planner", "PLANNER"],
                  ["map", "MAP"],
                  ["community", "COMMUNITY"],
                  ["safety", "SAFETY"],
                ] as const
              ).map(([id, label]) => (
                <button
                  key={id}
                  type="button"
                  className="py-3 text-left text-gray-300 hover:text-orange-500"
                  onClick={() => scrollToId(id)}
                >
                  {label}
                </button>
              ))}
              <button
                type="button"
                className="btn-primary mt-3 rounded-full py-3 text-center font-bold text-white"
              >
                START ENGINE
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* ── Hero ── */}
      <section className="relative h-svh max-h-svh overflow-hidden md:h-screen md:max-h-none md:min-h-[36rem]">
        {/* Parallax background container — taller than viewport, translated by GSAP */}
        <div className="hero-parallax absolute inset-0 will-change-transform" style={{ height: '130%', top: '-15%' }}>
          {/* Background: placeholder image shown until video loads */}
          <img
            src={cdn("/hero-image.png")}
            className="absolute inset-0 h-full w-full object-cover"
            alt=""
            fetchPriority="high"
          />
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="none"
            className="absolute inset-0 h-full w-full object-cover"
          >
            <source src={cdn("/hero-video.mp4")} type="video/mp4" />
          </video>
        </div>

        {/* Overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-black/20" />
        <div className="speed-lines absolute inset-0 opacity-20" />

        {/* Content — column on mobile so stats + cue stay inside svh; centered on md+ */}
        <div className="absolute inset-0 z-10 flex flex-col px-6 pt-20 pb-[calc(5.5rem+env(safe-area-inset-bottom,0px))] sm:px-10 md:items-center md:pb-0 md:px-14 lg:px-20 xl:px-24">
          <div className="mx-auto flex min-h-0 w-full flex-1 flex-col justify-center hero-section-content">
            <div className="max-w-3xl">
              {/* Eyebrow */}
              <div className="mb-3 flex items-center gap-3 md:mb-8 md:gap-4">
                <div className="h-px w-8 bg-orange-500 md:w-12" />
                <span className="font-oswald text-sm tracking-[0.35em] text-orange-500 md:text-sm md:tracking-[0.5em]">
                  REDLINE PERFORMANCE
                </span>
              </div>

              {/* Headline */}
              <h1 className="font-racing mb-3 text-5xl leading-[0.95] sm:text-6xl md:mb-6 md:text-8xl md:leading-none lg:text-9xl">
                <span className="block text-white drop-shadow-2xl">RIDE</span>
                <span className="glitch block text-white drop-shadow-2xl" data-text="BEYOND">
                  BEYOND
                </span>
                <span className="block bg-gradient-to-r from-orange-400 via-red-500 to-orange-600 bg-clip-text text-transparent drop-shadow-lg">
                  LIMITS
                </span>
              </h1>

              {/* Subtext */}
              <p className="font-oswald mb-5 max-w-xl text-base leading-snug tracking-wide text-gray-300 drop-shadow-lg sm:text-lg md:mb-10 md:text-xl md:leading-relaxed">
                THE FIRST NAVIGATION SYSTEM BUILT EXCLUSIVELY FOR RIDERS.{" "}
                <span className="text-orange-400">NO CARS. NO COMPROMISES.</span>
              </p>

              {/* CTAs */}
              <div className="flex flex-col gap-2.5 sm:flex-row sm:items-center sm:gap-4">
                <button
                  type="button"
                  className="btn-primary flex items-center justify-center gap-2 rounded-full px-8 py-3 font-oswald text-base font-bold tracking-wider text-white shadow-lg transition-transform hover:scale-105 md:gap-3 md:px-10 md:py-4 md:text-lg"
                >
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20" aria-hidden>
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                      clipRule="evenodd"
                    />
                  </svg>
                  IGNITION ON
                </button>
                <button
                  type="button"
                  onClick={() => scrollToId("map")}
                  className="flex items-center justify-center gap-2 rounded-full border-2 border-white/20 px-8 py-3 font-oswald text-base font-bold tracking-wider transition-all hover:border-orange-500 hover:bg-orange-500/10 md:gap-3 md:px-10 md:py-4 md:text-lg"
                >
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 14M15 14V4"
                    />
                  </svg>
                  VIEW MAP
                </button>
              </div>

              {/* Stats */}
              <div className="mt-5 grid grid-cols-2 gap-x-3 gap-y-3 border-t border-white/20 pt-4 sm:grid-cols-4 sm:gap-6 md:mt-14 md:pt-8">
                {[
                  ["500K+", "ROUTES PLANNED"],
                  ["98%", "ACCURACY"],
                  ["50K+", "ACTIVE RIDERS"],
                  ["24/7", "ROADSIDE"],
                ].map(([n, l]) => (
                  <div key={l}>
                    <div className="font-racing text-xl text-orange-500 sm:text-2xl md:text-3xl">{n}</div>
                    <div className="font-oswald text-xs leading-tight tracking-wider text-gray-400 sm:text-sm md:tracking-widest">
                      {l}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Scroll cue */}
        <div className="scroll-cue absolute bottom-[max(0.75rem,env(safe-area-inset-bottom,0px))] left-1/2 z-30 flex flex-col items-center gap-1 md:bottom-8 md:gap-2">
          <span className="font-oswald text-sm tracking-widest text-white drop-shadow-md">TWIST THE THROTTLE</span>
          <div className="flex h-10 w-6 justify-center rounded-full border-2 border-orange-500 shadow-[0_0_10px_rgba(255,107,53,0.5)]">
            <div className="mt-2 h-3 w-1 animate-bounce rounded-full bg-orange-500" />
          </div>
        </div>
      </section>

      {/* ── Live Tracking — full viewport width ── */}
      <section id="map" className="relative py-16 md:py-24 route-map">
        <div className="absolute inset-0 bg-black/80" />
        {/* Heading — centered, padded */}
        <div className="relative mx-auto mb-12 px-6 text-center heading">
          <div className="mb-4 inline-flex items-center gap-2">
            <svg className="h-5 w-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span className="font-oswald text-sm tracking-[0.5em] text-orange-500">NAVIGATION HQ</span>
          </div>
          <h2 className="font-racing mb-4 text-5xl md:text-7xl">
            <span className="text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.15)]">LIVE</span>{" "}
            <span className="text-orange-500 drop-shadow-[0_0_30px_rgba(255,107,53,0.4)]">TRACKING</span>
          </h2>
          <p className="font-oswald text-lg text-gray-300 md:text-xl">
            Real-time navigation with local weather conditions
          </p>
          <div className="mx-auto mt-4 h-1 w-32 bg-gradient-to-r from-transparent via-orange-500 to-transparent" />
        </div>

        {/* Map panel — centered */}
        <div className="relative mx-auto  overflow-hidden rounded-2xl border-2 border-gray-800 bg-gray-900 shadow-2xl">
          {/* Toolbar */}
          <div className="flex flex-col gap-4 border-b border-gray-700 bg-gray-800 px-6 py-4 sm:flex-row sm:items-center sm:justify-between info">
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-2">
                <svg
                  className="h-5 w-5 text-orange-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <span className="font-oswald font-bold">CURRENT RIDE</span>
              </div>
              <div className="hidden h-6 w-px bg-gray-600 sm:block" />
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <span
                  className={`h-2 w-2 rounded-full ${
                    geo.phase === "ready"
                      ? "animate-pulse bg-green-500"
                      : geo.phase === "loading"
                        ? "animate-pulse bg-amber-400"
                        : "bg-red-500"
                  }`}
                />
                {geo.phase === "ready"
                  ? "GPS Active"
                  : geo.phase === "loading"
                    ? "Locating…"
                    : "GPS unavailable"}
              </div>
            </div>
            <WeatherWidget geo={geo} />
          </div>

          {/* Map canvas */}
          <div className="map-mock map-grid relative h-[520px]">
            {showLiveMap ? (
              <LiveTrackingMap latitude={geo.latitude!} longitude={geo.longitude!} />
            ) : (
              <>
                <div
                  className="absolute inset-0 transition-transform duration-200 ease-out will-change-transform"
                  style={{
                    transform: `scale(${decorativeMapZoom})`,
                    transformOrigin: "50% 50%",
                  }}
                >
                  <div className="scanner-line pointer-events-none" aria-hidden />
                  <svg
                    className="absolute inset-0 h-full w-full opacity-20"
                    preserveAspectRatio="none"
                    aria-hidden
                  >
                    <path d="M0,100 Q200,50 400,100 T800,100" fill="none" stroke="#ff3d00" strokeWidth="2" />
                    <path d="M0,200 Q300,150 600,200 T800,200" fill="none" stroke="#ff3d00" strokeWidth="2" />
                    <path d="M0,300 Q250,250 500,300 T800,300" fill="none" stroke="#ff3d00" strokeWidth="2" />
                    <path d="M0,400 Q200,350 400,400 T800,400" fill="none" stroke="#ff3d00" strokeWidth="2" />
                  </svg>

                  <svg
                    className="absolute inset-0 h-full w-full"
                    viewBox="0 0 800 500"
                    preserveAspectRatio="xMidYMid slice"
                    aria-hidden
                  >
                    <defs>
                      <linearGradient id="mapRouteGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#ff3d00" />
                        <stop offset="100%" stopColor="#ff6f00" />
                      </linearGradient>
                      <filter id="mapGlow">
                        <feGaussianBlur stdDeviation="4" result="coloredBlur" />
                        <feMerge>
                          <feMergeNode in="coloredBlur" />
                          <feMergeNode in="SourceGraphic" />
                        </feMerge>
                      </filter>
                    </defs>
                    <path
                      d="M 50,400 C 100,350 80,300 150,250 S 280,200 350,180 S 450,150 550,120 S 700,80 750,50"
                      fill="none"
                      stroke="url(#mapRouteGradient)"
                      strokeWidth="5"
                      strokeLinecap="round"
                      filter="url(#mapGlow)"
                      className="route-animate"
                    />
                    <path
                      d="M 50,400 C 150,380 250,320 350,280 S 550,200 750,50"
                      fill="none"
                      stroke="#666"
                      strokeWidth="3"
                      strokeDasharray="8,4"
                      opacity="0.5"
                    />
                    <g transform="translate(50,400)">
                      <circle r="10" fill="#00c853" className="pulse-marker" />
                      <circle r="15" fill="none" stroke="#00c853" strokeWidth="2" opacity="0.5" />
                      <text x="15" y="5" fill="#00c853" fontFamily="Oswald, sans-serif" fontSize="12">
                        START
                      </text>
                    </g>
                    <g transform="translate(750,50)">
                      <circle r="10" fill="#ff3d00" className="pulse-marker" />
                      <circle r="15" fill="none" stroke="#ff3d00" strokeWidth="2" opacity="0.5" />
                      <text x="15" y="5" fill="#ff3d00" fontFamily="Oswald, sans-serif" fontSize="12">
                        DEST
                      </text>
                    </g>
                    <g transform="translate(200,275)">
                      <circle r="5" fill="#fff" stroke="#333" strokeWidth="2" />
                      <text x="10" y="-10" fill="#fff" fontFamily="Oswald, sans-serif" fontSize="10">
                        Gas
                      </text>
                    </g>
                    <g transform="translate(450,150)">
                      <circle r="5" fill="#fff" stroke="#333" strokeWidth="2" />
                      <text x="10" y="20" fill="#fff" fontFamily="Oswald, sans-serif" fontSize="10">
                        View
                      </text>
                    </g>
                    <g transform="translate(350,180)">
                      <circle r="8" fill="#ff3d00" className="pulse-marker" />
                      <g transform="translate(-12,-26)">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="#ff3d00" aria-hidden>
                          <path d="M12 2L2 22h20L12 2zm0 3.5L18.5 20h-13L12 5.5z" />
                        </svg>
                      </g>
                    </g>
                  </svg>
                </div>

                <div className="absolute left-4 top-4 z-20 flex flex-col gap-2">
                  <button
                    type="button"
                    onClick={() =>
                      setDecorativeMapZoom((z) => Math.min(1.5, Math.round((z + 0.12) * 100) / 100))
                    }
                    className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-600 bg-gray-800 hover:bg-gray-700"
                    aria-label="Zoom in"
                  >
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setDecorativeMapZoom((z) => Math.max(0.72, Math.round((z - 0.12) * 100) / 100))
                    }
                    className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-600 bg-gray-800 hover:bg-gray-700"
                    aria-label="Zoom out"
                  >
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                    </svg>
                  </button>
                </div>
              </>
            )}

            {/* Route stats bar */}
            <div className="absolute bottom-4 left-4 right-4 rounded-xl border border-gray-700 bg-black/90 p-4 backdrop-blur-md stats p-1">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex flex-wrap gap-8">
                  <div>
                    <div className="font-oswald text-sm tracking-wider text-gray-500">DISTANCE</div>
                    <div className="font-racing text-2xl text-white">
                      127<span className="ml-1 text-sm text-gray-400">mi</span>
                    </div>
                  </div>
                  <div className="hidden w-px bg-gray-700 sm:block" />
                  <div>
                    <div className="font-oswald text-sm tracking-wider text-gray-500">TIME</div>
                    <div className="font-racing text-2xl text-white">
                      2:45<span className="ml-1 text-sm text-gray-400">h</span>
                    </div>
                  </div>
                  <div className="hidden w-px bg-gray-700 sm:block" />
                  <div>
                    <div className="font-oswald text-sm tracking-wider text-gray-500">NEXT TURN</div>
                    <div className="font-racing text-2xl text-orange-500">
                      200<span className="ml-1 text-sm text-gray-400">m</span>
                    </div>
                  </div>
                </div>
                <button type="button" className="btn-primary rounded-lg px-6 py-3 font-oswald text-base font-bold text-white">
                  REROUTE
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Route Planner — full viewport width ── */}
      <section id="planner" className="cyber-grid relative py-16 xl:py-32">
        <div className="absolute inset-0 bg-black/80" />

        <div className="relative">
          {/* Heading — centered, padded */}
          <div className="mx-auto mb-16  px-6 text-center route-map">
            <div className="mb-4 inline-flex items-center gap-2 route">
              <svg
                className="h-6 w-6 text-orange-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                />
              </svg>
              <span className="font-oswald text-sm tracking-widest text-orange-500">COMMAND CENTER</span>
            </div>
            <h2 className="font-racing mb-4 text-5xl md:text-7xl route-planning-heading">
              <span className="text-white">ROUTE</span>{" "}
              <span className="text-orange-500">PLANNER</span>
            </h2>
            <div className="mx-auto h-1 w-32 bg-gradient-to-r from-orange-500 to-transparent" />
          </div>

          {/* Planner panel — centered */}
          <div className="mx-auto  overflow-hidden rounded-2xl border-2 border-gray-800 bg-gray-900/95 shadow-2xl backdrop-blur ride-settings-container">
            <div className="grid gap-0 lg:grid-cols-3">
              {/* Settings column */}
              <div className="border-b-2 border-gray-800 from-gray-900 to-black p-8 lg:border-b-0 lg:border-r-2 px-3">
                <h3 className="font-oswald mb-6 flex items-center gap-3 text-xl font-bold text-gray-300">
                  <svg
                    className="h-5 w-5 text-orange-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  RIDE SETTINGS
                </h3>

                <div className="space-y-6 flex flex-col gap-4 p-3">
                  <div className="flex flex-col gap-4">
                    <label className="font-oswald mb-4 block text-sm tracking-wider text-gray-500">
                      DEPARTURE
                    </label>
                    <div className="flex items-stretch overflow-hidden rounded-lg border-2 border-gray-700 bg-transparent">
                      <div className="flex w-14 shrink-0 items-center justify-center border-gray-700 bg-transparent">
                        <svg className="h-5 w-5 text-green-500" fill="currentColor" viewBox="0 0 20 20" aria-hidden>
                          <path
                            fillRule="evenodd"
                            d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <input
                        type="text"
                        value={departure}
                        onChange={(e) => setDeparture(e.target.value)}
                        placeholder={
                          geo.phase === "loading" ? "Requesting location…" : "Enter departure"
                        }
                        className="destination w-full bg-transparent py-5 pr-5 pl-7 font-oswald text-base text-white placeholder:text-gray-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-2 gap-lg-4">
                    <label className="font-oswald mb-4 block text-sm tracking-wider text-gray-500">
                      DESTINATION
                    </label>
                    <div className="flex items-stretch overflow-hidden rounded-lg border-2 border-gray-700 bg-transparent">
                      <div className="flex w-14 shrink-0 items-center justify-center border-gray-700 bg-transparent">
                        <svg className="h-5 w-5 text-orange-500" fill="currentColor" viewBox="0 0 20 20" aria-hidden>
                          <path
                            fillRule="evenodd"
                            d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <input
                        type="text"
                        value={destination}
                        onChange={(e) => setDestination(e.target.value)}
                        placeholder="Enter destination"
                        className="destination w-full bg-transparent py-5 pr-5 pl-7 font-oswald text-base text-white placeholder:text-gray-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="font-oswald mb-3 block text-sm tracking-wider text-gray-500">
                      RIDE MODE
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {(
                        [
                          [
                            "curvy",
                            "CURVY",
                            "M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z",
                          ],
                          ["fast", "FAST", "M13 10V3L4 14h7v7l9-11h-7z"],
                          [
                            "dirt",
                            "DIRT",
                            "M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064",
                          ],
                        ] as const
                      ).map(([id, label, d]) => (
                        <button
                          key={id}
                          type="button"
                          onClick={() => setRideMode(id)}
                          className={`rounded-lg border-2 px-2 py-3 text-center font-oswald text-base font-bold transition-colors ${rideMode === id
                            ? "border-orange-500 bg-orange-500/20 text-orange-400"
                            : "border-gray-700 bg-gray-800 text-gray-400 hover:border-gray-600"
                            }`}
                        >
                          <div className="mb-1">
                            <svg
                              className="mx-auto h-6 w-6"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              aria-hidden
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d={d}
                              />
                            </svg>
                          </div>
                          {label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={calculateRoute}
                    disabled={calcLoading}
                    className="btn-primary mt-4 flex w-full items-center justify-center gap-3 rounded-xl py-4 font-oswald text-lg font-bold tracking-wider text-white disabled:opacity-70"
                  >
                    <svg
                      className={`h-6 w-6 ${calcLoading ? "animate-spin" : "hidden"}`}
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
                    <span>{calcLabel}</span>
                  </button>
                </div>
              </div>

              {/* Map preview column */}
              <div className="map-container relative min-h-[600px] overflow-hidden bg-gray-800 lg:col-span-2">
                <div className="scanner-line pointer-events-none" aria-hidden />
                <img
                  src={cdn("/route-planner-map.png")}
                  alt="Route planner map"
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <svg
                  className="absolute inset-0 h-full w-full"
                  viewBox="0 0 800 600"
                  preserveAspectRatio="xMidYMid slice"
                  aria-hidden
                >
                  <defs>
                    <linearGradient id="plannerRouteGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#ff3d00" />
                      <stop offset="100%" stopColor="#ff6f00" />
                    </linearGradient>
                    <filter id="plannerGlow">
                      <feGaussianBlur stdDeviation="4" result="coloredBlur" />
                      <feMerge>
                        <feMergeNode in="coloredBlur" />
                        <feMergeNode in="SourceGraphic" />
                      </feMerge>
                    </filter>
                  </defs>
                  <path
                    key={routeAnimKey}
                    d="M 100,500 C 150,450 120,400 200,350 S 350,300 400,250 S 550,200 600,150 S 700,100 700,100"
                    fill="none"
                    stroke="url(#plannerRouteGradient)"
                    strokeWidth="6"
                    strokeLinecap="round"
                    filter="url(#plannerGlow)"
                    opacity={routeVisible ? 1 : 0}
                    className={routeVisible ? "route-animate" : ""}
                  />
                  <g transform="translate(100,500)">
                    <circle r="12" fill="#00c853" className="pulse-marker" />
                    <circle r="18" fill="none" stroke="#00c853" strokeWidth="2" opacity="0.5" className="pulse-marker" />
                  </g>
                  <g transform="translate(700,100)">
                    <circle r="12" fill="#ff3d00" className="pulse-marker" />
                    <circle r="18" fill="none" stroke="#ff3d00" strokeWidth="2" opacity="0.5" className="pulse-marker" />
                  </g>
                </svg>

                <div className="absolute bottom-6 left-6 right-6 rounded-xl border-2 border-gray-800 bg-black/90 p-4 backdrop-blur-md stats">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex flex-wrap gap-8">
                      <div>
                        <div className="font-oswald mb-1 text-sm tracking-wider text-gray-500">DISTANCE</div>
                        <div className="font-racing text-3xl text-white">
                          186<span className="ml-1 text-sm text-gray-400">mi</span>
                        </div>
                      </div>
                      <div className="hidden w-px bg-gray-700 sm:block" />
                      <div>
                        <div className="font-oswald mb-1 text-sm tracking-wider text-gray-500">EST. TIME</div>
                        <div className="font-racing text-3xl text-white">
                          3:42<span className="ml-1 text-sm text-gray-400">h</span>
                        </div>
                      </div>
                    </div>
                    <button type="button" className="btn-primary rounded-lg px-8 py-3 font-oswald text-base font-bold text-white">
                      RIDE
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Features (index.html: feature-card hover + icon scale) ── */}
      <section id="features" className="relative py-16 xl:py-32">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900/50 to-black" />
        <div className="relative mx-auto px-6">
          <div className="mb-20 text-center">
            <h2 className="font-display mb-4 text-4xl font-bold md:text-6xl">
              <span className="text-white">ENGINEERED FOR</span>{" "}
              <span className="text-orange-500">RIDERS</span>
            </h2>
            <div className="mx-auto h-1 w-24 bg-gradient-to-r from-orange-500 to-transparent" />
          </div>

          <div className="grid grid-cols-1 items-stretch gap-8 md:grid-cols-2 lg:grid-cols-3">
            <div className="feature-card group flex h-full min-h-88 flex-col bg-gray-900/85 p-8 backdrop-blur-sm">
              <div className="mb-6 flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-orange-500/20 transition-transform duration-300 group-hover:scale-110">
                <svg className="h-7 w-7 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                  />
                </svg>
              </div>
              <h3 className="font-display mb-3 shrink-0 text-xl font-bold">AI Route Intelligence</h3>
              <p className="flex-1 text-base leading-relaxed text-gray-400">
                Machine learning algorithms analyze road quality, elevation changes, and rider preferences to generate
                the perfect path.
              </p>
              <ul className="mt-4 shrink-0 space-y-2 text-base text-gray-500">
                <li className="flex items-center gap-2">
                  <svg className="h-4 w-4 shrink-0 text-orange-500" fill="currentColor" viewBox="0 0 20 20" aria-hidden>
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Curvature analysis
                </li>
                <li className="flex items-center gap-2">
                  <svg className="h-4 w-4 shrink-0 text-orange-500" fill="currentColor" viewBox="0 0 20 20" aria-hidden>
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Surface condition reports
                </li>
              </ul>
            </div>

            <div className="feature-card group flex h-full min-h-88 flex-col bg-gray-900/85 p-8 backdrop-blur-sm">
              <div className="mb-6 flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-blue-500/20 transition-transform duration-300 group-hover:scale-110">
                <svg className="h-7 w-7 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"
                  />
                </svg>
              </div>
              <h3 className="font-display mb-3 shrink-0 text-xl font-bold">Weather Intelligence</h3>
              <p className="flex-1 text-base leading-relaxed text-gray-400">
                Real-time weather overlays and predictive alerts keep you safe from sudden storms and hazardous
                conditions.
              </p>
              <div className="mt-4 flex shrink-0 flex-wrap gap-2">
                <span className="rounded border border-blue-500/30 bg-blue-500/20 px-2 py-1 text-xs text-blue-400">Radar</span>
                <span className="rounded border border-purple-500/30 bg-purple-500/20 px-2 py-1 text-xs text-purple-400">
                  Wind
                </span>
                <span className="rounded border border-yellow-500/30 bg-yellow-500/20 px-2 py-1 text-xs text-yellow-400">
                  Temp
                </span>
              </div>
            </div>

            <div className="feature-card group flex h-full min-h-88 flex-col bg-gray-900/85 p-8 backdrop-blur-sm">
              <div className="mb-6 flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-green-500/20 transition-transform duration-300 group-hover:scale-110">
                <svg className="h-7 w-7 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <h3 className="font-display mb-3 shrink-0 text-xl font-bold">Live Group Tracking</h3>
              <p className="flex-1 text-base leading-relaxed text-gray-400">
                Ride together seamlessly. Share routes instantly and track your group&apos;s location and ETAs in
                real-time.
              </p>
              <div className="mt-4 flex shrink-0 -space-x-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-gray-900 bg-orange-500 text-xs font-bold">
                  JD
                </div>
                <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-gray-900 bg-blue-500 text-xs font-bold">
                  MK
                </div>
                <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-gray-900 bg-purple-500 text-xs font-bold">
                  +3
                </div>
              </div>
            </div>

            <div className="feature-card group flex h-full min-h-88 flex-col bg-gray-900/85 p-8 backdrop-blur-sm">
              <div className="mb-6 flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-purple-500/20 transition-transform duration-300 group-hover:scale-110">
                <svg className="h-7 w-7 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h3 className="font-display mb-3 shrink-0 text-xl font-bold">Offline Maps</h3>
              <p className="flex-1 text-base leading-relaxed text-gray-400">
                Download detailed map tiles for remote areas. Never lose your way when you lose cell service.
              </p>
              <div className="mt-4 shrink-0 rounded-lg bg-gray-800 p-2">
                <div className="mb-1 flex justify-between text-xs text-gray-500">
                  <span>Storage Used</span>
                  <span>2.4 GB</span>
                </div>
                <div className="h-2 w-full rounded-full bg-gray-700">
                  <div className="h-2 w-[45%] rounded-full bg-purple-500" />
                </div>
              </div>
            </div>

            <div className="feature-card group flex h-full min-h-88 flex-col bg-gray-900/85 p-8 backdrop-blur-sm">
              <div className="mb-6 flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-yellow-500/20 transition-transform duration-300 group-hover:scale-110">
                <svg className="h-7 w-7 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                  />
                </svg>
              </div>
              <h3 className="font-display mb-3 shrink-0 text-xl font-bold">Universal Export</h3>
              <p className="flex-1 text-base leading-relaxed text-gray-400">
                Export routes to GPX format compatible with Garmin, TomTom, and all major GPS devices.
              </p>
              <div className="mt-4 flex shrink-0 gap-2">
                <span className="rounded border border-gray-700 px-2 py-1 text-xs text-gray-500">.GPX</span>
                <span className="rounded border border-gray-700 px-2 py-1 text-xs text-gray-500">.KML</span>
                <span className="rounded border border-gray-700 px-2 py-1 text-xs text-gray-500">.FIT</span>
              </div>
            </div>

            <div className="feature-card group flex h-full min-h-88 flex-col bg-gray-900/85 p-8 backdrop-blur-sm">
              <div className="mb-6 flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-red-500/20 transition-transform duration-300 group-hover:scale-110">
                <svg className="h-7 w-7 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </div>
              <h3 className="font-display mb-3 shrink-0 text-xl font-bold">Emergency Response</h3>
              <p className="flex-1 text-base leading-relaxed text-gray-400">
                One-tap emergency contact and automatic incident detection with GPS coordinates.
              </p>
              <button
                type="button"
                className="mt-4 flex w-full shrink-0 items-center justify-center gap-2 rounded-lg border border-red-500/30 py-2 text-sm text-red-400 transition-colors hover:bg-red-500/10"
              >
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20" aria-hidden>
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                    clipRule="evenodd"
                  />
                </svg>
                Emergency Setup
              </button>
            </div>
          </div>
        </div>
      </section>

      <CommunitySection />
      <SafetySection />
      <CtaSection />

      <SiteFooter />
    </>
  );
}
