<script lang="ts">
	import { Badge } from '$lib/components/ui/badge';
	import * as Card from '$lib/components/ui/card';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js';
	import * as Avatar from '$lib/components/ui/avatar';
	import { Edit, Ellipsis, Plus, Trash, User } from 'lucide-svelte';
	import { getProfileColor, zIndex } from '$lib/utils';
	import { InitiativeViewEditDeleteDialog } from '.';
	import type { Actions } from '$lib/types';
	let { initiative, ai, members, update, addToInitiative, deleteInitiative, role, tasks } = $props();

	let assignee = $state(initiative.assignee_id);

	const assignedMember = $derived(members.filter((member: any) => member.user_id === assignee)[0]);

	let open = $state(false);
	const onOpenChange = () => {
		open = !open;
	};

	let action: Actions = $state('View');

	console.log(initiative);

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
				{initiative.readiness_type_rl_type}
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
								<DropdownMenu.Item onclick={() => addToInitiative(initiative.id)}
									><Plus class="h-4 w-4" /> Add to Rns</DropdownMenu.Item
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
			{initiative.description.substring(0, 150) +
				`${initiative.description.length > 150 ? '...' : ''}`}
		</div>
		<div class="text-muted-foreground text-sm">
			Priority No.: <Badge variant="secondary">{tasks.filter((task) => task.id === initiative.task_id)[0].priority_number}</Badge>
		</div>
		<div class="text-muted-foreground text-sm">
			Initiative No.: <Badge variant="secondary">
				{#if initiative.initiative_number}
					{initiative.initiative_number}
				{:else}
					<p class="opacity-0">1</p>
				{/if}

			</Badge>
		</div>
		<div class="ml-auto flex items-center justify-between">
			<!-- <div class="flex flex-wrap items-center gap-2"> -->
				<!-- <Badge variant="secondary">{initiative.task_type === 1 ? 'Short' : 'Long'} Term</Badge> -->
				<!-- <DropdownMenu.Root>
					<DropdownMenu.Trigger><Badge variant="secondary">Long Term</Badge></DropdownMenu.Trigger>
					<DropdownMenu.Content align="start">
						<DropdownMenu.Group>
							<DropdownMenu.RadioGroup>
								<DropdownMenu.RadioItem value="short">Short Term</DropdownMenu.RadioItem>
								<DropdownMenu.RadioItem value="long">Long Term</DropdownMenu.RadioItem>
							</DropdownMenu.RadioGroup>
						</DropdownMenu.Group>
					</DropdownMenu.Content>
				</DropdownMenu.Root> -->
			<!-- </div> -->
			{#if assignedMember}
				<div
					class={`flex h-8 w-8 items-center justify-center rounded-full ${getProfileColor(assignedMember.first_name)}`}
				>
					{assignedMember.first_name.charAt(0)}
				</div>
			{:else}
				<div class={`bg-muted flex h-8 w-8 items-center justify-center rounded-full ${zIndex[1]}`}>
					<User class="h-4 w-4" />
				</div>
			{/if}
			<!-- <DropdownMenu.Root>
				<DropdownMenu.Trigger>
					{#if assignedMember}
						<div
							class={`flex h-8 w-8 items-center justify-center rounded-full ${getProfileColor(assignedMember.first_name)}`}
						>
							{assignedMember.first_name.charAt(0)}
						</div>
					{:else}
						<div class={`flex h-8 w-8 items-center justify-center rounded-full ${zIndex[1]}`}>
							?
						</div>
					{/if}
				</DropdownMenu.Trigger>
				<DropdownMenu.Content align="end">
					<DropdownMenu.Group>
						{#each members as member, index}
							<DropdownMenu.RadioGroup
								bind:value={assignee}
								onValueChange={(v) =>
									update(initiative.id, undefined, undefined, undefined, undefined, undefined, v)}
							>
								<DropdownMenu.RadioItem value={member.user_id} class="flex items-center gap-3">
									<div
										class={`flex h-8 w-8 items-center justify-center rounded-full ${getProfileColor(member.first_name)}`}
									>
										{members[0].first_name.charAt(0)}
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

<InitiativeViewEditDeleteDialog
	{open}
	{onOpenChange}
	rns={initiative}
	{update}
	{action}
	deleteRns={deleteInitiative}
	{members}
	{assignedMember}
	{closeDialog}
	{tasks}
/>
