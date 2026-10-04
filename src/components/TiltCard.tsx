"use client";

import { useRef, type ReactNode } from "react";

type TiltCardProps = {
  children: ReactNode;
  className?: string;
  /** Maximum rotation in degrees at the card's edges. */
  max?: number;
};

// Tilts toward the mouse in 3D and lights a glare spot under the cursor.
// Children with the `tilt-pop` class float above the card surface.
export default function TiltCard({ children, className, max = 7 }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);

  function onPointerMove(e: React.PointerEvent<HTMLDivElement>) {
    if (e.pointerType !== "mouse" || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    const style = ref.current.style;
    style.setProperty("--rx", `${(0.5 - py) * max}deg`);
    style.setProperty("--ry", `${(px - 0.5) * max}deg`);
    style.setProperty("--mx", `${px * 100}%`);
    style.setProperty("--my", `${py * 100}%`);
  }

  function onPointerLeave() {
    ref.current?.style.setProperty("--rx", "0deg");
    ref.current?.style.setProperty("--ry", "0deg");
  }

  return (
    <div
      ref={ref}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      className={`tilt ${className ?? ""}`}
    >
      {children}
      <span className="tilt-glare" aria-hidden="true" />
    </div>
  );
}
