<script lang="ts">
	import { Badge } from '$lib/components/ui/badge';
	import * as Card from '$lib/components/ui/card';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js';
	import * as Avatar from '$lib/components/ui/avatar';
	import { Delete, Edit, Ellipsis, Plus, Trash, User } from 'lucide-svelte';
	import { getProfileColor, zIndex } from '$lib/utils';
	import { RoadblocksCreateDialog, RoadblocksViewEditDialog } from '.';
	import type { Actions } from '$lib/types';
	let { roadblocks, members, update, ai, addToRoadblocks, deleteRoadblocks, role } = $props();

	let assignee = $state(roadblocks.assignee_id);

	const assignedMember = $derived(members.filter((member: any) => member.user_id === assignee)[0]);

	let open = $state(false);
	const onOpenChange = () => {
		open = !open;
	};

	let action: Actions = $state('View');
	const closeDialog = () => {
		open = false;
	};
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
				{''}
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
										addToRoadblocks(roadblocks.id);
									}}><Plus class="h-4 w-4" /> Add to Roadblocks</DropdownMenu.Item
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
		<div class="text-sm text-muted-foreground">
			{roadblocks.description.substring(0, 150) +
				`${roadblocks.description.length > 150 ? '...' : ''}`}
		</div>
		<div class="text-sm text-muted-foreground">
			Risk Number:
			{#if roadblocks.risk_number}
				<Badge variant="secondary">
					{roadblocks.risk_number}
				</Badge>
			{:else}
				<Badge variant="secondary" class="text-muted">1</Badge>
			{/if}

			<!-- <DropdownMenu.Root>
				<DropdownMenu.Trigger
					onclick={(e) => {
						e.stopPropagation();
					}}><Badge variant="secondary">5</Badge></DropdownMenu.Trigger
				>
				<DropdownMenu.Content align="start" class="min-w-4">
					<DropdownMenu.Group>
						<DropdownMenu.RadioGroup>
							{#each [1, 2, 3, 4, 5, 6, 7, 8, 9] as item}
								<DropdownMenu.RadioItem value={`${item}`}>{item}</DropdownMenu.RadioItem>
							{/each}
						</DropdownMenu.RadioGroup>
					</DropdownMenu.Group>
				</DropdownMenu.Content>
			</DropdownMenu.Root> -->
		</div>
		<div class="flex items-center justify-between">
			<div class="flex flex-wrap items-center gap-2"></div>
			{#if assignedMember}
				<div
					class={`flex h-8 w-8 items-center justify-center rounded-full ${getProfileColor(assignedMember.first_name)}`}
				>
					{assignedMember.first_name.charAt(0)}
				</div>
			{:else}
				<div class={`flex h-8 w-8 items-center justify-center rounded-full bg-muted ${zIndex[1]}`}>
					<User class="h-4 w-4"/>
				</div>
			{/if}
			<!-- <DropdownMenu.Root>
				<DropdownMenu.Trigger
					onclick={(e) => {
						e.stopPropagation();
					}}
				>
					{#if assignedMember}
						<div
							class={`flex h-8 w-8 items-center justify-center rounded-full ${getProfileColor(assignedMember.first_name)}`}
						>
							{assignedMember.first_name.charAt(0)}
						</div>
					{:else}
						<div class={`flex h-8 w-8 items-center justify-center rounded-full bg-muted ${zIndex[1]}`}>
							?
						</div>
					{/if}
				</DropdownMenu.Trigger>
				<DropdownMenu.Content align="end">
					<DropdownMenu.Group>
						{#each members as member, index}
							<DropdownMenu.RadioGroup
								bind:value={assignee}
								onValueChange={(v) => update(roadblocks.id, undefined, undefined, undefined, v)}
							>
								<DropdownMenu.RadioItem value={member.user_id} class="flex items-center gap-3">
									<div
										class={`flex h-8 w-8 items-center justify-center rounded-full ${getProfileColor(member.first_name)}`}
									>
										{member.first_name.charAt(0)}
									</div>
									{member.first_name}
									{member.last_name}
								</DropdownMenu.RadioItem>
							</DropdownMenu.RadioGroup>
						{/each}
					</DropdownMenu.Group>
				</DropdownMenu.Content>
			</DropdownMenu.Root> -->
		</div>
	</Card.Content>
</Card.Root>

<RoadblocksViewEditDialog
	{open}
	{onOpenChange}
	rns={roadblocks}
	{update}
	{action}
	deleteRns={deleteRoadblocks}
	{members}
	{assignedMember}
	{closeDialog}
/>
