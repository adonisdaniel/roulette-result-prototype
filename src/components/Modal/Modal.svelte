<script lang="ts">
	import { Modal } from 'flowbite-svelte';
	import { defaultModal } from './js/modal.svelte';

	const {
		title = 'TITLE DEFAULT',
		description = '',
		colorBg = 'bg-red-900 dark:bg-red-900',
		colorModal = 'red'
	} = $props<{
		colorModal?: string;
		colorBg?: string;
		title?: string;
		description?: string;
	}>();
</script>

<Modal
	{title}
	bind:open={$defaultModal}
	autoclose
	color={colorModal}
	classBody={colorBg}
	classHeader={colorBg}
	size="xs"
>
	<p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
		{description}
	</p>
</Modal>
