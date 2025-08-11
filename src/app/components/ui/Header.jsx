'use client';
import {
	Button,
	Navbar,
	NavbarCollapse,
	NavbarLink,
	NavbarToggle,
	TextInput,
} from 'flowbite-react';
import Link from 'next/link';
import { AiOutlineSearch } from 'react-icons/ai';
import { FaMoon } from 'react-icons/fa';
import { usePathname } from 'next/navigation';

export default function Header() {
	const path = usePathname();
	return (
		<Navbar className='border-b-2'>
			<Link
				href='/'
				className='self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white'>
				<span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white'>
					Ziemax
				</span>
				SSR
			</Link>
			<div className='flex gap-2 md:order-2'>
				<Button className='w-12 h-10 hidden sm:inline' color='gray' pill>
					<FaMoon />
				</Button>
				{/* <Link href='/sign-in'>
					<Button outline>Iniciar Sesión</Button>
				</Link> */}
				<NavbarToggle />
			</div>
			<NavbarCollapse>
				<Link href='/'>
					<NavbarLink active={path === '/'} as={'div'}>
						Home
					</NavbarLink>
				</Link>
				<Link href='/about'>
					<NavbarLink active={path === '/about'} as={'div'}>
						Sobre Nosotros
					</NavbarLink>
				</Link>
			</NavbarCollapse>
		</Navbar>
	);
}
