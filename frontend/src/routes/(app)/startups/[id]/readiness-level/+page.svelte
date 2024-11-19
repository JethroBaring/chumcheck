<script lang="ts">
	import axiosInstance from "$lib/axios";
	import { RubricTable } from "$lib/components/startups/readiness";
	import { isMentor } from "$lib/utils";
	import { useQueries } from "@sveltestack/svelte-query";

	let { data } = $props()
	const role = data.role

	const readinessLevelQueries = useQueries([
		{
			queryKey: ['startup', data.startupId],
			queryFn: async () =>
				(
					await axiosInstance.get(`/startups/${data.startupId}/`, {
						headers: {
							Authorization: `Bearer ${data.access}`
						}
					})
				).data,
			cacheTime: 0,
			staleTime: 0
		},
		{
			queryKey: ['readinessLevelsPage1'],
			queryFn: async () =>
				(
					await axiosInstance.get(`/readinesslevel/readiness-levels/`, {
						headers: {
							Authorization: `Bearer ${data.access}`
						}
					})
				).data,
			cacheTime: 0,
			staleTime: 0
		},
		{
			queryKey: ['readinessLevelsPage2'],
			queryFn: async () =>
				(
					await axiosInstance.get(`/readinesslevel/readiness-levels/?page=2`, {
						headers: {
							Authorization: `Bearer ${data.access}`
						}
					})
				).data,
			cacheTime: 0,
			staleTime: 0
		},
		{
			queryKey: ['haveScores', data.startupId],
			queryFn: async () =>
				(
					await axiosInstance.get(
						`/readiness-level-criterion-answers/?page_size=324&startup_id=${data.startupId}`,
						{
							headers: {
								Authorization: `Bearer ${data.access}`
							}
						}
					)
				).data,
			cacheTime: 0,
			staleTime: 0
		},
		{
			queryKey: ['readinessLevel', data.startupId],
			queryFn: async () =>
				(
					await axiosInstance.get(`/startup-readiness-levels/?startup_id=${data.startupId}`, {
						headers: {
							Authorization: `Bearer ${data.access}`
						}
					})
				).data,
			cacheTime: 0,
			staleTime: 0
		}
	]);

	let isLoading: boolean = $derived($readinessLevelQueries[0].isLoading || $readinessLevelQueries[1].isLoading || $readinessLevelQueries[2].isLoading || $readinessLevelQueries[3].isLoading || $readinessLevelQueries[4].isLoading)
	let isError: boolean = $derived($readinessLevelQueries[0].isError || $readinessLevelQueries[1].isError || $readinessLevelQueries[2].isError || $readinessLevelQueries[3].isError || $readinessLevelQueries[4].isError)
	let isRated: boolean = $state(true);
</script>

{#if isLoading}
	{@render loading()}
{:else if isError}
	{@render error()}
{:else if isRated}
	{@render rated()}
{:else if isMentor(role)}
	{@render mentor()}
{:else}
	<div>
		<p>Looks like you haven't been rated yet</p>
	</div>
{/if}

{#snippet loading()}{/snippet}

{#snippet error()}{/snippet}

{#snippet rated()}
<RubricTable />
{/snippet}

{#snippet mentor()}{/snippet}
