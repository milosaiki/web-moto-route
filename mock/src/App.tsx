/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import {
  Download,
  Map,
  Cpu,
  ShieldAlert,
  CloudRain,
  Users,
  Crosshair,
  WifiOff,
  FileDown,
  Sliders,
  Brain,
  GitCompare,
  Layers,
  TriangleAlert,
  PhoneCall,
  Share2,
  Satellite,
  Link as LinkIcon,
  FileCode,
  Instagram,
  Youtube,
  Twitter,
  Navigation
} from 'lucide-react';

export default function App() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-asphalt-dark text-[#e0e0e0] font-sans">
      {/* Navigation */}
      <nav
        className={`fixed w-full top-0 z-50 transition-all duration-300 flex justify-between items-center px-6 md:px-12 ${
          scrolled
            ? 'bg-[#121212]/95 py-4 shadow-[0_4px_10px_rgba(0,0,0,0.5)] border-b-2 border-primary'
            : 'py-5'
        }`}
      >
        <div className="text-2xl font-black text-white tracking-widest font-heading uppercase">
          MotoRoute <span className="text-primary">AI</span>
        </div>
        <a
          href="#download"
          className="bg-primary text-white px-6 py-2.5 font-bold rounded uppercase tracking-wide transition-all duration-300 border-2 border-primary hover:bg-transparent hover:text-primary flex items-center gap-2"
        >
          <Download size={18} />
          <span className="hidden sm:inline">Get App</span>
        </a>
      </nav>

      {/* Hero Section */}
      <header
        className="h-screen flex flex-col justify-center items-center text-center px-5 relative"
        style={{
          background: `linear-gradient(to bottom, rgba(18, 18, 18, 0.6), rgba(18, 18, 18, 1)), url('https://images.unsplash.com/photo-1558981403-c5f9899a28bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80') center/cover fixed`,
        }}
      >
        <h1 className="text-4xl md:text-6xl font-black text-white mb-3 drop-shadow-[2px_2px_10px_rgba(0,0,0,0.8)]">
          Twist the Throttle.<br />We'll Plan the Route.
        </h1>
        <p className="text-lg md:text-xl max-w-2xl mb-8 text-gray-300">
          AI-powered route planning designed specifically for motorcyclists. Discover curves, avoid storms, and ride together.
        </p>
        <a
          href="#features"
          className="bg-primary text-white px-6 py-3 font-bold rounded uppercase tracking-wide transition-all duration-300 border-2 border-primary hover:bg-transparent hover:text-primary flex items-center gap-2"
        >
          <Navigation size={20} />
          Explore Features
        </a>
      </header>

      {/* Main Features Container */}
      <div className="max-w-7xl mx-auto -mt-12 mb-12 px-5 relative z-10" id="features">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Card 1: Intelligent Planning */}
          <div className="bg-asphalt-light p-10 rounded-lg border-t-4 border-primary shadow-[0_10px_30px_rgba(0,0,0,0.5)] transition-transform duration-300 hover:-translate-y-1 relative overflow-hidden group">
            <div className="absolute -right-5 -bottom-5 text-white/5 opacity-10 group-hover:opacity-20 transition-opacity duration-300 pointer-events-none">
              <Map size={200} strokeWidth={1} />
            </div>
            <div className="relative z-10">
              <div className="flex gap-4 text-primary mb-5">
                <Cpu size={40} />
                <Map size={40} />
              </div>
              <h2 className="text-3xl mb-4 text-white">Intelligent Route Planning</h2>
              <p className="italic mb-5 text-gray-400">
                Enter your start and end points, and optionally add multiple stops. The app uses AI to analyze your route and suggest the best paths based on your preferences.
              </p>
              <ul className="space-y-4">
                <li className="pl-8 relative">
                  <Sliders className="absolute left-0 top-1 text-primary" size={18} />
                  <strong className="text-white">Preferences:</strong> Filter routes by food types, biker-friendly amenities, and points of interest.
                </li>
                <li className="pl-8 relative">
                  <Brain className="absolute left-0 top-1 text-primary" size={18} />
                  <strong className="text-white">AI Insights:</strong> Get AI-generated summaries of your route, including road conditions, scenic highlights, and suggested stops (gas, food, viewpoints).
                </li>
                <li className="pl-8 relative">
                  <GitCompare className="absolute left-0 top-1 text-primary" size={18} />
                  <strong className="text-white">Alternatives:</strong> Compare multiple route options based on time, distance, and curve-intensity.
                </li>
              </ul>
            </div>
          </div>

          {/* Card 2: Weather & Safety */}
          <div className="bg-asphalt-light p-10 rounded-lg border-t-4 border-primary shadow-[0_10px_30px_rgba(0,0,0,0.5)] transition-transform duration-300 hover:-translate-y-1 relative overflow-hidden group">
            <div className="absolute -right-5 -bottom-5 text-white/5 opacity-10 group-hover:opacity-20 transition-opacity duration-300 pointer-events-none">
              <CloudRain size={200} strokeWidth={1} />
            </div>
            <div className="relative z-10">
              <div className="flex gap-4 text-primary mb-5">
                <ShieldAlert size={40} />
                <CloudRain size={40} />
              </div>
              <h2 className="text-3xl mb-4 text-white">Weather & Safety</h2>
              <p className="italic mb-5 text-gray-400">
                Stay safe with real-time weather integration and alerts mapped directly along your planned route.
              </p>
              <ul className="space-y-4">
                <li className="pl-8 relative">
                  <Layers className="absolute left-0 top-1 text-primary" size={18} />
                  <strong className="text-white">Weather Overlays:</strong> Toggle live precipitation, temperature, and wind layers directly on the map.
                </li>
                <li className="pl-8 relative">
                  <TriangleAlert className="absolute left-0 top-1 text-primary" size={18} />
                  <strong className="text-white">Alerts:</strong> Receive automated warnings for severe weather events intersecting your path.
                </li>
                <li className="pl-8 relative">
                  <PhoneCall className="absolute left-0 top-1 text-primary" size={18} />
                  <strong className="text-white">Emergency Contact:</strong> Save an emergency contact in your profile for quick access during incidents.
                </li>
              </ul>
            </div>
          </div>

          {/* Card 3: Community & Tracking */}
          <div className="bg-asphalt-light p-10 rounded-lg border-t-4 border-primary shadow-[0_10px_30px_rgba(0,0,0,0.5)] transition-transform duration-300 hover:-translate-y-1 relative overflow-hidden group">
            <div className="absolute -right-5 -bottom-5 text-white/5 opacity-10 group-hover:opacity-20 transition-opacity duration-300 pointer-events-none">
              <Users size={200} strokeWidth={1} />
            </div>
            <div className="relative z-10">
              <div className="flex gap-4 text-primary mb-5">
                <Users size={40} />
                <Crosshair size={40} />
              </div>
              <h2 className="text-3xl mb-4 text-white">Community & Live Tracking</h2>
              <p className="italic mb-5 text-gray-400">
                Ride together, even when apart. MotoRoute AI makes group rides seamless and safe.
              </p>
              <ul className="space-y-4">
                <li className="pl-8 relative">
                  <Share2 className="absolute left-0 top-1 text-primary" size={18} />
                  <strong className="text-white">Community Routes:</strong> Post your planned rides publicly so others can discover and join them.
                </li>
                <li className="pl-8 relative">
                  <Satellite className="absolute left-0 top-1 text-primary" size={18} />
                  <strong className="text-white">Live ETAs:</strong> Enable live tracking to broadcast your location to other participants. See everyone's progress and ETA in real-time.
                </li>
                <li className="pl-8 relative">
                  <LinkIcon className="absolute left-0 top-1 text-primary" size={18} />
                  <strong className="text-white">Unique Links:</strong> Generate unique, shareable URLs to instantly send your route configuration to friends.
                </li>
              </ul>
            </div>
          </div>

          {/* Card 4: Offline & Export */}
          <div className="bg-asphalt-light p-10 rounded-lg border-t-4 border-primary shadow-[0_10px_30px_rgba(0,0,0,0.5)] transition-transform duration-300 hover:-translate-y-1 relative overflow-hidden group">
            <div className="absolute -right-5 -bottom-5 text-white/5 opacity-10 group-hover:opacity-20 transition-opacity duration-300 pointer-events-none">
              <WifiOff size={200} strokeWidth={1} />
            </div>
            <div className="relative z-10">
              <div className="flex gap-4 text-primary mb-5">
                <WifiOff size={40} />
                <FileDown size={40} />
              </div>
              <h2 className="text-3xl mb-4 text-white">Offline & Export</h2>
              <p className="italic mb-5 text-gray-400">
                Never lose your way when you lose cell service deep in the canyons or mountains.
              </p>
              <ul className="space-y-4">
                <li className="pl-8 relative">
                  <Download className="absolute left-0 top-1 text-primary" size={18} />
                  <strong className="text-white">Offline Maps:</strong> Download map tiles for your saved routes. Choose the detail level and region size to manage storage.
                </li>
                <li className="pl-8 relative">
                  <FileCode className="absolute left-0 top-1 text-primary" size={18} />
                  <strong className="text-white">GPX Export:</strong> Export any planned route to a standard GPX file for use with dedicated GPS devices (Garmin, TomTom, etc.).
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Secondary Parallax Break */}
      <div
        className="h-[400px] flex items-center justify-center text-center px-5 border-y-2 border-primary"
        style={{
          background: `linear-gradient(to right, rgba(18, 18, 18, 0.9), rgba(18, 18, 18, 0.4)), url('https://images.unsplash.com/photo-1449852261643-4f9611db9bd9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80') center/cover fixed`,
        }}
      >
        <h2 className="text-4xl md:text-5xl text-white uppercase drop-shadow-[2px_2px_10px_rgba(0,0,0,1)]">
          Built by Riders.<br />Powered by AI.
        </h2>
      </div>

      {/* Footer */}
      <footer className="bg-[#0a0a0a] py-10 px-5 text-center">
        <div className="text-2xl font-black text-white tracking-widest font-heading uppercase">
          MotoRoute <span className="text-primary">AI</span>
        </div>
        <p className="mt-2 text-[#777]">Your Ultimate Riding Companion.</p>

        <div className="flex justify-center gap-6 my-6">
          <a href="#" className="text-white hover:text-primary transition-colors duration-300">
            <Instagram size={24} />
          </a>
          <a href="#" className="text-white hover:text-primary transition-colors duration-300">
            <Youtube size={24} />
          </a>
          <a href="#" className="text-white hover:text-primary transition-colors duration-300">
            <Twitter size={24} />
          </a>
        </div>

        <p className="text-sm text-[#555]">
          &copy; {new Date().getFullYear()} MotoRoute AI. All rights reserved. Keep the rubber side down.
        </p>
      </footer>
    </div>
  );
}
