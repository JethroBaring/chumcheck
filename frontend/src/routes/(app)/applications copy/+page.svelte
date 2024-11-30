<script lang="ts">
	import ChevronDown from 'svelte-radix/ChevronDown.svelte';
	import {
		type ColumnDef,
		type ColumnFiltersState,
		type PaginationState,
		type RowSelectionState,
		type SortingState,
		type VisibilityState,
		getCoreRowModel,
		getFilteredRowModel,
		getPaginationRowModel,
		getSortedRowModel
	} from '@tanstack/table-core';
	import { createRawSnippet } from 'svelte';
	import * as Tabs from '$lib/components/ui/tabs/index.js';
	import { DataTableEmailButton, DataTableActions } from '$lib/components/applications';
	import * as Table from '$lib/components/ui/table/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import {
		createSvelteTable,
		renderComponent,
		renderSnippet
	} from '$lib/components/ui/data-table/index.js';
	import DataTable from '$lib/components/applications/data-table.svelte';
	import type { Application } from '$lib/types';
	import axiosInstance from '$lib/axios';
	import { useQueries } from '@sveltestack/svelte-query';
	import PendingDialog from '$lib/components/dashboard/PendingDialog.svelte';
	import RatedDialog from '$lib/components/dashboard/RatedDialog.svelte';
	import QualifiedDialog from '$lib/components/dashboard/QualifiedDialog.svelte';
	import { PUBLIC_API_URL } from '$env/static/public';

	let { data } = $props()
	const { access } = data

	const applicationData: Application[] = [
		{
			id: '1',
			startupName: 'Sample',
			groupName: 'Sample Group',
			leaderName: 'Sample Leader'
		}
	];

	const columns: ColumnDef<Application>[] = [
		{
			accessorKey: 'startupName',
			header: ({ column }) =>
				renderComponent(DataTableEmailButton, {
					onclick: () => column.toggleSorting(column.getIsSorted() === 'asc')
				}),
			cell: ({ row }) => {
				const startupSnippet = createRawSnippet<[string]>((getStartup) => {
					const startup = getStartup();
					return {
						render: () => `<div class="capitalize ml-3">${startup}</div>`
					};
				});

				return renderSnippet(startupSnippet, row.getValue('startupName'));
			}
		},
		{
			accessorKey: 'groupName',
			header: () => {
				const amountHeaderSnippet = createRawSnippet(() => {
					return {
						render: () => `<div class="">Group</div>`
					};
				});
				return renderSnippet(amountHeaderSnippet, '');
			},
			cell: ({ row }) => {
				const groupSnippet = createRawSnippet<[string]>((getGroup) => {
					const group = getGroup();
					return {
						render: () => `<div class="capitalize">${group}</div>`
					};
				});
				return renderSnippet(groupSnippet, row.getValue('startupName'));
			}
		},
		{
			accessorKey: 'leaderName',
			header: () => {
				const amountHeaderSnippet = createRawSnippet(() => {
					return {
						render: () => `<div class="">Leader</div>`
					};
				});
				return renderSnippet(amountHeaderSnippet, '');
			},
			cell: ({ row }) => {
				const leaderSnippet = createRawSnippet<[string]>((getLeader) => {
					const leader = getLeader();
					return {
						render: () => `<div class="capitalize">${leader}</div>`
					};
				});
				return renderSnippet(leaderSnippet, row.getValue('startupName'));
			}
		},
		{
			id: 'actions',
			enableHiding: false,
			// cell: ({ row }) => renderComponent(DataTableActions, { id: row.original.id })
			cell: ({ row }) => {
				const leaderSnippet = createRawSnippet<[string]>((getLeader) => {
					const leader = getLeader();
					return {
						render: () => `<button class="capitalize">${row.original.id}</button>`
					};
				});
				return renderSnippet(leaderSnippet, row.getValue('startupName'));
			}
		}
	];

	let pagination = $state<PaginationState>({ pageIndex: 0, pageSize: 10 });
	let sorting = $state<SortingState>([]);
	let columnFilters = $state<ColumnFiltersState>([]);
	let rowSelection = $state<RowSelectionState>({});
	let columnVisibility = $state<VisibilityState>({});

	const table = createSvelteTable({
		get data() {
			return applicationData;
		},
		columns,
		state: {
			get pagination() {
				return pagination;
			},
			get sorting() {
				return sorting;
			},
			get columnVisibility() {
				return columnVisibility;
			},
			get rowSelection() {
				return rowSelection;
			},
			get columnFilters() {
				return columnFilters;
			}
		},
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		onPaginationChange: (updater) => {
			if (typeof updater === 'function') {
				pagination = updater(pagination);
			} else {
				pagination = updater;
			}
		},
		onSortingChange: (updater) => {
			if (typeof updater === 'function') {
				sorting = updater(sorting);
			} else {
				sorting = updater;
			}
		},
		onColumnFiltersChange: (updater) => {
			if (typeof updater === 'function') {
				columnFilters = updater(columnFilters);
			} else {
				columnFilters = updater;
			}
		},
		onColumnVisibilityChange: (updater) => {
			if (typeof updater === 'function') {
				columnVisibility = updater(columnVisibility);
			} else {
				columnVisibility = updater;
			}
		},
		onRowSelectionChange: (updater) => {
			if (typeof updater === 'function') {
				rowSelection = updater(rowSelection);
			} else {
				rowSelection = updater;
			}
		}
	});

	let selectedTab = $state('pending');

	let applicants: any = [];

	let showDialog = false;

	function toggleDialog() {
		showDialog = !showDialog;
	}

	// pending
	let inf: any, que: any, ans: any, calc: any;

	async function getPendingStartupInformation(startupId: number) {
		const response = await fetch(`${PUBLIC_API_URL}/startups/${startupId}`, {
			method: 'get',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${access}`
			}
		});

		const data = await response.json();
		if (response.ok) {
			const urat_questions = await fetch(`${PUBLIC_API_URL}/readinesslevel/urat-questions/`, {
				method: 'GET',
				headers: {
					Authorization: `Bearer ${access}`
				}
			});

			const questions_data = await urat_questions.json();

			const urat_answers = await fetch(
				`${PUBLIC_API_URL}/urat-question-answers/?startup_id=${startupId}`,
				{
					method: 'GET',
					headers: {
						Authorization: `Bearer ${access}`
					}
				}
			);

			const answers_data = await urat_answers.json();

			const calculator = await fetch(
				`${PUBLIC_API_URL}/startups/${startupId}/calculator-final-scores/`,
				{
					method: 'get',
					headers: {
						Authorization: `Bearer ${access}`
					}
				}
			);

			const calculator_data = await calculator.json();
			if (urat_questions.ok && urat_answers.ok && calculator.ok) {
				inf = data;
				console.log(data.members);
				que = questions_data.results;
				ans = answers_data.results;
				calc = calculator_data;
				toggleDialog();
			}
		}
	}

	async function saveRating(startupId: string) {
		const response = await fetch(`${PUBLIC_API_URL}/startups/${startupId}/rate-applicant/`, {
			method: 'post',
			headers: {
				'Content-type': 'application/json',
				Authorization: `Bearer ${access}`
			}
		});

		const data = await response.json();

		if (response.ok) {
			const sub = applicants.filter((d) => d.id !== startupId);
			applicants = sub;
			toggleDialog();
		}
	}
	// rated
	let trl = $state(0),
		orl = $state(0),
		mrl = $state(0),
		rrl = $state(0),
		arl = $state(0),
		irl = $state(0);
	async function getRatedStartupInformation(startupId: number) {
		const response = await fetch(`${PUBLIC_API_URL}/startups/${startupId}/`, {
			method: 'get',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${access}`
			}
		});

		const data = await response.json();
		if (response.ok) {
			const urat_questions = await fetch(`${PUBLIC_API_URL}/readinesslevel/urat-questions/`, {
				method: 'get',
				headers: {
					Authorization: `Bearer ${access}`
				}
			});

			const questions_data = await urat_questions.json();

			const urat_answers = await fetch(
				`${PUBLIC_API_URL}/urat-question-answers/?startup_id=${startupId}`,
				{
					method: 'get',
					headers: {
						Authorization: `Bearer ${access}`
					}
				}
			);

			const answers_data = await urat_answers.json();

			const calculator = await fetch(
				`${PUBLIC_API_URL}/startups/${startupId}/calculator-final-scores/`,
				{
					method: 'get',
					headers: {
						Authorization: `Bearer ${access}`
					}
				}
			);

			const calculator_data = await calculator.json();

			if (urat_questions.ok && urat_answers.ok && calculator.ok) {
				inf = data;
				que = questions_data.results;
				ans = answers_data.results;
				calc = calculator_data;
				trl = ans
					.filter((d) => d.readiness_type === 'Technology')
					.reduce((accumulator: any, currentValue: any) => {
						return accumulator + currentValue.score;
					}, 0);
				orl = ans
					.filter((d) => d.readiness_type === 'Organizational')
					.reduce((accumulator: any, currentValue: any) => {
						return accumulator + currentValue.score;
					}, 0);
				mrl = ans
					.filter((d) => d.readiness_type === 'Market')
					.reduce((accumulator: any, currentValue: any) => {
						return accumulator + currentValue.score;
					}, 0);
				rrl = ans
					.filter((d) => d.readiness_type === 'Regulatory')
					.reduce((accumulator: any, currentValue: any) => {
						return accumulator + currentValue.score;
					}, 0);
				arl = ans
					.filter((d) => d.readiness_type === 'Acceptance')
					.reduce((accumulator: any, currentValue: any) => {
						return accumulator + currentValue.score;
					}, 0);
				irl = ans
					.filter((d) => d.readiness_type === 'Investment')
					.reduce((accumulator: any, currentValue: any) => {
						return accumulator + currentValue.score;
					}, 0);
				toggleDialog();
			}
		}
	}

	async function approveStartup(startupId: number, selectedMentor: any) {
		const response = await fetch(`${PUBLIC_API_URL}/startups/${startupId}/approve-applicant/`, {
			method: 'post',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${access}`
			}
		});

		if (response.ok) {
			const assignmentor = await fetch(
				`${PUBLIC_API_URL}/startups/${selectedMentor}/appoint-mentors/`,
				{
					method: 'post',
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${access}`
					},
					body: JSON.stringify({
						mentor_ids: [selectedMentor.toString()]
					})
				}
			);

			if (assignmentor.ok) {
				const filtered = applicants.filter((d) => d.id !== startupId);
				applicants = filtered;
			}
			toggleDialog();
		}
	}

	async function rejectStartup(startupId: number) {
		const response = await fetch(`${PUBLIC_API_URL}/startups/${startupId}/reject-applicant/`, {
			method: 'post',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${access}`
			}
		});

		if (response.ok) {
			return {
				message: 'email has been sent to the applicant'
			};
		}
	}

	// qualified
	let lev: any;
	async function getQualifiedStartupInformation(startupId: number) {
		const response = await fetch(`${PUBLIC_API_URL}/startups/${startupId}/`, {
			method: 'get',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${access}`
			}
		});

		const data = await response.json();
		if (response.ok) {
			const level = await fetch(
				`${PUBLIC_API_URL}/startup-readiness-levels/?startup_id=${data.id}`,
				{
					method: 'get',
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${access}`
					}
				}
			);
			const levels = await level.json();
			if (level.ok) {
				inf = data;
				lev = levels.results;
				// return {
				// 	info: data,
				// 	questions: questions_data.results,
				// 	answers: answers_data.results,
				// 	access: access,
				// 	calculator: calculator_data
				// };
				toggleDialog();
			}
		}
	}

	const queries = useQueries([
		{
			queryKey: ['pendingRatedRanking'],
			queryFn: async () =>
				(
					await axiosInstance.get(`/startups/ranking-by-urat/`, {
						headers: {
							Authorization: `Bearer ${data.access}`
						}
					})
				).data,
			cacheTime: 0,
			staleTime: 0
		},
		{
			queryKey: ['mentors'],
			queryFn: async () =>
				(
					await axiosInstance.get(`/users/?user_type=ME`, {
						headers: {
							Authorization: `Bearer ${data.access}`
						}
					})
				).data,
			cacheTime: 0,
			staleTime: 0
		},
		{
			queryKey: ['qualifiedRanking'],
			queryFn: async () =>
				(
					await axiosInstance.get(`/startups/ranking-by-rubrics/`, {
						headers: {
							Authorization: `Bearer ${data.access}`
						}
					})
				).data,
			cacheTime: 0,
			staleTime: 0
		}
	]);

	$effect(() => {
		if ($queries[0].isSuccess) {
			if ($queries[0].data.length > 0) {
				if (selectedTab === 'pending') {
					applicants = $queries[0].data.filter(
						(applicant: any) => applicant.qualification_status === 1
					);
				} else if (selectedTab === 'rated') {
					applicants = $queries[0].data.filter(
						(applicant: any) => applicant.qualification_status === 2
					);
				}
			} else {
				applicants = []; // Handle case when there are no applicants
			}
		}
	});

	$effect(() => {
		if ($queries[2].isSuccess) {
			if (selectedTab === 'qualified') {
				if ($queries[2].data.length > 0) {
					applicants = $queries[2].data;
				} else {
					applicants = [];
				}
			}
		}
	});
</script>

<div class="w-full">
	<div class="flex items-center justify-between">
		<div>
			<h2 class="text-3xl font-bold">Applications</h2>
			<p class="text-muted-foreground">Manage startup applications</p>
		</div>
	</div>
	<div class="flex items-center justify-between">
		<div class="flex h-fit justify-between rounded-lg bg-background">
			<Tabs.Root value="pending">
				<Tabs.List class="border bg-flutter-gray/20">
					<Tabs.Trigger
						class="flex items-center gap-1"
						value="pending"
						onclick={() => (selectedTab = 'pending')}>Pending</Tabs.Trigger
					>
					<Tabs.Trigger
						class="flex items-center gap-1"
						value="rated"
						onclick={() => (selectedTab = 'rated')}>Rated</Tabs.Trigger
					>
					<Tabs.Trigger
						class="flex items-center gap-1"
						value="qualified"
						onclick={() => (selectedTab = 'qualified')}>Qualified</Tabs.Trigger
					>
				</Tabs.List>
			</Tabs.Root>
		</div>
		<div class="flex items-center gap-3 py-4">
			<div class="rounded-lg bg-background">
				<Input
					placeholder="Filter applications..."
					value={(table.getColumn('email')?.getFilterValue() as string) ?? ''}
					oninput={(e) => table.getColumn('email')?.setFilterValue(e.currentTarget.value)}
					onchange={(e) => {
						table.getColumn('email')?.setFilterValue(e.currentTarget.value);
					}}
					class="max-w-sm"
				/>
			</div>
			<DropdownMenu.Root>
				<DropdownMenu.Trigger>
					{#snippet child({ props })}
						<Button {...props} variant="outline">
							Columns <ChevronDown class="ml-2 size-4" />
						</Button>
					{/snippet}
				</DropdownMenu.Trigger>
				<DropdownMenu.Content align="end">
					{#each table.getAllColumns().filter((col) => col.getCanHide()) as column}
						<DropdownMenu.CheckboxItem
							class="capitalize"
							controlledChecked
							checked={column.getIsVisible()}
							onCheckedChange={(value) => column.toggleVisibility(!!value)}
						>
							{column.id}
						</DropdownMenu.CheckboxItem>
					{/each}
				</DropdownMenu.Content>
			</DropdownMenu.Root>
		</div>
	</div>
	<DataTable {table} {selectedTab} />
</div>

<!-- pending dialog -->
{#if selectedTab === 'pending'}
<PendingDialog {inf} {que} {ans} {calc} {saveRating} {showDialog} {toggleDialog} />
{:else if selectedTab === 'rated'}
<RatedDialog
	{inf}
	{que}
	{ans}
	{calc}
	{trl}
	{orl}
	{mrl}
	{rrl}
	{arl}
	{irl}
	{approveStartup}
	{rejectStartup}
	mentors={$queries[1].data.results}
	{showDialog}
	{toggleDialog}
/>
{:else}
<QualifiedDialog {inf} {lev} {showDialog} {toggleDialog} />
{/if}
