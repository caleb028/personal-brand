"use client";

import React, { useEffect, useRef, useState } from "react";

interface ConstellationNode {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  glowColor: string;
  glowSize: number;
  isBokeh?: boolean;
  pulsePhase: number;
  pulseSpeed: number;
}

interface PulsePacket {
  fromNode: number;
  toNode: number;
  progress: number;
  speed: number;
  color: string;
}

interface AnimatedWorkspaceBackgroundProps {
  children?: React.ReactNode;
  className?: string;
  overlayOpacity?: number;
  enableParticles?: boolean;
  interactive?: boolean;
}

export function AnimatedWorkspaceBackground({
  children,
  className = "",
  overlayOpacity = 0.75,
  enableParticles = true,
  interactive = true,
}: AnimatedWorkspaceBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setIsReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setIsReducedMotion(e.matches);
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  useEffect(() => {
    if (!enableParticles) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = 0;
    let height = 0;

    // Palette drawn directly from the animated network constellation artwork
    const nodeColors = [
      { fill: "#FF2A4D", glow: "rgba(255, 42, 77, 0.65)", size: [2.5, 4.5] }, // Vivid Ruby Red
      { fill: "#FFB300", glow: "rgba(255, 179, 0, 0.6)", size: [2.5, 4.2] },  // Warm Gold / Amber
      { fill: "#00C2FF", glow: "rgba(0, 194, 255, 0.65)", size: [2.8, 5] },   // Electric Cyan
      { fill: "#087F5B", glow: "rgba(8, 127, 91, 0.6)", size: [2.4, 4] },    // Brand Emerald
      { fill: "#FFFFFF", glow: "rgba(255, 255, 255, 0.5)", size: [1.8, 3] },  // Pure White
    ];

    const bokehColors = [
      "rgba(255, 42, 77, 0.14)",
      "rgba(255, 179, 0, 0.16)",
      "rgba(0, 194, 255, 0.14)",
      "rgba(8, 127, 91, 0.14)",
    ];

    let nodes: ConstellationNode[] = [];
    let pulses: PulsePacket[] = [];

    const mouse = {
      x: -9999,
      y: -9999,
      active: false,
      radius: 140,
    };

    const initNodes = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);

      const count = Math.min(Math.max(Math.floor((width * height) / 20000), 30), 75);
      nodes = [];
      pulses = [];

      // 1. Soft background bokeh orbs
      const bokehCount = Math.floor(count * 0.22);
      for (let i = 0; i < bokehCount; i++) {
        nodes.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.12,
          vy: (Math.random() - 0.5) * 0.12,
          radius: 14 + Math.random() * 24,
          color: bokehColors[Math.floor(Math.random() * bokehColors.length)],
          glowColor: "transparent",
          glowSize: 0,
          isBokeh: true,
          pulsePhase: Math.random() * Math.PI * 2,
          pulseSpeed: 0.008 + Math.random() * 0.015,
        });
      }

      // 2. Network constellation nodes
      for (let i = 0; i < count; i++) {
        const conf = nodeColors[Math.floor(Math.random() * nodeColors.length)];
        const rad =
          conf.size[0] + Math.random() * (conf.size[1] - conf.size[0]);

        nodes.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.35, // Gentle slow motion drift
          vy: (Math.random() - 0.5) * 0.35,
          radius: rad,
          color: conf.fill,
          glowColor: conf.glow,
          glowSize: rad * 2.6,
          isBokeh: false,
          pulsePhase: Math.random() * Math.PI * 2,
          pulseSpeed: 0.015 + Math.random() * 0.025,
        });
      }
    };

    const handleResize = () => {
      initNodes();
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!interactive) return;
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.active = true;
    };

    const handleMouseLeave = () => {
      mouse.active = false;
      mouse.x = -9999;
      mouse.y = -9999;
    };

    window.addEventListener("resize", handleResize);
    if (interactive) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseleave", handleMouseLeave);
    }

    initNodes();

    let lastPulseTime = 0;
    const maybeSpawnPulse = (now: number) => {
      if (now - lastPulseTime > 200 && pulses.length < 14) {
        lastPulseTime = now;
        const nonBokeh = nodes
          .map((n, idx) => ({ n, idx }))
          .filter(({ n }) => !n.isBokeh);
        if (nonBokeh.length < 2) return;

        const randIdx = Math.floor(Math.random() * nonBokeh.length);
        const source = nonBokeh[randIdx];

        let bestTarget = -1;
        let minDist = 130;
        for (let j = 0; j < nonBokeh.length; j++) {
          if (j === randIdx) continue;
          const target = nonBokeh[j];
          const dx = target.n.x - source.n.x;
          const dy = target.n.y - source.n.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < minDist) {
            minDist = dist;
            bestTarget = target.idx;
          }
        }

        if (bestTarget !== -1) {
          pulses.push({
            fromNode: source.idx,
            toNode: bestTarget,
            progress: 0,
            speed: 0.018 + Math.random() * 0.022,
            color: source.n.color,
          });
        }
      }
    };

    let tick = 0;
    const render = (time: number) => {
      ctx.clearRect(0, 0, width, height);
      tick++;

      maybeSpawnPulse(time);

      // Update positions
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];

        if (!isReducedMotion) {
          n.x += n.vx;
          n.y += n.vy;

          if (n.x < -30) n.x = width + 30;
          if (n.x > width + 30) n.x = -30;
          if (n.y < -30) n.y = height + 30;
          if (n.y > height + 30) n.y = -30;

          // Mouse interaction (gentle repulsion)
          if (mouse.active && !n.isBokeh) {
            const dx = mouse.x - n.x;
            const dy = mouse.y - n.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < mouse.radius && dist > 0) {
              const force = (1 - dist / mouse.radius) * 0.55;
              n.x -= (dx / dist) * force;
              n.y -= (dy / dist) * force;
            }
          }
        }
      }

      // Draw animated neural connection lines with breathing wave, gradient blend, and flowing data streams
      const maxDistance = 125;
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        if (a.isBokeh) continue;

        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          if (b.isBokeh) continue;

          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDistance) {
            const proximity = 1 - dist / maxDistance;
            // Animated breathing oscillation across each line
            const lineOscillation = Math.sin(tick * 0.035 + (a.pulsePhase + b.pulsePhase));
            const dynamicAlpha = proximity * (0.2 + 0.12 * lineOscillation);

            // Layer A: Base glowing line with node color interpolation
            ctx.setLineDash([]);
            const baseGrad = ctx.createLinearGradient(a.x, a.y, b.x, b.y);
            baseGrad.addColorStop(0, a.color);
            baseGrad.addColorStop(0.5, "rgba(255, 255, 255, 0.85)");
            baseGrad.addColorStop(1, b.color);

            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = baseGrad;
            ctx.globalAlpha = dynamicAlpha;
            ctx.lineWidth = 0.85;
            ctx.stroke();
            ctx.globalAlpha = 1;

            // Layer B: Animated flowing electric energy stream along close lines
            if (dist < 105) {
              const streamAlpha = proximity * (0.35 + 0.2 * lineOscillation);
              ctx.setLineDash([4, 10]);
              ctx.lineDashOffset = -(tick * 0.85 + (i * 3 + j * 7) % 20);

              ctx.beginPath();
              ctx.moveTo(a.x, a.y);
              ctx.lineTo(b.x, b.y);
              ctx.strokeStyle = "rgba(255, 255, 255, 0.9)";
              ctx.globalAlpha = streamAlpha;
              ctx.lineWidth = 1.1;
              ctx.stroke();
              ctx.globalAlpha = 1;
            }
          }
        }

        // Layer C: Animated electric mouse connection lines
        if (mouse.active) {
          const mdx = mouse.x - a.x;
          const mdy = mouse.y - a.y;
          const mDist = Math.sqrt(mdx * mdx + mdy * mdy);
          if (mDist < mouse.radius) {
            const mProximity = 1 - mDist / mouse.radius;
            const mPulse = 0.85 + 0.15 * Math.sin(tick * 0.08 + a.pulsePhase);

            // Flowing electric dashes toward the cursor
            ctx.setLineDash([5, 7]);
            ctx.lineDashOffset = -tick * 1.5;

            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.strokeStyle = `rgba(0, 194, 255, ${mProximity * 0.7 * mPulse})`;
            ctx.lineWidth = 1.35;
            ctx.stroke();

            // Subtle solid core line
            ctx.setLineDash([]);
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.strokeStyle = `rgba(255, 255, 255, ${mProximity * 0.3})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }
      ctx.setLineDash([]); // Ensure reset

      // Draw animated laser light packets / data streaks along connection lines
      for (let p = pulses.length - 1; p >= 0; p--) {
        const pulse = pulses[p];
        const from = nodes[pulse.fromNode];
        const to = nodes[pulse.toNode];

        if (!from || !to) {
          pulses.splice(p, 1);
          continue;
        }

        pulse.progress += pulse.speed;
        if (pulse.progress >= 1) {
          pulses.splice(p, 1);
          continue;
        }

        const headX = from.x + (to.x - from.x) * pulse.progress;
        const headY = from.y + (to.y - from.y) * pulse.progress;

        // Animated laser trail tail behind the head
        const trailProgress = Math.max(0, pulse.progress - 0.14);
        const tailX = from.x + (to.x - from.x) * trailProgress;
        const tailY = from.y + (to.y - from.y) * trailProgress;

        const pulseGrad = ctx.createLinearGradient(tailX, tailY, headX, headY);
        pulseGrad.addColorStop(0, "transparent");
        pulseGrad.addColorStop(0.6, pulse.color);
        pulseGrad.addColorStop(1, "#FFFFFF");

        ctx.beginPath();
        ctx.moveTo(tailX, tailY);
        ctx.lineTo(headX, headY);
        ctx.strokeStyle = pulseGrad;
        ctx.lineWidth = 2.2;
        ctx.stroke();

        // Glowing packet head
        ctx.beginPath();
        ctx.arc(headX, headY, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = "#FFFFFF";
        ctx.shadowColor = pulse.color;
        ctx.shadowBlur = 10;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      // Render nodes
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        const pulse = Math.sin(n.pulsePhase + tick * n.pulseSpeed);

        if (n.isBokeh) {
          // Soft bokeh background orb
          ctx.beginPath();
          ctx.arc(n.x, n.y, n.radius + pulse * 2, 0, Math.PI * 2);
          ctx.fillStyle = n.color;
          ctx.fill();
          continue;
        }

        const curRadius = Math.max(n.radius + pulse * 0.45, 1);

        // Radial glow halo
        if (n.glowSize > 0) {
          const grad = ctx.createRadialGradient(
            n.x,
            n.y,
            0,
            n.x,
            n.y,
            n.glowSize + pulse * 1.5
          );
          grad.addColorStop(0, n.glowColor);
          grad.addColorStop(1, "transparent");

          ctx.beginPath();
          ctx.arc(n.x, n.y, n.glowSize + pulse * 1.5, 0, Math.PI * 2);
          ctx.fillStyle = grad;
          ctx.fill();
        }

        // Solid node core
        ctx.beginPath();
        ctx.arc(n.x, n.y, curRadius, 0, Math.PI * 2);
        ctx.fillStyle = n.color;
        ctx.fill();
      }

      if (!isReducedMotion) {
        animationFrameId = requestAnimationFrame(render);
      }
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      if (interactive) {
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, [enableParticles, interactive, isReducedMotion]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full flex-1 flex flex-col ${className}`}
    >
      {/* 1. Fixed Viewport Background pinned behind the entire page across all sections */}
      <div
        className="fixed inset-0 w-full h-full overflow-hidden pointer-events-none z-0"
        aria-hidden="true"
      >
        {/* Underlying First Animated Network Constellation Artwork with Slow Motion Ken Burns Drift */}
        <div
          className="absolute -inset-10 bg-cover pointer-events-none animate-network-drift scale-105"
          style={{
            backgroundImage: "url('/images/network-constellation.jpg')",
            backgroundPosition: "center center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            filter: "brightness(0.9) contrast(1.15) saturate(1.12)",
            transformOrigin: "center center",
          }}
        />

        {/* Ambient Contrast Tint (Preserves network clarity, zero harsh white, high contrast across all sections) */}
        <div
          className="absolute inset-0 z-[1] pointer-events-none"
          style={{
            background: `
              radial-gradient(ellipse at 70% 45%, rgba(10, 16, 29, 0.45) 0%, rgba(10, 16, 29, 0.75) 60%, rgba(10, 16, 29, 0.92) 100%),
              radial-gradient(ellipse at 25% 75%, rgba(0, 194, 255, 0.08) 0%, transparent 60%),
              radial-gradient(ellipse at 75% 25%, rgba(255, 42, 77, 0.08) 0%, transparent 60%),
              linear-gradient(180deg, 
                rgba(10, 16, 29, 0.5) 0%, 
                rgba(10, 16, 29, 0.22) 25%, 
                rgba(10, 16, 29, 0.18) 50%, 
                rgba(10, 16, 29, 0.25) 75%, 
                rgba(10, 16, 29, 0.7) 100%
              )
            `,
          }}
        />

        {/* Live Interactive Constellation Canvas (Plexus links, traveling light pulses & floating nodes) */}
        {enableParticles && (
          <canvas
            ref={canvasRef}
            className="absolute inset-0 z-[2] pointer-events-none w-full h-full opacity-80"
          />
        )}
      </div>

      {/* Foreground Content */}
      <div className="relative z-10 w-full flex-1 flex flex-col">{children}</div>
    </div>
  );
}
