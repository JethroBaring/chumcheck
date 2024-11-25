<script lang="ts">
	import { AIColumn, AITabs, Column, MembersFilter, ShowHideColumns } from '$lib/components/shared';
	import {
		getData,
		getColumns,
		getReadiness,
		getSavedTab,
		getSelectedTab,
		updateTab
	} from '$lib/utils';
	import { useQueriesState } from '$lib/stores/useQueriesState.svelte.js';
	import { useQueries } from '@sveltestack/svelte-query';
	import { page } from '$app/stores';

	const { data } = $props();
	const { access, startupId } = data;
	const initiativesQueries = useQueries([
		{
			queryKey: ['allowRNS', data.startupId],
			queryFn: () => getData(`/startups/${startupId}/allow-initatives/`, access!)
		},
		{
			queryKey: ['rnsData'],
			queryFn: () => getData(`/tasks/tasks/?startup_id=${data.startupId}`, access!)
		},
		{
			queryKey: ['rnsData'],
			queryFn: () => getData(`/tasks/initiatives/?startup_id=${data.startupId}`, access!)
		}
	]);

	const { isLoading, isError } = $derived(useQueriesState($initiativesQueries));
	const isAccessible = $derived($initiativesQueries[0].data)
	let selectedTab = $state(getSelectedTab('initiatives'));

	const updateInitiativeTab = (tab: string) => {
		selectedTab = updateTab('initiatives', tab);
	};

	const columns = $state(getColumns());
	const readiness = $state(getReadiness());
	const views = $derived(selectedTab === 'initiatives' ? columns : readiness);
	const members = [
		{ name: 'Jethro Baring', role: 'Lead', selected: false },
		{ name: 'Hannah Gimena', role: 'Mentor', selected: false }
	];

	$effect(() => {
		const searchParam = $page.url.searchParams.get('tab');
		selectedTab = getSavedTab('initiatives', searchParam);
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
				<AITabs {selectedTab} name="initiatives" updateTab={updateInitiativeTab} />
			</div>
			{#if selectedTab === 'initiatives'}
				<MembersFilter {members} updateTab={updateInitiativeTab} />
			{/if}
		</div>
		<ShowHideColumns {views} />
	</div>
	<div class="flex h-full gap-5 overflow-scroll">
		{#if selectedTab === 'initiatives'}
			{#each columns as column}
				{#if column.show}
					<Column name={column.name}>
						<div>Test</div>
					</Column>
				{/if}
			{/each}
		{:else}
			{#each readiness as readiness}
				{#if readiness.show}
					<AIColumn name={readiness.name}>
						<div></div>
					</AIColumn>
				{/if}
			{/each}
		{/if}
	</div>
{/snippet}

{#snippet fallback()}{/snippet}
