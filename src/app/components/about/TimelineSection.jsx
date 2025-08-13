"use client";
import { motion } from "framer-motion";

export function TimelineSection({ items }) {
  return (
    <section id='timeline' className='relative z-10 px-6 pb-32 max-w-5xl mx-auto'>
      <h2 className='text-center text-2xl md:text-3xl font-semibold mb-12'>Evolución</h2>
      <div className='relative border-l border-zinc-700/60 ml-4'>
        {items.map((item, i) => (
          <motion.div
            key={item.year}
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className='pl-6 pb-10 group'>
            <div className='w-3 h-3 rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500 absolute -left-[6.5px] top-1 shadow-[0_0_0_4px_rgba(255,255,255,0.05)] group-hover:scale-125 transition-transform' />
            <h3 className='text-lg font-semibold flex items-center gap-3'>
              <span className='text-violet-300'>{item.year}</span> {item.title}
            </h3>
            <p className='text-sm text-zinc-400 mt-2 max-w-prose'>{item.text}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
