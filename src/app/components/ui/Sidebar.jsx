'use client';
import React, { useMemo, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
	FaHome,
	FaUser,
	FaCog,
	FaChevronLeft,
	FaChevronRight,
	FaAddressCard,
} from 'react-icons/fa';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { dashboardNav } from '@/config/navigation';

const iconMap = {
	home: <FaHome />,
	user: <FaUser />,
	cog: <FaCog />,
	addressCard: <FaAddressCard />,
};

export default function Sidebar({ isOpen, onToggle, isDesktop }) {
	const pathname = usePathname();
	const router = useRouter();
	const year = useMemo(() => new Date().getFullYear(), []);
	// Estado de grupos abiertos cuando está expandido
	const [openGroups, setOpenGroups] = useState({}); // { href: boolean }
	const toggleGroup = useCallback((href) => {
		setOpenGroups((prev) => ({ ...prev, [href]: !prev[href] }));
	}, []);
	// Hover para flyout cuando sidebar colapsado
	const [hoverGroup, setHoverGroup] = useState(null);

	const handleItemClick = (item, hasChildren) => {
		if (hasChildren) {
			if (isOpen) toggleGroup(item.href);
		} else {
			router.push(item.href);
			if (!isDesktop) onToggle();
		}
	};
	return (
		<>
			{/* Botón flotante sólo en mobile cuando está cerrado */}
			<AnimatePresence>
				{!isDesktop && !isOpen && (
					<motion.button
						key='fab-open'
						initial={{ scale: 0, opacity: 0 }}
						animate={{ scale: 1, opacity: 1 }}
						exit={{ scale: 0, opacity: 0 }}
						onClick={onToggle}
						className='fixed bottom-4 left-4 z-40 rounded-full bg-neutral-900 text-white w-12 h-12 flex items-center justify-center shadow-lg active:scale-95'
						aria-label='Abrir menú'>
						<FaChevronRight />
					</motion.button>
				)}
			</AnimatePresence>

			<AnimatePresence initial={false}>
				{(isDesktop || isOpen) && (
					<motion.aside
						key='sidebar'
						initial={{ x: -260, opacity: 0 }}
						animate={{ x: 0, opacity: 1 }}
						exit={{ x: -260, opacity: 0 }}
						transition={{ type: 'spring', stiffness: 300, damping: 30 }}
						className='fixed z-50 top-0 left-0 h-screen bg-neutral-900 text-neutral-100 flex flex-col border-r border-neutral-800 shadow-lg'
						style={{ width: isOpen ? 240 : isDesktop ? 72 : 240 }}>
						<div className='flex items-center justify-between gap-2 p-4 h-16 border-b border-neutral-800'>
							<span
								className='font-semibold text-sm tracking-wide whitespace-nowrap overflow-hidden transition-all duration-300'
								style={{ width: isOpen ? 'auto' : 0 }}>
								{isOpen && 'Dashboard'}
							</span>
							<button
								onClick={onToggle}
								className='p-2 rounded-md hover:bg-neutral-800 transition text-neutral-300'
								aria-label='Toggle sidebar'>
								{isOpen ? <FaChevronLeft /> : <FaChevronRight />}
							</button>
						</div>
						<nav
							className='flex-1 overflow-y-auto py-4 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-neutral-700/60'
							aria-label='Navegación dashboard'>
							<ul className='flex flex-col gap-1 px-2'>
								{dashboardNav.map((item) => {
									const hasChildren =
										Array.isArray(item.children) && item.children.length > 0;
									const anyChildActive =
										hasChildren && item.children.some((c) => pathname === c.href);
									const activeOwn =
										pathname === item.href ||
										(item.href !== '/dashboard' && pathname.startsWith(item.href));
									const active = activeOwn || anyChildActive;
									const groupOpen = !!openGroups[item.href];
									const flyoutVisible =
										hasChildren && !isOpen && hoverGroup === item.href;
									return (
										<li
											key={item.href}
											className='flex flex-col relative'
											onMouseEnter={() =>
												!isOpen && hasChildren && setHoverGroup(item.href)
											}
											onMouseLeave={() => !isOpen && hasChildren && setHoverGroup(null)}>
											<button
												type='button'
												onClick={() => handleItemClick(item, hasChildren)}
												className={`group w-full text-left flex items-center gap-3 px-3 py-2 rounded-md text-sm transition ${
													active
														? 'bg-neutral-800 text-white shadow-inner'
														: 'text-neutral-300 hover:bg-neutral-800 hover:text-white'
												}`}
												aria-haspopup={hasChildren || undefined}
												aria-expanded={
													hasChildren ? (isOpen ? groupOpen : flyoutVisible) : undefined
												}>
												<span className='text-lg'>{iconMap[item.icon] || <FaHome />}</span>
												<span
													className='whitespace-nowrap overflow-hidden transition-all duration-300'
													style={{ width: isOpen ? 'auto' : 0 }}>
													{isOpen && item.label}
												</span>
												{hasChildren && isOpen && (
													<motion.span
														initial={false}
														animate={{ rotate: groupOpen ? 90 : 0 }}
														className='ml-auto text-[10px] opacity-70'>
														▶
													</motion.span>
												)}
												{active && !hasChildren && isOpen && (
													<span className='ml-auto inline-block h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_0_3px_rgba(16,185,129,0.25)]' />
												)}
											</button>
											{hasChildren && isOpen && groupOpen && (
												<ul className='pl-8 py-1 flex flex-col gap-1'>
													{item.children.map((child) => {
														const childActive = pathname === child.href;
														return (
															<li key={child.href}>
																<Link
																	href={child.href}
																	className={`block px-2 py-1 rounded-md text-[12px] transition ${
																		childActive
																			? 'bg-neutral-800 text-white'
																			: 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800'
																	}`}
																	onClick={() => !isDesktop && onToggle()}>
																	{child.label}
																</Link>
															</li>
														);
													})}
												</ul>
											)}
											{flyoutVisible && (
												<div className='absolute left-full top-0 ml-1 w-48 py-2 px-2 rounded-md bg-neutral-900 border border-neutral-800 shadow-xl z-50'>
													<ul className='flex flex-col gap-1'>
														{item.children.map((child) => {
															const childActive = pathname === child.href;
															return (
																<li key={child.href}>
																	<Link
																		href={child.href}
																		className={`block px-2 py-1 rounded-md text-[12px] transition ${
																			childActive
																				? 'bg-neutral-800 text-white'
																				: 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800'
																		}`}
																		onClick={() => !isDesktop && onToggle()}>
																		{child.label}
																	</Link>
																</li>
															);
														})}
													</ul>
												</div>
											)}
										</li>
									);
								})}
							</ul>
						</nav>
						<div className='p-3 text-[10px] text-neutral-500 tracking-wide'>
							{isOpen && <p>&copy; {year} Ziemax</p>}
						</div>
					</motion.aside>
				)}
			</AnimatePresence>
		</>
	);
}
