<script lang="ts">
	import { AIColumn, AITabs, Column, MembersFilter, ShowHideColumns } from '$lib/components/shared';
	import {
		getData,
		getColumns,
		getSavedTab,
		getSelectedTab,
		readiness,
		updateTab
	} from '$lib/utils';
	import { useQueriesState } from '$lib/stores/useQueriesState.svelte.js';
	import { useQueries } from '@sveltestack/svelte-query';
	import { page } from '$app/stores';

	const { data } = $props();
	const { access, startupId } = data;

	const rnsQueries = useQueries([
		{
			queryKey: ['allowRNS', startupId],
			queryFn: () => getData(`/startups/${startupId}/allow-tasks/`, access!)
		},
		{
			queryKey: ['rnsData'],
			queryFn: () => getData(`/tasks/tasks/?startup_id=${startupId}`, access!)
		},
		{
			queryKey: ['readinessData'],
			queryFn: () => getData(`/readinesslevel/readiness-levels/`, access!)
		}
	]);

	const { isLoading, isError, isAccessible } = $derived(useQueriesState($rnsQueries));

	let selectedTab = $state(getSelectedTab('rns'));

	const updateRnsTab = (tab: string) => {
		selectedTab = updateTab('rns', tab);
	};

	const columns = $state(getColumns());

	let members = $state([
		{ name: 'Jethro Baring', role: 'Lead', selected: false },
		{ name: 'Hannah Gimena', role: 'Mentor', selected: false }
	]);

	const views = $derived(selectedTab === 'rns' ? columns : readiness);

	$effect(() => {
		const searchParam = $page.url.searchParams.get('tab');
		selectedTab = getSavedTab('rns', searchParam);
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

<svelte:head>
	<title>Techwave Solution - RNS</title>
</svelte:head>

{#snippet loading()}{/snippet}

{#snippet error()}{/snippet}

{#snippet accessible()}
	<div class="flex items-center justify-between">
		<div class="flex gap-3">
			<div class="flex h-fit justify-between rounded-lg bg-background">
				<AITabs {selectedTab} name="rns" updateTab={updateRnsTab} />
			</div>
			{#if selectedTab === 'rns'}
				<MembersFilter {members} updateTab={updateRnsTab} />
			{/if}
		</div>
		<ShowHideColumns {views} />
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
