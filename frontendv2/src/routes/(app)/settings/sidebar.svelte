<script lang="ts">
	import { cubicInOut } from "svelte/easing";
	import { crossfade } from "svelte/transition";
	import { cn } from "$lib/utils.js";
	import { page } from "$app/stores";
	import { Button } from "$lib/components/ui/button";

	let className: string | undefined | null = undefined;
	export let items: { href: string; title: string }[];
	export { className as class };

	const [send, receive] = crossfade({
		duration: 250,
		easing: cubicInOut,
	});
</script>

<nav class={cn("flex flex-col space-x-0 space-y-1", className)}>
	{#each items as item}
		{@const isActive = $page.url.pathname === item.href}

		<Button
			href={item.href}
			variant="ghost"
			class={cn(
				!isActive && "hover:underline",
				"relative justify-start hover:bg-transparent"
			)}
			data-sveltekit-noscroll
		>
			{#if true}
				<!-- svelte-ignore element_invalid_self_closing_tag -->
				<div
					class="bg-muted absolute inset-0 rounded-md"
					in:send={{ key: "active-sidebar-tab" }}
					out:receive={{ key: "active-sidebar-tab" }}
				/>
			{/if}
			<div class="relative">
				{item.title}
			</div>
		</Button>
	{/each}
</nav>