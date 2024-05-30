<script lang="ts">
	import File from 'lucide-svelte/icons/file';
	import Home from 'lucide-svelte/icons/home';
	import LineChart from 'lucide-svelte/icons/line-chart';
	import ListFilter from 'lucide-svelte/icons/list-filter';
	import Ellipsis from 'lucide-svelte/icons/ellipsis';
	import Package from 'lucide-svelte/icons/package';
	import Package2 from 'lucide-svelte/icons/package-2';
	import CirclePlus from 'lucide-svelte/icons/circle-plus';
	import Search from 'lucide-svelte/icons/search';
	import ShoppingCart from 'lucide-svelte/icons/shopping-cart';
	import { toggleMode } from 'mode-watcher';
	import { Badge } from '$lib/components/ui/badge/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import * as Card from '$lib/components/ui/card/index.js';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import * as Sheet from '$lib/components/ui/sheet/index.js';
	import * as Table from '$lib/components/ui/table/index.js';
	import * as Tabs from '$lib/components/ui/tabs/index.js';
	import Users from 'lucide-svelte/icons/users';
	import Sun from 'svelte-radix/Sun.svelte';
	import Moon from 'svelte-radix/Moon.svelte';
	import Menu from 'lucide-svelte/icons/menu';
	import ChevronLeft from 'lucide-svelte/icons/chevron-left';
	import ChevronRight from 'lucide-svelte/icons/chevron-right';
	import * as Pagination from '$lib/components/ui/pagination/index.js';
	import Check from 'lucide-svelte/icons/check';
	import { Textarea } from '$lib/components/ui/textarea';
	import Spinner from 'lucide-svelte/icons/loader-circle';

	let access =
		'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzE3MTY1MTg0LCJpYXQiOjE3MTY5MDU5ODQsImp0aSI6ImMzZmFlOGZlYmY2YzQwNThhZDQxZWQ3MzMyNjlhYTBhIiwidXNlcl9pZCI6NiwidXNlcl90eXBlIjoiTUUifQ.-R00RI1Plp1-UlD0kEKrvj8w54t-5ZdH2fd-0F3oLIE';
	let readiness = [
		'Technology',
		'Market',
		'Acceptance',
		'Organizational',
		'Regulatory',
		'Investment'
	];

	export let data;

	let roadblocks = data.roadblocks;

	let generating = false;
	let generated: any = [];
	async function generateRNA() {
		generated = [];
		generating = true;
		const response = await fetch(
			`http://127.0.0.1:8000/tasks/roadblocks/create-initial-roadblocks/`,
			{
				method: 'POST',
				headers: {
					'Content-type': 'application/json',
					Authorization: `Bearer ${access}`
				},
				body: JSON.stringify({
					startup_id: data.startupId,
					no_of_roadblocks_to_create: 3
				})
			}
		);

		const x = await response.json();

		if (response.ok) {
			console.log(x);
			generated.push(x.trl);
			generated.push(x.mrl);
			generated.push(x.arl);
			generated.push(x.orl);
			generated.push(x.rrl);
			generated.push(x.irl);
			generating = false;
		}
	}

	let h: any = [];
	for (let i = 0; i < roadblocks.length; i++) {
		h.push(false);
	}

	function toggle(index: number) {
		h[index] = !h[index];
	}

	function click() {
		console.log('test');
	}
</script>

<div class="flex items-center">
	<div class="flex w-full justify-between">
		<h1 class="text-lg font-semibold md:text-2xl">Roadblocks</h1>
		{#if data.allow && roadblocks.length === 0}
			<Button on:click={generateRNA} disabled={!data.allow}>Generate Roadblocks</Button>
		{/if}
	</div>
</div>
<div class="flex flex-1 flex-col">
	{#if roadblocks.length > 0}
		<Card.Root
			data-x-chunk-name="dashboard-06-chunk-1"
			data-x-chunk-description="A list of products in a table with actions. Each row has an image, name, status, price, total sales, created at and actions."
		>
			<Card.Content class="pt-[24px] ">
				<Table.Root>
					<Table.Header>
						<Table.Row>
							<Table.Head>Risk Number</Table.Head>
							<Table.Head>Description</Table.Head>
							<Table.Head>Fix/Mitigation</Table.Head>
							<Table.Head>Assignee</Table.Head>
						</Table.Row>
					</Table.Header>
					<Table.Body>
						{#each roadblocks as r, index}
							<Table.Row class="h-[80px]">
								<Table.Cell class="font-medium">{index + 1}</Table.Cell>
								<Table.Cell>
									<div class="flex items-center gap-2">
										<Textarea value={r.description} />
										<button><Check class="h-4 w-4" /></button>
									</div>
								</Table.Cell>
								<Table.Cell>
									<div class="flex items-center gap-2">
										<Textarea value={r.fix} />
										<button><Check class="h-4 w-4" /></button>
									</div>
								</Table.Cell>
								<Table.Cell></Table.Cell>
							</Table.Row>
						{/each}
					</Table.Body>
				</Table.Root>
			</Card.Content>
		</Card.Root>
	{:else if generated.length > 0}
		<Card.Root
			data-x-chunk-name="dashboard-06-chunk-1"
			data-x-chunk-description="A list of products in a table with actions. Each row has an image, name, status, price, total sales, created at and actions."
		>
			<Card.Content class="pt-[24px] ">
				<Table.Root>
					<Table.Header>
						<Table.Row>
							<Table.Head>Readiness Level</Table.Head>
							<Table.Head>Current Level</Table.Head>
							<Table.Head>Details</Table.Head>
						</Table.Row>
					</Table.Header>
					<Table.Body>
						{#each readiness as r, index}
							<Table.Row class="h-[80px]">
								<Table.Cell class="font-medium">{r}</Table.Cell>
								<Table.Cell></Table.Cell>
								<Table.Cell>
									<Textarea bind:value={generated[index]} />
								</Table.Cell>
							</Table.Row>
						{/each}
					</Table.Body>
				</Table.Root>
			</Card.Content>
		</Card.Root>
		<form method="post" class="flex flex-col gap-3">
			{#each readiness as r, index}
				<input type="hidden" name={`${r}`} value={data.readiness[index].readiness_level_id} />
				<input type="hidden" name={`${r}rna`} value={generated[index]} />
			{/each}
			<div class="flex justify-end"><Button type="submit">Save</Button></div>
		</form>
	{:else if generating}
		<div class="flex flex-1 items-center justify-center">
			<div class="flex flex-col items-center gap-3">
				<Spinner class="mr-2 h-10 w-10 animate-spin" />
				<h1>Generating Roadblocks...</h1>
			</div>
		</div>
	{:else if data.allow}
		<div class="flex flex-1 items-center justify-center">
			<h1>Generate Roadblocks by clicking the button</h1>
		</div>
	{:else}
		<div class="flex flex-1 items-center justify-center">
			<h1>Finish the Initiatives first to be able to generate Roadblocks for startup</h1>
		</div>
	{/if}
</div>
