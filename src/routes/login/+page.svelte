<script lang="ts">
	import { Input } from 'flowbite-svelte';
	import Button from '../../components/Button.svelte';
	import { user, loaderLogin, login, loginSuccess } from './js/login.svelte';

	const handleClick = () => {
		login();
	};
</script>

<div class="flex min-h-screen items-center justify-center">
	<div class="w-full max-w-md rounded-lg bg-gray-800 p-8 shadow-md">
		<h2 class="mb-6 text-center text-2xl font-bold text-gray-800 dark:text-gray-100">
			Iniciar Sesión
		</h2>
		<form class="space-y-4">
			<!-- Campo de correo electrónico -->
			<div>
				<label for="email" class="block text-sm font-medium text-gray-700 dark:text-gray-200"
					>Nombre de Usuario</label
				>
				<Input
					type="text"
					id="email"
					name="email"
					class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 focus:outline-none sm:text-sm"
					placeholder="UserName"
					required
					bind:value={user.user}
					color={typeof $loginSuccess === 'undefined' ? 'base' : $loginSuccess ? 'green' : 'red'}
				/>
			</div>

			<!-- Campo de contraseña -->
			<div>
				<label for="password" class="block text-sm font-medium text-gray-700 dark:text-gray-200"
					>Contraseña</label
				>
				<Input
					type="password"
					id="password"
					name="password"
					class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 focus:outline-none sm:text-sm"
					placeholder="********"
					required
					bind:value={user.password}
					color={typeof $loginSuccess === 'undefined' ? 'base' : $loginSuccess ? 'green' : 'red'}
				/>
			</div>

			<!-- Botón de inicio de sesión -->
			<div>
				<Button text="Iniciar sesion" loading={$loaderLogin} {handleClick} />
			</div>
		</form>

		<!-- Enlace para recuperar contraseña -->
		<!-- <div class="mt-4 text-center">
			<a href="/forgot-password" class="text-sm text-indigo-600 hover:text-indigo-500"
				>¿Olvidaste tu contraseña?</a
			>
		</div> -->
	</div>
</div>
