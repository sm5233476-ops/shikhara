// src/components/ui/CustomCursor.tsx
import React, { useEffect, useRef } from 'react';

interface RibbonNode {
  x: number;
  y: number;
  age: number;
}

export const CustomCursor: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const onResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', onResize);

    const history: RibbonNode[] = [];
    const MAX_POINTS = 32;

    let mouseX = -100;
    let mouseY = -100;
    let smoothX = -100;
    let smoothY = -100;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (smoothX === -100) {
        smoothX = mouseX;
        smoothY = mouseY;
      }
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });

    let animId: number;

    // 60-120 FPS Silky Liquid Calligraphic Flow Engine
    const renderLoop = () => {
      ctx.clearRect(0, 0, width, height);

      // Liquid inertia
      smoothX += (mouseX - smoothX) * 0.32;
      smoothY += (mouseY - smoothY) * 0.32;

      history.unshift({ x: smoothX, y: smoothY, age: 0 });
      if (history.length > MAX_POINTS) {
        history.pop();
      }

      for (let i = history.length - 1; i >= 0; i--) {
        history[i].age++;
      }

      // Draw continuous Bezier ribbon with dynamic velocity stroke
      if (history.length > 3) {
        ctx.beginPath();
        ctx.moveTo(history[0].x, history[0].y);

        for (let i = 0; i < history.length - 1; i++) {
          const xc = (history[i].x + history[i + 1].x) / 2;
          const yc = (history[i].y + history[i + 1].y) / 2;
          ctx.quadraticCurveTo(history[i].x, history[i].y, xc, yc);
        }

        // Moonlight Silver Outer Glow
        ctx.strokeStyle = 'rgba(230, 238, 250, 0.55)';
        ctx.lineWidth = 3.5;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.shadowBlur = 12;
        ctx.shadowColor = 'rgba(230, 238, 250, 0.85)';
        ctx.stroke();

        // Inner Core Silk Thread
        ctx.beginPath();
        ctx.moveTo(history[0].x, history[0].y);
        for (let i = 0; i < Math.min(history.length - 1, 16); i++) {
          const xc = (history[i].x + history[i + 1].x) / 2;
          const yc = (history[i].y + history[i + 1].y) / 2;
          ctx.quadraticCurveTo(history[i].x, history[i].y, xc, yc);
        }
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 1.4;
        ctx.shadowBlur = 4;
        ctx.shadowColor = '#ffffff';
        ctx.stroke();
      }

      animId = requestAnimationFrame(renderLoop);
    };

    animId = requestAnimationFrame(renderLoop);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('mousemove', onMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 9999,
      }}
    />
  );
};

export default CustomCursor;