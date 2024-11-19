<script lang="ts">
	import { AIColumn, AITabs, Column, MembersFilter, ShowHideColumns } from '$lib/components/shared';
	import { getColumns, getSavedTab, getSelectedTab, readiness, updateTab } from '$lib/utils';
	import { page } from '$app/stores';
	import { useQueries } from '@sveltestack/svelte-query';
	import axiosInstance from '$lib/axios';
	import { useQueriesState } from '$lib/stores/useQueriesState.svelte.js';

	let { data } = $props();

	let selectedTab = $state(getSelectedTab('rns'));

	const updateRnsTab = (tab: string) => {
		selectedTab = updateTab('rns', tab);
	};



	const columns = $state(getColumns());

	let members = $state([
		{ name: 'Jethro Baring', role: 'Lead', selected: false },
		{ name: 'Hannah Gimena', role: 'Mentor', selected: false }
	]);

	const rnsQueries = useQueries([
		{
			queryKey: ['allowRNS', data.startupId],
			queryFn: async () =>
				(
					await axiosInstance.get(`/startups/${data.startupId}/allow-tasks/`, {
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
			queryKey: ['rnsData'],
			queryFn: async () =>
				(
					await axiosInstance.get(`/tasks/tasks/?startup_id=${data.startupId}`, {
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
			queryKey: ['readinessData'],
			queryFn: async () =>
				(
					await axiosInstance.get(`/readinesslevel/readiness-levels/`, {
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

	const { isLoading, isError, isAccessible } = $derived(useQueriesState($rnsQueries))

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
