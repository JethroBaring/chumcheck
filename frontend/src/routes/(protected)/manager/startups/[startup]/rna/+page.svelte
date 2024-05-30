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
	import { Textarea } from '$lib/components/ui/textarea';
	import Spinner from 'lucide-svelte/icons/loader-circle';

	let access =
		'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzE3MzEyNzY2LCJpYXQiOjE3MTcwNTM1NjYsImp0aSI6ImExNmYxNDU1MDAzOTQzNGRiOWRhOGZlYWI5Y2VmNWE5IiwidXNlcl9pZCI6MSwidXNlcl90eXBlIjoiTSJ9.bVCwaH6ZZjdrvBI1Cahk-tU4t4RiDK7gXH22c9ZQia0';
	let readiness = [
		'Technology',
		'Market',
		'Acceptance',
		'Organizational',
		'Regulatory',
		'Investment'
	];

	export let data;
	console.log("rna ni")
	console.log(data.rna)
	let rna = data.rna;

	let generating = false;
	let generated: any = [];
	async function generateRNA() {
		generated = [];
		generating = true;
		const response = await fetch(`http://127.0.0.1:8000/startups/${data.startupId}/generate-rna`, {
			method: 'get',
			headers: {
				Authorization: `Bearer ${access}`
			}
		});

		const x = await response.json();

		if (response.ok) {
			console.log(x)
			generated.push(x.trl);
			generated.push(x.mrl);
			generated.push(x.arl);
			generated.push(x.orl);
			generated.push(x.rrl);
			generated.push(x.irl);
			generating = false;
		}
	}

</script>

<div class="flex items-center">
	<div class="flex w-full justify-between">
		<h1 class="text-lg font-semibold md:text-2xl">Readiness and Needs Assessment</h1>
		{#if data.allow && rna.length === 0}
			<Button on:click={generateRNA} disabled={!data.allow}>Generate RNA</Button>
		{/if}
	</div>
</div>
<div class="flex flex-1 flex-col">
	{#if rna.length > 0}
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
								<Table.Cell>{data.readiness[index].readiness_level}</Table.Cell>
								<Table.Cell>
									<Textarea
										readonly
										value={rna.filter(
											(d) => d.readiness_level_id === data.readiness[index].readiness_level_id
										)[0].rna}
									/>
								</Table.Cell>
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
								<Table.Cell>{data.readiness[index].readiness_level}</Table.Cell>
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
				<h1>Generating Readiness and Needs Assessment...</h1>
			</div>
		</div>
	{:else if data.allow}
		<div class="flex flex-1 items-center justify-center">
			<h1>Generate Readiness and Needs Assessment by clicking the button</h1>
		</div>
	{:else}
		<div class="flex flex-1 items-center justify-center">
			<h1>Finish the rubrics first to be able to generate Readiness and Needs Assessment for startup</h1>
		</div>
	{/if}
</div>
