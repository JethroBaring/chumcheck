<script lang="ts">
	import { AIColumn, AITabs, Column, MembersFilter, ShowHideColumns } from '$lib/components/shared';
	import {
		getColumns,
		getReadiness,
		getSavedTab,
		getSelectedTab,
		updateTab
	} from '$lib/utils';
	import { page } from '$app/stores';
	import { useQueries, useQuery } from '@sveltestack/svelte-query';
	import axiosInstance from '$lib/axios';
	import axios from 'axios';
	import { useQueriesState } from '$lib/stores/useQueriesState.svelte.js';

	let { data } = $props();

	const initiativesQueries = useQueries([
		{
			queryKey: ['allowRNS', data.startupId],
			queryFn: async () =>
				(
					await axiosInstance.get(`/startups/${data.startupId}/allow-initatives/`, {
						headers: {
							Authorization: `Bearer ${data.access}`
						}
					})
				).data,
			cacheTime: 0,
			staleTime: 0
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
			staleTime: 0
		}
	]);
	const initiativeQuery = useQuery(
		'initiativesData',
		async () => {
			const ids = $initiativesQueries[1].data.results.map((d: any) => d.id);

			if (ids.length > 0) {
				const requests = ids.map((id: any) =>
					axiosInstance.get(`/tasks/initiatives?task_id=${id}`, {
						headers: {
							Authorization: `Bearer ${data.access}`
						}
					})
				);

				const responses = await axios.all(requests);
				const allData = responses.reduce(
					(acc: any, response: any) => acc.concat(response.data.results),
					[]
				);
				return allData;
			} else {
				return [];
			}
		},
		{
			cacheTime: 0,
			staleTime: 0,
			enabled: !!$initiativesQueries[1]
		}
	);

	let selectedTab = $state(getSelectedTab('initiatives'));

	const updateInitiativeTab = (tab: string) => {
		selectedTab = updateTab('initiatives', tab);
	};

	const { isLoading, isError, isAccessible } = $derived(useQueriesState($initiativesQueries))

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
