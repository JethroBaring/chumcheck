<script lang="ts">
	import {
		AIColumn,
		AITabs,
		Can,
		Column,
		KanbanBoard,
		MembersFilter,
		ShowHideColumns
	} from '$lib/components/shared';
	import {
		getData,
		getColumns,
		getSavedTab,
		getSelectedTab,
		updateTab,
		getReadiness
	} from '$lib/utils';
	import { useQueriesState } from '$lib/stores/useQueriesState.svelte.js';
	import { useQueries } from '@sveltestack/svelte-query';
	import * as Card from '$lib/components/ui/card';
	import { page } from '$app/stores';
	import axiosInstance from '$lib/axios.js';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import { Ellipsis, Sparkles } from 'lucide-svelte';
	import { toast } from 'svelte-sonner';
	import { Badge } from '$lib/components/ui/badge/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import { RoadblocksCard, RoadblocksCreateDialog } from '$lib/components/startups/roadblocks';

	const { data } = $props();
	const { access, startupId } = data;

	const roadblocksQueries = useQueries([
		{
			queryKey: ['allowRoadblocks', startupId],
			queryFn: () => getData(`/startups/${startupId}/allow-roadblocks/`, access!)
		},
		{
			queryKey: ['roadblocksData'],
			queryFn: () => getData(`/tasks/roadblocks/?startup_id=${startupId}`, access!)
		},
		{
			queryKey: ['startupData'],
			queryFn: () => getData(`/startups/${startupId}`, access!)
		},
		{
			queryKey: ['startupData'],
			queryFn: () => getData(`/startups/${startupId}`, access!)
		}
	]);

	const { isLoading, isError } = $derived(useQueriesState($roadblocksQueries));
	const isAccessible = $derived($roadblocksQueries[0].data);
	let selectedTab = $state(getSelectedTab('roadblocks'));

	const updateRoadblocksTab = (tab: string) => {
		selectedTab = updateTab('roadblocks', tab);
	};

	const columns = $state(getColumns());
	const readiness = $state(getReadiness());

	const members = $derived(
		$roadblocksQueries[3].isSuccess
			? [
					...$roadblocksQueries[3].data.members.map(({ id, ...rest }) => ({
						...rest
					})),
					{
						user_id: $roadblocksQueries[3].data.user_id,
						startup_id: $roadblocksQueries[3].data.id,
						first_name: $roadblocksQueries[3].data.leader_first_name,
						last_name: $roadblocksQueries[3].data.leader_last_name,
						email: $roadblocksQueries[3].data.leader_email
					}
				]
			: []
	);

	$effect(() => {
		const searchParam = $page.url.searchParams.get('tab');
		selectedTab = getSavedTab('roadblocks', searchParam);
	});

	let generatingRoadblocks: boolean = $state(false);

	const generateRoadblocks = async () => {
		generatingRoadblocks = true;
		await axiosInstance.post(
			`/tasks/roadblocks/generate-roadblocks/`,
			{
				startup_id: data.startupId,
				no_of_roadblocks_to_create: 3
			},
			{
				headers: {
					Authorization: `Bearer ${data.access}`
				}
			}
		);
		generatingRoadblocks = false;
		$roadblocksQueries[1].refetch();
	};

	const addToRoadblocks = async (id: number) => {
		await axiosInstance.patch(
			`/tasks/roadblocks/${id}/`,
			{
				status: 4,
				is_ai_generated: false
			},
			{
				headers: {
					Authorization: `Bearer ${data.access}`
				}
			}
		);
		toast.success('Successfuly added to RNA');
		$roadblocksQueries[1].refetch();
	};

	const createRoadblocks = async (payload: any) => {
		console.log(payload);
		await axiosInstance.post('/tasks/roadblocks/', payload, {
			headers: {
				Authorization: `Bearer ${data.access}`
			}
		});
		toast.success('Successfully created the Roadblocks');
		open = false;
		$roadblocksQueries[1].refetch();
	};

	const editRoadblock = async (
		id: number,
		riskNumber: number,
		description: string,
		fix: string,
		assigneeId: number
	) => {
		await axiosInstance.patch(
			`/tasks/roadblocks/${id}/`,
			{
				risk_number: riskNumber,
				description,
				fix,
				assignee_id: assigneeId
			},
			{
				headers: {
					Authorization: `Bearer ${data.access}`
				}
			}
		);
		toast.success('Successfuly updated the RNA');
		// open = false;
		$roadblocksQueries[1].refetch();
	};

	const deleteRoadblock = async (id: number) => {};

	function handleDndConsider(e: any, x: number) {
		columns[x].items = e.detail.items;
	}

	async function handleDndFinalize(e: any, x: number, status: number) {
		columns[x].items = e.detail.items;
		if (e.detail.info.trigger == 'droppedIntoZone') {
			const task = e.detail.items.find((t) => t.id == e.detail.info.id);
			await axiosInstance.patch(
				`/tasks/roadblocks/${task.id}/`,
				{
					status
				},
				{
					headers: {
						Authorization: `Bearer ${data.access}`
					}
				}
			);
		}
	}

	$effect(() => {
		if ($roadblocksQueries[1].isSuccess) {
			console.log($roadblocksQueries[1].data);
		}
	});

	$effect(() => {
		if (!isLoading) {
			columns.forEach((column) => {
				column.items = $roadblocksQueries[1].data.results.filter(
					(data) => data.is_ai_generated === false && data.status === column.value
				);
			});
		}
	});

	let open = $state(false);

	const showDialog = () => {
		open = true;
	};

	const onOpenChange = () => {
		open = !open;
	};
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

<RoadblocksCreateDialog {open} {onOpenChange} {members} {startupId} create={createRoadblocks} />

{#snippet card(roadblocks: any)}
	<RoadblocksCard
		{roadblocks}
		{members}
		ai={false}
		update={editRoadblock}
		{addToRoadblocks}
		deleteRoadblocks={deleteRoadblock}
		role={data.role}
	/>
{/snippet}

{#snippet loading()}
	loading
{/snippet}

{#snippet error()}
	error
{/snippet}

{#snippet accessible()}
	<div class="flex items-center justify-between">
		<div class="flex gap-3">
			<Can role={['Mentor', 'Manager as Mentor']} userRole={data.role}>
				<div class="flex h-fit justify-between rounded-lg bg-background">
					<AITabs {selectedTab} name="roadblocks" updateTab={updateRoadblocksTab} />
				</div>
			</Can>
			{#if selectedTab === 'roadblocks'}
				<MembersFilter {members} updateTab={updateRoadblocksTab} updateMembers={() => {}} />
			{/if}
		</div>
		<div class="flex items-center gap-3">
			{#if selectedTab === 'ai-roadblocks'}
				<Button
					class="ml-auto hidden rounded-lg lg:flex"
					onclick={generateRoadblocks}
					disabled={generatingRoadblocks}
				>
					<Sparkles class="mr-2 h-4 w-4" />
					Generate
				</Button>
			{:else}
				<ShowHideColumns views={columns} />
			{/if}
		</div>
	</div>
	{#if selectedTab === 'roadblocks'}
		<div class="flex h-full gap-5 overflow-scroll">
			<KanbanBoard {columns} {handleDndFinalize} {handleDndConsider} {card} {showDialog} role={data.role}/>
		</div>
	{:else}
		<div class="grid w-full grid-cols-4 gap-5 overflow-scroll">
			{#each $roadblocksQueries[1].data.results.filter((data) => data.is_ai_generated === true) as r, index}
				<RoadblocksCard
					roadblocks={r}
					update={editRoadblock}
					{addToRoadblocks}
					deleteRoadblocks={deleteRoadblock}
					ai={true}
					{members}
				/>
			{/each}
		</div>
	{/if}
{/snippet}

{#snippet fallback()}
	<div>fallback</div>
{/snippet}
