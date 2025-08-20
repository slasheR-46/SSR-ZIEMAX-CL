'use client';
import { useMemo, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * PieChart simple con SVG y framer-motion (sin dependencias externas).
 * Props:
 *  - data: { label: string; value: number; color?: string }[]
 *  - size: diámetro total (px)
 *  - thickness: grosor del anillo (px) (si 0 => pie sólido)
 *  - showLegend: mostrar leyenda
 *  - allowRandom: habilita botón para regenerar datos de prueba cuando no se pasa data
 */
export default function PieChart({
	data = [],
	size = 220,
	thickness = 32,
	showLegend = true,
	allowRandom = true,
	className = '',
}) {
	const defaultData = useMemo(
		() => [
			{ label: 'Ventas', value: 35, color: '#6366f1' },
			{ label: 'Marketing', value: 20, color: '#ec4899' },
			{ label: 'Soporte', value: 15, color: '#10b981' },
			{ label: 'Ops', value: 18, color: '#f59e0b' },
			{ label: 'R&D', value: 12, color: '#0ea5e9' },
		],
		[]
	);

	const randomize = () =>
		defaultData.map((d) => ({
			...d,
			value: Math.max(5, Math.floor(Math.random() * 50)),
		}));

	// Evitar mismatch SSR: iniciamos con defaultData determinista y luego random post-mount.
	const [internal, setInternal] = useState(data.length ? data : defaultData);
	useEffect(() => {
		if (!data.length) {
			setInternal(randomize());
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	const dataset = data.length ? data : internal;
	const total = dataset.reduce((acc, d) => acc + d.value, 0) || 1;

	const radius = size / 2;
	const innerRadius = thickness > 0 ? radius - thickness : 0;
	const circumference =
		2 * Math.PI * (innerRadius ? radius - thickness / 2 : radius);

	let offsetAcc = 0; // para stroke-dashoffset acumulativo

	return (
		<div
			className={`bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl p-6 ${className}`}>
			<div className='flex items-start gap-4 mb-4'>
				<h2 className='font-semibold'>Distribución</h2>
				{allowRandom && !data.length && (
					<button
						onClick={() => setInternal(randomize())}
						className='ml-auto text-xs px-2 py-1 rounded-md bg-neutral-900 text-neutral-100 dark:bg-neutral-700 hover:bg-neutral-800 active:scale-95 transition'>
						Regenerar
					</button>
				)}
			</div>
			<div className='flex flex-col lg:flex-row items-center gap-6'>
				<div style={{ width: size, height: size }} className='relative'>
					<svg
						width={size}
						height={size}
						viewBox={`0 0 ${size} ${size}`}
						role='img'
						aria-label='Gráfico de torta'>
						<defs>
							<filter id='pieShadow' x='-20%' y='-20%' width='140%' height='140%'>
								<feDropShadow dx='0' dy='2' stdDeviation='3' floodOpacity='0.18' />
							</filter>
						</defs>
						<g filter='url(#pieShadow)' transform={`rotate(-90 ${radius} ${radius})`}>
							{dataset.map((slice, i) => {
								const frac = slice.value / total;
								const strokeLength = frac * circumference;
								const strokeDasharray = `${strokeLength} ${
									circumference - strokeLength
								}`;
								const circleProps = {
									fill: 'none',
									stroke: slice.color || '#6366f1',
									strokeWidth: thickness > 0 ? thickness : radius,
									strokeLinecap: 'butt',
									strokeDasharray,
									strokeDashoffset: -offsetAcc,
								};
								offsetAcc += strokeLength; // acumular para el siguiente
								return (
									<motion.circle
										key={slice.label + i}
										{...circleProps}
										cx={radius}
										cy={radius}
										r={innerRadius ? radius - thickness / 2 : radius / 2}
										initial={{ strokeDasharray: `0 ${circumference}` }}
										animate={{ strokeDasharray }}
										transition={{ duration: 0.9, delay: i * 0.05, ease: 'easeOut' }}
										whileHover={{ scale: 1.02 }}
									/>
								);
							})}
						</g>
						{innerRadius > 0 && (
							<text
								x='50%'
								y='50%'
								textAnchor='middle'
								dominantBaseline='middle'
								className='fill-neutral-700 dark:fill-neutral-200 text-sm font-medium'>
								{total}
							</text>
						)}
					</svg>
				</div>
				{showLegend && (
					<div className='grid grid-cols-2 gap-x-6 gap-y-2 text-sm w-full max-w-xs'>
						<AnimatePresence>
							{dataset.map((d) => {
								const pct = ((d.value / total) * 100).toFixed(1);
								return (
									<motion.div
										key={d.label}
										initial={{ opacity: 0, y: 4 }}
										animate={{ opacity: 1, y: 0 }}
										exit={{ opacity: 0, y: -4 }}
										className='flex items-center gap-2'>
										<span
											className='h-3 w-3 rounded-sm shadow'
											style={{ background: d.color || '#6366f1' }}
										/>
										<div className='flex-1'>
											<p className='font-medium leading-tight'>{d.label}</p>
											<p className='text-[11px] text-neutral-500 dark:text-neutral-400'>
												{d.value} • {pct}%
											</p>
										</div>
									</motion.div>
								);
							})}
						</AnimatePresence>
					</div>
				)}
			</div>
		</div>
	);
}
