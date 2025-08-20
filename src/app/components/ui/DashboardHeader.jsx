'use client';
import { motion } from 'framer-motion';
import { FaBars, FaBell, FaUserCircle } from 'react-icons/fa';

export default function DashboardHeader({ onToggleSidebar }) {
	return (
		<motion.header
			initial={{ y: -20, opacity: 0 }}
			animate={{ y: 0, opacity: 1 }}
			transition={{ type: 'spring', stiffness: 260, damping: 20 }}
			className='sticky top-0 z-30 backdrop-blur bg-white/70 dark:bg-neutral-900/60 border-b border-neutral-200 dark:border-neutral-800'>
			<div className='flex items-center gap-4 px-4 h-16'>
				<button
					onClick={onToggleSidebar}
					className='lg:hidden p-2 rounded-md hover:bg-neutral-200 dark:hover:bg-neutral-800 transition'
					aria-label='Abrir/Cerrar sidebar'>
					<FaBars />
				</button>
				<h1 className='font-semibold text-lg hidden sm:block'>Panel</h1>
				<div className='ml-auto flex items-center gap-3'>
					<button
						className='relative p-2 rounded-md hover:bg-neutral-200 dark:hover:bg-neutral-800 transition'
						aria-label='Notificaciones'>
						<FaBell />
						<span className='absolute -top-1 -right-1 bg-red-500 text-white text-[10px] rounded-full h-4 w-4 flex items-center justify-center'>
							3
						</span>
					</button>
					<button className='flex items-center gap-2 px-3 py-1.5 rounded-md hover:bg-neutral-200 dark:hover:bg-neutral-800 transition'>
						<FaUserCircle className='text-xl' />
						<span className='text-sm hidden md:inline'>Usuario</span>
					</button>
				</div>
			</div>
		</motion.header>
	);
}
