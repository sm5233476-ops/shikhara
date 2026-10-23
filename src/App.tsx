// src/App.tsx
import React, { useEffect } from 'react';
import Lenis from 'lenis';
import { CustomCursor } from './components/ui/CustomCursor';
import { Header } from './components/ui/Header';
import { Hero } from './sections/Hero';
import { Silhouette } from './sections/Silhouette';
import { Ascend } from './sections/Ascend';
import { Amenities } from './sections/Amenities';
import { Residences } from './sections/Residences';
import { Viewing } from './sections/Viewing';
import { Footer } from './sections/Footer';

export const App: React.FC = () => {
  // Ultra-Smooth 60-120 FPS Lenis Engine
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.25,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    const animId = requestAnimationFrame(raf);
    return () => {
      cancelAnimationFrame(animId);
      lenis.destroy();
    };
  }, []);

  return (
    <div style={{ position: 'relative', width: '100%', minHeight: '100%' }}>
      {/* Subtle Texture Grain */}
      <div className="film-grain" />

      {/* Magnetic Luxury Cursor */}
      <CustomCursor />

      {/* Fixed Luxury Navigation */}
      <Header />

      {/* Main Sections Flow */}
      <main>
        <Hero />
        <Silhouette />
        <Ascend />
        <Amenities />
        <Residences />
        <Viewing />
      </main>

      {/* Luxury Footer */}
      <Footer />
    </div>
  );
};

export default App;