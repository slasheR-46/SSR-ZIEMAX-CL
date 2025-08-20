'use client';
import { useState, useEffect } from 'react';
import Sidebar from '@/app/components/ui/Sidebar';
import DashboardHeader from '@/app/components/ui/DashboardHeader';
import { motion, AnimatePresence } from 'framer-motion';

// Layout principal del dashboard: provee Sidebar + Header + área de contenido
export default function DashboardLayout({ children }) {
	const [isSidebarOpen, setIsSidebarOpen] = useState(true);
	// Cierra por defecto en pantallas pequeñas
	useEffect(() => {
		const mq = window.matchMedia('(max-width: 1024px)');
		const handler = () => setIsSidebarOpen(!mq.matches); // abierto solo en desktop
		handler();
		mq.addEventListener('change', handler);
		return () => mq.removeEventListener('change', handler);
	}, []);

	// Calcula margin-left dinámico para empujar el contenido cuando el sidebar está abierto.
	// Desktop: abierto 240px, cerrado 72px. Mobile: abierto 240px, cerrado 0.
	const [viewportWidth, setViewportWidth] = useState(undefined);
	useEffect(() => {
		const update = () => setViewportWidth(window.innerWidth);
		update();
		window.addEventListener('resize', update);
		return () => window.removeEventListener('resize', update);
	}, []);

	const isDesktop = (viewportWidth || 0) >= 1024; // lg breakpoint
	const contentMarginLeft = isSidebarOpen ? 240 : isDesktop ? 72 : 0;

	return (
		<div className='min-h-screen flex bg-neutral-50 dark:bg-neutral-900 text-neutral-800 dark:text-neutral-100'>
			<Sidebar
				isOpen={isSidebarOpen}
				onToggle={() => setIsSidebarOpen((o) => !o)}
				isDesktop={isDesktop}
			/>
			<div
				className='flex-1 flex flex-col min-w-0 transition-[margin] duration-300 ease-out'
				style={{ marginLeft: contentMarginLeft }}>
				<DashboardHeader onToggleSidebar={() => setIsSidebarOpen((o) => !o)} />
				<main className='p-6 grow overflow-x-hidden'>
					<div className='max-w-7xl mx-auto w-full'>{children}</div>
				</main>
			</div>
		</div>
	);
}
