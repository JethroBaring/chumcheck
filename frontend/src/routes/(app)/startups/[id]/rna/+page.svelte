<script lang="ts">
	import { useQueriesState } from '$lib/stores/useQueriesState.svelte.js';
	import { AIColumn, AITabs, Column, MembersFilter, ShowHideColumns } from '$lib/components/shared';
	import { getData, getSavedTab, getSelectedTab, updateTab } from '$lib/utils';
	import { useQueries } from '@sveltestack/svelte-query';
	import { page } from '$app/stores';

	const { data } = $props();
	const { access, startupId } = data;

	const rnaQueries = useQueries([
		{
			queryKey: ['allowRNA', startupId],
			queryFn: () => getData(`/startups/${startupId}/allow-rnas/`, access!)
		},
		{
			queryKey: ['rnaData'],
			queryFn: () => getData(`/startup-rna/?startup_id=${startupId}`, access!)
		},
		{
			queryKey: ['readinessData'],
			queryFn: () => getData(`/startup-readiness-levels/?startup_id=${startupId}`, access!)
		}
	]);

	const { isLoading, isError } = $derived(useQueriesState($rnaQueries));
	const isAccessible = $derived($rnaQueries[0].data);

	let selectedTab = $state(getSelectedTab('rna'));

	const updateRnaTab = (tab: string) => {
		selectedTab = updateTab('rna', tab);
	};

	$effect(() => {
		const searchParam = $page.url.searchParams.get('tab');
		selectedTab = getSavedTab('rna', searchParam);
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

{#snippet fallback()}
<div>test</div>
{/snippet}
