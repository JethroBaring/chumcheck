<script lang="ts">
	import * as Tabs from '$lib/components/ui/tabs/index.js';
  import * as Tooltip from '$lib/components/ui/tooltip/index.js';
	import { getProfileColor, zIndex } from '$lib/utils';
	import { Kanban, Table, SlidersHorizontal } from 'lucide-svelte';

  let { members, updateTab, updateMembers } = $props()
  
  function toggleMemberSelection(member) {
		members = members.map((m) =>
			m === member ? { ...m, selected: !m.selected } : m
		);
	}
</script>

<div class="flex h-fit justify-between rounded-lg bg-background">
  <Tabs.Root value="rns">
    <Tabs.List class="border bg-flutter-gray/20">
      <Tabs.Trigger
        class="flex items-center gap-1"
        value="rns"
        onclick={() => updateTab('rns')}
      >
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
            member.selected ? 'ring-2 ring-flutter-blue' : ''
          } flex h-9 w-9 items-center justify-center rounded-full border-background ${
            index !== members.length - 1 ? '-mr-1' : ''
          } ${zIndex[index]} ${getProfileColor(member.first_name)}`}
        >
          {member.first_name.charAt(0)}
        </Tooltip.Trigger>
        <Tooltip.Content side="bottom">
          <p>{member.first_name}</p>
        </Tooltip.Content>
      </Tooltip.Root>
    </Tooltip.Provider>
  {/each}
</div>