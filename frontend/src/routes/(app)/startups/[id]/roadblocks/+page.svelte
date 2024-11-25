<script lang="ts">
	import { AIColumn, AITabs, Column, MembersFilter, ShowHideColumns } from '$lib/components/shared';
	import {
		getData,
		getColumns,
		getSavedTab,
		getSelectedTab,
		updateTab,
		getReadiness
	} from '$lib/utils';
	import { useQueriesState } from '$lib/stores/useQueriesState.svelte.js';
	import { useQueries } from '@sveltestack/svelte-query';
	import { page } from '$app/stores';

	const { data } = $props();
	const { access, startupId } = data;
	
	const roadblocksQueries = useQueries([
		{
			queryKey: ['allowRoadblocks', startupId],
			queryFn: () => getData(`/startups/${startupId}/allow-roadblocks/`, access!)
		},
		{
			queryKey: ['roadblocksData'],
			queryFn: () => getData(`/tasks/roadblocks/?startup_id=${startupId}`, access!)
		},
		{
			queryKey: ['startupData'],
			queryFn: () => getData(`/startups/${startupId}`, access!)
		}
	]);

	const { isLoading, isError, isAccessible } = $derived(useQueriesState($roadblocksQueries));

	let selectedTab = $state(getSelectedTab('roadblocks'));

	const updateRoadblocksTab = (tab: string) => {
		selectedTab = updateTab('roadblocks', tab);
	};

	const columns = $state(getColumns());
	const readiness = $state(getReadiness());

	let members = $state([
		{ name: 'Jethro Baring', role: 'Lead', selected: false },
		{ name: 'Hannah Gimena', role: 'Mentor', selected: false }
	]);

	$effect(() => {
		const searchParam = $page.url.searchParams.get('tab');
		selectedTab = getSavedTab('roadblocks', searchParam);
	});
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
				<AITabs {selectedTab} name="rns" updateTab={updateRoadblocksTab} />
			</div>
			{#if selectedTab === 'rns'}
				<MembersFilter {members} updateTab={updateRoadblocksTab} />
			{/if}
		</div>
		<ShowHideColumns views={columns} />
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
				<AIColumn name={readiness.name}>
					<div></div>
				</AIColumn>
			{/each}
		{/if}
	</div>
{/snippet}

{#snippet fallback()}
	<div>fallback</div>
{/snippet}
