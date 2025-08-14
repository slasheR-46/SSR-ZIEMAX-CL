'use client';
import InteractiveCards from './InteractiveCards';

export function OfferSection() {
	return (
		<section id='ofrecemos' className='relative z-10 pt-10 pb-32'>
			<h2 className='text-center text-2xl md:text-3xl font-semibold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-sky-600 via-cyan-500 to-emerald-500'>
				Recursos de aprendizaje
			</h2>
			<p className='text-center text-sm md:text-base text-zinc-600 dark:text-zinc-300 max-w-2xl mx-auto mb-12'>
				Herramientas y módulos pensados para acompañar distintos estilos, ritmos y
				contextos educativos.
			</p>
			<InteractiveCards />
		</section>
	);
}
