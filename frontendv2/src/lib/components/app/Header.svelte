<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import * as Avatar from '$lib/components/ui/avatar';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import { Badge } from '$lib/components/ui/badge';
	import { access } from '$lib/access';
	import { page } from '$app/stores';
  import { Separator } from "$lib/components/ui/separator";

	let { user } = $props();
	let submodules = ['Performance', 'RNS', 'RNA', 'Roadblocks', 'Initiatives', 'Settings'];
	let modules = access.roles['startup'];
	const currentModule = $derived(
		$page.url.pathname.slice(1).split('/')[$page.url.pathname.slice(1).split('/').length - 1]
	);

	function getRole(role: string) {
		return 'Manager'
	}
</script>

<header
	class="text-flutter-gray dark:text-flutter-white flex h-16 w-screen justify-center border-b backdrop-blur-lg"
>
	<nav class="flex h-16 w-4/5 items-center px-0">
		<div class="flex flex-1 cursor-pointer gap-2">
			<img src="/logo.png" alt="citeams_logo" class="h-7 w-7" />
			<a
				href={`/${modules[0].module.toLowerCase()}${modules[0].subModule.length > 0 ? '/' + modules[0].subModule[0].toLowerCase() : ''}`}
				class="cursor-pointer text-xl font-black normal-case">ChumCheck</a
			>
		</div>
		<div class="flex items-center justify-center gap-5 h-1/3">
			<ul class="flex flex-1 cursor-pointer items-center gap-7 text-sm">
				{#if currentModule === 'startups' || currentModule === 'settings'}
					{#each modules as module}
						<a
							href={`/${module.module.toLowerCase()}${module.subModule.length > 0 ? '/' + module.subModule[0].toLowerCase() : ''}`}
							class="hover:text-flutter-blue relative flex h-16 items-center justify-center text-center active:scale-95"
							class:text-flutter-blue={currentModule === module.module.toLowerCase()}
						>
							<li>
								{module.module}
								<!-- {#if currentModule === module.module.toLowerCase()}
							<div class="absolute bottom-0 h-[1px] w-full bg-flutter-blue"></div>
						{/if} -->
							</li>
						</a>
					{/each}
				{:else}
				{#each submodules as module}
				<a
					href={`/startups/12312321/${module.toLowerCase()}`}
					class="hover:text-flutter-blue relative flex h-16 items-center justify-center text-center active:scale-95"
					class:text-flutter-blue={currentModule === module.toLowerCase()}
				>
					<li>
						{module}
						<!-- {#if currentModule === module.module.toLowerCase()}
					<div class="absolute bottom-0 h-[1px] w-full bg-flutter-blue"></div>
				{/if} -->
					</li>
				</a>
			{/each}
				{/if}
			</ul>
			<!-- <Button variant="ghost" class="border rounded-full">Manager</Button> -->
			<Separator orientation="vertical"/>
			<Badge variant="outline" class="bg-flutter-gray/20 h-8 rounded-full text-sm font-normal"
				>{user?.role ? getRole(user?.role) : 'Anonymous'}</Badge
			>
			<DropdownMenu.Root>
				<DropdownMenu.Trigger>
					<Avatar.Root>
						<Avatar.Image src="https://github.com/shadcn.png" alt="@shadcn" />
						<Avatar.Fallback>Avatar</Avatar.Fallback>
					</Avatar.Root>
				</DropdownMenu.Trigger>
				<DropdownMenu.Content align="end">
					<DropdownMenu.Group>
						<DropdownMenu.Label>
							<p>My Account</p>
							<p class="text-xm font-normal">{user?.email}</p>
						</DropdownMenu.Label>
						<DropdownMenu.Separator />
						{#each modules as module}
							<a
								href={`/${module.module.toLowerCase()}${module.subModule.length > 0 ? '/' + module.subModule[0].toLowerCase() : ''}`}
							>
								<DropdownMenu.Item>{module.module}</DropdownMenu.Item>
							</a>
						{/each}
					</DropdownMenu.Group>
				</DropdownMenu.Content>
			</DropdownMenu.Root>
		</div>
	</nav>
</header>
