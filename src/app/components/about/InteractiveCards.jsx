'use client';

import { useRef } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';

function TiltCard({ title, desc, icon = '🌀', tag, color }) {
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
			transition={{ type: 'spring', stiffness: 220, damping: 18 }}
			className='group relative w-72 h-48 rounded-2xl bg-white/80 dark:bg-slate-800/70 border border-sky-200 dark:border-sky-500/30 backdrop-blur-xl p-[1px] shadow-[0_6px_18px_-6px_rgba(14,165,233,0.35)]'>
			<div className='absolute inset-0 rounded-2xl bg-gradient-to-br from-sky-100/70 via-cyan-50/30 to-transparent dark:from-cyan-500/15 dark:via-sky-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none'></div>
			<div className='relative h-full w-full rounded-[15px] p-4 flex flex-col'>
				<div className='flex items-start justify-between'>
					<div className='flex items-center gap-3'>
						<div className='text-3xl select-none drop-shadow'>{icon}</div>
						<h3 className='font-semibold text-base text-sky-800 dark:text-sky-100 leading-snug'>
							{title}
						</h3>
					</div>
					{tag && (
						<span className='text-[10px] uppercase tracking-wide font-medium bg-sky-600/90 text-white px-2 py-1 rounded-md shadow-sm'>
							{tag}
						</span>
					)}
				</div>
				<p className='mt-3 text-[13px] text-zinc-600 dark:text-zinc-300 leading-snug line-clamp-4 flex-1'>
					{desc}
				</p>
				<div className='mt-3 flex items-center gap-2 text-[11px] text-sky-600 dark:text-sky-300 opacity-0 group-hover:opacity-100 transition-opacity'>
					<span>Ver más</span>
					<span aria-hidden>→</span>
				</div>
				<div className='absolute inset-0 rounded-2xl ring-1 ring-inset ring-sky-300/40 dark:ring-sky-500/30 group-hover:ring-sky-500/60 transition-colors'></div>
			</div>
			<div className='pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 mix-blend-overlay bg-[radial-gradient(circle_at_30%_30%,rgba(56,189,248,0.35),transparent_65%)]'></div>
		</motion.div>
	);
}

export default function InteractiveCards() {
	const data = [
		{
			title: 'Aulas y Cursos',
			desc:
				'Organiza contenidos, recursos multimedia y actividades semanales con estructura flexible.',
			icon: '�',
			tag: 'Base',
		},
		{
			title: 'Evaluaciones Formativas',
			desc:
				'Crea cuestionarios y rúbricas que retroalimentan al instante y fomentan la autoevaluación.',
			icon: '📝',
			tag: 'Nuevo',
		},
		{
			title: 'Panel Docente',
			desc:
				'Indicadores claros que ayudan a detectar ritmos de aprendizaje y acompañar a tiempo.',
			icon: '🎯',
			tag: 'Beta',
		},
		{
			title: 'Colaboración',
			desc:
				'Foros moderados y espacios de proyectos para que las ideas crezcan en comunidad.',
			icon: '🤝',
		},
		{
			title: 'Accesibilidad',
			desc:
				'Opciones de contraste, lectura y ajustes de ritmo para distintos estilos de aprendizaje.',
			icon: '🧩',
		},
		{
			title: 'Analítica Ética',
			desc:
				'Datos transformados en sugerencias pedagógicas, nunca en etiquetas rígidas.',
			icon: '�',
		},
	];

	return (
		<div className='flex flex-wrap justify-center gap-8 mt-14 p-6 max-w-6xl mx-auto'>
			{data.map((c, i) => (
				<TiltCard key={i} {...c} />
			))}
		</div>
	);
}
