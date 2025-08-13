"use client";
import { motion } from "framer-motion";

export default function SectionNav({ sectionIds, active }) {
  return (
    <nav className='fixed top-6 left-1/2 -translate-x-1/2 z-40 flex gap-2 backdrop-blur-md bg-white/5 border border-white/10 px-4 py-2 rounded-2xl text-xs md:text-sm'>
      {sectionIds.map((id) => (
        <a
          key={id}
          href={`#${id}`}
          className={`relative px-3 py-1 rounded-lg transition-colors ${
            active === id ? "text-white font-medium" : "text-zinc-400 hover:text-white"
          }`}>
          {active === id && (
            <motion.span
              layoutId='pill'
              className='absolute inset-0 bg-gradient-to-r from-violet-600/40 via-fuchsia-500/30 to-pink-500/40 rounded-lg'
              transition={{ type: "spring", stiffness: 380, damping: 30 }}
            />
          )}
          <span className='relative capitalize'>{id === "ofrecemos" ? "ofrecemos" : id}</span>
        </a>
      ))}
    </nav>
  );
}
