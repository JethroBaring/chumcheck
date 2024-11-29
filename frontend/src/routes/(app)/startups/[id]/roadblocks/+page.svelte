<script lang="ts">
	import {
		AIColumn,
		AITabs,
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

{#snippet card(rns: any)}
	<Card.Root class="h-full min-w-[calc(25%-1.25rem*3/4)] cursor-pointer">
		<Card.Content>
			<div class="flex flex-col gap-1">
				<div class="flex items-center justify-between">
					<h2 class="text-[15px] font-semibold leading-none tracking-tight">Technology</h2>
				</div>
				<div class="text-sm text-muted-foreground">
					<!-- {rns.rns.substring(0, 150) + `${rns.rns.length > 150 ? '...' : ''}`} -->
				</div>
				<div class="text-sm text-muted-foreground">Target Level: 5</div>
			</div>
			<div class="flex flex-wrap items-center gap-2">
				<Badge variant="secondary">Long Term</Badge>
			</div>
			<!-- {rns.rns.substring(0, 150) + `${rns.rns.length > 150 ? '...' : ''}`} -->
		</Card.Content>
	</Card.Root>
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
			<div class="flex h-fit justify-between rounded-lg bg-background">
				<AITabs {selectedTab} name="roadblocks" updateTab={updateRoadblocksTab} />
			</div>
			{#if selectedTab === 'roadblocks'}
				<MembersFilter {members} updateTab={updateRoadblocksTab} />
			{/if}
		</div>
		<div class="flex items-center gap-3">
			<ShowHideColumns views={columns} />
			<Button
				class="ml-auto hidden rounded-lg lg:flex"
				onclick={generateRoadblocks}
				disabled={generatingRoadblocks}
			>
				<Sparkles class="mr-2 h-4 w-4" />
				Generate
			</Button>
		</div>
	</div>
	<div class="flex h-full gap-5 overflow-scroll">
		{#if selectedTab === 'roadblocks'}
			<KanbanBoard {columns} {handleDndFinalize} {handleDndConsider} {card} />
		{:else}
			{#each $roadblocksQueries[1].data.results.filter((data) => data.is_ai_generated === true) as r, index}
				<Card.Root class="cursor-pointer hover:bg-secondary">
					<Card.Header>
						<div class="flex justify-between">
							<div class="space-x-3">
								<span class="text-base font-semibold">Risk No.</span>
								{#if r.risk_number}
									<span class="rounded-lg bg-muted px-2 py-1">{r.risk_number}</span>
								{/if}
							</div>
							<DropdownMenu.Root>
								<DropdownMenu.Trigger>
									<Ellipsis class="h-5 w-5" />
								</DropdownMenu.Trigger>
								<DropdownMenu.Content align="end">
									<DropdownMenu.Group>
										<DropdownMenu.Item onclick={() => addToRoadblocks(r.id)}>
											Add to RNA</DropdownMenu.Item
										>
										<DropdownMenu.Item
											onclick={() => {
												// currentRoadblock = r;
												// currentRoadblock = rnaData.filter(
												// 	(d) =>
												// 		d.readiness_level_id === readinessData[index].readiness_level_id
												// )[0];
												// readinessType = r.readiness_type;
												// readinessLevel = r.readiness_level;
												// open = true;
												// action = 'view';
											}}>View</DropdownMenu.Item
										>
										<DropdownMenu.Item
											onclick={() => {
												// currentRoadblock = r;
												// currentRoadblock = rnaData.filter(
												// 	(d) =>
												// 		d.readiness_level_id === readinessData[index].readiness_level_id
												// )[0];
												// readinessType = r.readiness_type;
												// readinessLevel = r.readiness_level;
												// open = true;
												// action = 'edit';
											}}>Edit</DropdownMenu.Item
										>
										<DropdownMenu.Item
											onclick={() => {
												// currentRoadblock = r;
												// currentRoadblock = rnaData.filter(
												// 	(d) =>
												// 		d.readiness_level_id === readinessData[index].readiness_level_id
												// )[0];
												// readinessType = r.readiness_type;
												// readinessLevel = r.readiness_level;
												// open = true;
												// action = 'delete';
											}}>Delete</DropdownMenu.Item
										>
									</DropdownMenu.Group>
								</DropdownMenu.Content>
							</DropdownMenu.Root>
						</div>
					</Card.Header>
					<Card.Content class="flex max-h-[500px] flex-col gap-3 text-muted-foreground">
						{r.description.substring(0, 150) + '...'}
						<!-- {#if r.assignee_id && selectedTab === 'startupRoadblocks'}
					<div class="flex items-center gap-3">
						<Avatar.Root class="h-8 w-8">
							<Avatar.Image src="https://github.com/shadcn.png" alt="@shadcn" />
							<Avatar.Fallback>Avatar</Avatar.Fallback>
						</Avatar.Root>
						<p>{members.filter((d) => d.user_id === r.assignee_id)[0].first_name}</p>
					</div>
				{/if} -->
					</Card.Content>
				</Card.Root>
			{/each}
		{/if}
	</div>
{/snippet}

{#snippet fallback()}
	<div>fallback</div>
{/snippet}
