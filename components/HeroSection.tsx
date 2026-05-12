"use client";

import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "framer-motion";

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isDesktop, setIsDesktop] = useState(false);
  const [progressInt, setProgressInt] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const progressScaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const update = () => setIsDesktop(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useMotionValueEvent(scrollYProgress, "change", (value) => {
    setProgressInt(Math.round(value * 100));
    const video = videoRef.current;
    if (!video || !isDesktop) return;
    if (!Number.isFinite(video.duration) || video.duration === 0) return;
    const target = value * video.duration;
    if (Math.abs(video.currentTime - target) > 0.01) {
      video.currentTime = target;
    }
  });

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (isDesktop) {
      video.pause();
      video.removeAttribute("loop");
      video.muted = true;
    } else {
      video.muted = true;
      video.loop = true;
      const playPromise = video.play();
      if (playPromise) {
        playPromise.catch(() => {});
      }
    }
  }, [isDesktop]);

  return (
    <section ref={containerRef} className="relative h-[400vh] w-full">
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-black">
        <video
          ref={videoRef}
          src="/video/build.mp4"
          className="h-full w-full object-cover"
          preload="auto"
          playsInline
          muted
        />

        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-6 top-6 md:left-10 md:top-10">
            <h1
              className="glitch font-display uppercase leading-none text-neonCyan"
              style={{
                fontSize: "clamp(32px, 6vw, 48px)",
                textShadow: "0 0 16px rgba(0,255,255,0.8), 0 0 32px rgba(0,255,255,0.4)",
                letterSpacing: "0.02em",
              }}
            >
              BUILD THE MACHINE
            </h1>
          </div>

          <div className="absolute bottom-10 right-6 md:bottom-12 md:right-10">
            <span
              className="font-mono text-neonCyan"
              style={{ fontSize: "14px", letterSpacing: "0.15em" }}
            >
              MONTAGEM {progressInt.toString().padStart(2, "0")}%
            </span>
          </div>

          <AnimatePresence>
            {progressInt >= 98 && (
              <motion.div
                key="scroll-cue"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 0] }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.2, repeat: Infinity }}
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-display text-3xl text-white md:text-4xl"
                style={{ letterSpacing: "0.1em" }}
              >
                ▼ CONHEÇA AS PEÇAS
              </motion.div>
            )}
          </AnimatePresence>

          <div className="absolute bottom-0 left-0 h-[2px] w-full bg-black">
            <motion.div
              className="h-full bg-neonCyan"
              style={{
                scaleX: progressScaleX,
                transformOrigin: "left",
                boxShadow: "0 0 12px #00FFFF, 0 0 24px rgba(0,255,255,0.6)",
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
