"use client";

import React, { useEffect, useRef, useState } from "react";

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  glowColor: string;
  glowSize: number;
  isBokeh?: boolean;
  pulseSpeed: number;
  pulsePhase: number;
}

interface PulsePacket {
  fromNode: number;
  toNode: number;
  progress: number;
  speed: number;
  color: string;
}

interface AnimatedNetworkBackgroundProps {
  className?: string;
  interactive?: boolean;
  overlayOpacity?: number; // 0 to 1
  density?: "low" | "medium" | "high";
  children?: React.ReactNode;
}

export function AnimatedNetworkBackground({
  className = "",
  interactive = true,
  overlayOpacity = 0.65,
  density = "medium",
  children,
}: AnimatedNetworkBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  useEffect(() => {
    // Check reduced motion preference
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setIsReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setIsReducedMotion(e.matches);
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = 0;
    let height = 0;

    // Palette inspired directly by the uploaded artwork
    const colors = [
      { fill: "#FF2A4D", glow: "rgba(255, 42, 77, 0.6)", size: [2.5, 5] }, // Vivid Ruby Red
      { fill: "#FFB300", glow: "rgba(255, 179, 0, 0.55)", size: [2.5, 4.5] }, // Warm Gold/Amber
      { fill: "#00C2FF", glow: "rgba(0, 194, 255, 0.6)", size: [3, 5.5] }, // Cyan / Electric Blue
      { fill: "#087F5B", glow: "rgba(8, 127, 91, 0.6)", size: [2.5, 4] }, // Refined Brand Emerald
      { fill: "#FFFFFF", glow: "rgba(255, 255, 255, 0.5)", size: [1.5, 3] }, // Pure White
      { fill: "#E2E8F0", glow: "rgba(226, 232, 240, 0.3)", size: [1.5, 2.5] }, // Muted Silver
    ];

    const bokehColors = [
      "rgba(255, 42, 77, 0.15)",
      "rgba(255, 179, 0, 0.18)",
      "rgba(0, 194, 255, 0.15)",
      "rgba(8, 127, 91, 0.15)",
    ];

    const mouse = {
      x: -9999,
      y: -9999,
      active: false,
      radius: 140,
    };

    let nodes: Node[] = [];
    let pulses: PulsePacket[] = [];

    const initNodes = () => {
      const dpr = window.devicePixelRatio || 1;
      width = container.clientWidth;
      height = container.clientHeight;

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);

      // Node count based on container area and density
      const area = width * height;
      const baseCount =
        density === "high" ? 85 : density === "low" ? 40 : 65;
      const count = Math.min(Math.max(Math.floor((area / 15000) * (baseCount / 50)), 35), 95);

      nodes = [];
      pulses = [];

      // 1. Add Soft Background Bokeh Orbs
      const bokehCount = Math.floor(count * 0.18);
      for (let i = 0; i < bokehCount; i++) {
        nodes.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.15,
          vy: (Math.random() - 0.5) * 0.15,
          radius: 12 + Math.random() * 22,
          color: bokehColors[Math.floor(Math.random() * bokehColors.length)],
          glowColor: "transparent",
          glowSize: 0,
          isBokeh: true,
          pulseSpeed: 0.01 + Math.random() * 0.02,
          pulsePhase: Math.random() * Math.PI * 2,
        });
      }

      // 2. Add Network Nodes
      for (let i = 0; i < count; i++) {
        const colorConfig = colors[Math.floor(Math.random() * colors.length)];
        const rad =
          colorConfig.size[0] +
          Math.random() * (colorConfig.size[1] - colorConfig.size[0]);

        nodes.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.45,
          vy: (Math.random() - 0.5) * 0.45,
          radius: rad,
          color: colorConfig.fill,
          glowColor: colorConfig.glow,
          glowSize: rad * 2.8,
          isBokeh: false,
          pulseSpeed: 0.02 + Math.random() * 0.03,
          pulsePhase: Math.random() * Math.PI * 2,
        });
      }
    };

    const handleResize = () => {
      initNodes();
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!interactive) return;
      const rect = container.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.active = true;
    };

    const handleMouseLeave = () => {
      mouse.active = false;
      mouse.x = -9999;
      mouse.y = -9999;
    };

    window.addEventListener("resize", handleResize);
    if (interactive) {
      container.addEventListener("mousemove", handleMouseMove);
      container.addEventListener("mouseleave", handleMouseLeave);
    }

    initNodes();

    // Pulse generator: periodically send light pulses between close nodes
    let lastPulseTime = 0;
    const maybeSpawnPulse = (now: number) => {
      if (now - lastPulseTime > 350 && pulses.length < 8) {
        lastPulseTime = now;
        const nonBokeh = nodes
          .map((n, idx) => ({ n, idx }))
          .filter(({ n }) => !n.isBokeh);
        if (nonBokeh.length < 2) return;

        const randIdx = Math.floor(Math.random() * nonBokeh.length);
        const source = nonBokeh[randIdx];

        // Find nearest neighbor
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
            speed: 0.015 + Math.random() * 0.02,
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

      // 1. Render Bokeh background orbs
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];
        if (!node.isBokeh) continue;

        if (!isReducedMotion) {
          node.x += node.vx;
          node.y += node.vy;

          if (node.x < -50) node.x = width + 50;
          if (node.x > width + 50) node.x = -50;
          if (node.y < -50) node.y = height + 50;
          if (node.y > height + 50) node.y = -50;
        }

        const pulse = Math.sin(node.pulsePhase + tick * node.pulseSpeed);
        const dynamicRadius = node.radius * (1 + pulse * 0.15);

        ctx.beginPath();
        ctx.arc(node.x, node.y, Math.max(dynamicRadius, 2), 0, Math.PI * 2);
        ctx.fillStyle = node.color;
        ctx.fill();
      }

      // 2. Render connecting lines between network nodes
      const maxDistance = 125;
      for (let i = 0; i < nodes.length; i++) {
        const nodeA = nodes[i];
        if (nodeA.isBokeh) continue;

        for (let j = i + 1; j < nodes.length; j++) {
          const nodeB = nodes[j];
          if (nodeB.isBokeh) continue;

          const dx = nodeB.x - nodeA.x;
          const dy = nodeB.y - nodeA.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDistance) {
            const alpha = (1 - dist / maxDistance) * 0.35;
            ctx.beginPath();
            ctx.moveTo(nodeA.x, nodeA.y);
            ctx.lineTo(nodeB.x, nodeB.y);
            ctx.strokeStyle = `rgba(255, 255, 255, ${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }

        // Connect to mouse if nearby
        if (mouse.active) {
          const mdx = mouse.x - nodeA.x;
          const mdy = mouse.y - nodeA.y;
          const mDist = Math.sqrt(mdx * mdx + mdy * mdy);
          if (mDist < mouse.radius) {
            const mAlpha = (1 - mDist / mouse.radius) * 0.45;
            ctx.beginPath();
            ctx.moveTo(nodeA.x, nodeA.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.strokeStyle = `rgba(0, 194, 255, ${mAlpha})`;
            ctx.lineWidth = 1;
            ctx.stroke();

            // Gentle mouse repulsion
            if (!isReducedMotion) {
              const force = (1 - mDist / mouse.radius) * 0.8;
              nodeA.x -= (mdx / mDist) * force;
              nodeA.y -= (mdy / mDist) * force;
            }
          }
        }
      }

      // 3. Render light pulses travelling between nodes
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

        const px = from.x + (to.x - from.x) * pulse.progress;
        const py = from.y + (to.y - from.y) * pulse.progress;

        ctx.beginPath();
        ctx.arc(px, py, 2.2, 0, Math.PI * 2);
        ctx.fillStyle = "#FFFFFF";
        ctx.shadowColor = pulse.color;
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      // 4. Render Nodes (with glowing halo)
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];
        if (node.isBokeh) continue;

        if (!isReducedMotion) {
          node.x += node.vx;
          node.y += node.vy;

          if (node.x < 0) node.x = width;
          if (node.x > width) node.x = 0;
          if (node.y < 0) node.y = height;
          if (node.y > height) node.y = 0;
        }

        const pulse = Math.sin(node.pulsePhase + tick * node.pulseSpeed);
        const curRadius = Math.max(node.radius + pulse * 0.6, 1);

        // Glow
        if (node.glowSize > 0) {
          const gradient = ctx.createRadialGradient(
            node.x,
            node.y,
            0,
            node.x,
            node.y,
            node.glowSize + pulse * 1.5
          );
          gradient.addColorStop(0, node.glowColor);
          gradient.addColorStop(1, "transparent");

          ctx.beginPath();
          ctx.arc(node.x, node.y, node.glowSize + pulse * 1.5, 0, Math.PI * 2);
          ctx.fillStyle = gradient;
          ctx.fill();
        }

        // Solid Node Core
        ctx.beginPath();
        ctx.arc(node.x, node.y, curRadius, 0, Math.PI * 2);
        ctx.fillStyle = node.color;
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
        container.removeEventListener("mousemove", handleMouseMove);
        container.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, [interactive, density, isReducedMotion]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full overflow-hidden bg-[#0A101D] ${className}`}
    >
      {/* 1. Underlying Artwork Image with Gentle Ken Burns Animation */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center pointer-events-none transform transition-transform duration-1000 ease-out animate-network-drift scale-105"
        style={{
          backgroundImage: "url('/images/network-constellation.jpg')",
          filter: "brightness(0.9) contrast(1.1)",
        }}
      />

      {/* 2. Deep Vignette & Dark Contrast Mask to Preserve Accessibility */}
      <div
        className="absolute inset-0 z-1 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at 70% 50%, rgba(10, 16, 29, ${
            overlayOpacity * 0.7
          }) 0%, rgba(10, 16, 29, ${overlayOpacity}) 60%, rgba(10, 16, 29, 0.95) 100%), linear-gradient(180deg, rgba(10, 16, 29, 0.8) 0%, rgba(10, 16, 29, 0.6) 50%, rgba(10, 16, 29, 0.95) 100%)`,
        }}
      />

      {/* 3. Live Interactive Canvas Plexus */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-2 pointer-events-none w-full h-full"
      />

      {/* 4. Children Content (Hero copy, CTA buttons, UI preview) */}
      <div className="relative z-10 w-full">{children}</div>
    </div>
  );
}
