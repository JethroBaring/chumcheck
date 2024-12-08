<script lang="ts">
	import * as Tabs from '$lib/components/ui/tabs/index.js';
	import * as Tooltip from '$lib/components/ui/tooltip/index.js';
	import { getProfileColor, zIndex } from '$lib/utils';
	import { Kanban, Table, SlidersHorizontal } from 'lucide-svelte';

	let { members, updateTab, toggleMemberSelection } = $props();
</script>

<div class="bg-background flex h-fit justify-between rounded-lg">
	<Tabs.Root value="rns">
		<Tabs.List class="bg-flutter-gray/20 border">
			<Tabs.Trigger class="flex items-center gap-1" value="rns" onclick={() => updateTab('rns')}>
				<Kanban class="h-4 w-4" />
				Board</Tabs.Trigger
			>
			<Tabs.Trigger
				class="flex items-center gap-1"
				value="ai-rns"
				onclick={() => updateTab('ai-rns')}
			>
				<Table class="h-4 w-4" />
				Table</Tabs.Trigger
			>
		</Tabs.List>
	</Tabs.Root>
</div>
<div class="flex items-center">
	{#each members as member, index}
		<Tooltip.Provider>
			<Tooltip.Root>
				<Tooltip.Trigger
					class={`border-2 ${
						member.selected ? 'ring-flutter-blue ring-2' : ''
					} border-background flex h-9 w-9 items-center justify-center rounded-full ${
						index !== members.length - 1 ? '-mr-1' : ''
					} ${zIndex[index]} ${getProfileColor(member.first_name)}`}
					onclick={() => {
            console.log("test")
						toggleMemberSelection(member.user_id);
					}}
				>
					{member.first_name.charAt(0)}
				</Tooltip.Trigger>
				<Tooltip.Content side="bottom">
					<p>{member.first_name} {member.last_name}</p>
				</Tooltip.Content>
			</Tooltip.Root>
		</Tooltip.Provider>
	{/each}
</div>
