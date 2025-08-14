'use client';
import { motion } from 'framer-motion';

export function CtaSection() {
	return (
		<section id='cta' className='relative z-10 px-6 pb-40'>
			<div className='max-w-4xl mx-auto text-center rounded-3xl p-px bg-gradient-to-r from-sky-300/60 via-cyan-200/60 to-emerald-200/60 dark:from-sky-500/40 dark:via-cyan-500/30 dark:to-emerald-500/40'>
				<div className='rounded-3xl bg-white/70 dark:bg-slate-900/60 backdrop-blur-xl px-8 py-16'>
					<motion.h2
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.6 }}
						className='text-3xl md:text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-sky-600 via-cyan-500 to-emerald-500'>
						¿Construimos aprendizaje juntos?
					</motion.h2>
					<motion.p
						initial={{ opacity: 0 }}
						whileInView={{ opacity: 1 }}
						viewport={{ once: true }}
						transition={{ delay: 0.2, duration: 0.6 }}
						className='text-zinc-600 dark:text-zinc-300 max-w-2xl mx-auto mb-10'>
						Conversemos para adaptar la plataforma a tu contexto: colegios,
						capacitaciones o espacios comunitarios. La tecnología es el medio, el
						vínculo humano el centro.
					</motion.p>
					<motion.button
						whileHover={{ scale: 1.07, y: -3 }}
						whileTap={{ scale: 0.94 }}
						className='px-8 py-4 rounded-xl font-semibold text-white bg-gradient-to-r from-sky-500 to-teal-500 shadow-lg shadow-sky-600/30'>
						Coordinar una charla
					</motion.button>
				</div>
			</div>
		</section>
	);
}
