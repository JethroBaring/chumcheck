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
	import { page } from '$app/stores';
	import { toast } from 'svelte-sonner';
	import * as Card from '$lib/components/ui/card';
	import axiosInstance from '$lib/axios.js';
	import axios from 'axios';
	import { dndzone } from 'svelte-dnd-action';
	import { flip } from 'svelte/animate';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import * as Avatar from '$lib/components/ui/avatar';
	import { Badge } from '$lib/components/ui/badge/index.js';
	import { RnsCard, RnsCreateDialog } from '$lib/components/startups/rns/index.js';
	import { Ellipsis } from 'lucide-svelte';
	import { Skeleton } from '$lib/components/ui/skeleton/index.js';

	const { data } = $props();
	const { access, startupId } = data;

	const rnsQueries = useQueries([
		{
			queryKey: ['allowRNS', startupId],
			queryFn: () => getData(`/startups/${startupId}/allow-tasks/`, access!)
		},
		{
			queryKey: ['rnsData'],
			queryFn: () => getData(`/tasks/tasks/?startup_id=${startupId}`, access!)
		},
		{
			queryKey: ['readinessData'],
			queryFn: () => getData(`/readinesslevel/readiness-levels/`, access!)
		},
		{
			queryKey: ['startupData'],
			queryFn: () => getData(`/startups/${startupId}`, access!)
		}
	]);

	const { isLoading, isError } = $derived(useQueriesState($rnsQueries));
	const isAccessible = $derived($rnsQueries[0].data);
	let selectedTab = $state(getSelectedTab('rns'));

	const updateRnsTab = (tab: string) => {
		selectedTab = updateTab('rns', tab);
	};

	const columns = $state(getColumns());
	const readiness = $state(getReadiness());

	const members = $state(
		$rnsQueries[3].isSuccess
			? [
					...$rnsQueries[3].data.members.map(({ id, ...rest }) => ({
						...rest
					})),
					{
						user_id: $rnsQueries[3].data.user_id,
						startup_id: $rnsQueries[3].data.id,
						first_name: $rnsQueries[3].data.leader_first_name,
						last_name: $rnsQueries[3].data.leader_last_name,
						email: $rnsQueries[3].data.leader_email,
						selected: false
					}
				]
			: []
	);
	const selectedMembers = $derived(members ? members.map((member) => member.user_id) : [])
	const views = $derived(selectedTab === 'rns' ? columns : readiness);

	$effect(() => {
		const searchParam = $page.url.searchParams.get('tab');
		selectedTab = getSavedTab('rns', searchParam);
	});

	let generatingRNS = false;
	let generatingType = 'Technology';
	let open = $state(false);
	const generateRNS = async (type: string) => {
		generatingRNS = true;
		await axios.all([
			await axiosInstance.post(
				`/tasks/tasks/generate-tasks/`,
				{
					startup_id: data.startupId,
					term: 1,
					readiness_type: type,
					no_of_tasks_to_create: 1
				},
				{
					headers: {
						Authorization: `Bearer ${data.access}`
					}
				}
			),
			await axiosInstance.post(
				`/tasks/tasks/generate-tasks/`,
				{
					startup_id: data.startupId,
					term: 2,
					readiness_type: type,
					no_of_tasks_to_create: 1
				},
				{
					headers: {
						Authorization: `Bearer ${data.access}`
					}
				}
			)
		]);
		generatingRNS = false;
		$rnsQueries[1].refetch();
		toast.success(`Successfully generated ${generatingType} RNS`);
	};

	const addToRNS = async (id: number) => {
		await axiosInstance.patch(
			`/tasks/tasks/${id}/`,
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
		toast.success('Successfuly added to RNS');
		$rnsQueries[1].refetch();
	};

	const createRns = async (payload: any) => {
		console.log(payload);
		await axiosInstance.post(
			'/tasks/tasks/',
			{
				...payload,
				status
			},
			{
				headers: {
					Authorization: `Bearer ${data.access}`
				}
			}
		);
		toast.success('Successfully created the RNS');
		open = false;
		$rnsQueries[1].refetch();
	};

	const editRNS = async (
		id: number,
		level?: number, // Optional parameter
		description?: string, // Optional parameter
		priority_number?: number, // Optional parameter,
		assignee_id?: number,
		task_type?: number
	) => {
		console.log({ id, level, description, priority_number, assignee_id });
		const payload: Record<string, any> = {};
		if (level !== undefined) payload.target_level_id = level;
		if (description !== undefined) payload.description = description;
		if (priority_number !== undefined) payload.priority_number = priority_number;
		if (assignee_id !== undefined) payload.assignee_id = assignee_id;
		if (task_type !== undefined) payload.task_type = task_type;

		await axiosInstance.patch(`/tasks/tasks/${id}/`, payload, {
			headers: {
				Authorization: `Bearer ${data.access}`
			}
		});

		toast.success('Successfully updated the RNS');
		open = false;
		$rnsQueries[1].refetch();
	};

	const deleteRNS = async (id: number) => {
		console.log(id);
		await axiosInstance.delete(`/tasks/tasks/${id}/`, {
			headers: {
				Authorization: `Bearer ${data.access}`
			}
		});
		toast.success('Successfuly deleted a task');
		$rnsQueries[1].refetch();
	};

	function handleDndConsider(e: any, x: number) {
		console.log(x);
		columns[x].items = e.detail.items;
	}

	async function handleDndFinalize(e: any, x: number, status: number) {
		columns[x].items = e.detail.items;
		if (e.detail.info.trigger == 'droppedIntoZone') {
			const task = e.detail.items.find((t: any) => t.id == e.detail.info.id);
			await axiosInstance.patch(
				`/tasks/tasks/${task.id}/`,
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
		if (!isLoading) {
			columns.forEach((column) => {
				column.items = $rnsQueries[1].data.results.filter(
					(data) => data.is_ai_generated === false && data.status === column.value
				);
			});
		}
	});

	const onOpenChange = () => {
		open = !open;
	};

	const showDialog = () => {
		open = true;
	};

	let status = $state(4);

	const updateStatus = (newStatus: number) => {
		status = newStatus;
	};

	const toggleMemberSelection = (index: number) => {
		members[index].selected = !members[index].selected
	};

	$effect(() => {
		console.log(members)
	})
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

<svelte:head>
	<title
		>{$rnsQueries[3].isSuccess
			? `${$rnsQueries[3].data.name} - Recommended Next Steps`
			: 'Loading'}</title
	>
</svelte:head>

<RnsCreateDialog {open} {onOpenChange} create={createRns} {startupId} {members} {status} />
{#snippet card(rns: any, ai = false)}
	<RnsCard
		{rns}
		{members}
		update={editRNS}
		{ai}
		addToRns={addToRNS}
		deleteRns={deleteRNS}
		role={data.role}
	/>
{/snippet}

{#snippet loading()}
	<div class="flex h-full flex-col gap-3">
		<div class="flex justify-between">
			<div class="flex gap-3">
				<div class="bg-background" class:hidden={data.role === 'Startup'}>
					<Skeleton class="h-9 w-[126px]" />
				</div>
				<div class="bg-background">
					<Skeleton class="h-9 w-[170px]" />
				</div>
				<div class="flex">
					{#each [1, 2] as item, index}
						<Skeleton
							class={`flex h-9 w-9 items-center justify-center rounded-full border-2 border-background ${
								index !== 2 - 1 ? '-mr-1' : ''
							} `}
						>
							?
						</Skeleton>
					{/each}
				</div>
			</div>
			<div class="ml-auto bg-background">
				<Skeleton class="h-9 w-[90px]" />
			</div>
		</div>

		<div class="grid h-full grid-cols-4 gap-5">
			<div class="h-full w-full bg-background">
				<Skeleton class="h-full" />
			</div>
			<div class="h-full w-full bg-background">
				<Skeleton class="h-full" />
			</div>
			<div class="h-full w-full bg-background">
				<Skeleton class="h-full" />
			</div>
			<div class="h-full w-full bg-background">
				<Skeleton class="h-full" />
			</div>
		</div>
	</div>
{/snippet}

{#snippet error()}{/snippet}

{#snippet accessible()}
	<div class="flex items-center justify-between">
		<div class="flex gap-3">
			<Can role={['Mentor', 'Manager as Mentor']} userRole={data.role}>
				<div class="flex h-fit justify-between rounded-lg bg-background">
					<AITabs {selectedTab} name="rns" updateTab={updateRnsTab} />
				</div>
			</Can>
			{#if selectedTab === 'rns'}
				<MembersFilter {members} {toggleMemberSelection} />
			{/if}
		</div>
		<ShowHideColumns {views} />
	</div>
	<div class="flex h-full gap-5 overflow-scroll">
		{#if selectedTab === 'rns'}
			<KanbanBoard
				{columns}
				{handleDndFinalize}
				{handleDndConsider}
				{card}
				{showDialog}
				role={data.role}
				{updateStatus}
				{selectedMembers}
			/>
		{:else}
			{#each readiness as readiness}
				<AIColumn name={readiness.name} generate={generateRNS}>
					{#each $rnsQueries[1].data.results.filter((data) => data.readiness_type_rl_type === readiness.name && data.is_ai_generated === true) as item}
						{@render card(item, true)}
					{/each}
				</AIColumn>
			{/each}
		{/if}
	</div>
{/snippet}

{#snippet fallback()}{/snippet}
