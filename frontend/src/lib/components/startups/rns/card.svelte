<script lang="ts">
	import { Badge } from '$lib/components/ui/badge';
	import * as Card from '$lib/components/ui/card';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js';
	import * as Avatar from '$lib/components/ui/avatar';
	import { Ellipsis } from 'lucide-svelte';
	let { rns } = $props();
	let hover = $state(false);
</script>

<Card.Root
	class="h-full min-w-[calc(25%-1.25rem*3/4)] cursor-pointer"
	onmouseenter={() => (hover = true)}
	onmouseleave={() => (hover = false)}
>
	<Card.Content class="flex flex-col gap-2">
		<div class="flex items-center justify-between">
			<h2 class="text-[15px] font-semibold leading-none tracking-tight">Technology</h2>
		</div>
		<div class="text-sm text-muted-foreground">
			{rns.description.substring(0, 150) + `${rns.description.length > 150 ? '...' : ''}`}
		</div>
		<div class="text-sm text-muted-foreground">Target Level: <DropdownMenu.Root>
			<DropdownMenu.Trigger><Badge variant="secondary">5</Badge></DropdownMenu.Trigger>
			<DropdownMenu.Content align="start" class="min-w-4">
				<DropdownMenu.Group>
					<DropdownMenu.RadioGroup >
						{#each [1,2,3,4,5,6,7,8,9] as item}
						<DropdownMenu.RadioItem value={`${item}`}>{item}</DropdownMenu.RadioItem>
						{/each}
					</DropdownMenu.RadioGroup>
				</DropdownMenu.Group>
			</DropdownMenu.Content>
		</DropdownMenu.Root></div>
		<div class="flex items-center justify-between">
			<div class="flex flex-wrap items-center gap-2">
				<DropdownMenu.Root>
					<DropdownMenu.Trigger><Badge variant="secondary">Long Term</Badge></DropdownMenu.Trigger>
					<DropdownMenu.Content align="start">
						<DropdownMenu.Group>
							<DropdownMenu.RadioGroup >
								<DropdownMenu.RadioItem value="short">Short Term</DropdownMenu.RadioItem>
								<DropdownMenu.RadioItem value="long">Long Term</DropdownMenu.RadioItem>
							</DropdownMenu.RadioGroup>
						</DropdownMenu.Group>
					</DropdownMenu.Content>
				</DropdownMenu.Root>
			</div>
			<DropdownMenu.Root>
				<DropdownMenu.Trigger>
					<Avatar.Root class="h-8 w-8">
						<Avatar.Image src="https://github.com/shadcn.png" alt="@shadcn" />
						<Avatar.Fallback>Avatar</Avatar.Fallback>
					</Avatar.Root>
				</DropdownMenu.Trigger>
				<DropdownMenu.Content align="end">
					<DropdownMenu.Group>
						{#each [1, 2] as item}
							<DropdownMenu.Item class="cursor-pointer"
								><Avatar.Root class="h-8 w-8">
									<Avatar.Image src="https://github.com/shadcn.png" alt="@shadcn" />
									<Avatar.Fallback>Avatar</Avatar.Fallback>
								</Avatar.Root>Jethro Baring</DropdownMenu.Item
							>
						{/each}
					</DropdownMenu.Group>
				</DropdownMenu.Content>
			</DropdownMenu.Root>
		</div>
	</Card.Content>
</Card.Root>
