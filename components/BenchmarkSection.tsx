"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useInView } from "framer-motion";

type Counter = {
  label: string;
  valor: number;
  sufixo: string;
};

const COUNTERS: Counter[] = [
  { label: "FPS", valor: 240, sufixo: "" },
  { label: "TEMPERATURA", valor: 62, sufixo: "°C" },
  { label: "WATTAGE", valor: 650, sufixo: "W" },
];

function AnimatedCounter({ target, suffix, start }: { target: number; suffix: string; start: boolean }) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!start) return;
    const controls = animate(0, target, {
      duration: 2,
      ease: "easeOut",
      onUpdate: (v) => setValue(Math.round(v)),
    });
    return () => controls.stop();
  }, [start, target]);

  return (
    <span
      className="font-display text-neonCyan"
      style={{
        fontSize: "clamp(64px, 10vw, 96px)",
        textShadow: "0 0 40px rgba(0,255,255,0.6)",
        lineHeight: 1,
        letterSpacing: "0.02em",
      }}
    >
      {value}
      {suffix}
    </span>
  );
}

export default function BenchmarkSection() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const inView = useInView(sectionRef, { once: true, amount: 0.3 });

  return (
    <section ref={sectionRef} className="grid-bg relative w-full px-6 py-32 md:px-12">
      <div className="mx-auto max-w-7xl">
        <h2
          className="glitch mb-24 text-center font-display uppercase text-white"
          style={{
            fontSize: "clamp(36px, 6vw, 56px)",
            letterSpacing: "0.04em",
          }}
        >
          NÚMEROS QUE IMPRESSIONAM
        </h2>

        <div className="grid grid-cols-1 gap-16 md:grid-cols-3">
          {COUNTERS.map((c) => (
            <div key={c.label} className="flex flex-col items-center text-center">
              <AnimatedCounter target={c.valor} suffix={c.sufixo} start={inView} />
              <span
                className="mt-6 font-mono uppercase text-neonMagenta"
                style={{ fontSize: "14px", letterSpacing: "0.2em" }}
              >
                {c.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
