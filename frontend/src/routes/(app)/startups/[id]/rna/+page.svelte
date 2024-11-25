<script lang="ts">
	import { useQueriesState } from '$lib/stores/useQueriesState.svelte.js';
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
	const isAccessible = $rnaQueries[0].data;

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
	<div>test</div>
{/snippet}

{#snippet fallback()}
<div>test</div>
{/snippet}
