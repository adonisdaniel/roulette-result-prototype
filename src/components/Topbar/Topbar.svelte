<script>
	import { hideMenu, handleLogout } from './api.svelte';

	const toggleMenu = () => hideMenu.set(!$hideMenu);
</script>

<nav
	class="border-gray-200 bg-white text-sm font-medium text-gray-900 shadow-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white"
>
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<div class="flex h-16 justify-between">
			<!-- Logo o título -->
			<div class="flex items-center">
				<span class="text-lg font-semibold">SPRINT GAMING</span>
			</div>

			<!-- Menú desplegable -->
			<div class="relative flex items-center">
				<button
					id="menu-button"
					class="flex items-center rounded-full focus:ring-2 focus:ring-indigo-500 focus:outline-none"
					onclick={toggleMenu}
					aria-label="Abrir menú"
				>
					<svg
						class="h-6 w-6"
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
						/>
					</svg>
				</button>
			</div>
			<!-- Submenú -->
			<div
				id="menu-dropdown"
				class={[
					'ring-opacity-5 mr02 absolute right-0 mt-16 mr-2 w-48 rounded-md bg-white shadow-lg ring-1 ring-black dark:bg-gray-700 dark:ring-gray-600',
					{ hidden: $hideMenu }
				]}
			>
				<div class="py-1">
					<a
						href="/profile"
						class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 hover:dark:bg-gray-800"
					>
						Perfil
					</a>
					<a
						href="/config"
						class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 hover:dark:bg-gray-800"
					>
						Configuración
					</a>
					<button
						onclick={handleLogout}
						class="block w-full cursor-pointer px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 hover:dark:bg-gray-800"
					>
						Cerrar Sesión
					</button>
				</div>
			</div>
		</div>
	</div>
</nav>
