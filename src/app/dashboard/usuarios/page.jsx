'use client';
import React from 'react';

export default function UsuariosPage() {
	return (
		<div className='space-y-6'>
			<h1 className='text-2xl font-semibold'>Gestión de Usuarios</h1>
			<p className='text-sm text-neutral-600 dark:text-neutral-300'>
				Sección inicial para administrar usuarios. Aquí podrás listar, crear, editar
				y desactivar usuarios (pendiente de implementación).
			</p>
			<div className='p-6 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800'>
				<p className='text-neutral-500 dark:text-neutral-400 text-sm'>
					Próximamente: tabla de usuarios y acciones.
				</p>
			</div>
		</div>
	);
}
