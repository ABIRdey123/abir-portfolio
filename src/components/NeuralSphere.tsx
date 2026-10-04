"use client";

import { useEffect, useRef } from "react";

// A rotating 3D "neural network": nodes on a sphere, linked to their nearest
// neighbours, with signals travelling along the links. Drawn on a 2D canvas
// with a simple perspective projection, so it needs no 3D library.

type Vec3 = { x: number; y: number; z: number };
type Pulse = { edge: number; t: number; speed: number };

const NODE_COUNT = 170;
const LINK_DISTANCE_SQ = 0.1; // squared chord length on the unit sphere
const PULSE_COUNT = 14;
const FOV = 2.8;
const FRONT = [34, 211, 238]; // cyan-400
const BACK = [139, 92, 246]; // violet-500

function fibonacciSphere(n: number): Vec3[] {
  const golden = Math.PI * (3 - Math.sqrt(5));
  return Array.from({ length: n }, (_, i) => {
    const y = 1 - (i / (n - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    const theta = golden * i;
    return { x: Math.cos(theta) * r, y, z: Math.sin(theta) * r };
  });
}

function mix(depth: number, alpha: number) {
  const c = FRONT.map((f, i) => Math.round(BACK[i] + (f - BACK[i]) * depth));
  return `rgba(${c[0]}, ${c[1]}, ${c[2]}, ${alpha})`;
}

export default function NeuralSphere({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const nodes = fibonacciSphere(NODE_COUNT);
    const edges: [number, number][] = [];
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[i].x - nodes[j].x;
        const dy = nodes[i].y - nodes[j].y;
        const dz = nodes[i].z - nodes[j].z;
        if (dx * dx + dy * dy + dz * dz < LINK_DISTANCE_SQ) edges.push([i, j]);
      }
    }
    const newPulse = (): Pulse => ({
      edge: Math.floor(Math.random() * edges.length),
      t: 0,
      speed: 0.006 + Math.random() * 0.012,
    });
    const pulses = Array.from({ length: PULSE_COUNT }, () => ({ ...newPulse(), t: Math.random() }));

    let width = 0;
    let height = 0;
    let angleY = 0.6;
    let angleX = -0.25;
    let spin = 0.0025; // radians per frame around Y
    let tiltTarget = 0;
    let tilt = 0;
    let dragging = false;
    let lastX = 0;
    let lastY = 0;
    let visible = true;
    let frame = 0;

    const projected = nodes.map(() => ({ x: 0, y: 0, depth: 0, scale: 1 }));

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas!.clientWidth;
      height = canvas!.clientHeight;
      canvas!.width = Math.round(width * dpr);
      canvas!.height = Math.round(height * dpr);
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function draw() {
      const cx = width / 2;
      const cy = height / 2;
      const radius = Math.min(width, height) * 0.36;
      const ax = angleX + tilt;
      const cosY = Math.cos(angleY);
      const sinY = Math.sin(angleY);
      const cosX = Math.cos(ax);
      const sinX = Math.sin(ax);

      for (let i = 0; i < nodes.length; i++) {
        const { x, y, z } = nodes[i];
        const x1 = x * cosY + z * sinY;
        const z1 = -x * sinY + z * cosY;
        const y2 = y * cosX - z1 * sinX;
        const z2 = y * sinX + z1 * cosX;
        const scale = FOV / (FOV - z2);
        const p = projected[i];
        p.x = cx + x1 * radius * scale;
        p.y = cy + y2 * radius * scale;
        p.depth = (z2 + 1) / 2; // 0 = back, 1 = front
        p.scale = scale;
      }

      ctx!.clearRect(0, 0, width, height);

      // Soft core glow
      const glow = ctx!.createRadialGradient(cx, cy, 0, cx, cy, radius * 1.3);
      glow.addColorStop(0, "rgba(34, 211, 238, 0.10)");
      glow.addColorStop(1, "rgba(34, 211, 238, 0)");
      ctx!.fillStyle = glow;
      ctx!.fillRect(0, 0, width, height);

      ctx!.lineWidth = 1;
      for (const [a, b] of edges) {
        const pa = projected[a];
        const pb = projected[b];
        const depth = (pa.depth + pb.depth) / 2;
        ctx!.strokeStyle = mix(depth, 0.05 + depth * 0.3);
        ctx!.beginPath();
        ctx!.moveTo(pa.x, pa.y);
        ctx!.lineTo(pb.x, pb.y);
        ctx!.stroke();
      }

      for (const p of projected) {
        ctx!.fillStyle = mix(p.depth, 0.25 + p.depth * 0.75);
        ctx!.beginPath();
        ctx!.arc(p.x, p.y, (0.8 + p.depth * 1.6) * p.scale, 0, Math.PI * 2);
        ctx!.fill();
      }

      for (const pulse of pulses) {
        const [a, b] = edges[pulse.edge];
        const pa = projected[a];
        const pb = projected[b];
        const x = pa.x + (pb.x - pa.x) * pulse.t;
        const y = pa.y + (pb.y - pa.y) * pulse.t;
        const depth = pa.depth + (pb.depth - pa.depth) * pulse.t;
        ctx!.fillStyle = `rgba(240, 253, 255, ${0.3 + depth * 0.7})`;
        ctx!.shadowColor = "rgba(34, 211, 238, 0.9)";
        ctx!.shadowBlur = 10;
        ctx!.beginPath();
        ctx!.arc(x, y, 1.6 + depth * 1.4, 0, Math.PI * 2);
        ctx!.fill();
        ctx!.shadowBlur = 0;
      }
    }

    function step() {
      if (!dragging) {
        angleY += spin;
        // Ease back toward the resting spin speed after a fling.
        spin += (0.0025 - spin) * 0.02;
      }
      tilt += (tiltTarget - tilt) * 0.05;
      for (const pulse of pulses) {
        pulse.t += pulse.speed;
        if (pulse.t >= 1) {
          // Hop to a link that continues from where this signal arrived.
          const end = edges[pulse.edge][1];
          const next = edges.findIndex(([a], idx) => a === end && idx !== pulse.edge);
          Object.assign(pulse, next >= 0 ? { edge: next, t: 0 } : newPulse());
        }
      }
      draw();
      frame = visible ? requestAnimationFrame(step) : 0;
    }

    function onPointerDown(e: PointerEvent) {
      dragging = true;
      lastX = e.clientX;
      lastY = e.clientY;
      canvas!.setPointerCapture(e.pointerId);
    }

    function onPointerMove(e: PointerEvent) {
      if (dragging) {
        const dx = e.clientX - lastX;
        const dy = e.clientY - lastY;
        lastX = e.clientX;
        lastY = e.clientY;
        spin = dx * 0.005;
        angleY += spin;
        angleX = Math.max(-1.2, Math.min(1.2, angleX + dy * 0.005));
        if (reduceMotion) draw();
      } else if (e.pointerType === "mouse") {
        tiltTarget = (e.clientY / window.innerHeight - 0.5) * 0.5;
      }
    }

    function onPointerUp() {
      dragging = false;
    }

    resize();
    draw();

    const resizeObserver = new ResizeObserver(() => {
      resize();
      draw();
    });
    resizeObserver.observe(canvas);

    canvas.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerup", onPointerUp);

    // Only animate while the sphere is on screen.
    const visibilityObserver = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible && !frame && !reduceMotion) frame = requestAnimationFrame(step);
    });
    visibilityObserver.observe(canvas);

    return () => {
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      visibilityObserver.disconnect();
      canvas.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`cursor-grab touch-none active:cursor-grabbing ${className ?? ""}`}
      aria-label="Interactive 3D neural network. Drag to rotate."
      role="img"
    />
  );
}
