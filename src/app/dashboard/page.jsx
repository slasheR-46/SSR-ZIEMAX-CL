'use client';
import { motion } from 'framer-motion';
import StatsCards from '@/app/components/ui/StatsCards';
import ActivitySummary from '@/app/components/ui/ActivitySummary';
import BarChart from '@/app/components/ui/BarChart';
import PieChart from '@/app/components/ui/PieChart';
import RadarChart from '@/app/components/ui/RadarChart';

const cards = [
	{ title: 'Indicador 1', value: '1,245', delta: '+8%' },
	{ title: 'Indicador 2', value: '$32K', delta: '+3%' },
	{ title: 'Indicador 3', value: '4.7%', delta: '+0.5%' },
	{ title: 'Indicador 4', value: '87', delta: '-2%' },
];

const activities = [
	'+ Nuevo usuario registrado',
	'* Actualización de plan',
	'+ Ticket resuelto',
];

export default function page() {
	return (
		<div className='space-y-8'>
			<StatsCards items={cards} />

			<div className='grid grid-cols-1 xl:grid-cols-12 gap-6'>
				<div className='xl:col-span-6'>
					<PieChart size={320} className='w-full' />
				</div>
				<div className='xl:col-span-6'>
					<RadarChart size={320} />
				</div>
			</div>
			<div className='grid grid-cols-1 xl:grid-cols-12 gap-6'>
				<div className='xl:col-span-6'>
					<BarChart height={300} className='h-full' />
				</div>
				<div className='xl:col-span-6'>
					<ActivitySummary
						fullHeight
						activities={activities}
						summaryText={
							'Estado general estable. Continúa la tendencia positiva de usuarios activos.'
						}
					/>
				</div>
			</div>
		</div>
	);
}
