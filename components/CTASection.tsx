"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function CTASection() {
  const [glitching, setGlitching] = useState(false);

  const triggerGlitch = () => {
    setGlitching(true);
    window.setTimeout(() => setGlitching(false), 300);
  };

  return (
    <section className="relative flex min-h-screen w-full flex-col items-center justify-center bg-black px-6 py-24 md:px-12">
      <h2
        className="mb-16 max-w-4xl text-center font-display uppercase text-white"
        style={{
          fontSize: "clamp(48px, 7.5vw, 72px)",
          letterSpacing: "0.03em",
          textShadow: "0 0 16px rgba(255,255,255,0.25)",
          lineHeight: 1.05,
        }}
      >
        PRONTO PRA MONTAR O SEU?
      </h2>

      <div
        className="mb-16 flex items-center justify-center"
        style={{
          width: 360,
          height: 360,
          maxWidth: "85vw",
          maxHeight: "85vw",
          borderRadius: 8,
          background: "radial-gradient(circle, #1a0030 0%, #000 70%)",
          boxShadow:
            "0 0 60px rgba(0,255,255,0.4), 0 0 120px rgba(155,48,255,0.3), 0 0 200px rgba(0,255,255,0.15)",
        }}
      >
        <span
          className="font-display"
          style={{
            fontSize: 48,
            color: "rgba(0,255,255,0.3)",
            letterSpacing: "0.1em",
          }}
        >
          PC
        </span>
      </div>

      <motion.button
        type="button"
        onHoverStart={triggerGlitch}
        whileHover={{ backgroundColor: "#00FFFF", color: "#000000" }}
        transition={{ duration: 0.15 }}
        className={`${glitching ? "glitch" : ""} mb-20 cursor-pointer font-display uppercase text-white`}
        style={{
          border: "2px solid #00FFFF",
          backgroundColor: "transparent",
          padding: "16px 48px",
          fontSize: 24,
          letterSpacing: "0.15em",
        }}
      >
        FALE COMIGO
      </motion.button>

      <div className="w-full max-w-5xl">
        <div
          className="mb-6 h-px w-full"
          style={{
            background: "linear-gradient(90deg, transparent, #9B30FF, transparent)",
            boxShadow: "0 0 10px #9B30FF",
          }}
        />
        <nav className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
          {["INSTAGRAM", "WHATSAPP", "EMAIL", "TWITCH"].map((item) => (
            <a
              key={item}
              href="#"
              className="font-mono uppercase transition-colors hover:text-neonCyan"
              style={{
                fontSize: 12,
                color: "rgba(255,255,255,0.4)",
                letterSpacing: "0.2em",
              }}
            >
              {item}
            </a>
          ))}
        </nav>
      </div>
    </section>
  );
}
