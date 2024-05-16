<script lang="ts">
	import Landing from '$lib/components/app/Landing.svelte';
	import Sidebar from '$lib/components/shared/Sidebar.svelte';
	export let data;
</script>

{#if !data.user}
	<div class="flex w-full bg-muted/40">
		<Sidebar />
		<slot />
	</div>
{:else}
	<Landing />
{/if}
