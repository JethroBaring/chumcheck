<script lang="ts">
	import Plus from 'lucide-svelte/icons/plus';
	import { page } from '$app/stores';
	import { dndzone } from 'svelte-dnd-action';
	import { flip } from 'svelte/animate';
	import * as Dialog from '$lib/components/ui/dialog';
	import { Button } from '$lib/components/ui/button/index.js';
	import { Input } from '$lib/components/ui/input';
	import Spinner from 'lucide-svelte/icons/loader-circle';
	import Badge from '$lib/components/ui/badge/badge.svelte';
	import Target from 'lucide-svelte/icons/target';
	import * as Card from '$lib/components/ui/card/index.js';

	import ListFilter from 'lucide-svelte/icons/list-filter';

	import CirclePlus from 'lucide-svelte/icons/circle-plus';

	import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js';
	import * as Tabs from '$lib/components/ui/tabs/index.js';
	const flipDurationMs = 300;
	let access =
		'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzE3MzEyNzY2LCJpYXQiOjE3MTcwNTM1NjYsImp0aSI6ImExNmYxNDU1MDAzOTQzNGRiOWRhOGZlYWI5Y2VmNWE5IiwidXNlcl9pZCI6MSwidXNlcl90eXBlIjoiTSJ9.bVCwaH6ZZjdrvBI1Cahk-tU4t4RiDK7gXH22c9ZQia0';

	function toggleOpen() {
		open = !open;
	}

	export let data;
	let initiatives = data.initiatives;
	let generating = false;
	let generated: any = [];

	async function generateInitiatives() {
		generated = [];
		generating = true;

		try {
			await Promise.all(
				data.tasks.map(async (r) => {
					await fetch(`http://127.0.0.1:8000/tasks/initiatives/create-initial-initiatives/`, {
						method: 'post',
						headers: {
							'Content-type': 'application/json',
							Authorization: `Bearer ${access}`
						},
						body: JSON.stringify({
							task_id: r.id,
							no_of_initiatives_to_create: 3
						})
					});
				})
			).then((values) => {
				console.log(values);
				generating = false;
			});
		} catch (error) {
			console.log(error);
		}
	}

	async function saveInitiatives() {
		try {
			await Promise.all(
				initiatives.map(async (initiative: any) => {
					await fetch(`http://127.0.0.1:8000/tasks/initiatives/${initiative.id}/`, {
						method: 'PATCH',
						headers: {
							'Content-type': 'application/json',
							Authorization: `Bearer ${access}`
						},
						body: JSON.stringify({
							status: 4
						})
					});
				})
			).then((values) => {
				console.log(values);
				const temp = initiatives.map((initiative: any) => (initiative.status = 4));
				initiatives = temp;
			});
		} catch (error) {
			console.log(error);
		}
	}

	let items = [
		{
			title: 'Backlog',
			items: [
				{
					subTitle: 'Scheduled',
					subStatus: 4,
					subItems: initiatives.filter((t: any) => t.status === 4)
				}
			]
		},
		{
			title: 'In Progress',
			items: [
				{
					subTitle: 'Track',
					subStatus: 5,
					subItems: initiatives.filter((t: any) => t.status === 5)
				},
				{
					subTitle: 'Delayed',
					subStatus: 3,
					subItems: initiatives.filter((t: any) => t.status === 3)
				}
			]
		},
		{
			title: 'Done',
			items: [
				{
					subTitle: 'Completed',
					subStatus: 6,
					subItems: initiatives.filter((t: any) => t.status === 6)
				},
				{
					subTitle: 'Discontinued',
					subStatus: 2,
					subItems: initiatives.filter((t: any) => t.status === 2)
				}
			]
		}
	];

	function handleDndConsider(e: any, x: number, y: number) {
		items[x].items[y].subItems = e.detail.items;
	}
	async function handleDndFinalize(e: any, x: number, y: number, status: number) {
		items[x].items[y].subItems = e.detail.items;
		if (e.detail.info.trigger == 'droppedIntoZone') {
			const task = e.detail.items.find((t) => t.id == e.detail.info.id);

			const response = await fetch(`http://127.0.0.1:8000/tasks/initiatives/${task.id}/`, {
				method: 'PATCH',
				headers: {
					'Content-type': 'application/json',
					Authorization: `Bearer ${access}`
				},
				body: JSON.stringify({
					status: status
				})
			});
		}
	}

	let open = false;
	let currItem: { id: number; name: string } = items[0].items[0].subItems[0];

	function changeCurr(index: number, subIndex: number, i: number) {
		currItem = items[index].items[subIndex].subItems[i];
	}

	const shortTerm = data.tasks.filter((d) => d.task_type === 1);
	const longTerm = data.tasks.filter((d) => d.task_type === 2);
</script>

<div class="flex items-center">
	<div class="flex w-full justify-between">
		<h1 class="text-lg font-semibold md:text-2xl">Initiatives</h1>
		{#if data.allow && initiatives.length === 0}
			<div class="flex gap-3">
				<Input placeholder="Enter number of initiatives" />
				<Button on:click={generateInitiatives} disabled={!data.allow}>Generate Initiatives</Button>
			</div>
		{:else if initiatives.length > 0 && initiatives[0].status === 1}
			<Button on:click={saveInitiatives}>Save</Button>
		{/if}
	</div>
</div>
<div class="flex flex-1 gap-6">
	{#if initiatives.length > 0 && initiatives[0].status !== 1}
		{#each items as item, index}
			<div class="flex flex-1 flex-col gap-1">
				<p class="text-[17px] font-medium">{item.title}</p>
				<div class="flex flex-1 flex-col gap-6 rounded-lg bg-muted p-4 dark:bg-muted/40 overflow-scroll">
					<div class="h-0 flex flex-col gap-6 ">
						{#each item.items as subItem, subIndex}
						<div class="flex flex-col gap-3">
							<div class="flex items-center gap-3">
								<p>{subItem.subTitle}</p>
								<button> <Plus class="h-4 w-4" /> </button>
							</div>
							<div
								class="flex flex-col gap-4"
								use:dndzone={{
									items: subItem.subItems,
									flipDurationMs,
									dropTargetStyle: {
										outline: 'rgba(255, 255, 255, 0) solid 2px'
									}
								}}
								on:consider={(e) => handleDndConsider(e, index, subIndex)}
								on:finalize={(e) => handleDndFinalize(e, index, subIndex, subItem.subStatus)}
							>
								{#if subItem.subItems.length === 0}
									<div class="h-40"></div>
								{:else}
									{#each subItem.subItems as item, i (item.id)}
										<!-- svelte-ignore a11y-click-events-have-key-events -->
										<!-- svelte-ignore a11y-no-static-element-interactions -->
										<div
											class="flex h-40 cursor-pointer flex-col gap-3 rounded-lg bg-white/60 p-5 dark:bg-muted"
											animate:flip={{ duration: flipDurationMs }}
											on:click={() => {
												toggleOpen();
												changeCurr(index, subIndex, i);
											}}
										>
											<p>{item.description.substring(0, 80) + '...'}</p>
											<Badge class="w-fit">Technology</Badge>
											<div class="flex items-center gap-1">
												<Target class="h-4 w-4" />
												<p class="text-sm">Target Level: {5}</p>
											</div>
										</div>
									{/each}
								{/if}
							</div>
						</div>
					{/each}
					</div>
				</div>
			</div>
		{/each}
	{:else if initiatives.length > 0}
		<div class="mx-auto flex h-fit w-full gap-6">
			<div class="flex flex-1 flex-col gap-2">
				<Tabs.Root value="short" class="">
					<div class="flex items-center">
						<Tabs.List>
							<Tabs.Trigger value="short">Short Term</Tabs.Trigger>
							<Tabs.Trigger value="long">Long Term</Tabs.Trigger>
						</Tabs.List>
					</div>
					<Tabs.Content value="short">
						<div class="flex gap-3">
							{#each shortTerm as term}
								<div class="flex flex-1 flex-col gap-6 rounded-lg bg-muted p-4 dark:bg-muted/40">
									<h1 class="font-semibold text-base">Priority {term.priority_number} Initiatives</h1>
									{#each initiatives.filter(init => init.task_id === term.id) as task}
										<!-- svelte-ignore a11y-click-events-have-key-events -->
										<!-- svelte-ignore a11y-no-static-element-interactions -->
										<div
											class="flex h-40 cursor-pointer flex-col gap-3 rounded-lg bg-white/60 p-5 dark:bg-muted"
											on:click={toggleOpen}
										>
											<p>{task.description.substring(0, 80) + '...'}</p>
											<Badge class="w-fit">Technology</Badge>
											<div class="flex items-center gap-1">
												<Target class="h-4 w-4" />
												<p class="text-sm">Target Level: {5}</p>
											</div>
										</div>
									{/each}
								</div>
							{/each}
						</div>
					</Tabs.Content>
					<Tabs.Content value="long">
						<div class="flex gap-3">
							{#each longTerm as term}
								<div class="flex flex-1 flex-col gap-6 rounded-lg bg-muted p-4 dark:bg-muted/40">
									<h1 class="font-semibold text-base">Priority {term.priority_number} Initiatives</h1>
									{#each initiatives.filter(init => init.task_id === term.id) as task}
										<!-- svelte-ignore a11y-click-events-have-key-events -->
										<!-- svelte-ignore a11y-no-static-element-interactions -->
										<div
											class="flex h-40 cursor-pointer flex-col gap-3 rounded-lg bg-white/60 p-5 dark:bg-muted"
											on:click={toggleOpen}
										>
											<p>{task.description.substring(0, 80) + '...'}</p>
											<Badge class="w-fit">Technology</Badge>
											<div class="flex items-center gap-1">
												<Target class="h-4 w-4" />
												<p class="text-sm">Target Level: {5}</p>
											</div>
										</div>
									{/each}
								</div>
							{/each}
						</div>
					</Tabs.Content>
				</Tabs.Root>
			</div>
		</div>
	{:else if generating}
		<div class="flex flex-1 items-center justify-center">
			<div class="flex flex-col items-center gap-3">
				<Spinner class="mr-2 h-10 w-10 animate-spin" />
				<h1>Generating RNA...</h1>
			</div>
		</div>
	{:else if data.allow}
		<div class="flex flex-1 items-center justify-center">
			<h1>Generate RNA by clicking the button</h1>
		</div>
	{:else}
		<div class="flex flex-1 items-center justify-center">
			<h1>Finish the RNA first to be able to generate RNA for startup</h1>
		</div>
	{/if}
</div>

<Dialog.Root {open} onOpenChange={toggleOpen}>
	<Dialog.Content>
		<p class="text-lg">{currItem.description}</p>
		<Badge class="w-fit">Technology</Badge>
		<div class="flex items-center gap-1">
			<Target class="h-4 w-4" />
			<p class="text-sm">Target Level: {5}</p>
		</div>
	</Dialog.Content>
</Dialog.Root>
