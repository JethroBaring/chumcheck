<script lang="ts">
	import { AIColumn, Column } from '$lib/components/shared';
	import * as Tabs from '$lib/components/ui/tabs/index.js';
	import * as Tooltip from '$lib/components/ui/tooltip/index.js';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js';
	import { buttonVariants } from '$lib/components/ui/button/index.js';
	import { readiness } from '$lib/utils';
	import { Kanban, Table, SlidersHorizontal } from 'lucide-svelte';
	let isLoading: boolean = $state(false);
	let isError: boolean = $state(false);
	let isAccessible = $state(true);
	let selectedTab: 'rns' | 'ai-rns' = $state('initiatives');
	const columns = $state([
		{
			name: 'Scheduled',
			value: 4,
			items: [],
			show: true
		},
		{
			name: 'Track',
			value: 5,
			items: [],
			show: true
		},
		{
			name: 'Delayed',
			value: 3,
			items: [],
			show: true
		},
		{
			name: 'Completed',
			value: 6,
			items: [],
			show: true
		},
		{
			name: 'Discontinued',
			value: 2,
			items: [],
			show: true
		}
	]);
	const updateTab = (tab: 'rns' | 'ai-rns') => {
		selectedTab = tab;
	};

	let members = $state([
		{ name: 'Jethro Baring', role: 'Lead', selected: false },
		{ name: 'Hannah Gimena', role: 'Mentor', selected: false }
	]);

	const zIndex = [
		'z-50 bg-red-500',
		'z-40 bg-blue-500',
		'z-30 bg-pink-500',
		'z-20 bg-orange-500',
		'z-10 bg-yellow-500',
		'z-0 bg-green-500'
	];
</script>

{#if isLoading}
	{@render loading()}
{:else if isError}
	{@render error()}
{:else if isAccessible}
	{@render accessible()}
{:else}
	{@render fallback()}
{/if}

{#snippet loading()}{/snippet}

{#snippet error()}{/snippet}

{#snippet accessible()}
	<div class="flex items-center justify-between">
		<div class="flex gap-3">
			<div class="flex h-fit justify-between rounded-lg bg-background">
				<Tabs.Root value="rns">
					<Tabs.List class="border bg-flutter-gray/20">
						<Tabs.Trigger value="rns" onclick={() => updateTab('rns')}
							>RNS</Tabs.Trigger
						>
						<Tabs.Trigger value="ai-rns" onclick={() => updateTab('ai-rns')}
							>AI RNS</Tabs.Trigger
						>
					</Tabs.List>
				</Tabs.Root>
			</div>
			{#if selectedTab === 'rns'}
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
									} ${zIndex[index]}`}
								>
									{member.name.charAt(0)}
								</Tooltip.Trigger>
								<Tooltip.Content side="bottom">
									<p>{member.name}</p>
								</Tooltip.Content>
							</Tooltip.Root>
						</Tooltip.Provider>
					{/each}
				</div>
			{/if}
		</div>
		{#if selectedTab === 'rns'}
			<DropdownMenu.Root>
				<DropdownMenu.Trigger class={buttonVariants({ variant: 'outline' })}
					>
					<SlidersHorizontal class="h-4 w-4"/>
					View</DropdownMenu.Trigger
				>
				<DropdownMenu.Content align="end">
					<DropdownMenu.Group>
						<DropdownMenu.CheckboxItem bind:checked={columns[0].show}
							>Scheduled</DropdownMenu.CheckboxItem
						>
						<DropdownMenu.CheckboxItem bind:checked={columns[1].show}
							>Track</DropdownMenu.CheckboxItem
						>
						<DropdownMenu.CheckboxItem bind:checked={columns[2].show}
							>Delayed</DropdownMenu.CheckboxItem
						>
						<DropdownMenu.CheckboxItem bind:checked={columns[3].show}
							>Completed</DropdownMenu.CheckboxItem
						>
						<DropdownMenu.CheckboxItem bind:checked={columns[4].show}
							>Discontinued</DropdownMenu.CheckboxItem
						>
					</DropdownMenu.Group>
				</DropdownMenu.Content>
			</DropdownMenu.Root>
		{/if}
	</div>
	<div class="flex h-full gap-5 overflow-scroll">
		{#if selectedTab === 'rns'}
			{#each columns as column}
				{#if column.show}
					<Column name={column.name}>
						<div>Test</div>
					</Column>
				{/if}
			{/each}
		{:else}
			{#each readiness as readiness}
				<AIColumn name={readiness}>
					<div></div>
				</AIColumn>
			{/each}
		{/if}
	</div>
{/snippet}

{#snippet fallback()}{/snippet}
