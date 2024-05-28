<script lang="ts">
	import Up from 'lucide-svelte/icons/chevron-up';
	import Down from 'lucide-svelte/icons/chevron-down';
	import LineChart from 'lucide-svelte/icons/line-chart';
	import Package from 'lucide-svelte/icons/package';
	import Home from 'lucide-svelte/icons/home';
	import ShoppingCart from 'lucide-svelte/icons/shopping-cart';
	import Menu from 'lucide-svelte/icons/menu';
	import Package2 from 'lucide-svelte/icons/package-2';
	import Search from 'lucide-svelte/icons/search';
	import Users from 'lucide-svelte/icons/users';
	import * as Dialog from '$lib/components/ui/dialog';
	import { Badge } from '$lib/components/ui/badge/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import * as Card from '$lib/components/ui/card/index.js';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import * as Sheet from '$lib/components/ui/sheet/index.js';
	import { fade } from 'svelte/transition';
	import { toast } from 'svelte-sonner';
	import Sun from 'svelte-radix/Sun.svelte';
	import Moon from 'svelte-radix/Moon.svelte';
	import { toggleMode } from 'mode-watcher';
	import ApplicationForm from '$lib/components/application/ApplicationForm.svelte';
	import { browser } from '$app/environment';
	let showStartups = true;
	let showApplication = false;
	export let data;
	function toggleStartups() {
		showStartups = !showStartups;
	}

	function toggleShowApplication() {
		showApplication = !showApplication;
	}

	$: if (data.showToast) {
		toggleShowApplication();
		toast.success('Application submitted.', {
			description: 'An email will be sent once the manager has reviewed your application.'
		});
		
		if (browser) {
			const url = new URL(window.location.href);
			url.searchParams.delete('toast');
			history.replaceState(null, '', url.toString());
		}
	}
</script>

<svelte:head>
	<title>ChumCheck</title>
</svelte:head>

<div class="grid min-h-screen w-full">
	<div class="flex w-full flex-col bg-muted/40">
		<header class="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
			<Sheet.Root>
				<Sheet.Trigger asChild let:builder>
					<Button variant="outline" size="icon" class="shrink-0 md:hidden" builders={[builder]}>
						<Menu class="h-5 w-5" />
						<span class="sr-only">Toggle navigation menu</span>
					</Button>
				</Sheet.Trigger>
				<Sheet.Content side="left" class="flex flex-col">
					<nav class="grid gap-2 text-lg font-medium">
						<a href="##" class="flex items-center gap-2 text-lg font-semibold">
							<Package2 class="h-6 w-6" />
							<span class="sr-only">Acme Inc</span>
						</a>
						<a
							href="##"
							class="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
						>
							<Home class="h-5 w-5" />
							Home
						</a>
						
					</nav>
				</Sheet.Content>
			</Sheet.Root>

			<p class="font-semibold">Startups</p>
			<div class="relative ml-auto flex-1 md:grow-0">
				<Search class="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
				<Input
					type="search"
					placeholder="Search..."
					class="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[320px]"
				/>
			</div>
			<Button
				on:click={toggleMode}
				variant="ghost"
				size="icon"
				class="hover:bg-transparent hover:text-flutter-blue"
			>
				<Sun
					class="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
				/>
				<Moon
					class="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
				/>
				<span class="sr-only">Toggle theme</span>
			</Button>
			<DropdownMenu.Root>
				<DropdownMenu.Trigger asChild let:builder>
					<Button
						builders={[builder]}
						variant="outline"
						size="icon"
						class="overflow-hidden rounded-full"
					>
						<img
							src="/images/placeholder.jpg"
							width={36}
							height={36}
							alt="Avatar"
							class="overflow-hidden rounded-full"
						/>
					</Button>
				</DropdownMenu.Trigger>
				<DropdownMenu.Content align="end">
					<DropdownMenu.Label>My Account</DropdownMenu.Label>
					<DropdownMenu.Separator />
					<DropdownMenu.Item>Settings</DropdownMenu.Item>
					<DropdownMenu.Item>Support</DropdownMenu.Item>
					<DropdownMenu.Separator />
					<form action="/logout" method="post">
						<button type="submit"> <DropdownMenu.Item>Logout</DropdownMenu.Item> </button>
					</form>
				</DropdownMenu.Content>
			</DropdownMenu.Root>
		</header>
		<main class="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
			<!-- <button class="flex w-28 cursor-pointer items-center gap-1" on:click={toggleStartups}>
				{#if showStartups}
					<Down class="h-4 w-4" />
				{:else}
					<Up class="h-4 w-4" />
				{/if}
				<h1 class="text-sm">Your startups</h1>
			</button> -->
			<div class="relative flex w-full items-center justify-between">
				<button class="flex w-28 cursor-pointer items-center gap-1" on:click={toggleStartups}>
					{#if showStartups}
						<Down class="h-4 w-4" />
					{:else}
						<Up class="h-4 w-4" />
					{/if}
					<h1 class="text-sm">Your startups</h1>
				</button>
				<Dialog.Root open={showApplication} onOpenChange={toggleShowApplication}>
					<Dialog.Trigger class="absolute right-0 h-8">
						<Button class="text-white">Apply</Button>
					</Dialog.Trigger>
					<Dialog.Content class="h-4/5 max-w-[700px]">
						<ApplicationForm />
					</Dialog.Content>
				</Dialog.Root>
			</div>

			<!-- <div class="flex-1 justify-center flex flex-col items-center gap-1 text-center">
				<h3 class="text-2xl font-bold tracking-tight">You don't belong to any startups</h3>
				<Button class="mt-4">Create Startup</Button>
			</div> -->
			{#if showStartups}
				<div class="grid grid-cols-5 gap-5" transition:fade>
					<a href="/user/startup/1/rns" data-sveltekit-preload-data="tap">
						<Card.Root
							class="flex h-44 cursor-pointer items-center justify-center text-xl font-semibold"
							>Hello world</Card.Root
						>
					</a>
					<a href="/user/startup/1/rns" data-sveltekit-preload-data="tap">
						<Card.Root
							class="flex h-44 cursor-pointer items-center justify-center text-xl font-semibold"
							>Hello world</Card.Root
						>
					</a><a href="/user/startup/1" data-sveltekit-preload-data="tap">
						<Card.Root
							class="flex h-44 cursor-pointer items-center justify-center text-xl font-semibold"
							>Hello world</Card.Root
						>
					</a><a href="/user/startup/1" data-sveltekit-preload-data="tap">
						<Card.Root
							class="flex h-44 cursor-pointer items-center justify-center text-xl font-semibold"
							>Hello world</Card.Root
						>
					</a>
				</div>
			{/if}
		</main>
	</div>
</div>
