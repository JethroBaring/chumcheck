<script lang="ts">
	import { AIColumn, AITabs, Column, MembersFilter, ShowHideColumns } from '$lib/components/shared';
	import { getColumns, getSavedTab, getSelectedTab, readiness, updateTab } from '$lib/utils';
	import { page } from '$app/stores';
	import { useQueries } from '@sveltestack/svelte-query';
	import axiosInstance from '$lib/axios';
	import { useQueriesState } from '$lib/stores/useQueriesState.svelte.js';

	let { data } = $props();

	let selectedTab = $state(getSelectedTab('roadblocks'));

	const updateRoadblocksTab = (tab: string) => {
		selectedTab = updateTab('roadblocks', tab);
	};

	const roadblocksQueries = useQueries([
		{
			queryKey: ['allowRoadblocks', data.startupId],
			queryFn: async () =>
				(
					await axiosInstance.get(`/startups/${data.startupId}/allow-roadblocks/`, {
						headers: {
							Authorization: `Bearer ${data.access}`
						}
					})
				).data,
			cacheTime: 0,
			staleTime: 0,
			refetchOnWindowFocus: false
		},
		{
			queryKey: ['roadblocksData'],
			queryFn: async () =>
				(
					await axiosInstance.get(`/tasks/roadblocks/?startup_id=${data.startupId}`, {
						headers: {
							Authorization: `Bearer ${data.access}`
						}
					})
				).data,
			cacheTime: 0,
			staleTime: 0,
			refetchOnWindowFocus: false
		},
		{
			queryKey: ['startupData'],
			queryFn: async () =>
				(
					await axiosInstance.get(`/startups/${data.startupId}`, {
						headers: {
							Authorization: `Bearer ${data.access}`
						}
					})
				).data,
			cacheTime: 0,
			staleTime: 0,
			refetchOnWindowFocus: false
		}
	]);
	
	const { isLoading, isError, isAccessible } = $derived(useQueriesState($roadblocksQueries))

	const columns = $state(getColumns());

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
				<AIColumn name={readiness}>
					<div></div>
				</AIColumn>
			{/each}
		{/if}
	</div>
{/snippet}

{#snippet fallback()}
	<div>fallback</div>
{/snippet}
