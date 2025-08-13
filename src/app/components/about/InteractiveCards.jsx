"use client";

import { useRef } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";

function TiltCard({ title, desc, icon = "🌀", color }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-50, 50], [12, -12]);
  const rotateY = useTransform(x, [-50, 50], [-12, 12]);

  function handleMove(e) {
    const rect = ref.current.getBoundingClientRect();
    const px = e.clientX - rect.left;
    const py = e.clientY - rect.top;
    x.set(px - rect.width / 2);
    y.set(py - rect.height / 2);
  }

  function reset() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      style={{ rotateX, rotateY, x: 0, y: 0, perspective: 1000 }}
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 220, damping: 18 }}
      className='group relative w-72 h-44 rounded-xl bg-zinc-900/70 border border-zinc-700/60 backdrop-blur-md p-[1px] shadow-[0_8px_30px_-8px_rgba(124,58,237,0.35)]'>
      <div className='absolute inset-0 rounded-xl bg-gradient-to-br from-violet-600/30 via-fuchsia-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none'></div>
      <div className='relative h-full w-full rounded-[11px] p-4 flex flex-col justify-between'>
        <div className='flex items-center gap-3'>
          <div className='text-3xl select-none drop-shadow'>{icon}</div>
          <h3 className='font-semibold text-lg text-white leading-snug'>{title}</h3>
        </div>
        <p className='text-sm text-zinc-300 leading-snug line-clamp-3'>{desc}</p>
        <div className='absolute inset-0 rounded-xl ring-1 ring-inset ring-white/10 group-hover:ring-violet-400/40 transition-colors'></div>
      </div>
      <div className='pointer-events-none absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 mix-blend-screen bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.35),transparent_60%)]'></div>
    </motion.div>
  );
}

export default function InteractiveCards() {
  const data = [
    {
      title: "Gestión",
      desc: "Administra usuarios, cursos y perfiles fácilmente.",
      icon: "🛠️",
    },
    {
      title: "Pruebas",
      desc: "Crea, aplica y corrige evaluaciones online rápidamente.",
      icon: "📝",
    },
    {
      title: "Reportes",
      desc: "Visualiza métricas y desempeño académico al instante.",
      icon: "📊",
    },
  ];

  return (
    <div className='flex flex-wrap justify-center gap-8 mt-20 p-6'>
      {data.map((c, i) => (
        <TiltCard key={i} {...c} />
      ))}
    </div>
  );
}
