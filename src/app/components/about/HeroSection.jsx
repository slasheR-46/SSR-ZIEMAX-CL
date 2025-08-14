'use client';
import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { Suspense, useRef } from 'react';
import DistortedSphere from '../ui3d/DistortedSphere';

export function HeroSection({ typed }) {
	// Configuración de la esfera (puedes ajustar o pasar por props si quieres personalizar)
	const sphereSettings = {
		// Colores más frescos / educativos tipo cielo
		color: '#8A3A8E',
		distort: 0.35,
		speed: 1.4,
		roughness: 0.3,
		metalness: 0.2,
		floatSpeed: 1.1,
		rotationIntensity: 0.5,
		floatIntensity: 0.9,
		radius: 1.9,
	};
	const mouse = useRef({ x: 0, y: 0 });
	function onMouseMove(e) {
		const { innerWidth, innerHeight } = window;
		mouse.current = {
			x: (e.clientX / innerWidth) * 2 - 1,
			y: -(e.clientY / innerHeight) * 2 + 1,
		};
	}
	const buttons = [
		{ label: 'Explorar Recursos', variant: 'primary' },
		{ label: 'Guías Docentes', variant: 'outline' },
	];
	return (
		<section
			id='hero'
			onMouseMove={onMouseMove}
			className='relative flex flex-col items-center justify-center min-h-[85vh] pt-40 pb-32 px-6 text-center overflow-hidden'>
			{/* Fondo 3D (z-0 para no quedar detrás del main) */}
			<div className='absolute inset-0 z-0 pointer-events-none'>
				<Canvas camera={{ position: [0, 0, 5], fov: 52 }} dpr={[1, 1.5]}>
					<ambientLight intensity={0.7} />
					<directionalLight position={[5, 5, 5]} intensity={1} />
					<Suspense fallback={null}>
						<DistortedSphere mouse={mouse} settings={sphereSettings} />
					</Suspense>
					{/* <axesHelper args={[5]} /> */}
				</Canvas>
				{/* Degradado / overlay para contraste de texto */}
				<div className='absolute inset-0 bg-[radial-gradient(circle_at_60%_40%,rgba(56,189,248,0.18),transparent_65%)]' />
				<div className='absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-white via-white/70 to-transparent dark:from-slate-900 dark:via-slate-900/70' />
			</div>

			{/* Contenido (capa superior) */}
			<div className='relative z-10 flex flex-col items-center'>
				<motion.h1
					initial={{ opacity: 0, y: 30 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8 }}
					className='text-4xl md:text-6xl font-extrabold tracking-tight max-w-4xl bg-clip-text text-transparent bg-gradient-to-r from-sky-500 via-cyan-400 to-emerald-400'>
					{typed || ''}
					<span className='animate-pulse'>▍</span>
				</motion.h1>
				<motion.p
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.3, duration: 0.7 }}
					className='mt-6 max-w-2xl text-white leading-relaxed'>
					Un espacio donde estudiantes y docentes exploran, experimentan y
					reflexionan con herramientas que apoyan un aprendizaje significativo y
					accesible.
				</motion.p>
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.5 }}
					className='mt-10 flex flex-wrap gap-4 justify-center'>
					{buttons.map((b) => (
						<motion.button
							key={b.label}
							whileHover={{ scale: 1.06, y: -2 }}
							whileTap={{ scale: 0.94 }}
							className={
								b.variant === 'primary'
									? 'px-6 py-3 rounded-lg bg-gradient-to-r from-sky-500 to-teal-500 text-white font-semibold shadow-md shadow-sky-500/30'
									: b.variant === 'outline'
									? 'px-6 py-3 rounded-lg border border-sky-400/60 text-sky-700 dark:text-sky-200 font-medium hover:bg-sky-50/60 dark:hover:bg-sky-400/10'
									: 'px-6 py-3 rounded-lg text-zinc-600 dark:text-zinc-300 hover:text-sky-600 dark:hover:text-sky-200 hover:bg-sky-50/60 dark:hover:bg-sky-400/10'
							}>
							{b.label}
						</motion.button>
					))}
				</motion.div>
			</div>
		</section>
	);
}
