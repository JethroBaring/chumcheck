<script lang="ts">
	import { page } from '$app/stores';
	import axiosInstance from '$lib/axios.js';
	import { useQueriesState } from '$lib/stores/useQueriesState.svelte.js';
	import { getSavedTab, getSelectedTab, updateTab } from '$lib/utils';
	import { useQueries } from '@sveltestack/svelte-query';

	let { data } = $props()


	let selectedTab = $state(getSelectedTab('rna'));

	const updateRnaTab = (tab: string) => {
		selectedTab = updateTab('rna', tab);
	};



	const rnaQueries = useQueries([
		{
			queryKey: ['allowRNA', data.startupId],
			queryFn: async () =>
				(
					await axiosInstance.get(`/startups/${data.startupId}/allow-rnas/`, {
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
			queryKey: ['rnaData'],
			queryFn: async () =>
				(
					await axiosInstance.get(`/startup-rna/?startup_id=${data.startupId}`, {
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
					await axiosInstance.get(`/startup-readiness-levels/?startup_id=${data.startupId}`, {
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

	const { isLoading, isError, isAccessible } = $derived(useQueriesState($rnaQueries))


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
	{@render mentor()}
{:else}
	{@render fallback()}
{/if}

{#snippet loading()}{/snippet}

{#snippet error()}{/snippet}

{#snippet mentor()}{/snippet}

{#snippet fallback()}{/snippet}
