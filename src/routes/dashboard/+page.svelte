<script>
	import { Accordion, AccordionItem, Button, Spinner } from 'flowbite-svelte';
	import { getRoulettes, loading } from './js/dashboard.svelte';
	import { onMount } from 'svelte';
	import { roulettes } from '../../shared/store/roulettes.svelte';

	onMount(() => {
		getRoulettes();
	});
</script>

<div class="mx-auto mt-6 w-8/12">
	<Accordion>
		<AccordionItem>
			<span slot="header">RULETAS</span>
			{#if $loading}
				<Spinner color="purple" />
			{:else}
				{#each $roulettes as item}
					<Button
						class="mb-2 block w-full cursor-pointer bg-violet-800 text-left ring-0 hover:bg-violet-600 focus:ring-0"
						onclick={() => console.log(item)}>{item.name}</Button
					>
				{/each}
			{/if}
		</AccordionItem>
		<AccordionItem>
			<span slot="header">FIESTA CALIENTE</span>
		</AccordionItem>
	</Accordion>
</div>
