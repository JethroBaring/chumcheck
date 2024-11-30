<script lang="ts">
	import { Badge } from '$lib/components/ui/badge';
	import * as Card from '$lib/components/ui/card';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js';
	import * as Avatar from '$lib/components/ui/avatar';
	import { Ellipsis } from 'lucide-svelte';
	import { getProfileColor, zIndex } from '$lib/utils';
	let { initiative, ai, members, update } = $props();
	let hover = $state(false);

	let assignee = $state(initiative.assignee_id);
	let lastAssignee = `${initiative.assignee_id}`; // Store the last known value of assignee

	const assignedMember = $derived(members.filter((member) => member.user_id === assignee)[0]);
</script>

<Card.Root
	class="h-full min-w-[calc(25%-1.25rem*3/4)] cursor-pointer"
	onmouseenter={() => (hover = true)}
	onmouseleave={() => (hover = false)}
>
	<Card.Content class="flex flex-col gap-2">
		{#if !ai}
			<div class="flex items-center justify-between">
				<h2 class="text-[15px] font-semibold leading-none tracking-tight">Technology</h2>
			</div>
		{/if}
		<div class="text-sm text-muted-foreground">
			{initiative.description.substring(0, 150) +
				`${initiative.description.length > 150 ? '...' : ''}`}
		</div>
		<div class="text-sm text-muted-foreground">
			Priority No.: <DropdownMenu.Root>
				<DropdownMenu.Trigger><Badge variant="secondary">5</Badge></DropdownMenu.Trigger>
				<DropdownMenu.Content align="start" class="min-w-4">
					<DropdownMenu.Group>
						<DropdownMenu.RadioGroup>
							{#each [1, 2, 3, 4, 5, 6, 7, 8, 9] as item}
								<DropdownMenu.RadioItem value={`${item}`}>{item}</DropdownMenu.RadioItem>
							{/each}
						</DropdownMenu.RadioGroup>
					</DropdownMenu.Group>
				</DropdownMenu.Content>
			</DropdownMenu.Root>
		</div>
		<div class="text-sm text-muted-foreground">
			Initiative No.: <DropdownMenu.Root>
				<DropdownMenu.Trigger><Badge variant="secondary">5</Badge></DropdownMenu.Trigger>
				<DropdownMenu.Content align="start" class="min-w-4">
					<DropdownMenu.Group>
						<DropdownMenu.RadioGroup>
							{#each [1, 2, 3, 4, 5, 6, 7, 8, 9] as item}
								<DropdownMenu.RadioItem value={`${item}`}>{item}</DropdownMenu.RadioItem>
							{/each}
						</DropdownMenu.RadioGroup>
					</DropdownMenu.Group>
				</DropdownMenu.Content>
			</DropdownMenu.Root>
		</div>
		<div class="flex items-center justify-between">
			<div class="flex flex-wrap items-center gap-2">
				<DropdownMenu.Root>
					<DropdownMenu.Trigger><Badge variant="secondary">Long Term</Badge></DropdownMenu.Trigger>
					<DropdownMenu.Content align="start">
						<DropdownMenu.Group>
							<DropdownMenu.RadioGroup>
								<DropdownMenu.RadioItem value="short">Short Term</DropdownMenu.RadioItem>
								<DropdownMenu.RadioItem value="long">Long Term</DropdownMenu.RadioItem>
							</DropdownMenu.RadioGroup>
						</DropdownMenu.Group>
					</DropdownMenu.Content>
				</DropdownMenu.Root>
			</div>
			<DropdownMenu.Root>
				<DropdownMenu.Trigger>
					{#if assignedMember}
						<div class={`flex h-8 w-8 items-center justify-center rounded-full ${getProfileColor(assignedMember.first_name)}`}>
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
								onValueChange={(v) => update(initiative.id, undefined, undefined, undefined, undefined, undefined, v)}
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
			</DropdownMenu.Root>	
		</div>
	</Card.Content>
</Card.Root>
