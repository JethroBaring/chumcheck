<script lang="ts">
	import { Badge } from '$lib/components/ui/badge';
	import * as Card from '$lib/components/ui/card';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js';
	import { Edit, Ellipsis, Plus, Trash } from 'lucide-svelte';
	import { RnaCreateDialog, RnaViewEditDeleteDialog } from '.';
	import type { Actions } from '$lib/types';
	let { rna, update, ai, addToRna, deleteRna, role, readinessData } = $props();

	let open = $state(false);

	const onOpenChange = () => {
		open = !open;
	};

	let action: Actions = $state('View');

	const closeDialog = () => {
		open = false
	}
</script>

<Card.Root
	class="h-full min-w-[calc(25%-1.25rem*3/4)] cursor-pointer"
	onclick={() => {
		open = true;
		action = 'View';
	}}
>
	<Card.Content class="flex flex-col gap-2">
		<div class="flex items-center justify-between">
			<h2 class="text-[15px] font-semibold leading-none tracking-tight">
				{rna.readiness_type_rl_type}
			</h2>
			{#if role !== 'Startup'}
				<DropdownMenu.Root>
					<DropdownMenu.Trigger
						onclick={(e) => {
							e.stopPropagation();
						}}
					>
						<Ellipsis class="h-5 w-5" />
					</DropdownMenu.Trigger>
					<DropdownMenu.Content align="end">
						<DropdownMenu.Group>
							{#if ai}
								<DropdownMenu.Item
									onclick={(e) => {
										e.stopPropagation();
										addToRna(rna.id);
									}}><Plus class="h-4 w-4" /> Add to Rns</DropdownMenu.Item
								>
							{/if}
							<DropdownMenu.Item
								onclick={(e) => {
									e.stopPropagation();
									open = true;
									action = 'Edit';
								}}
							>
								<Edit class="h-4 w-4" />
								Edit
							</DropdownMenu.Item>
							<DropdownMenu.Item
								onclick={(e) => {
									e.stopPropagation();
									open = true;
									action = 'Delete';
								}}
							>
								<Trash class="h-4 w-4" />
								Delete
							</DropdownMenu.Item>
						</DropdownMenu.Group>
					</DropdownMenu.Content>
				</DropdownMenu.Root>
			{/if}
		</div>
		<div class="text-muted-foreground text-sm">
			{rna.rna.substring(0, 150) + `${rna.rna.length > 150 ? '...' : ''}`}
		</div>
		<div class="text-muted-foreground text-sm">
			Current Level: <Badge variant="secondary">{rna.readiness_level_level}</Badge>
		</div>
	</Card.Content>
</Card.Root>

<RnaViewEditDeleteDialog
	{open}
	{onOpenChange}
	rns={rna}
	{update}
	deleteRns={deleteRna}
	{action}
	{readinessData}
	{closeDialog}
/>
