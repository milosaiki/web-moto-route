import React from 'react';
import { Navigation } from '../components/Navigation/Navigation';
import { Hero } from '../components/Hero/Hero';
import { RoutePlanner } from '../components/RoutePlanner/RoutePlanner';
import { Features } from '../components/Features/Features';
import { Community } from '../components/Community/Community';
import { Safety } from '../components/Safety/Safety';

export default function Home() {
  return (
    <>
      <div className="noise-overlay"></div>
      <Navigation />
      <main>
        <Hero />
        <Features />
        <RoutePlanner />
        <Community />
        <Safety />
      </main>
    </>
  );
}
