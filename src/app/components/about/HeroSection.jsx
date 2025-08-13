"use client";
import { motion } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import { Suspense, useRef } from "react";
import DistortedSphere from "../ui3d/DistortedSphere";

export function HeroSection({ typed }) {
  // Configuración de la esfera (puedes ajustar o pasar por props si quieres personalizar)
  const sphereSettings = {
    color: "#6366f1",
    distort: 0.4,
    speed: 1.8,
    roughness: 0.15,
    metalness: 0.5,
    floatSpeed: 1.4,
    rotationIntensity: 0.6,
    floatIntensity: 1.1,
    radius: 1.9,
  };
  const mouse = useRef({ x: 0, y: 0 });
  function onMouseMove(e) {
    const { innerWidth, innerHeight } = window;
    mouse.current = {
      x: (e.clientX / innerWidth) * 2 - 1,
      y: -(e.clientY / innerHeight) * 2 + 1,
    };
  }
  const buttons = [
    { label: "Solicitar Demo", variant: "primary" },
    { label: "Ver Módulos", variant: "outline" },
    { label: "Documentación", variant: "ghost" },
  ];
  return (
    <section
      id='hero'
      onMouseMove={onMouseMove}
      className='relative flex flex-col items-center justify-center min-h-[85vh] pt-40 pb-32 px-6 text-center overflow-hidden'>
      {/* Fondo 3D (z-0 para no quedar detrás del main) */}
      <div className='absolute inset-0 z-0 pointer-events-none'>
        <Canvas camera={{ position: [0, 0, 5], fov: 52 }} dpr={[1, 1.5]}>
          <ambientLight intensity={0.7} />
          <directionalLight position={[5, 5, 5]} intensity={1} />
          <Suspense fallback={null}>
            <DistortedSphere mouse={mouse} settings={sphereSettings} />
          </Suspense>
          {/* <axesHelper args={[5]} /> */}
        </Canvas>
        {/* Degradado / overlay para contraste de texto */}
        <div className='absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(99,102,241,0.15),transparent_60%)]' />
        <div className='absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-black via-black/60 to-transparent' />
      </div>

      {/* Contenido (capa superior) */}
      <div className='relative z-10 flex flex-col items-center'>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className='text-4xl md:text-6xl font-extrabold tracking-tight max-w-4xl bg-clip-text text-transparent bg-gradient-to-r from-violet-400 via-fuchsia-300 to-pink-300'>
          {typed || ""}
          <span className='animate-pulse'>▍</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.7 }}
          className='mt-6 max-w-2xl text-zinc-300 leading-relaxed'>
          Impulsamos instituciones con herramientas modernas para gestión, evaluación y análisis centrado en el
          aprendizaje.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className='mt-10 flex flex-wrap gap-4 justify-center'>
          {buttons.map((b) => (
            <motion.button
              key={b.label}
              whileHover={{ scale: 1.06, y: -2 }}
              whileTap={{ scale: 0.94 }}
              className={
                b.variant === "primary"
                  ? "px-6 py-3 rounded-lg bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white font-semibold shadow"
                  : b.variant === "outline"
                  ? "px-6 py-3 rounded-lg border border-white/20 text-white font-medium hover:bg-white/10"
                  : "px-6 py-3 rounded-lg text-zinc-300 hover:text-white hover:bg-white/5"
              }>
              {b.label}
            </motion.button>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
