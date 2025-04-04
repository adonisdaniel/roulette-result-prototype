<script lang="ts">
	import Topbar from '../../components/Topbar/Topbar.svelte';

	let { children } = $props();
</script>

<Topbar />
{@render children()}
