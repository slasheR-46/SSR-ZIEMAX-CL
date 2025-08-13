"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Suspense, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import DistortedSphere from "../ui3d/DistortedSphere";

export default function Hero3D() {
  const mouse = useRef({ x: 0, y: 0 });
  const tabs = {
    gestion: {
      key: "gestion",
      title: "Gestión",
      desc: "Administra usuarios, cursos, matrículas y roles fácilmente.",
      color: "#6366f1",
      distort: 0.35,
      speed: 1.6,
      roughness: 0.15,
      metalness: 0.5,
      floatSpeed: 1.3,
      rotationIntensity: 0.5,
      floatIntensity: 1,
    },
    pruebas: {
      key: "pruebas",
      title: "Pruebas",
      desc: "Crea, aplica y corrige evaluaciones en línea con analíticas inmediatas.",
      color: "#f59e0b",
      distort: 0.5,
      speed: 2.4,
      roughness: 0.2,
      metalness: 0.35,
      floatSpeed: 1.6,
      rotationIntensity: 0.65,
      floatIntensity: 1.2,
    },
    reportes: {
      key: "reportes",
      title: "Reportes",
      desc: "Visualiza desempeño académico, asistencia y métricas clave en tiempo real.",
      color: "#ec4899",
      distort: 0.25,
      speed: 1.2,
      roughness: 0.1,
      metalness: 0.6,
      floatSpeed: 1.1,
      rotationIntensity: 0.45,
      floatIntensity: 0.9,
    },
  };
  const [active, setActive] = useState("gestion");

  function onMouseMove(e) {
    const { innerWidth, innerHeight } = window;
    mouse.current = {
      x: (e.clientX / innerWidth) * 2 - 1,
      y: -(e.clientY / innerHeight) * 2 + 1,
    };
  }

  return (
    <section onMouseMove={onMouseMove} className='absolute inset-0 -z-10 h-screen w-full'>
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }} dpr={[1, 1.5]} shadows>
        <ambientLight intensity={0.7} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <Suspense fallback={null}>
          <DistortedSphere mouse={mouse} settings={tabs[active]} />
        </Suspense>
        <OrbitControls enableZoom={false} enablePan={false} />
      </Canvas>

      <div className='absolute top-8 w-full flex justify-center z-20 select-none'>
        <div className='flex gap-1 px-2 py-1 backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl shadow-lg relative'>
          {Object.keys(tabs).map((k) => {
            const t = tabs[k];
            const activeBool = active === k;
            return (
              <button
                key={k}
                onClick={() => setActive(k)}
                className={`relative px-4 py-2 text-sm md:text-base font-medium transition-colors rounded-xl ${
                  activeBool ? "text-white" : "text-zinc-400 hover:text-white"
                }`}>
                {activeBool && (
                  <motion.span
                    layoutId='tabIndicator'
                    className='absolute inset-0 rounded-xl bg-gradient-to-r from-violet-600/40 via-fuchsia-500/30 to-pink-500/40 shadow-[0_0_0_1px_rgba(255,255,255,0.15)]'
                    transition={{ type: "spring", stiffness: 380, damping: 28 }}
                  />
                )}
                <span className='relative'>{t.title}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className='absolute bottom-10 w-full flex justify-center z-20 px-6'>
        <div className='max-w-xl text-center'>
          <AnimatePresence mode='wait'>
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35 }}
              className='space-y-3'>
              <h2 className='text-2xl md:text-3xl font-bold tracking-tight' style={{ color: tabs[active].color }}>
                {tabs[active].title}
              </h2>
              <p className='text-zinc-300 text-sm md:text-base leading-relaxed'>{tabs[active].desc}</p>
              <div className='flex flex-wrap justify-center gap-2 pt-2'>
                {["Ver más", "Acción rápida", "Documentación"].map((b) => (
                  <motion.button
                    key={b}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.94 }}
                    className='px-4 py-2 rounded-lg bg-white/10 hover:bg-white/15 border border-white/10 text-white text-xs md:text-sm backdrop-blur'>
                    {b}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
