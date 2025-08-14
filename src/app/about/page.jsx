'use client';
import React, { useEffect, useState } from 'react';
import GuiBackdrop from '../components/about/GuiBackdrop';
import { useTypewriter } from '../components/about/useTypewriter';
import SectionNav from '../components/about/SectionNav';
import { HeroSection } from '../components/about/HeroSection';
import { OfferSection } from '../components/about/OfferSection';
import { TimelineSection } from '../components/about/TimelineSection';
import { CtaSection } from '../components/about/CtaSection';
import Lenis from 'lenis';

// Contenido adaptado a un tono más educativo / humano
const timelineItems = [
	{
		year: '2023',
		title: 'Primera aula digital',
		text:
			'Creamos un prototipo para apoyar a docentes que querían centralizar materiales y evaluaciones.',
	},
	{
		year: '2024',
		title: 'Aprendizaje colaborativo',
		text:
			'Sumamos foros, rúbricas y mejoras de accesibilidad para distintos estilos de aprendizaje.',
	},
	{
		year: '2025',
		title: 'Datos para acompañar',
		text:
			'Incorporamos analítica que traduce números en guías para docentes y tutores.',
	},
];

export default function AboutPage() {
	const typed = useTypewriter([
		'Aprender Juntos',
		'Explorar, Crear, Compartir',
		'Tecnología al Servicio del Aula',
	]);

	useEffect(() => {
		const lenis = new Lenis({ duration: 1.05, smoothWheel: true });
		function raf(time) {
			lenis.raf(time);
			requestAnimationFrame(raf);
		}
		requestAnimationFrame(raf);
		return () => lenis.destroy();
	}, []);

	const sectionIds = ['hero', 'ofrecemos', 'timeline', 'cta'];
	const [activeAnchor, setActiveAnchor] = useState('hero');

	useEffect(() => {
		const obs = new IntersectionObserver(
			(entries) => {
				entries.forEach((e) => {
					if (e.isIntersecting) setActiveAnchor(e.target.id);
				});
			},
			{ threshold: 0.35 }
		);
		sectionIds.forEach((id) => {
			const el = document.getElementById(id);
			if (el) obs.observe(el);
		});
		return () => obs.disconnect();
	}, []);

	return (
		<main className='relative min-h-screen text-zinc-800 overflow-x-hidden bg-[radial-gradient(circle_at_20%_20%,#e0f2fe_0%,#f0f9ff_35%,#ffffff_70%)] dark:bg-[radial-gradient(circle_at_20%_20%,#0f172a_0%,#0f172a_55%,#0a0f1c_90%)] transition-colors'>
			{/* Fondo más amable y educativo: tonos claros suaves + sutil textura de puntos */}
			<GuiBackdrop />
			<SectionNav sectionIds={sectionIds} active={activeAnchor} />
			<HeroSection typed={typed} />
			<OfferSection />
			<TimelineSection items={timelineItems} />
			<CtaSection />
		</main>
	);
}
