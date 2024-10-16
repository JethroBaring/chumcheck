<script lang="ts">
	import { page } from '$app/stores';
	import { Button } from '$lib/components/ui/button';
	import { cn } from '$lib/utils';
	let { children } = $props();
	import { cubicInOut } from 'svelte/easing';
	import { crossfade } from 'svelte/transition';
	let currentPage = $derived($page.url.pathname.slice(1).split('/')[1]);
	const [send, receive] = crossfade({
		duration: 250,
		easing: cubicInOut
	});

	const items = ['profile', 'appearance', 'password'];
</script>

<div class="flex items-center justify-between">
	<div>
		<h2 class="text-3xl font-bold">Settings</h2>
		<p class="text-muted-foreground">Manage your account</p>
	</div>
</div>

<div class="mt-5 grid w-full grid-cols-[250px_1fr] gap-14">
	<nav class="flex flex-1 flex-col gap-3 text-sm text-muted-foreground">
		{#each items as item}
			{@const isActive = currentPage === item}

			<a href={`/account_settings/${item}`} class="w-full">
				<Button
					variant="ghost"
					class={cn(!isActive && 'hover:underline w-full', 'relative justify-start hover:bg-transparent w-full')}
					data-sveltekit-noscroll
				>
					{#if isActive}
						<!-- svelte-ignore element_invalid_self_closing_tag -->
						<div
							class="absolute inset-0 rounded-md bg-muted"
							in:send={{ key: 'active-sidebar-tab' }}
							out:receive={{ key: 'active-sidebar-tab' }}
						/>
					{/if}
					<div class="relative">
						{item}
					</div>
				</Button>
			</a>
		{/each}
		<!-- <a href="/account_settings/profile" class="rounded-lg bg-secondary p-2 px-4 font-semibold text-primary" class:font-semibold={currentPage === 'profile'}> Profile </a>
		<a href="/account_settings/appearance" class="rounded-lg p-2 px-4 hover:bg-secondary/80" class:font-semibold={currentPage === 'appearance'}>Appearance</a>
		<a href="/account_settings/password" class="rounded-lg p-2 px-4 hover:bg-secondary/80" class:font-semibold={currentPage === 'password'}>Change Password</a> -->
	</nav>
	{@render children()}
</div>
