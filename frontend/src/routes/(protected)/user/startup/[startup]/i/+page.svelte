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

</script>

<div class="flex items-center">
	<div class="flex w-full justify-between">
		<h1 class="text-lg font-semibold md:text-2xl">Initiatives</h1>
		
	</div>
</div>
<div class="flex flex-1 gap-6">
	{#if initiatives.length > 0 && initiatives[0].status !== 1}
		{#each items as item, index}
			<div class="flex flex-1 flex-col gap-1">
				<p class="text-[17px] font-medium">{item.title}</p>
				<div
					class="flex flex-1 flex-col gap-6 overflow-scroll rounded-lg bg-muted p-4 dark:bg-muted/40"
				>
					<div class="flex h-0 flex-col gap-6">
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
	{:else}
		<div class="flex flex-1 items-center justify-center">
			Initiatives Board will show once your mentor is done finalizing it
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
