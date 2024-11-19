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
	import {
		DataTableEmailButton,
		DataTableActions
	} from '$lib/components/applications';
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

	const data: Application[] = [
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
			return data;
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

	let selectedTab = $state('pending')
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
					<Tabs.Trigger class="flex items-center gap-1" value="pending" onclick={() => selectedTab = 'pending'}>Pending</Tabs.Trigger>
					<Tabs.Trigger class="flex items-center gap-1" value="rated" onclick={() => selectedTab = 'rated'}>Rated</Tabs.Trigger>
					<Tabs.Trigger class="flex items-center gap-1" value="qualified" onclick={() => selectedTab = 'qualified'}>Qualified</Tabs.Trigger>
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
	<DataTable {table} {selectedTab}/>
</div>
