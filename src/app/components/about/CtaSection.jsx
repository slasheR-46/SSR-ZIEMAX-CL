"use client";
import { motion } from "framer-motion";

export function CtaSection() {
  return (
    <section id='cta' className='relative z-10 px-6 pb-40'>
      <div className='max-w-4xl mx-auto text-center rounded-3xl p-px bg-gradient-to-r from-violet-600/40 via-fuchsia-500/30 to-pink-500/40'>
        <div className='rounded-3xl bg-black/60 backdrop-blur-xl px-8 py-16'>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className='text-3xl md:text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-violet-300 via-fuchsia-200 to-pink-200'>
            Acelera la transformación educativa
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className='text-zinc-300 max-w-2xl mx-auto mb-10'>
            Solicita una demostración personalizada y descubre cómo optimizar procesos, mejorar la experiencia de
            aprendizaje y tomar decisiones basadas en datos reales.
          </motion.p>
          <motion.button
            whileHover={{ scale: 1.07, y: -3 }}
            whileTap={{ scale: 0.94 }}
            className='px-8 py-4 rounded-xl font-semibold text-white bg-gradient-to-r from-violet-600 to-fuchsia-600 shadow-lg shadow-fuchsia-800/30'>
            Solicitar Demostración
          </motion.button>
        </div>
      </div>
    </section>
  );
}
