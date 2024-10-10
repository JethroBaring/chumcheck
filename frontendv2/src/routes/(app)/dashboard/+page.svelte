<script lang="ts">
	import { Render, Subscribe, createRender, createTable } from 'svelte-headless-table';
	import {
		addHiddenColumns,
		addPagination,
		addSelectedRows,
		addSortBy,
		addTableFilter
	} from 'svelte-headless-table/plugins';
	import { readable } from 'svelte/store';
	import Actions from './actions.svelte';
	import DataTableCheckbox from './checkbox.svelte';
	import * as Table from '$lib/components/ui/table/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js';
	import { cn } from '$lib/utils.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import type { Applicant } from '$lib/types';
  import * as Tabs from "$lib/components/ui/tabs";

	export let data
	let currentTab = 'pending'
	$: status = currentTab === 'pending' ? 1 : currentTab === 'rated' ? 2 : 0
	$: currentData = data ? data.applicants.filter((d) => d.qualification_status === status) : []
	const table = createTable(readable(data ? data.applicants.filter((d) => d.qualification_status === 2) : []), {
		sort: addSortBy({ disableMultiSort: true }),
		page: addPagination(),
		filter: addTableFilter({
			fn: ({ filterValue, value }) => value.includes(filterValue)
		}),
		select: addSelectedRows(),
		hide: addHiddenColumns()
	});

	const columns = table.createColumns([
		table.column({
			header: '',
			accessor: 'id',
			plugins: { sort: { disable: true }, filter: { exclude: true } }
		}),
		table.column({
			header: 'Startup',
			accessor: 'name',
			plugins: { sort: { disable: true }, filter: { exclude: true } }
		}),
		table.column({
			header: 'Group',
			accessor: 'group_name',
			cell: ({ value }) => value.toLowerCase(),
			plugins: {
				filter: {
					getFilterValue(value) {
						return value.toLowerCase();
					}
				}
			}
		}),
		table.column({
			header: 'Leader',
			accessor: 'user',
			plugins: { sort: { disable: true }, filter: { exclude: true } }
		}),
		// table.column({
		// 	header: '',
		// 	accessor: ({ id }) => id,
		// 	cell: (item) => {
		// 		return createRender(Actions, { id: item.value });
		// 	},
		// 	plugins: {
		// 		sort: {
		// 			disable: true
		// 		}
		// 	}
		// })
	]);

	const { headerRows, pageRows, tableAttrs, tableBodyAttrs, flatColumns, pluginStates, rows } =
		table.createViewModel(columns);

	const { sortKeys } = pluginStates.sort;

	const { hiddenColumnIds } = pluginStates.hide;
	const ids = flatColumns.map((c) => c.id);
	let hideForId = Object.fromEntries(ids.map((id) => [id, true]));

	$: $hiddenColumnIds = Object.entries(hideForId)
		.filter(([, hide]) => !hide)
		.map(([id]) => id);

	const { hasNextPage, hasPreviousPage, pageIndex } = pluginStates.page;
	const { filterValue } = pluginStates.filter;

	const { selectedDataIds } = pluginStates.select;
	
</script>

<div class="w-full">
	<div class="flex items-center py-4">
		<div class="flex justify-between rounded-lg bg-background">
			<Tabs.Root value={currentTab}>
				<Tabs.List class="border bg-flutter-gray/20">
					<Tabs.Trigger value="pending" on:click={() => currentTab = 'pending'}>Pending</Tabs.Trigger>
					<Tabs.Trigger value="rated" on:click={() => currentTab = 'rated'}>Rated</Tabs.Trigger>
					<Tabs.Trigger value="qualified" on:click={() => currentTab = 'qualified'}>Qualified</Tabs.Trigger>
				</Tabs.List>
				<!-- <Tabs.Content value="account">
					Make changes to your account here.
				</Tabs.Content>
				<Tabs.Content value="password">Change your password here.</Tabs.Content> -->
			</Tabs.Root>
		</div>
		<Input class="ml-auto max-w-sm" placeholder="Search..." type="text" bind:value={$filterValue} />
	</div>
	<div class="rounded-lg border">
		<Table.Root {...$tableAttrs}>
			<Table.Header>
				{#each $headerRows as headerRow}
					<Subscribe rowAttrs={headerRow.attrs()}>
						<Table.Row>
							{#each headerRow.cells as cell (cell.id)}
								<Subscribe attrs={cell.attrs()} let:attrs props={cell.props()} let:props>
									<Table.Head {...attrs} class={cn('[&:has([role=checkbox])]:pl-3')}>
										{#if cell.id === 'amount'}
											<div class="text-right font-medium">
												<Render of={cell.render()} />
											</div>
										{:else if cell.id === 'email'}
											<Button variant="ghost" on:click={props.sort.toggle}>
												<Render of={cell.render()} />
											</Button>
										{:else}
											<Render of={cell.render()} />
										{/if}
									</Table.Head>
								</Subscribe>
							{/each}
						</Table.Row>
					</Subscribe>
				{/each}
			</Table.Header>
			<Table.Body {...$tableBodyAttrs}>
				{#each $pageRows as row (row.id)}
					<Subscribe rowAttrs={row.attrs()} let:rowAttrs>
						<Table.Row {...rowAttrs} data-state={$selectedDataIds[row.id] && 'selected'} class="h-16">
							{#each row.cells as cell (cell.id)}
								<Subscribe attrs={cell.attrs()} let:attrs>
									<Table.Cell class="[&:has([role=checkbox])]:pl-3" {...attrs}>
										{#if cell.id === 'amount'}
											<div class="text-right font-medium">
												<Render of={cell.render()} />
											</div>
										{:else if cell.id === 'status'}
											<div class="capitalize">
												<Render of={cell.render()} />
											</div>
										{:else}
											<Render of={cell.render()} />
										{/if}
									</Table.Cell>
								</Subscribe>
							{/each}
						</Table.Row>
					</Subscribe>
				{/each}
			</Table.Body>
		</Table.Root>
	</div>
	<div class="flex items-center justify-end space-x-2 py-4">
		<div class="flex-1 text-sm text-muted-foreground">
			{Object.keys($selectedDataIds).length} of {$rows.length} row(s) selected.
		</div>
		<Button
			variant="outline"
			size="sm"
			on:click={() => ($pageIndex = $pageIndex - 1)}
			disabled={!$hasPreviousPage}>Previous</Button
		>
		<Button
			variant="outline"
			size="sm"
			disabled={!$hasNextPage}
			on:click={() => ($pageIndex = $pageIndex + 1)}>Next</Button
		>
	</div>
</div>
