<script lang="ts">
	import UserRound from 'lucide-svelte/icons/users-round';
	import UserRoundPlus from 'lucide-svelte/icons/user-round-plus';
	import LineChart from 'lucide-svelte/icons/line-chart';
	import Package from 'lucide-svelte/icons/package';
	import Home from 'lucide-svelte/icons/home';
	import ShoppingCart from 'lucide-svelte/icons/shopping-cart';
	import Menu from 'lucide-svelte/icons/menu';
	import Package2 from 'lucide-svelte/icons/package-2';
	import Search from 'lucide-svelte/icons/search';
	import Users from 'lucide-svelte/icons/users';
	import Add from 'lucide-svelte/icons/plus';
	import Remove from 'lucide-svelte/icons/x'
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import { Badge } from '$lib/components/ui/badge/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import * as Sheet from '$lib/components/ui/sheet/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import Close from 'lucide-svelte/icons/x';
	import { slide } from 'svelte/transition';
	import Sun from 'svelte-radix/Sun.svelte';
	import Moon from 'svelte-radix/Moon.svelte';
	import { toggleMode } from 'mode-watcher';
	import Chart from 'lucide-svelte/icons/area-chart'
	import Newspaper from 'lucide-svelte/icons/newspaper'
	import Footprints from 'lucide-svelte/icons/footprints'
	import Bookcheck from 'lucide-svelte/icons/book-check'
	import Road from 'lucide-svelte/icons/cuboid'
	export let data;
	console.log(data.startup)
	let currentTab = data.cur;
	let secondarySidebar = true;

	function changeTab(current: string) {
		currentTab = current;
	}

	function showSecondarySidebar() {
		secondarySidebar = !secondarySidebar;
	}

	let search: string;
	let searchedUsers: any[] = [];
	async function searchUsers() {
		const response = await fetch(`http://127.0.0.1:8000/users/?search=${search}`, {
			method: 'GET',
			headers: {
				Authorization: `Bearer ${data.token}`
			}
		});

		const d = await response.json();

		if (response.ok) {
			searchedUsers = d.results;
		}
	}

	async function addUser() {
		const response = await fetch('', {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${data.token}`
			}
		});
	}
</script>

<div class="flex min-h-screen w-full text-flutter-gray dark:text-flutter-white">
	{#if secondarySidebar}
		<div class="hidden w-[280px] border-r bg-muted/40 md:block" transition:slide={{ axis: 'x' }}>
			<div class="flex h-full max-h-screen flex-col gap-2">
				<div class="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
					<a href="/" class="flex items-center gap-2 font-semibold">
						<Package2 class="h-6 w-6" />
						<span class="">{data.startup.name}</span>
					</a>

					<div class="ml-auto flex items-center gap-3">
						<Dialog.Root>
							<Dialog.Trigger>
								<button class="flex items-center">
									<UserRoundPlus class="h-4 w-4" />
								</button>
							</Dialog.Trigger>
							<Dialog.Content class="h-1/2 sm:max-w-[425px]">
								<div class="flex flex-col gap-5">
									<div class="">
										<h1 class="text-[18px] font-semibold">Invite member</h1>
									</div>
									<form on:submit={searchUsers}>
										<div class="grid gap-2">
											<Label for="email">Type an email, then invite them to your startup.</Label>
											<Input
												name="email"
												id="email"
												type="text"
												placeholder="m@example.com"
												bind:value={search}
											/>
										</div>
									</form>
									<div class="flex flex-col gap-5">
										{#each searchedUsers as user}
											<div class="flex items-center justify-between gap-3">
												<div class="flex items-center gap-3">
													<img
														src="/images/placeholder.jpg"
														width={36}
														height={36}
														alt="Avatar"
														class="overflow-hidden rounded-full"
													/>
													<p>{user.email}</p>
												</div>
												<button> <Add class="h-4 w-4" /> </button>
											</div>
										{/each}
									</div>
								</div>
							</Dialog.Content>
						</Dialog.Root>
						<Dialog.Root>
							<Dialog.Trigger>
								<button class="flex items-center">
									<UserRound class="h-4 w-4" />
								</button>
							</Dialog.Trigger>
							<Dialog.Content class="sm:max-w-[425px] h-1/2">
								<div class="flex flex-col gap-5">
									<div class="">
										<h1 class="text-[18px] font-semibold">Members</h1>
									</div>

									<div class="flex flex-col gap-5">
										<div class="flex items-center justify-between gap-3">
											<div class="flex items-center gap-3">
												<img
													src="/images/placeholder.jpg"
													width={36}
													height={36}
													alt="Avatar"
													class="overflow-hidden rounded-full"
												/>
												<p>Sample</p>
											</div>
											<button> <Remove class="h-4 w-4" /> </button>
										</div>
										<div class="flex items-center justify-between gap-3">
											<div class="flex items-center gap-3">
												<img
													src="/images/placeholder.jpg"
													width={36}
													height={36}
													alt="Avatar"
													class="overflow-hidden rounded-full"
												/>
												<p>Sample</p>
											</div>
											<button> <Remove class="h-4 w-4" /> </button>
										</div>
									</div>
								</div>
							</Dialog.Content>
						</Dialog.Root>
					</div>
				</div>
				<div class="flex-1">
					<nav class="grid items-start px-2 text-sm font-medium lg:px-4">
						<a
							href={`/manager/startups/${data.startupId}/rl`}
							class={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary ${currentTab === 'rl' ? 'bg-muted text-primary' : 'text-muted-foreground'}`}
							on:click={() => changeTab('rl')}
						>
							<Chart class="h-4 w-4" />
							Readiness Level
						</a>
						<a
							href={`/manager/startups/${data.startupId}/rna`}
							class={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary ${currentTab === 'rna' ? 'bg-muted text-primary' : 'text-muted-foreground'}`}
							on:click={() => changeTab('rna')}
						>
							<Newspaper class="h-4 w-4" />
							Readiness and Needs Assessment
						</a>
						<a
							href={`/manager/startups/${data.startupId}/rns`}
							class={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary ${currentTab === 'rns' ? 'bg-muted text-primary' : 'text-muted-foreground'}`}
							on:click={() => changeTab('rns')}
						>
							<Footprints class="h-4 w-4" />
							Recommended Next Step
						</a>
						<a
							href={`/manager/startups/${data.startupId}/i`}
							class={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary ${currentTab === 'i' ? 'bg-muted text-primary' : 'text-muted-foreground'}`}
							on:click={() => changeTab('i')}
						>
							<Bookcheck class="h-4 w-4" />
							Initiatives
						</a>
						<a
							href={`/manager/startups/${data.startupId}/rb`}
							class={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary ${currentTab === 'rb' ? 'bg-muted text-primary' : 'text-muted-foreground'}`}
							on:click={() => changeTab('rb')}
						>
							<Road class="h-4 w-4" />
							Roadblocks
						</a>
					</nav>
				</div>
			</div>
		</div>
	{/if}

	<div class="flex flex-1 flex-col">
		<header class="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
			<button on:click={showSecondarySidebar}>
				{#if secondarySidebar}
					<Close class="w-5" />
				{:else}
					<Menu class="w-5" />
				{/if}
			</button>

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
							<span class="sr-only">{data.startup.name}</span>
						</a>
						<a
							href="##"
							class="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
						>
							<Home class="h-5 w-5" />
							Dashboard
						</a>
						<a
							href="##"
							class="mx-[-0.65rem] flex items-center gap-4 rounded-xl bg-muted px-3 py-2 text-foreground hover:text-foreground"
						>
							<ShoppingCart class="h-5 w-5" />
							Orders
							<Badge class="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
								6
							</Badge>
						</a>
						<a
							href="##"
							class="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
						>
							<Package class="h-5 w-5" />
							Products
						</a>
						<a
							href="##"
							class="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
						>
							<Users class="h-5 w-5" />
							Customers
						</a>
						<a
							href="##"
							class="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
						>
							<LineChart class="h-5 w-5" />
							Analytics
						</a>
					</nav>
				</Sheet.Content>
			</Sheet.Root>
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
			<Badge>Manager</Badge>
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
					<DropdownMenu.Item><form action="/logout" method="post">
						<button type="submit"> <DropdownMenu.Item>Logout</DropdownMenu.Item> </button>
					</form></DropdownMenu.Item>
				</DropdownMenu.Content>
			</DropdownMenu.Root>
		</header>
		<main class="mx-auto flex w-full flex-1 flex-col gap-4 p-4 lg:gap-4 lg:p-6">
			<slot />
		</main>
	</div>
</div>
