'use client';
import { motion } from 'framer-motion';
import { useMemo, useState, useEffect, useRef } from 'react';

/**
 * FunnelChart (reemplaza BarChart manteniendo el mismo nombre de export para no tocar imports).
'use client';
import { motion } from 'framer-motion';
import { useMemo, useState, useEffect, useRef } from 'react';

/**
 * FunnelChart mejorado (mantiene nombre BarChart para no cambiar imports existentes)
 */
export default function BarChart({
	data = [],
	height = 320,
	gap = 12,
	className = '',
	showValues = true,
	allowRandom = true,
	showInnerLabels = true,
	showTooltip = true,
	rounded = true,
	showSummary = true,
	highlightLargestDrop = true,
	allowExport = true,
	showMiniBars = true,
}) {
	const palette = [
		'#6366f1',
		'#8b5cf6',
		'#ec4899',
		'#f97316',
		'#10b981',
		'#0ea5e9',
		'#f59e0b',
	];
	const defaultData = useMemo(
		() => [
			{ label: 'Visitas', value: 1000, color: palette[0] },
			{ label: 'Registro', value: 620, color: palette[1] },
			{ label: 'Onboarding', value: 410, color: palette[2] },
			{ label: 'Trial Activo', value: 260, color: palette[3] },
			{ label: 'Clientes', value: 170, color: palette[4] },
		],
		[]
	);

	const randomize = () => {
		let base = 1000 + Math.floor(Math.random() * 400);
		return defaultData.map((d, i) => {
			if (i === 0) return { ...d, value: base };
			base = Math.max(10, Math.floor(base * (0.45 + Math.random() * 0.25)));
			return { ...d, value: base };
		});
	};

	const [internal, setInternal] = useState(data.length ? data : defaultData);
	useEffect(() => {
		if (!data.length) setInternal(randomize());
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const stages = (data.length ? data : internal).map((s, i) => ({
		...s,
		color: s.color || palette[i % palette.length],
	}));
	if (!stages.length)
		return <div className='text-sm text-neutral-500'>Sin datos.</div>;
	const max = stages[0].value || 1;
	const segmentHeight = (height - gap * (stages.length - 1)) / stages.length;

	// Metrics
	const first = stages[0].value || 1;
	const last = stages[stages.length - 1].value || 0;
	const overallConv = (last / first) * 100;
	const stepConvs = stages
		.slice(1)
		.map((s, i) => (s.value / stages[i].value) * 100);
	const avgStepConv = stepConvs.length
		? stepConvs.reduce((a, b) => a + b, 0) / stepConvs.length
		: 100;
	const drops = stages.map((s, i) =>
		i === 0 ? 0 : ((stages[i - 1].value - s.value) / stages[i - 1].value) * 100
	);
	let largestDropIndex = 0;
	if (highlightLargestDrop) {
		drops.forEach((d, i) => {
			if (i > 0 && d > drops[largestDropIndex]) largestDropIndex = i;
		});
	}

	const exportCSV = () => {
		const headers = [
			'Etapa',
			'Valor',
			'ConversionTotal(%)',
			'ConversionDesdePrevio(%)',
			'CaidaDesdePrevio(%)',
		];
		const lines = stages.map((s, i) => {
			const convTotal = ((s.value / first) * 100).toFixed(2);
			const convPrev =
				i === 0 ? '100.00' : ((s.value / stages[i - 1].value) * 100).toFixed(2);
			const dropPrev =
				i === 0
					? '0.00'
					: (((stages[i - 1].value - s.value) / stages[i - 1].value) * 100).toFixed(
							2
					  );
			return `${s.label},${s.value},${convTotal},${convPrev},${dropPrev}`;
		});
		const csv = [headers.join(','), ...lines].join('\n');
		const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
		const url = URL.createObjectURL(blob);
		const a = document.createElement('a');
		a.href = url;
		a.download = 'embudo.csv';
		a.click();
		URL.revokeObjectURL(url);
	};

	// Tooltip
	const [hover, setHover] = useState(null); // {index,x,y}
	const svgRef = useRef(null);
	const handleMove = (e, index) => {
		if (!showTooltip) return;
		const rect = svgRef.current?.getBoundingClientRect();
		if (!rect) return;
		setHover({ index, x: e.clientX - rect.left, y: e.clientY - rect.top });
	};
	const clearHover = () => setHover(null);

	return (
		<div
			className={`bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl p-6 ${className}`}>
			<div className='flex items-start gap-3 mb-4'>
				<h2 className='font-semibold'>Embudo de Conversión</h2>
				{allowRandom && !data.length && (
					<button
						onClick={() => setInternal(randomize())}
						className='ml-auto text-xs px-2 py-1 rounded-md bg-neutral-900 text-neutral-100 dark:bg-neutral-700 hover:bg-neutral-800 active:scale-95 transition'>
						Regenerar
					</button>
				)}
				{allowExport && (
					<button
						onClick={exportCSV}
						className='text-xs px-2 py-1 rounded-md bg-neutral-200 dark:bg-neutral-600 text-neutral-800 dark:text-neutral-100 hover:bg-neutral-300 dark:hover:bg-neutral-500 active:scale-95 transition'>
						Exportar CSV
					</button>
				)}
			</div>
			{showSummary && (
				<div className='grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5 text-xs'>
					<div className='p-3 rounded-md bg-neutral-50 dark:bg-neutral-900/40 border border-neutral-200 dark:border-neutral-700'>
						<p className='uppercase tracking-wide text-[10px] text-neutral-500 dark:text-neutral-400'>
							Inicio
						</p>
						<p className='font-semibold'>{first}</p>
					</div>
					<div className='p-3 rounded-md bg-neutral-50 dark:bg-neutral-900/40 border border-neutral-200 dark:border-neutral-700'>
						<p className='uppercase tracking-wide text-[10px] text-neutral-500 dark:text-neutral-400'>
							Final
						</p>
						<p className='font-semibold'>{last}</p>
					</div>
					<div className='p-3 rounded-md bg-neutral-50 dark:bg-neutral-900/40 border border-neutral-200 dark:border-neutral-700'>
						<p className='uppercase tracking-wide text-[10px] text-neutral-500 dark:text-neutral-400'>
							Conv. Total
						</p>
						<p className='font-semibold'>{overallConv.toFixed(1)}%</p>
					</div>
					<div className='p-3 rounded-md bg-neutral-50 dark:bg-neutral-900/40 border border-neutral-200 dark:border-neutral-700'>
						<p className='uppercase tracking-wide text-[10px] text-neutral-500 dark:text-neutral-400'>
							Conv. Promedio Paso
						</p>
						<p className='font-semibold'>{avgStepConv.toFixed(1)}%</p>
					</div>
				</div>
			)}
			<div className='flex flex-col lg:flex-row gap-6'>
				<div className='relative flex-1 min-w-[240px]' style={{ height }}>
					<svg
						ref={svgRef}
						width='100%'
						height={height}
						viewBox={`0 0 100 ${height}`}
						preserveAspectRatio='xMidYMid meet'
						role='img'
						aria-label='Embudo de conversión'>
						<defs>
							{stages.map((s, i) => (
								<linearGradient
									key={s.label + 'grad'}
									id={`fgrad-${i}`}
									x1='0%'
									y1='0%'
									x2='0%'
									y2='100%'>
									<stop offset='0%' stopColor={s.color} stopOpacity='0.95' />
									<stop offset='100%' stopColor={s.color} stopOpacity='0.7' />
								</linearGradient>
							))}
						</defs>
						{stages.map((s, i) => {
							const topWidth = (s.value / max) * 100;
							const bottomValue = stages[i + 1]?.value ?? s.value * 0.7;
							const bottomWidth = (bottomValue / max) * 100;
							const y = i * (segmentHeight + gap);
							const nextY = y + segmentHeight;
							const leftTop = (100 - topWidth) / 2;
							const rightTop = (100 + topWidth) / 2;
							const leftBottom = (100 - bottomWidth) / 2;
							const rightBottom = (100 + bottomWidth) / 2;
							const path = rounded
								? `M ${leftTop},${y} L ${rightTop},${y} Q ${rightBottom},${y} ${rightBottom},${
										y + 4
								  } L ${rightBottom},${nextY - 4} Q ${rightBottom},${nextY} ${
										rightBottom - 2
								  },${nextY} L ${
										leftBottom + 2
								  },${nextY} Q ${leftBottom},${nextY} ${leftBottom},${
										nextY - 4
								  } L ${leftBottom},${y + 4} Q ${leftBottom},${y} ${leftTop},${y}`
								: `M ${leftTop},${y} L ${rightTop},${y} L ${rightBottom},${nextY} L ${leftBottom},${nextY} Z`;
							const pct = ((s.value / max) * 100).toFixed(1);
							return (
								<g
									key={s.label}
									onMouseMove={(e) => handleMove(e, i)}
									onMouseEnter={(e) => handleMove(e, i)}
									onMouseLeave={clearHover}>
									<motion.path
										d={path}
										fill={`url(#fgrad-${i})`}
										stroke='rgba(0,0,0,0.08)'
										strokeWidth='0.25'
										initial={{ opacity: 0, translateY: 8 }}
										animate={{ opacity: 1, translateY: 0 }}
										transition={{
											delay: i * 0.07,
											type: 'spring',
											stiffness: 160,
											damping: 22,
										}}
										whileHover={{ filter: 'brightness(1.12)', strokeWidth: 0.4 }}
									/>
									{showInnerLabels && (
										<motion.text
											x='50%'
											y={y + segmentHeight / 2}
											textAnchor='middle'
											dominantBaseline='middle'
											className='fill-white text-[10px] font-semibold mix-blend-luminosity'
											initial={{ opacity: 0 }}
											animate={{ opacity: 1 }}
											transition={{ delay: 0.3 + i * 0.05 }}>
											{s.value} • {pct}%
										</motion.text>
									)}
								</g>
							);
						})}
					</svg>
					{showTooltip && hover && stages[hover.index] && (
						<div
							className='pointer-events-none absolute z-10 px-3 py-2 rounded-md bg-neutral-900/90 text-neutral-100 text-[11px] shadow-lg backdrop-blur'
							style={{ left: hover.x + 8, top: hover.y + 8 }}>
							<p className='font-semibold'>{stages[hover.index].label}</p>
							<p>Valor: {stages[hover.index].value}</p>
							{hover.index > 0 && (
								<p>
									Conversión:{' '}
									{((stages[hover.index].value / stages[0].value) * 100).toFixed(1)}%
									total
								</p>
							)}
							{hover.index > 0 && (
								<p>
									Desde previo:{' '}
									{(
										(stages[hover.index].value / stages[hover.index - 1].value) *
										100
									).toFixed(1)}
									%
								</p>
							)}
						</div>
					)}
				</div>
				<div className='w-full max-w-sm flex flex-col gap-3'>
					{stages.map((s, i) => {
						const pct = ((s.value / max) * 100).toFixed(1);
						const drop =
							i === 0
								? '-'
								: (
										((stages[i - 1].value - s.value) / stages[i - 1].value) *
										100
								  ).toFixed(1) + '%';
						return (
							<motion.div
								key={s.label}
								initial={{ opacity: 0, x: -8 }}
								animate={{ opacity: 1, x: 0 }}
								transition={{ delay: 0.2 + i * 0.05 }}
								className={`flex flex-col gap-1 p-2 rounded-md border relative border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900/40 ${
									highlightLargestDrop && i === largestDropIndex && i > 0
										? 'ring-1 ring-red-400/60'
										: ''
								}`}>
								<div className='flex items-center gap-2 w-full'>
									<span
										className='h-3 w-3 rounded-sm shrink-0'
										style={{ background: s.color }}
									/>
									<div className='flex-1 min-w-0'>
										<p className='text-sm font-medium leading-tight truncate'>
											{s.label}
										</p>
										<p className='text-[11px] text-neutral-500 dark:text-neutral-400'>
											Valor: {s.value} • {pct}% inicio
										</p>
									</div>
									{showValues && (
										<span className='text-[11px] font-semibold text-neutral-700 dark:text-neutral-300 shrink-0'>
											▼ {drop}
										</span>
									)}
								</div>
								{showMiniBars && (
									<div className='h-1.5 w-full rounded bg-neutral-200 dark:bg-neutral-700 overflow-hidden'>
										<div
											className='h-full rounded-r bg-gradient-to-r from-neutral-900/80 dark:from-neutral-100/80 to-neutral-600/50 dark:to-neutral-300/40'
											style={{ width: `${(s.value / first) * 100}%` }}
										/>
									</div>
								)}
								{highlightLargestDrop && i === largestDropIndex && i > 0 && (
									<span className='absolute -top-2 right-2 bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded shadow'>
										Mayor caída
									</span>
								)}
							</motion.div>
						);
					})}
				</div>
			</div>
		</div>
	);
}
