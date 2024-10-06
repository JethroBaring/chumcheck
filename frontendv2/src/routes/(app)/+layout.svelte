<script lang="ts">
	import Header from '$lib/components/app/Header.svelte';
	import Landing from '$lib/components/landing/Landing.svelte';
	let { children, data } = $props();
</script>

{#if !data.user}
	<Landing />
{:else}
	<div class="flex h-full flex-col">
		<div
			class="absolute inset-0 -z-10 h-full w-full bg-[radial-gradient(#ecf3fc_1px,transparent_1px)] [background-size:2.5rem_2.5rem] [mask-image:radial-gradient(ellipse_100%_50%_at_50%_50%,#000_70%,transparent_100%)] dark:bg-[radial-gradient(#171e31_1px,transparent_1px)]"
		></div>
		<Header user={data.user} />
		<div class="mx-auto my-5 flex h-full w-4/5 flex-col">
			{@render children()}
		</div>
	</div>
{/if}
						