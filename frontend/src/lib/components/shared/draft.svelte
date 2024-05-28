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
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import { Badge } from '$lib/components/ui/badge/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import * as Sheet from '$lib/components/ui/sheet/index.js';
	import { Label } from '$lib/components/ui/label/index.js';

	export let data: { startupId: number };

	let currentTab = 'rns';

	function changeTab(current: string) {
		currentTab = current;
	}
</script>

<div class="flex min-h-screen w-full">
	<div class="hidden border-r bg-muted/40 md:block w-[280px]">
		<div class="flex h-full max-h-screen flex-col gap-2">
			<div class="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
				<a href="/" class="flex items-center gap-2 font-semibold">
					<Package2 class="h-6 w-6" />
					<span class="">Acme Inc</span>
				</a>

				<div class="ml-auto flex items-center gap-3">
					<Dialog.Root>
						<Dialog.Trigger>
							<button class="flex items-center">
								<UserRoundPlus class="h-4 w-4" />
							</button>
						</Dialog.Trigger>
						<Dialog.Content class="sm:max-w-[425px]">
							<Dialog.Header>
								<Dialog.Title>Add member</Dialog.Title>
								<Dialog.Description>
									Enter the email of the member you want to add.
								</Dialog.Description>
							</Dialog.Header>
							<div class="grid gap-4 py-4">
								<div class="grid gap-2">
									<Label for="email">Email</Label>
									<Input name="email" id="email" type="email" placeholder="m@example.com" />
								</div>
							</div>
							<Dialog.Footer>
								<Button type="submit">Add</Button>
							</Dialog.Footer>
						</Dialog.Content>
					</Dialog.Root>
					<Dialog.Root>
						<Dialog.Trigger>
							<button class="flex items-center">
								<UserRound class="h-4 w-4" />
							</button>
						</Dialog.Trigger>
						<Dialog.Content class="sm:max-w-[425px]">
							<Dialog.Header>
								<Dialog.Title>Members</Dialog.Title>
							</Dialog.Header>
							<div class="grid gap-4 py-4">
								<div class="flex items-center gap-3">
									<img
										src="/images/placeholder.jpg"
										width={36}
										height={36}
										alt="Avatar"
										class="overflow-hidden rounded-full"
									/>
									<p>My name</p>
								</div>
								<div class="flex items-center gap-3">
									<img
										src="/images/placeholder.jpg"
										width={36}
										height={36}
										alt="Avatar"
										class="overflow-hidden rounded-full"
									/>
									<p>My name</p>
								</div>
								<div class="flex items-center gap-3">
									<img
										src="/images/placeholder.jpg"
										width={36}
										height={36}
										alt="Avatar"
										class="overflow-hidden rounded-full"
									/>
									<p>My name</p>
								</div>
							</div>
						</Dialog.Content>
					</Dialog.Root>
				</div>
			</div>
			<div class="flex-1">
				<nav class="grid items-start px-2 text-sm font-medium lg:px-4">
					<a
						href={`/user/startup/${data.startupId}/rns`}
						class={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary ${currentTab === 'rns' ? 'bg-muted text-primary' : 'text-muted-foreground'}`}
						on:click={() => changeTab('rns')}
					>
						<Home class="h-4 w-4" />
						Recommended Next Step
					</a>
					<a
						href={`/user/startup/${data.startupId}/rl`}
						class={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary ${currentTab === 'rl' ? 'bg-muted text-primary' : 'text-muted-foreground'}`}
						on:click={() => changeTab('rl')}
					>
						<ShoppingCart class="h-4 w-4" />
						Readiness Level
					</a>
				</nav>
			</div>
		</div>
	</div>
	<div class="flex-1 flex flex-col">
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
					<DropdownMenu.Item>Logout</DropdownMenu.Item>
				</DropdownMenu.Content>
			</DropdownMenu.Root>
		</header>
		<main class="flex flex-1 flex-col gap-4 p-4 lg:gap-4 lg:p-6">
			<slot />
		</main>
	</div>
</div>
