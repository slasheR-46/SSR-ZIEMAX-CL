'use client';
import { motion } from 'framer-motion';

/**
 * Muestra actividad reciente y un resumen lateral.
 * Props:
 * - activities: string[] (lista de líneas de actividad)
 * - activityTitle: string
 * - summaryTitle: string
 * - summaryText: string | ReactNode
 * - className: clases extra para el grid envolvente
 */
export default function ActivitySummary({
	activities = [],
	activityTitle = 'Actividad Reciente',
	summaryTitle = 'Resumen',
	summaryText = '',
	className = '',
	fullHeight = false,
}) {
	return (
		<section
			className={`grid gap-6 lg:grid-cols-3 ${
				fullHeight ? 'h-full' : ''
			} ${className}`}>
			<motion.div
				initial={{ opacity: 0 }}
				whileInView={{ opacity: 1 }}
				viewport={{ once: true }}
				transition={{ duration: 0.6 }}
				className={`lg:col-span-2 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl p-6 ${
					fullHeight ? 'h-full flex flex-col' : 'min-h-[260px]'
				}`}>
				<h2 className='font-semibold mb-4'>{activityTitle}</h2>
				<ul className='space-y-2 text-sm text-neutral-600 dark:text-neutral-300 list-none flex-1 overflow-auto'>
					{activities.map((line, i) => (
						<motion.li
							key={i}
							initial={{ x: 10, opacity: 0 }}
							whileInView={{ x: 0, opacity: 1 }}
							viewport={{ once: true }}
							transition={{ delay: i * 0.05 }}
							className='flex items-start gap-2'>
							<span className='mt-[3px] h-2 w-2 rounded-full bg-gradient-to-r from-purple-500 to-fuchsia-500 shrink-0' />
							<span>{line}</span>
						</motion.li>
					))}
					{activities.length === 0 && (
						<li className='text-neutral-400 italic'>Sin actividad reciente.</li>
					)}
				</ul>
			</motion.div>
			<motion.div
				initial={{ x: 40, opacity: 0 }}
				whileInView={{ x: 0, opacity: 1 }}
				viewport={{ once: true }}
				transition={{ type: 'spring', stiffness: 300, damping: 28 }}
				className={`bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl p-6 ${
					fullHeight ? 'h-full flex flex-col' : ''
				}`}>
				<h2 className='font-semibold mb-4'>{summaryTitle}</h2>
				<div className='text-sm leading-relaxed text-neutral-600 dark:text-neutral-300 whitespace-pre-line flex-1'>
					{summaryText}
				</div>
			</motion.div>
		</section>
	);
}
