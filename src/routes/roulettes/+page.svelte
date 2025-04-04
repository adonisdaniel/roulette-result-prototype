<script lang="ts">
	import { onMount } from 'svelte';
	import { writable } from 'svelte/store';
	import {
		ROULETTE_SINGLE_ZERO_NUMBER,
		type RouletteNumber
	} from '../../shared/contants/ROULETTES_NUMBER';
	import { Button } from 'flowbite-svelte';

	const numbers = writable<RouletteNumber[]>([]);

	const numberSelected = writable<RouletteNumber | null>(null);

	const results = ROULETTE_SINGLE_ZERO_NUMBER;

	onMount(() => {
		const type_roulette = 'double-zero';

		if (type_roulette === 'double-zero') {
			numbers.set(ROULETTE_SINGLE_ZERO_NUMBER);
		}
	});
</script>

<div class="page-grid overflow-x-hidden bg-green-800 p-4 font-bold text-white">
	<div class="h-full">
		<div class="flex justify-between text-2xl">
			<p>PROVIDER ID: 100</p>
			<p>
				<Button color="dark" href="/dashboard">SALIR</Button>
			</p>
		</div>
		<div class="buttons-result-container mt-4 gap-2">
			<div class="grid-tablero">
				{#each $numbers as number}
					<Button
						color={number.color}
						style="width: 3.5rem; height: 7rem; font-weight: bolder; font-size: 1.5rem;"
						onclick={() => numberSelected.set(number)}>{number.text}</Button
					>
				{/each}
			</div>
			<div class="result-grid">
				<div>
					<p class="text-4xl">...CARGANDO...</p>
				</div>
				<div class="number-selected-container">
					<div class="flex items-center justify-between text-2xl">
						{#if $numberSelected}
							<span>NUMERO SELECCIONADO:</span>
						{:else}
							<span>SELECCIONE UN NUMERO</span>
						{/if}
						{#if $numberSelected}
							<Button
								size="md"
								class="pointer-events-none ml-4"
								color={$numberSelected.color}
								style="width: 3.5rem; height: 7rem; font-weight: bolder; font-size: 1.5rem;"
							>
								{$numberSelected.text}
							</Button>
						{/if}
					</div>
					{#if $numberSelected}
						<div class="mt-4 flex">
							<Button class="mr-2" color="purple">ENVIAR</Button>
							<Button color="dark" onclick={() => numberSelected.set(null)}>CANCELAR</Button>
						</div>
					{/if}
				</div>
				<div class="result-container">
					<p>RESULTADOS</p>
					<div class="mt-4 flex items-center">
						{#each results as result}
							<Button size="xs" class="pointer-events-none mr-2 mb-2" color={result.color}
								>{result.text}</Button
							>
						{/each}
					</div>
				</div>
			</div>
		</div>
	</div>
</div>

<style>
	.page-grid {
		display: grid;
		height: 100vh;
		width: 100%;
	}

	.page-grid > div {
		max-width: 1200px;
		margin: 0 auto;
		display: grid;
		grid-template-rows: 3rem 1fr;
	}

	.buttons-result-container {
		display: flex;
		align-items: center;
	}

	@media screen and (max-width: 1200px) {
		.page-grid > div {
			display: flex;
			flex-direction: column;
		}

		.buttons-result-container {
			flex-direction: column;
		}
	}

	.grid-tablero {
		display: grid;
		grid-template-rows: repeat(3, 1fr);
		grid-template-columns: repeat(13, 1fr);
		gap: 0.5rem;
	}

	.grid-tablero:nth-child(1) {
		grid-row: 1/-1;
	}

	.result-grid {
		display: grid;
		height: 100%;
		background-color: rgb(0 96 45);
		border-radius: 6px;
		padding: 1rem;
	}

	.number-selected-container {
		align-self: center;
	}

	.result-container {
		overflow-x: scroll;
		height: 60%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-self: self-end;
	}
</style>
