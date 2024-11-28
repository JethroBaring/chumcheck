<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js';
	import { Ellipsis } from 'lucide-svelte';
	let { rna, selectedTab, addToRNA } = $props();
	let hover = $state(false);
</script>

<Card.Root
	class="h-full min-w-[calc(25%-1.25rem*3/4)] cursor-pointer"
	onmouseenter={() => (hover = true)}
	onmouseleave={() => (hover = false)}
>
	<Card.Header>
		<div class="flex h-4 items-center justify-between">
			<h2 class="text-[15px] font-semibold leading-none tracking-tight">test</h2>
			<DropdownMenu.Root>
				<DropdownMenu.Trigger>
					{#if hover}
						<button><Ellipsis class="h-4 w-4" /></button>
					{/if}
				</DropdownMenu.Trigger>
				<DropdownMenu.Content align="end">
					<DropdownMenu.Group>
						{#if selectedTab === 'ai-rna'}
							<DropdownMenu.Item onclick={() => addToRNA(rna.id)}>Add to RNA</DropdownMenu.Item>
						{/if}
						<DropdownMenu.Item>View</DropdownMenu.Item>
						<DropdownMenu.Item>Edit</DropdownMenu.Item>
						<DropdownMenu.Item>Delete</DropdownMenu.Item>
					</DropdownMenu.Group>
				</DropdownMenu.Content>
			</DropdownMenu.Root>
		</div>
	</Card.Header>
	<Card.Content>
		{rna.rna.substring(0, 150) + `${rna.rna.length > 150 ? '...' : ''}`}
	</Card.Content>
</Card.Root>
