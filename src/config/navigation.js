// Definición central de ítems de navegación del dashboard
// Cada ítem puede extenderse con permisos, roles, badges, etc.
export const dashboardNav = [
	{ href: '/dashboard', label: 'Inicio', icon: 'home' },
	{
		href: '/dashboard/usuarios',
		label: 'Gestión de Usuarios',
		icon: 'addressCard',
		children: [
			{ href: '/dashboard/usuarios/listado', label: 'Listado' },
			{ href: '/dashboard/usuarios/roles', label: 'Roles' },
			{ href: '/dashboard/usuarios/permisos', label: 'Permisos' },
			{ href: '/dashboard/usuarios/invitaciones', label: 'Invitaciones' },
		],
	},
	{ href: '/dashboard/perfil', label: 'Perfil', icon: 'user' },
	{ href: '/dashboard/configuracion', label: 'Config.', icon: 'cog' },
];
