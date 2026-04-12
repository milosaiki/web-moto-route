"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { WeatherWidget } from "@motoroute/components/WeatherWidget";
import { SiteFooter } from "@motoroute/components/SiteFooter";
import { cdn } from "@motoroute/lib/cdn";

type RideMode = "curvy" | "fast" | "dirt";

export default function HomePage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [rideMode, setRideMode] = useState<RideMode>("curvy");
  const [calcLoading, setCalcLoading] = useState(false);
  const [routeVisible, setRouteVisible] = useState(false);
  const [routeAnimKey, setRouteAnimKey] = useState(0);
  const [calcLabel, setCalcLabel] = useState("CALCULATE ROUTE");

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

      gsap.from(".tacho-card", {
        scrollTrigger: { trigger: "#features", start: "top 80%" },
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power2.out",
      });
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

          {/* Desktop nav links */}
          <div className="hidden items-center gap-10 md:flex">
            {[
              ["#features", "FEATURES"],
              ["#planner", "PLANNER"],
              ["#map", "MAP"],
            ].map(([href, label]) => (
              <a
                key={href}
                href={href}
                className="group relative py-2 font-oswald text-sm font-medium tracking-[0.15em] text-gray-300 transition-colors hover:text-white"
              >
                {label}
                <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-orange-500 transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
            <button
              type="button"
              className="vibrate-hover piston-btn rounded px-7 py-2.5 font-oswald text-sm font-bold tracking-[0.15em] text-white"
            >
              START ENGINE
            </button>
          </div>

          {/* Mobile hamburger */}
          <button
            type="button"
            className="p-2 text-gray-300 hover:text-white md:hidden"
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
        </div>

        {/* Mobile menu drawer */}
        {mobileMenuOpen && (
          <div className="border-t border-gray-800 bg-black/95 px-6 py-4 md:hidden">
            <div className="flex flex-col gap-1 font-oswald text-sm tracking-widest">
              {(
                [
                  ["features", "FEATURES"],
                  ["planner", "PLANNER"],
                  ["map", "MAP"],
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
                className="piston-btn mt-3 rounded py-3 text-center font-bold text-white"
              >
                START ENGINE
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* ── Hero ── */}
      <section className="relative h-screen min-h-[36rem] overflow-hidden">
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

        {/* Content — absolutely positioned to guarantee centering */}
        <div className="absolute inset-0 z-10 flex items-center px-6 pt-20 sm:px-10 md:px-14 lg:px-20 xl:px-24">
          <div className="mx-auto w-full  hero-section-content">
            <div className="max-w-3xl">
              {/* Eyebrow */}
              <div className="mb-8 flex items-center gap-4">
                <div className="h-px w-12 bg-orange-500" />
                <span className="font-oswald text-sm tracking-[0.5em] text-orange-500">
                  REDLINE PERFORMANCE
                </span>
              </div>

              {/* Headline */}
              <h1 className="font-racing mb-6 text-7xl leading-none md:text-8xl lg:text-9xl">
                <span className="block text-white drop-shadow-2xl">RIDE</span>
                <span className="chrome-text block">BEYOND</span>
                <span className="block text-orange-500 drop-shadow-lg">LIMITS</span>
              </h1>

              {/* Subtext */}
              <p className="font-oswald mb-10 max-w-xl text-lg leading-relaxed tracking-wide text-gray-300 drop-shadow-lg md:text-xl">
                THE FIRST NAVIGATION SYSTEM BUILT EXCLUSIVELY FOR RIDERS.{" "}
                <span className="text-orange-400">NO CARS. NO COMPROMISES.</span>
              </p>

              {/* CTAs */}
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                <button
                  type="button"
                  className="vibrate-hover piston-btn flex items-center justify-center gap-3 rounded-lg px-10 py-4 font-oswald text-lg font-bold tracking-wider text-white"
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
                  className="flex items-center justify-center gap-3 rounded-lg border-2 border-white/30 bg-white/10 px-10 py-4 font-oswald text-lg font-bold tracking-wider backdrop-blur-md transition-all hover:border-orange-500 hover:bg-white/15"
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
              <div className="mt-14 grid grid-cols-2 gap-6 border-t border-white/20 pt-8 sm:grid-cols-4">
                {[
                  ["500K+", "ROUTES PLANNED"],
                  ["98%", "ACCURACY"],
                  ["50K+", "ACTIVE RIDERS"],
                  ["24/7", "ROADSIDE"],
                ].map(([n, l]) => (
                  <div key={l}>
                    <div className="font-racing text-3xl text-orange-500">{n}</div>
                    <div className="font-oswald text-xs tracking-widest text-gray-400">{l}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Scroll cue */}
        <div className="absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center gap-2">
          <span className="font-oswald text-xs tracking-widest text-gray-400">TWIST THE THROTTLE</span>
          <div className="flex h-10 w-6 justify-center rounded-full border-2 border-orange-500">
            <div className="mt-2 h-3 w-1 animate-bounce rounded-full bg-orange-500" />
          </div>
        </div>
      </section>

      {/* ── Live Tracking — full viewport width ── */}
      <section id="map" className="bg-gray-800 py-3 route-map">
        {/* Heading — centered, padded */}
        <div className="mx-auto mb-12  px-6 text-center heading">
          <h2 className="font-racing mb-4 text-5xl md:text-6xl">
            <span className="text-white">LIVE</span>{" "}
            <span className="text-orange-500">TRACKING</span>
          </h2>
          <p className="font-oswald text-lg text-gray-400">
            Real-time navigation with local weather conditions
          </p>
        </div>

        {/* Map panel — centered */}
        <div className="mx-auto  overflow-hidden rounded-2xl border-2 border-gray-800 bg-gray-900 shadow-2xl">
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
                <span className="h-2 w-2 animate-pulse rounded-full bg-green-500" />
                GPS Active
              </div>
            </div>
            <WeatherWidget />
          </div>

          {/* Map canvas */}
          <div className="map-mock map-grid relative h-[520px]">
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

            {/* Zoom controls */}
            <div className="absolute left-4 top-4 flex flex-col gap-2">
              <button
                type="button"
                className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-600 bg-gray-800 hover:bg-gray-700"
                aria-label="Zoom in"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </button>
              <button
                type="button"
                className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-600 bg-gray-800 hover:bg-gray-700"
                aria-label="Zoom out"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                </svg>
              </button>
            </div>

            {/* Route stats bar */}
            <div className="absolute bottom-4 left-4 right-4 rounded-xl border border-gray-700 bg-black/90 p-4 backdrop-blur-md stats p-1">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex flex-wrap gap-8">
                  <div>
                    <div className="font-oswald text-xs tracking-wider text-gray-500">DISTANCE</div>
                    <div className="font-racing text-2xl text-white">
                      127<span className="ml-1 text-sm text-gray-400">mi</span>
                    </div>
                  </div>
                  <div className="hidden w-px bg-gray-700 sm:block" />
                  <div>
                    <div className="font-oswald text-xs tracking-wider text-gray-500">TIME</div>
                    <div className="font-racing text-2xl text-white">
                      2:45<span className="ml-1 text-sm text-gray-400">h</span>
                    </div>
                  </div>
                  <div className="hidden w-px bg-gray-700 sm:block" />
                  <div>
                    <div className="font-oswald text-xs tracking-wider text-gray-500">NEXT TURN</div>
                    <div className="font-racing text-2xl text-orange-500">
                      200<span className="ml-1 text-sm text-gray-400">m</span>
                    </div>
                  </div>
                </div>
                <button type="button" className="piston-btn rounded-lg px-6 py-3 font-oswald font-bold">
                  REROUTE
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Route Planner — full viewport width ── */}
      <section id="planner" className="tire-tread-bg relative py-3 py-xl-32">
        <div className="absolute inset-0 bg-black/90" />

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
            <h2 className="font-racing mb-4 text-5xl md:text-7xl">
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
                    <label className="font-oswald mb-4 block text-xs tracking-wider text-gray-500">
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
                        readOnly
                        defaultValue="San Francisco, CA"
                        className="w-full bg-transparent py-5 pr-5 pl-7 font-oswald text-white focus:outline-none destination"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-2 gap-lg-4">
                    <label className="font-oswald mb-4 block text-xs tracking-wider text-gray-500">
                      DESTINATION
                    </label>
                    <div className="flex items-stretch overflow-hidden rounded-lg border-2 border-gray-700 bg-transparent">
                      <div className="flex w-14 shrink-0 items-center justify-center border-gray-700 bg-transparent">
                        <svg className="h-5 w-5 text-orange-500" fill="currentColor" viewBox="0 0 20 20" aria-hidden>
                          <path
                            fillRule="evenodd"
                            d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z px-3"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <input
                        type="text"
                        readOnly
                        defaultValue="Lake Tahoe, NV"
                        className="w-full bg-transparent py-5 pr-5 pl-7 font-oswald text-white focus:outline-none destination"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="font-oswald mb-3 block text-xs tracking-wider text-gray-500">
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
                          className={`rounded-lg border-2 px-2 py-3 text-center font-oswald text-sm font-bold transition-colors ${rideMode === id
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
                    className="vibrate-hover piston-btn mt-4 flex w-full items-center justify-center gap-3 rounded-lg py-4 font-oswald text-lg font-bold tracking-wider text-white disabled:opacity-70"
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
              <div className="relative min-h-[600px] overflow-hidden bg-gray-800 lg:col-span-2">
                <div
                  className="absolute inset-0"
                  style={{
                    backgroundImage:
                      "radial-gradient(circle at 2px 2px, rgba(255,61,0,0.15) 1px, transparent 0)",
                    backgroundSize: "40px 40px",
                  }}
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
                        <div className="font-oswald mb-1 text-xs tracking-wider text-gray-500">DISTANCE</div>
                        <div className="font-racing text-3xl text-white">
                          186<span className="ml-1 text-sm text-gray-400">mi</span>
                        </div>
                      </div>
                      <div className="hidden w-px bg-gray-700 sm:block" />
                      <div>
                        <div className="font-oswald mb-1 text-xs tracking-wider text-gray-500">EST. TIME</div>
                        <div className="font-racing text-3xl text-white">
                          3:42<span className="ml-1 text-sm text-gray-400">h</span>
                        </div>
                      </div>
                    </div>
                    <button type="button" className="piston-btn rounded-lg px-8 py-3 font-oswald font-bold">
                      RIDE
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Features ── */}
      <section id="features" className="engine-turned relative py-4 py-xl-32">
        <div className="absolute inset-0 bg-black/80" />
        <div className="relative mx-auto  px-6">
          <div className="mb-20 text-center py-4 py-xl-32">
            <h2 className="font-racing mb-4 text-5xl md:text-7xl">
              <span className="text-white">BUILT FOR</span>{" "}
              <span className="text-orange-500">RIDERS</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="tacho-card knurled group flex flex-col gap-4 rounded-2xl p-8">
              <div className="mx-auto flex w-fit max-w-full flex-row items-center justify-center gap-3 rounded-full bg-orange-500/20 px-4 py-2">
                <svg className="h-8 w-8 shrink-0 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <h3 className="font-oswald text-2xl font-bold leading-none text-white">AI ROUTING</h3>
              </div>
              <p className="text-center text-sm text-gray-400">
                Machine learning algorithms analyze road quality and rider preferences.
              </p>
            </div>

            <div className="tacho-card knurled group flex flex-col gap-4 rounded-2xl p-8">
              <div className="mx-auto flex w-fit max-w-full flex-row items-center justify-center gap-3 rounded-full bg-blue-500/20 px-4 py-2">
                <svg className="h-8 w-8 shrink-0 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"
                  />
                </svg>
                <h3 className="font-oswald text-2xl font-bold leading-none text-white">WEATHER INTEL</h3>
              </div>
              <p className="text-center text-sm text-gray-400">
                Real-time radar and predictive alerts for storms.
              </p>
            </div>

            <div className="tacho-card knurled group flex flex-col gap-4 rounded-2xl p-8">
              <div className="mx-auto flex w-fit max-w-full flex-row items-center justify-center gap-3 rounded-full bg-green-500/20 px-4 py-2">
                <svg className="h-8 w-8 shrink-0 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <h3 className="font-oswald text-2xl font-bold leading-none text-white">RIDE CREW</h3>
              </div>
              <p className="text-center text-sm text-gray-400">
                Group tracking with live GPS and instant route sharing.
              </p>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </>
  );
}
