'use client';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { useRef } from 'react';

/**
 * Componente de grilla de métricas.
 * @param {Object} props
 * @param {{title:string,value:string|number,delta?:string,footer?:string,icon?:React.ReactNode,color?:string,onClick?:Function}[]} props.items
 * @param {number} [props.stagger=0.05]
 * @param {string} [props.className]
 * @param {boolean} [props.enableTilt=true] - Activa efecto tilt 3D.
 * @param {boolean} [props.glowOnHover=true] - Brillo en hover.
 * @param {boolean} [props.pressEffect=true] - Efecto escala al hacer click.
 * @param {('subtle'|'gradient'|'glass'|'purpleOrange')} [props.variant='subtle'] - Estilo visual.
 */
export default function StatsCards({
	items = [],
	stagger = 0.05,
	className = '',
	enableTilt = true,
	glowOnHover = true,
	pressEffect = true,
	variant = 'subtle',
}) {
	const variantsMap = {
		subtle:
			'bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700',
		gradient:
			'bg-gradient-to-br from-purple-600/90 via-fuchsia-600/90 to-indigo-600/90 text-white border border-purple-400/30',
		glass:
			'backdrop-blur bg-white/60 dark:bg-neutral-800/40 border border-white/30 dark:border-neutral-600/40',
		purpleOrange:
			'text-white bg-gradient-to-br from-violet-600 via-fuchsia-500 to-orange-400 border border-white/10 shadow-[0_0_0_1px_rgba(255,255,255,0.08)]',
	};

	return (
		<section className={`grid gap-6 sm:grid-cols-2 xl:grid-cols-4 ${className}`}>
			{items.map((c, i) => {
				const positive = typeof c.delta === 'string' && c.delta.startsWith('+');
				const ref = useRef(null);
				const mx = useMotionValue(0);
				const my = useMotionValue(0);
				const rotateX = useTransform(my, [-50, 50], [8, -8]);
				const rotateY = useTransform(mx, [-50, 50], [-8, 8]);

				const handleMouseMove = (e) => {
					if (!enableTilt || !ref.current) return;
					const rect = ref.current.getBoundingClientRect();
					const x = e.clientX - rect.left;
					const y = e.clientY - rect.top;
					mx.set(x - rect.width / 2);
					my.set(y - rect.height / 2);
				};
				const handleMouseLeave = () => {
					mx.set(0);
					my.set(0);
				};

				// Colores dinámicos para ring segun variante
				let ringColor = positive ? 'ring-emerald-400/40' : 'ring-rose-400/40';
				if (variant === 'purpleOrange') {
					ringColor = positive ? 'ring-orange-300/50' : 'ring-fuchsia-300/50';
				}

				return (
					<motion.div
						key={c.title}
						ref={ref}
						style={
							enableTilt
								? { perspective: 800, transformStyle: 'preserve-3d', rotateX, rotateY }
								: undefined
						}
						initial={{ y: 20, opacity: 0 }}
						animate={{ y: 0, opacity: 1 }}
						transition={{
							delay: i * stagger,
							type: 'spring',
							stiffness: 260,
							damping: 22,
						}}
						onMouseMove={handleMouseMove}
						onMouseLeave={handleMouseLeave}
						whileHover={
							enableTilt ? { scale: 1.015 } : glowOnHover ? { scale: 1.02 } : undefined
						}
						whileTap={pressEffect ? { scale: 0.97 } : undefined}
						className={`relative group rounded-xl p-5 shadow-sm hover:shadow-xl transition-all duration-300 ${
							variantsMap[variant] || variantsMap.subtle
						} ${glowOnHover ? 'hover:shadow-purple-500/30' : ''}`}
						onClick={() => c.onClick && c.onClick(c)}>
						{/* Fondo animado para variante purpleOrange */}
						{variant === 'purpleOrange' && (
							<div className='pointer-events-none absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.35),transparent_70%)] mix-blend-overlay' />
						)}
						{/* Borde animado gradient sutil */}
						<span
							className={`pointer-events-none absolute inset-0 rounded-xl ${
								variant === 'gradient'
									? 'bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.25),transparent_70%)]'
									: ''
							} opacity-0 group-hover:opacity-100 transition-opacity`}
						/>
						{/* Anillo brillante al hover */}
						{glowOnHover && (
							<span
								className={`pointer-events-none absolute inset-0 rounded-xl ring-0 group-hover:ring-4 ${ringColor} transition-all duration-300`}
							/>
						)}
						<div className='relative flex items-start justify-between'>
							<div className='flex items-center gap-2'>
								{c.icon && <span className='text-lg opacity-80'>{c.icon}</span>}
								<h3 className='text-sm font-medium text-neutral-500 dark:text-neutral-300 group-hover:text-neutral-700 dark:group-hover:text-neutral-100 transition-colors'>
									{c.title}
								</h3>
							</div>
							{c.delta !== undefined && (
								<span
									className={`text-xs font-semibold ${
										positive ? 'text-emerald-500' : 'text-rose-500'
									} ${
										variant === 'purpleOrange'
											? positive
												? 'text-orange-200 drop-shadow'
												: 'text-fuchsia-200 drop-shadow'
											: ''
									}`}>
									{c.delta}
								</span>
							)}
						</div>
						<p className='mt-3 text-2xl font-semibold tracking-tight'>{c.value}</p>
						{c.footer && (
							<p className='mt-2 text-xs text-neutral-500 dark:text-neutral-400'>
								{c.footer}
							</p>
						)}
						{/* Glow dinámico */}
						{glowOnHover && (
							<div
								className={`pointer-events-none absolute -inset-px rounded-xl opacity-0 group-hover:opacity-100 transition duration-500 blur-sm ${
									variant === 'purpleOrange'
										? 'bg-[conic-gradient(from_0deg,rgba(167,139,250,0.25),rgba(249,115,22,0.25),rgba(167,139,250,0.25))]'
										: 'bg-gradient-to-r from-purple-500/20 via-fuchsia-500/20 to-indigo-500/20'
								}`}
							/>
						)}
					</motion.div>
				);
			})}
		</section>
	);
}
