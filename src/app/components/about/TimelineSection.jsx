'use client';
import { motion } from 'framer-motion';

export function TimelineSection({ items }) {
	return (
		<section id='timeline' className='relative z-10 px-6 pb-32 max-w-5xl mx-auto'>
			<h2 className='text-center text-2xl md:text-3xl font-semibold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-sky-600 via-cyan-500 to-emerald-500'>
				Nuestro camino
			</h2>
			<p className='text-center text-sm md:text-base text-zinc-600 dark:text-zinc-300 mb-12'>
				Pequeños hitos que han ido dando forma a una experiencia de aprendizaje más
				humana.
			</p>
			<div className='relative border-l border-sky-200 dark:border-sky-500/30 ml-4'>
				{items.map((item, i) => (
					<motion.div
						key={item.year}
						initial={{ opacity: 0, x: -40 }}
						whileInView={{ opacity: 1, x: 0 }}
						viewport={{ once: true, amount: 0.4 }}
						transition={{ duration: 0.5, delay: i * 0.1 }}
						className='pl-6 pb-10 group'>
						<div className='w-3 h-3 rounded-full bg-gradient-to-r from-sky-500 to-teal-500 absolute -left-[6.5px] top-1 shadow-[0_0_0_4px_rgba(56,189,248,0.15)] group-hover:scale-125 transition-transform' />
						<h3 className='text-lg font-semibold flex items-center gap-3'>
							<span className='text-sky-600 dark:text-sky-300'>{item.year}</span>{' '}
							{item.title}
						</h3>
						<p className='text-sm text-zinc-600 dark:text-zinc-400 mt-2 max-w-prose'>
							{item.text}
						</p>
					</motion.div>
				))}
			</div>
		</section>
	);
}
