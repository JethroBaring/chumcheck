<script lang="ts">
	import { useQueriesState } from '$lib/stores/useQueriesState.svelte.js';
	import { AIColumn, AITabs, Column, MembersFilter, ShowHideColumns } from '$lib/components/shared';
	import { getData, getReadiness, getSavedTab, getSelectedTab, updateTab } from '$lib/utils';
	import { useQueries } from '@sveltestack/svelte-query';
	import { page } from '$app/stores';
	import { RnaCard, RnaDialog } from '$lib/components/startups/rna';
	import type { Actions } from '$lib/types';
	import { Button } from '$lib/components/ui/button';
	import { Sparkles } from 'lucide-svelte';
	import axiosInstance from '$lib/axios';
	import { toast } from 'svelte-sonner';

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
		},
		{
			queryKey: ['startupData'],
			queryFn: () => getData(`/startups/${startupId}`, access!)
		}
	]);

	const { isLoading, isError } = $derived(useQueriesState($rnaQueries));
	const isAccessible = $derived($rnaQueries[0].data);

	let selectedTab = $state(getSelectedTab('rna'));
	const readiness = $state(getReadiness());
	const aiReadiness = $state(getReadiness());

	const updateRnaTab = (tab: string) => {
		selectedTab = updateTab('rna', tab);
	};

	const members = $derived(
		$rnaQueries[3].isSuccess
			? [
					...$rnaQueries[3].data.members.map(({ id, ...rest }) => ({
						...rest
					})),
					{
						user_id: $rnaQueries[3].data.user_id,
						startup_id: $rnaQueries[3].data.id,
						first_name: $rnaQueries[3].data.leader_first_name,
						last_name: $rnaQueries[3].data.leader_last_name,
						email: $rnaQueries[3].data.leader_email
					}
				]
			: []
	);

	const views = $derived(selectedTab === 'rna' ? readiness : aiReadiness);

	$effect(() => {
		const searchParam = $page.url.searchParams.get('tab');
		selectedTab = getSavedTab('rna', searchParam);
	});

	let open = $state(false);
	let action: Actions = $state('View');
	const onOpenChange = () => {
		open = !open;
	};

	const openDialog = () => {
		open = true;
	};

	let generatingRNA = $state(false)

	const generateRNA = async () => {
		generatingRNA = true;
		await axiosInstance.get(`/startups/${data.startupId}/generate-rna/`, {
			headers: {
				Authorization: `Bearer ${data.access}`
			}
		});
		generatingRNA = false;
		toast.success('Successfuly generated RNA');
		$rnaQueries[1].refetch();
	};

	const addToRNA = async (id: number) => {
		await axiosInstance.patch(
			`/startup-rna/${id}/`,
			{
				is_ai_generated: false
			},
			{
				headers: {
					Authorization: `Bearer ${data.access}`
				}
			}
		);
		toast.success('Successfuly added to RNA');
		$rnaQueries[1].refetch();
	};

	const editRNA = async (id: number, description: string) => {
		await axiosInstance.patch(
			`/startup-rna/${id}/`,
			{
				is_ai_generated: false,
				rna: description
			},
			{
				headers: {
					Authorization: `Bearer ${data.access}`
				}
			}
		);
		toast.success('Successfuly updated the RNA');
		open = false;
		$rnaQueries[1].refetch();
	};

	const deleteRNA = async (id: number) => {
		await axiosInstance.delete(`/startup-rna/${id}/`, {
			headers: {
				Authorization: `Bearer ${data.access}`
			}
		});
		toast.success('Successfuly deleted the RNA');
		$rnaQueries[1].refetch();
	};

	$effect(() => {
		console.log($rnaQueries[2].data)
	})

</script>

<svelte:head>
	<title
		>{$rnaQueries[3].isSuccess
			? `${$rnaQueries[3].data.name} - Readiness and Needs Assessment`
			: 'Loading'}</title
	>
</svelte:head>

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
				<AITabs {selectedTab} name="rna" updateTab={updateRnaTab} />
			</div>
		</div>
		<div class="flex items-center gap-3">
			<ShowHideColumns {views} />
			{#if selectedTab === 'ai-rna'}
				<Button onclick={generateRNA} disabled={generatingRNA}><Sparkles class="h-4 w-4" />Generate</Button>
			{/if}
		</div>
	</div>
	<div class="flex h-full gap-5 overflow-scroll">
		{#if selectedTab === 'rna'}
			{#each readiness as readiness}
				{#if readiness.show}
					<Column name={readiness.name} showDialog={openDialog}>
						<button
							onclick={() => {
								openDialog();
								action = 'View';
							}}>Test</button
						>
					</Column>
				{/if}
			{/each}
		{:else}
			{#each aiReadiness as readiness}
				<AIColumn name={readiness.name} generate={generateRNA}>
					{#each $rnaQueries[1].data.results.filter((d: any) => d.readiness_type_rl_type === readiness.name && d.is_ai_generated === true) as item}
						<RnaCard rna={item} {selectedTab} {addToRNA}/>
					{/each}
				</AIColumn>
			{/each}
		{/if}
	</div>
{/snippet}

{#snippet fallback()}
	<div>test</div>
{/snippet}

<RnaDialog {action} {open} {onOpenChange} />
